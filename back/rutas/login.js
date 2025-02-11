const express = require("express");
const { emailExists, isCorrectPassword, createAccessToken,getUserByEmail} = require("../schema/user");  // Importa las funciones adicionales
const { jsonResponse } = require("../lib/jsonResponse");
const router = express.Router();
const {getUserInfo} = require("../lib/getUserInfo");


router.post("/", async function (req, res, next) {
  
  const  email   = req.body.email;
  const password = req.body.password;
  

  
  try {
 
    if (  !password || !email) {
      
      return res.status(409).json(
        jsonResponse(409, {
          error: "se requiere relenar todos lo parametros ",
        })
      );
    }
    
    const userEmailExists = await emailExists(email);

    if (!userEmailExists ) {
      return res.status(401).json(jsonResponse(401, { error: "El email no existe" }));
    }

    

    

    const passwordCorrect = await isCorrectPassword(email, password);

    if (!passwordCorrect) {
      return res.status(401).json(jsonResponse(401, { error: "Contraseña incorrecta" }));
    }
   
    
    const accessToken = await  createAccessToken(email);
    console.log({ accessToken});


    
    
   
     res.cookie('access_token', accessToken, {
      httpOnly: false,  
      sameSite: 'lax',  
      secure:  true,        
      priority:"Medium",
      maxAge: 3600000,
      
      
       
    });
    const user = await getUserByEmail(email);
    req.session.user =  accessToken;

   
    const {password:_ , ... publicUser} = user

     
    
   

    // Devolver la respuesta con la información del usuario
    return res.status(200).json({ publicUser, accessToken  });
    
  } catch (err) {
    console.log(err);
    return res.status(500).json(jsonResponse(500, { error: "Error interno del servidor" }));
  }
});








module.exports = router;