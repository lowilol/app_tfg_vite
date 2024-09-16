
const Token = require('../models/Token');

// Función para guardar un token en la base de datos
const saveToken = async (token) => {
  try {
    await Token.create({ token });
    console.log("Token guardado en la base de datos MySQL:", token);
  } catch (error) {
    console.error("Error al guardar el token en la base de datos MySQL:", error);
    throw new Error("Error guardando el token");
  }
};

module.exports = {
  saveToken
};