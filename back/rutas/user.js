const express = require("express");
const router = express.Router();
const { verifyAccessToken } = require("../auth/verify"); // Middleware para verificar el token
const User = require("../models/User"); 

router.get("/",verifyAccessToken ,async function (req, res, next) {
  try {
    const userId = req.user.id; // ID del usuario extraído del token

    // Obtiene la información del usuario de la base de datos
    const user = await User.findByPk(userId, {
      attributes: ["id", "email", "FirstName", "LastName", "rol"], // Selecciona solo los campos necesarios
    });

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Responde con la información del usuario
    res.status(200).json({
      body: {
        id: user.id,
        email: user.email,
        FirstName: user.FirstName,
        LastName: user.LastName,
        rol: user.rol,
      },
    });
  } catch (error) {
    console.error("Error obteniendo la información del usuario:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

module.exports = router;