const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "192.168.1.138",
    user: "primigenio",
    password: "contraseniatfg",
    database: "mysql"
  });
  
  
  
  connection.connect((err) => {
    if (err) {
      console.error("Error al conectar a la base de datos MySQL:", err);
      return;
    }
    console.log("Conexión establecida con la base de datos MySQL");
  });
  
  module.exports = connection;















 