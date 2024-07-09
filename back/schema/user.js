const bcrypt = require("bcrypt");
const mysql = require("mysql");
const { generateAccessToken, generateRefreshToken } = require("../auth/sign");
const getUserInfo = require("../lib/getUserInfo");

// Configuración de la conexión a la base de datos MySQL
const connection = require('./connection');
// Función para encriptar la contraseña
const hashPassword = async (password) => {
  return bcrypt.hash(password, 10);
};

// Función para verificar si el nombre de usuario existe en la base de datos
const usernameExists = async (username) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT COUNT(*) AS count FROM users WHERE username = ?",
      [username],
      (err, results) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(results[0].count > 0);
      }
    );
  });
};

// Función para verificar si la contraseña es correcta
const isCorrectPassword = async (username, password) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT password FROM users WHERE username = ?",
      [username],
      (err, results) => {
        if (err) {
          reject(err);
          return;
        }
        if (results.length === 0) {
          resolve(false); // Usuario no encontrado
          return;
        }
        const hash = results[0].password;
        bcrypt.compare(password, hash, (err, same) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(same);
        });
      }
    );
  });
};

// Función para crear un token de acceso
const createAccessToken = async (username) => {
  const userInfo = await getUserInfo(username);
  return generateAccessToken(userInfo);
};

// Función para crear un token de actualización
const createRefreshToken = async (username) => {
  const userInfo = await getUserInfo(username);
  const refreshToken = generateRefreshToken(userInfo);
  try {
    await new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO tokens (token) VALUES (?)",
        [refreshToken],
        (err, results) => {
          if (err) {
            reject(err);
            return;
          }
          console.log("Token guardado en la base de datos MySQL:", refreshToken);
          resolve();
        }
      );
    });
    return refreshToken;
  } catch (error) {
    console.error("Error al guardar el token en la base de datos MySQL:", error);
    throw new Error("Error creando el token");
  }
};

// Función para verificar si un token de actualización existe en la base de datos
const verifyRefreshToken = async (token) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT COUNT(*) AS count FROM tokens WHERE token = ?",
      [token],
      (err, results) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(results[0].count > 0);
      }
    );
  });
};

module.exports = {
  usernameExists,
  isCorrectPassword,
  createAccessToken,
  createRefreshToken,
  verifyRefreshToken
};