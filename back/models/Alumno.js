const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const Usuario = require('./User');

//const Reserva = require('./Reserva');
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
})

// Relación: Alumno hereda de Usuario
Usuario.hasOne(Alumno, { foreignKey: 'id_user', as: 'alumno' });
Alumno.belongsTo(Usuario, { foreignKey: 'id_user', as: 'usuario' });

//Reserva.hasMany( Alumno, { foreignKey: 'id_alumno', as: 'reservas' });
module.exports = Alumno;