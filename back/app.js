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
    res.send('holis');
  });       


  
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});