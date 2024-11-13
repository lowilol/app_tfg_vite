const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const laboratorio = sequelize.define('Laboratorio', {
    id_laboratorio: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre_laboratorio: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ubicación: {
        type: DataTypes.STRING,
        allowNull: false
    },
    capacidad: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'laboratorios'
});

module.exports = laboratorio;