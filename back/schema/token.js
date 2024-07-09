const mysql = require("mysql");

// Configuración de la conexión a la base de datos MySQL
const connection = require('./connection');

// Función para guardar un token en la base de datos
const saveToken = async (token) => {
  try {
    await new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO tokens (token) VALUES (?)",
        [token],
        (err, results) => {
          if (err) {
            reject(err);
            return;
          }
          console.log("Token guardado en la base de datos MySQL:", token);
          resolve();
        }
      );
    });
  } catch (error) {
    console.error("Error al guardar el token en la base de datos MySQL:", error);
    throw new Error("Error guardando el token");
  }
};

module.exports = {
  saveToken
};