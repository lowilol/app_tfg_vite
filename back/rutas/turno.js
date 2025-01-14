const express = require("express");
const router = express.Router();
const Turno = require("../models/Turno");
const Laboratorio = require("../models/Laboratorio");
const Profesor = require("../models/Profesor"); // Asegúrate de importar este modelo
const Usuario = require('../models/User');

const { Op } = require("sequelize");
// Ruta para crear un turno
router.post('/', async (req, res) => {
  const { id_laboratorio, fecha, hora_inicio, hora_fin,id_user} = req.body;
  console.log("Datos recibidos en el backend:", { id_laboratorio, id_user, fecha, hora_inicio, hora_fin });
  const id_profesor = id_user
  try {
    // Obtén el id_profesor desde la sesión del usuario
    //const id_profesor = req.user?.id_profesor; // Supón que la autenticación añade `user` al objeto `req`
    
    if (!id_profesor) {
      return res.status(401).json({ error: 'No autorizado. Profesor no identificado.' });
    }
    

    // Validar que todos los campos estén presentes
    if (!id_laboratorio || !fecha || !hora_inicio || !hora_fin) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }

    // Validar el lapso de 4 horas para reservas del mismo día
    if (isReservaMismoDia(fecha)) {
      const diferenciaHoras = calcularDiferenciaHoras(hora_inicio);
      if (diferenciaHoras < 4) {
        return res.status(400).json({ error: 'Reservas del mismo día requieren al menos 4 horas de anticipación.' });
      }
    }

    // Validar conflicto de horarios
    if (await verificarConflictoHorario(id_laboratorio, fecha, hora_inicio, hora_fin)) {
      return res.status(400).json({ error: 'Conflicto de horario detectado en el laboratorio.' });
    }

    // Crear el turno
    const nuevoTurno = await Turno.create({
      id_laboratorio,
      id_profesor,
      fecha,
      hora_inicio,
      hora_fin,
    });

    return res.status(201).json({ message: 'Turno creado exitosamente.', turno: nuevoTurno });
  } catch (error) {
    console.error('Error al crear el turno:', error);
    return res.status(500).json({ error: 'Error interno del servidor.' });
  }
});


