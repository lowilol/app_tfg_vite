const express = require('express');
const cors = require('cors');
const app = express();
const cookie = require("universal-cookie-express")
const session = require('express-session');

require('dotenv').config();


const port = process.env.PORT || 5000;


app.use(cors({ origin: ['http://localhost:3000', 'http://127.0.0.1:3000'], credentials: true ,}));
app.use(express.json());
app.use(cookie());
app.use(express.urlencoded({extended: false}));
app.use(
  session({
    secret: process.env.ACCESS_TOKEN_SECRET, // Cambia esto a un secreto seguro
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      secure: false, // Cambia a true si usas HTTPS en producción
      sameSite: 'lax', // Opcional: define 'strict' o 'none' según tus necesidades
    },
  })
);


app.use("/api/signup",require("./rutas/signup"));
app.use("/api/login",require("./rutas/login"));
app.use("/api/user",require("./rutas/user"));

app.use("/api/requestPasswordReset",require("./rutas/RequestChangePasswordEmail"));
app.use("/api/resetPassword",require("./rutas/passwordChanger"));
app.use("/api/verifyCode",require("./rutas/verifyCode"));
app.use("/api/dashboard",require("./rutas/dashboard"));
app.use("/api/laboratorio",require("./rutas/laboratorio"));
app.use("/api/turno",require("./rutas/turno"));
app.use("/api/reserva",require("./rutas/reserva"));
app.use("/api/reserva/cancelar",require("./rutas/reserva"));
//app.use("/api/signout",require("./rutas/signout"));
//app.use(/api/signup,require("./rutas/signup"));




   


  
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto  http://127.0.0.1:${port}/`);
});


/*

const sequelize = require('./config/connection');
const User = require('./models/User');
const { generateAccessToken, generateRefreshToken } = require('./auth/sign');
(async () => {
  try {
    // Autenticar la conexión
    await sequelize.authenticate();
    console.log('Conexión exitosa.');


    
    const Hash =  async (password) => {
      const saltRounds = 10;  // Número de rondas de sal, 10 es un valor recomendado
      const hash = await bcrypt.hash(password, saltRounds);  // Genera el hash
      return hash;
    };
    // Sincronizar el modelo con la base de datos
    await sequelize.sync(); // Esto crea la tabla si no existe
    const password = '123456';
   const  HashedPass = await Hash(password);
    // Insertar un usuario de prueba
   
   
    newUser = await User.create({
     
      email: 'preuba@gmail.com',
      FirstName: 'Nombre de Prueba', // Proporciona el valor para el campo 'name'
      LastName: 'Apellido de Prueba', 
      password: HashedPass, // Nota: en un caso real, asegúrate de encriptar las contraseñas
    });
    console.log("Nuevo usuario creado con ID:", newUser.id);
    


  } catch (error) {
    console.error('Error al interactuar con la base de datos:', error);
  }
})()

*/


