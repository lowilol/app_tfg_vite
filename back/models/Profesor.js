const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const Usuario = require('./User');

const Profesor = sequelize.define('Profesor', {
    id_profesor: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: Usuario,
            key: 'id_user'
        }
    },
    departamento: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'profesor',
    timestamps: false
});

// Relación: Profesor hereda de Usuario
Profesor.belongsTo(Usuario, { foreignKey: 'id_profesor', as: 'usuario' });

module.exports = Profesor;