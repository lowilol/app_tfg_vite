const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

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
    },
    
}, {
    tableName: 'laboratorio'
});

module.exports = laboratorio;