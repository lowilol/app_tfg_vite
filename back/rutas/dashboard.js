const express = require("express");
const router = express.Router();
const { verifyAccessToken  } = require("../auth/verify");
const  Profesor  = require('../models/Profesor');
const  Alumno  = require('../models/Alumno');

const { emailExists, getUserByEmail} = require("../schema/user");
router.post("/", verifyAccessToken,async function (req, res, next) {
    
  const token = req.headers['authorization']?.split(' ')[1]; 
  const email = req.body.email

 
 
  const userEmailExists = await emailExists(email);

    if (!userEmailExists ) {
      return res.status(401).json(jsonResponse(401, { error: "El email no existe" }));
    }

  const user = await getUserByEmail(email);

  if (!token) {
    return res.status(401).json({ error: 'No autorizado, falta token' });
  }

  
      
  let missingData = null;
  const alumno = await Alumno.findOne({ where: { id_alumno: user.id_user } });
  const profesor = await Profesor.findOne({ where: { id_profesor: user.id_user } });
  let SpecificDateUser = null
  if (user.rol === "Alumno") {
    if (!alumno?.matricula) missingData = "matricula";
    else{SpecificDateUser=alumno?.matricula}
  } else if (user.rol === "Profesor") {   
    if (!profesor?.departamento) missingData = "departamento";
    else{SpecificDateUser=profesor?.matricula}
  }


  const {password:_ , ... publicUser} = user 

  res.json({  missingData ,publicUser: { ...publicUser, specificData: SpecificDateUser } });
      
  
});

module.exports = router;