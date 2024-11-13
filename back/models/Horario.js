const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const Laboratorio = require('./laboratorio');

const Horario = sequelize.define('Horario', {
    id_horario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    dia_semana: {
        type: DataTypes.STRING,
        allowNull: false
    },
    hora_apertura: {
        type: DataTypes.TIME,
        allowNull: false
    },
    hora_cierre: {
        type: DataTypes.TIME,
        allowNull: false
    }
}, {
    tableName: 'horarios'
});

// Relación
Horario.belongsTo(Laboratorio, { foreignKey: 'id_laboratorio' });

module.exports = Horario;