const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Middleware para verificar el token
router.post("/", (req, res) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ error: "Token de acceso requerido" });
  }

  const token = authHeader.split(' ')[1]; // "Bearer <token>"

  if (!token) {
    return res.status(401).json({ error: "Token no proporcionado" });
  }

  // Verificación del token
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      console.log("token expirado")
      return res.status(403).json({ error: "Token inválido o expirado" });
    }

    // Token válido
    res.status(200).json({ message: "Token válido", decoded });
  });
});

module.exports = router;