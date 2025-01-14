const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


const Incidencia = sequelize.define('Incidencia', {
    id_incidencia: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    incidencia: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'incidencia',
    timestamps: false
});


module.exports = Incidencia;