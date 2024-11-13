const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

const User =  sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true, 
    primaryKey: true,    
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
      isDomainValid(value) {
          if (!/@(alumno\.)?upm\.es$/.test(value)) {
              throw new Error('El correo debe ser de dominio UPM');
          }
      }
    }
  },
  FirstName: {
    type: DataTypes.STRING,
    allowNull: false, 
  },
  LastName: {
    type: DataTypes.STRING,
    allowNull: false, 
  },
  rol: {
    type: DataTypes.STRING,
    allowNull: false, 
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  
}, {
  
  
    tableName: 'users', // Nombre de la tabla en la base de datos
    timestamps: false,  // Desactiva las columnas createdAt y updatedAt
});



 


module.exports = User;