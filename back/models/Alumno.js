const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const Usuario = require('./User');

const Alumno = sequelize.define('Alumno', {
    id_alumno: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: Usuario,
            key: 'id_user'
        }
    },
    matricula: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'alumno',
    timestamps: false
});

// Relación: Alumno hereda de Usuario
Alumno.belongsTo(Usuario, { foreignKey: 'id_alumno', as: 'alumno' });

module.exports = Alumno;