const bcrypt = require("bcrypt");
const { generateAccessToken, generateRefreshToken } = require("../auth/sign");
const getUserInfo = require("../lib/getUserInfo");
const User = require("../models/User");
const Token = require("../models/Token");

// Función para encriptar la contraseña
const hashPassword = async (password) => {
  return bcrypt.hash(password, 10);
};

// Función para verificar si el nombre de usuario existe en la base de datos
const usernameExists = async (username) => {
  const user = await User.findOne({ where: { username } });
  return !!user; // Devuelve true si se encuentra el usuario, false si no.
};

// Función para verificar si la contraseña es correcta
const isCorrectPassword = async (username, password) => {
  const user = await User.findOne({ where: { username } });
  if (!user) {
    return false; // Usuario no encontrado
  }

  const hash = user.password;
  return bcrypt.compare(password, hash);
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
    await Token.create({ token: refreshToken });
    console.log("Token guardado en la base de datos MySQL:", refreshToken);
    return refreshToken;
  } catch (error) {
    console.error("Error al guardar el token en la base de datos MySQL:", error);
    throw new Error("Error creando el token");
  }
};

// Función para verificar si un token de actualización existe en la base de datos
const verifyRefreshToken = async (token) => {
  const tokenEntry = await Token.findOne({ where: { token } });
  return !!tokenEntry; // Devuelve true si se encuentra el token, false si no.
};

module.exports = {
  usernameExists,
  isCorrectPassword,
  createAccessToken,
  createRefreshToken,
  verifyRefreshToken
};