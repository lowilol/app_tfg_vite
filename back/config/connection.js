const { Sequelize } = require('sequelize');
require('dotenv').config();

// Crear una instancia de Sequelize para la conexión
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  port: 3306,
  dialect: 'mysql',
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('La conexión a la base de datos se ha establecido correctamente.');
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
  }
})();

module.exports = sequelize;


















 