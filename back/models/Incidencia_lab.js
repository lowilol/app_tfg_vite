const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

const Incidencia_lab= sequelize.define('LaboratorioIncidencia', {
    id_laboratorio: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'Laboratorios',
            key: 'id_laboratorio'
        }
    },
    id_incidencia: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'Incidencias',
            key: 'id_incidencia'
        }
    },
    fecha_asociacion: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW 
    }
}, {
    tableName: 'laboratorio_incidencia',
    timestamps: false
});

module.exports = Incidencia_lab;