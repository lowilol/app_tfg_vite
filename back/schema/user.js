const bcrypt = require("bcrypt");
const { generateAccessToken,generateResetPasswordToken } = require("../auth/sign");
const {getUserInfo} = require("../lib/getUserInfo");
const User = require("../models/User");
const sequelize = require('../config/connection');

const Alumno= require("../models/Alumno");
const Profesor= require("../models/Profesor");



const Rol_ = (dominio) =>{
   var rol = null
  if (dominio === "@alumnos.upm.es") {
    rol ="Alumno";
    return rol
  } else if(dominio === "@upm.es") {
    rol ="Docente";  
    return rol
  }
  else{ 
    return res.status(500).json(
    jsonResponse(500, {
      error: "correo invalido",
    })
  );
}

}
 
const extraerDominioCorreo = async(correo)=> {
  // Dividir el correo en dos partes: el nombre y el dominio
  const partesCorreo = correo.split('@');
  
  // Si el correo está mal formado y no tiene '@', retornamos null
  if (partesCorreo.length !== 2) {
    return null; // Maneja casos de correos inválidos
  }
  
  // Obtener la parte del dominio
  const dominio = '@' + partesCorreo[1];

  // Retornar el dominio completo
  return dominio;
}

const crearUsuario = async(lastname, password, name, email,rol)=>{

  try {
          
    await sequelize.authenticate();
    console.log('Conexión exitosa.');

    
    
    // Sincronizar el modelo con la base de datos
    await sequelize.sync(); // Esto crea la tabla si no existe
    
    const HashedPass =  await  hashPassword(password);
    // Insertar un usuario de prueba
   
   console.log(rol)
    newUser = await User.create({
     
      email: email,
      FirstName: name, 
      LastName: lastname, 
      rol:rol,
      password: HashedPass, 
    });
    console.log("Nuevo usuario creado con ID:", newUser.id);
     if (rol === "Alumno") 
      {
        const newAlumno = await Alumno.create({ 
          id_alumno:newUser.id_user,
          matricuala:null,
          id_user:newUser.id_user
        });
        console.log("Nuevo Alumno creado con ID:", newAlumno.id);
          
      }

     else if (rol === "Profesor" ) {
      const newProfesor = await Profesor.create({ 
        id_profesor:newUser.id,
        departamento:null,
        id_user:newUser.id
      });

      console.log("Nuevo Profesor creado con ID:", newProfesor.id);
     }


  } catch (error) {
    console.error('Error al interactuar con la base de datos:', error);
  }

}
// Función para encriptar la contraseña
const hashPassword = async (password) => {
  const saltRounds = 10;  // Número de rondas de sal, 10 es un valor recomendado
      const hash = await bcrypt.hash(password, saltRounds);  // Genera el hash
      return hash;
};

// Función para verificar si el nombre de usuario existe en la base de datos
const emailExists = async (email) => {
  console.log("--"+User+"--");
  const user = await getUserByEmail (email);

  return !!user; // Devuelve true si se encuentra el usuario, false si no.
};


// Función para verificar si el nombre de usuario existe en la base de datos
const UserExists = async (FirstName, LastName) => {
  console.log("--"+User+"--");
  const userexist = await getUser(FirstName,LastName) ;


  return !!userexist; // Devuelve true si se encuentra el usuario, false si no.
};

const getUserByEmail = async(email)=>{

  return await User.findOne({ where: { email } });
}

const getUser = async(FirstName, LastName)=>{

  return await User.findOne({  where: { FirstName} &&  { LastName} });
}


// Función para verificar si la contraseña es correcta
const isCorrectPassword = async (email, password) => {
  const user =await getUserByEmail (email);
  if (!user) {
    return false; // Usuario no encontrado
  }

  const hash = user.password;
  return bcrypt.compare(password, hash);
};

// Función para crear un token de acceso
const createAccessToken = async (email) => {
  const user = await getUserByEmail(email);
  const userInfo = getUserInfo(user);
  return await generateAccessToken(userInfo);
};



const createResetPasswordToken = async (email) => {
  const user =  await getUserByEmail(email);
  const userInfo = getUserInfo(user);
  console.log(userInfo);
  const ResetPasswordToken = await generateResetPasswordToken(userInfo);
  return ResetPasswordToken ;
};

async function updatePassword(userId, newPassword) {
  try {
   
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const updatedUser = await User.update(
      { password: hashedPassword }, 
      { where: { id: userId } }     
    );

    // Verifica si la actualización fue exitosa
    if (updatedUser[0] === 0) { 
      throw new Error('No se pudo actualizar la contraseña. Usuario no encontrado.');
    }

    return true; 
  } catch (error) {
    console.error('Error al actualizar la contraseña:', error);
    throw error; 
  }
}

module.exports = {
  Rol_,
  crearUsuario,
  extraerDominioCorreo,
  emailExists,
  getUserByEmail,
  isCorrectPassword,
  createAccessToken,
  createResetPasswordToken,
  hashPassword,
  UserExists,
  getUser,
  updatePassword 
};