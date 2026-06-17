import '../styles/profile.css'; 

import { useState,useEffect } from "react";

const Perfil = ({ usuario, onUpdate }) => {
 
   console.log(usuario)
 

 




    console.log(usuario)
    const initialData = usuario.specificData ? usuario.specificData.toString() : "";
    const [matricula, setMatricula] = useState(initialData);
    const [departamento, setDepartamento] = useState(initialData);
    const id_user = usuario.dataValues.id_user
    const rol = usuario.dataValues.rol

    console.log(id_user);
    console.log(departamento);
    console.log(matricula);

    const handleUpdate = () => {
      onUpdate({ id_user , rol,matricula, departamento });
    };
  
    return ( 
        <div className="perfil-container">
        <h3>Información del Perfil</h3>
  
        <div>
          <label>Nombre:</label>
          <p>{usuario.dataValues.FirstName} {usuario.dataValues.LastName}</p>
        </div>
  
        <div>
          <label>Correo:</label>
          <p>{usuario.dataValues.email}</p>
        </div>
  
        {rol === "Alumno" && (
            <div>
            <label>Matrícula:</label>
            <input
                type="text"
                value={matricula}
                onChange={(e) => setMatricula(e.target.value)}
                placeholder="Ingresa tu matrícula"
            />
        </div>
        )}
  
        {rol === "Profesor" && (
           <div>
           <label>Departamento:</label>
           <input
               type="text"
               value={departamento}
               onChange={(e) => setDepartamento(e.target.value)}
               placeholder="Ingresa tu departamento"
           />
       </div>
        )}
  
        
       
          <button onClick={handleUpdate}>Actualizar Perfil</button>
       
      </div>
    );
  };
  
export default Perfil