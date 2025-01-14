const express = require('express');
const router = express.Router();
const  Turno  =require('../models/Turno');
const  Reserva =require('../models/Reserva');
const  Laboratorio  =require('../models/Laboratorio');


router.post('/:id_turno/:id_alumno', async (req, res) => {
    const { id_turno, id_alumno } = req.params;

    try {
        // Verificar si ya existe la reserva
        const existingReserva = await Reserva.findOne({ where: { id_turno, id_alumno } });

        if (existingReserva) {
            const mensajes = {
                Aceptado: "La reserva ya existe.",
                Cancelada: "Reserva cancelada, no puede volver a reservar."
            };

            return res.status(400).json({ message: mensajes[existingReserva.estado] || 'Error inesperado.' });
        }


       
            
            const turno = await Turno.findByPk(id_turno);
            if (!turno) {
                return res.status(404).json({ message: "Turno asociado no encontrado" });
            }

            if (turno.capacidad_ocupada >= turno.capacidad) {
                return res.status(400).json({ message: "El turno ya está completo." });
            }

            
            const nuevaReserva = await Reserva.create(
                { id_turno, id_alumno, estado: "Aceptado" },
                
            );

            
            turno.capacidad_ocupada += 1;
            await turno.save(); 
           
         
            res.status(201).json(nuevaReserva);
       
    } catch (error) {
        console.error('Error al crear la reserva:', error);
        res.status(500).json({ message: 'Error al crear la reserva.' });
    }
});

router.put("/cancelar/:id_reserva", async (req, res) => {
    const { id_reserva } = req.params;
  
    try {
      // Buscar la reserva
      const reserva = await Reserva.findByPk(id_reserva);
      if (!reserva) {
        return res.status(404).json({ message: "Reserva no encontrada" });
      }
  
      // Buscar el turno asociado a la reserva
      const turno = await Turno.findByPk(reserva.id_turno);
      if (!turno) {
        return res.status(404).json({ message: "Turno asociado no encontrado" });
      }
  
      // Actualizar el estado de la reserva
      reserva.estado = "Cancelada";
      await reserva.save();
  
      // Restar 1 de la capacidad ocupada del turno
      turno.capacidad_ocupada = Math.max(0, turno.capacidad_ocupada - 1); // Asegura que no sea menor a 0
      await turno.save();
  
      res.json({ message: "Reserva cancelada exitosamente", reserva, turno });
    } catch (error) {
      console.error("Error al cancelar la reserva:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  });
  


router.get('/:id_alumno', async (req, res) => {
   try {
       const { id_alumno } = req.params;

       const reservas = await Reserva.findAll({
           where: { id_alumno },
           include: [
               {
                   model: Turno,
                   as: 'turno',
                   include: [
                       {
                           model: Laboratorio,
                           as: 'laboratorio',
                       },
                   ],
               },
           ],
       });

       if (reservas.length === 0) {
           return res.status(404).json({ message: 'No se encontraron reservas para este alumno.' });
       }

       res.json(reservas);
   } catch (error) {
       console.error('Error al obtener reservas:', error);
       res.status(500).json({ message: 'Error interno del servidor.' });
   }
});
module.exports = router;