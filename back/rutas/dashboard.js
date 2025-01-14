const express = require("express");
const router = express.Router();
const { verifyAccessToken  } = require("../auth/verify");

router.get("/", async function (req, res, next) {
    // Obtén el token de acceso desde el encabezado de la solicitud
  const token = req.headers['authorization']?.split(' ')[1]; // "Bearer <token>"

  console.log(token)

  if (!token) {
    return res.status(401).json({ error: 'No autorizado, falta token' });
  }

  try {
    // Verifica y decodifica el token (asegúrate de implementar esta función)
    const decodedToken = await verifyAccessToken(token);
    console.log("Token decodificado:", decodedToken);

    // Verifica el rol del usuario y responde en consecuencia
    const userRole = decodedToken.rol;
    if (userRole === "Alumno") {
      return res.status(200).json({ response: 'Hola, soy Alumno' });
    } else if (userRole === "Docente") {
      return res.status(200).json({ response: 'Hola, soy Docente' });
    } else {
      return res.status(400).json({ error: 'Rol no reconocido' });
    }
  } catch (error) {
    console.error('Error al verificar el token:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
      

      
  
});

module.exports = router;