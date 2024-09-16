const express = require('express');
const cors = require('cors');
const app = express();
const MySQL = require('mysql');


require('dotenv').config();


const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/signup",require("./rutas/signup"));
app.use("/api/login",require("./rutas/login"));
app.use("/api/user",require("./rutas/user"));
app.use("/api/refreshToken",require("./rutas/refreshToken"));
//app.use("/api/signout",require("./rutas/signout"));
//app.use(/api/signup,require("./rutas/signup"));


app.get('/', (req, res) => {
    res.send('pag raiz comprobando');
  });       


  
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto  http://127.0.0.1:${port}/`);
});






const sequelize = require('./config/connection');
const User = require('./models/User');

(async () => {
  try {
    // Autenticar la conexión
    await sequelize.authenticate();
    console.log('Conexión exitosa.');

    // Sincronizar el modelo con la base de datos
    await sequelize.sync(); // Esto crea la tabla si no existe

    // Insertar un usuario de prueba
    const newUser = await User.create({
      username: 'pruebaUsuario',
      password: '123456', // Nota: en un caso real, asegúrate de encriptar las contraseñas
      name: 'Nombre de Prueba' // Proporciona el valor para el campo 'name'
    });

    console.log('Nuevo usuario creado:', newUser);

  } catch (error) {
    console.error('Error al interactuar con la base de datos:', error);
  }
})()