router.get("/", async (req, res) => {
    try {
      const turnos = await Turno.findAll({
        include: [
          {
            model: Laboratorio,
            as: "laboratorio",
            attributes: ["nombre_laboratorio", "capacidad"],
          },
          {
            model: Profesor,
            as: "profesor",
            include: {
              model: Usuario ,
              as: "usuario",
              attributes: ["FirstName", "LastName"], // Campos necesarios del usuario
            },
          },
        ],
      });
  
      res.status(200).json(turnos);
    } catch (error) {
      console.error("Error al obtener los turnos:", error);
      res.status(500).json({ error: "Error interno del servidor." });
    }
  });


  router.get("/:id_profesor", async (req, res) => {
    const { id_profesor } = req.params; // Obtener la ID del profesor desde los parámetros
  
    try {
      
      const turnos = await Turno.findAll({
        where: { id_profesor },
        include: [
          {
            model: Laboratorio,
            as: "laboratorio",
            attributes: ["nombre_laboratorio", "capacidad"],
          },
          {
            model: Profesor,
            as: "profesor",
            include: [
              {
                model: Usuario,
                as: "usuario",
                attributes: ["FirstName", "LastName"],
              },
            ],
          },
        ],
      });
      if (turnos.length === 0) {
        return res.status(404).json({ message: "No se encontraron turnos para el profesor especificado." });
      }
  
      res.status(200).json(turnos);
    } catch (error) {
      console.error("Error al obtener los turnos:", error);
      res.status(500).json({ error: "Error interno del servidor." });
    }
  });

  


  router.delete("/:id_profesor/:id_turno", async (req, res) => {
    const { id_profesor, id_turno } = req.params; // Obtener ID del profesor y del turno
  
    try {
      // Verificar si el turno existe y pertenece al profesor
      const turno = await Turno.findOne({
        where: {
          id_turno,
          id_profesor, // Asegurar que el turno pertenece al profesor
        },
      });
  
      if (!turno) {
        return res.status(404).json({ error: "Turno no encontrado o no pertenece al profesor." });
      }
  
      // Eliminar el turno
      await turno.destroy();
      res.status(200).json({ message: "Turno eliminado exitosamente." });
    } catch (error) {
      console.error("Error al eliminar el turno:", error);
      res.status(500).json({ error: "Error interno del servidor." });
    }
  });


  router.put("/:id_profesor/:id_turno", async (req, res) => {
    const { id_profesor, id_turno } = req.params; // Extraer parámetros
    const { fecha, hora_inicio, hora_fin } = req.body; // Obtener datos del cuerpo de la solicitud

    try {
        // Verificar si el turno existe y pertenece al profesor
        const turno = await Turno.findOne({
            where: {
                id_turno,
                id_profesor, // Asegurarse de que el turno pertenece al profesor
            },
        });

        if (!turno) {
            return res.status(404).json({ error: "Turno no encontrado o no pertenece al profesor." });
        }

        // Validar que los datos enviados sean opcionales y actualizar solo si están presentes
        const updates = {};
        if (fecha) updates.fecha = fecha;
        if (hora_inicio) updates.hora_inicio = hora_inicio;
        if (hora_fin) updates.hora_fin = hora_fin;

        // Verificar conflicto de horarios (opcional según tu lógica)
        if (updates.fecha || updates.hora_inicio || updates.hora_fin) {
            const conflict = await Turno.findOne({
                where: {
                    id_profesor,
                    id_turno: { [Op.ne]: id_turno }, // Excluir el turno actual
                    fecha: updates.fecha || turno.fecha,
                    [Op.or]: [
                        {
                            hora_inicio: { [Op.lt]: updates.hora_fin || turno.hora_fin },
                            hora_fin: { [Op.gt]: updates.hora_inicio || turno.hora_inicio },
                        },
                    ],
                },
            });

            if (conflict) {
                return res.status(400).json({ error: "Conflicto detectado con otro turno." });
            }
        }

        // Actualizar los datos del turno
        await turno.update(updates);

        return res.status(200).json(turno); // Retornar el turno actualizado
    } catch (error) {
        console.error("Error al actualizar el turno:", error);
        res.status(500).json({ error: "Error interno del servidor." });
    }
});


  // Verificar si la reserva es para el mismo día
function isReservaMismoDia(fecha) {
  const fechaActual = new Date().toISOString().split("T")[0];
  return fecha === fechaActual;
}

// Calcular la diferencia de horas entre ahora y la hora de inicio solicitada
function calcularDiferenciaHoras(horaInicio) {
  const [horaInicioH, horaInicioM] = horaInicio.split(":").map(Number);
  const ahora = new Date();
  const horaActual = ahora.getHours();
  const minutosActual = ahora.getMinutes();
  const diferenciaMinutos = (horaInicioH * 60 + horaInicioM) - (horaActual * 60 + minutosActual);
  return diferenciaMinutos / 60; // Convertir minutos a horas
}

// Verificar conflicto de horarios
async function verificarConflictoHorario(id_laboratorio, fecha, hora_inicio, hora_fin) {
  const turnos = await Turno.findAll({
    where: {
      id_laboratorio,
      fecha,
      [Op.or]: [
        {
          hora_inicio: { [Op.lt]: hora_fin }, // Turno existente empieza antes de que termine el nuevo
          hora_fin: { [Op.gt]: hora_inicio }, // Turno existente termina después de que empiece el nuevo
        },
      ],
    },
  });

  return turnos.length > 0; // Si hay conflictos, retorna true
}

module.exports = router;

module.exports = router;