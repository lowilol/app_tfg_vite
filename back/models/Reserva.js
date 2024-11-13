const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const Usuario = require('./User');
const Laboratorio = require('./laboratorio');

const Reserva = sequelize.define('Reserva', {
    id_reserva: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fecha_reserva: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    hora_inicio: {
        type: DataTypes.TIME,
        allowNull: false
    },
    hora_fin: {
        type: DataTypes.TIME,
        allowNull: false
    },
    estado: {
        type: DataTypes.ENUM('pendiente', 'confirmada', 'cancelada'),
        allowNull: false
    }
}, {
    tableName: 'reservas'
});

// Relaciones
Reserva.belongsTo(Usuario, { foreignKey: 'id_usuario' });
Reserva.belongsTo(Laboratorio, { foreignKey: 'id_laboratorio' });

module.exports = Reserva;