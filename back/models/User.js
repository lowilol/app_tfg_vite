const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

const User = sequelize.define('User', {
  user_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true, // Permite que el valor se incremente automáticamente
    primaryKey: true,    // Marca este campo como clave primaria
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false, // Este campo es obligatorio
  },
}, {
    tableName: 'users', // Nombre de la tabla en la base de datos
    timestamps: false,  // Desactiva las columnas createdAt y updatedAt
});

module.exports = User;