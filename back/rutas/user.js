const express = require("express");
const router = express.Router();
const { verifyAccessToken } = require("../auth/verify");
const Alumno = require("../models/Alumno");
const Profesor = require("../models/Profesor");


router.put("/updateProfile", verifyAccessToken, async (req, res) => {
   const user  = req.body;
   console.log(user.id_user.id_user)
    const matricula = user.id_user.matricula
    const departamento  = user.id_user.departamento 
    const rol = user.id_user.rol
   
    
   try {
      if (rol === "Alumno") {
         await Alumno.update({ matricula }, { where: { id_alumno: user.id_user.id_user } });
         return res.status(200).json({ message: "Matrícula actualizada correctamente." });
      } 
      if (rol === "Profesor") {
         await Profesor.update({ departamento }, { where: { id_profesor: user.id_user.id_user  } });
         return res.status(200).json({ message: "Departamento actualizado correctamente." });
      }

      return res.status(400).json({ error: "Rol no reconocido." });
   } catch (error) {
      console.error("Error al actualizar el perfil:", error);
      res.status(500).json({ error: "Error interno del servidor." });
   }
});

module.exports = router;