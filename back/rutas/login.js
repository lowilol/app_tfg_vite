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
      //return next(new Error("username and password are required"));
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
   
    // Si el email existe y la contraseña es correcta, generamos los tokens
    const accessToken = await  createAccessToken(email);
    console.log({ accessToken});
/* 

    const oneHour = 120 * 60 * 1000; // Tiempo en milisegundos para 1 hora
    const expirationDate = new Date(Date.now() + oneHour); 
    
    
   console.log(expirationDate)
     res.cookie('access_token', accessToken, {
      httpOnly: true,  // No accesible desde JavaScript en el navegado
      sameSite: 'lax',  // Previene ataques CSRF 
      secure:  true,        //process.env.NODE_ENV === 'production',   Solo por HTTPS en producción
      priority:"Medium",
      maxAge: oneHour,
      expires: expirationDate,
      
       
    });*/
    const user = await getUserByEmail(email);
    req.session.user = getUserInfo(user);

    const usuario = req.session.user;
    //res.redirect('/dashboard');

    console.log("----------------------------------");
    console.log(user);
    console.log("----------------------------------");
    console.log(getUserInfo(user));
    console.log("----------------------------------");
    console.log(usuario);

    const {password:_ , ... publicUser} = user

     
    
   

    // Devolver la respuesta con la información del usuario
    return res.status(200).json({ publicUser, accessToken  });
    
  } catch (err) {
    console.log(err);
    return res.status(500).json(jsonResponse(500, { error: "Error interno del servidor" }));
  }
});








module.exports = router;