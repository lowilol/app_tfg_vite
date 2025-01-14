const express = require('express');
const router = express.Router();
const Laboratorio = require('../models/Laboratorio');

const Turno = require('../models/Turno');

// Crear un laboratorio
router.post('/', async (req, res) => {
  const { nombre_laboratorio, ubicación, capacidad } = req.body;

  try {
    if (!nombre_laboratorio || !ubicación || !capacidad) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const laboratorioExistente = await Laboratorio.findOne({ where: { nombre_laboratorio } });
    if (laboratorioExistente) {
      return res.status(400).json({ error: 'El nombre del laboratorio ya existe. Por favor, elija otro.' });
    }

    const nuevoLaboratorio = await Laboratorio.create({ nombre_laboratorio, ubicación, capacidad });
    res.status(201).json({ message: 'Laboratorio creado exitosamente', laboratorio: nuevoLaboratorio });
  } catch (error) {
    console.error('Error al crear el laboratorio:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Obtener todos los laboratorios
router.get('/', async (req, res) => {
  try {
    const laboratorios = await Laboratorio.findAll();
    res.status(200).json(laboratorios);
  } catch (error) {
    console.error('Error al obtener los laboratorios:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Obtener un laboratorio por ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const laboratorio = await Laboratorio.findByPk(id);

    if (!laboratorio) {
      return res.status(404).json({ error: 'Laboratorio no encontrado' });
    }

    res.status(200).json(laboratorio);
  } catch (error) {
    console.error('Error al obtener el laboratorio:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Actualizar un laboratorio
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre_laboratorio, ubicación, capacidad } = req.body;

  try {
    const laboratorio = await Laboratorio.findByPk(id);

    if (!laboratorio) {
      return res.status(404).json({ error: 'Laboratorio no encontrado' });
    }

    await laboratorio.update({ nombre_laboratorio, ubicación, capacidad });
    res.status(200).json({ message: 'Laboratorio actualizado exitosamente', laboratorio });
  } catch (error) {
    console.error('Error al actualizar el laboratorio:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Eliminar un laboratorio
router.delete('/:id_laboratorio', async (req, res) => {
  const { id_laboratorio} = req.params;

  try {
    const laboratorio = await Laboratorio.findByPk(id_laboratorio);
    

    if (!laboratorio) {
      return res.status(404).json({ error: 'Laboratorio no encontrado' });
    }

    await Turno.destroy({ where: { id_laboratorio } });
    await Laboratorio.destroy({ where: { id_laboratorio } });
    res.status(200).json({ message: 'Laboratorio eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar el laboratorio:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

module.exports = router;