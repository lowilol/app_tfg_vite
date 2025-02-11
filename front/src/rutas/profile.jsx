import '../styles/profile.css'; 

import { useState} from "react";

const Perfil = ({ usuario, onUpdate }) => {
    console.log(usuario)
    const [matricula, setMatricula] = useState(usuario.specificData || "");
    const [departamento, setDepartamento] = useState(usuario.specificData  || "");
    const id_user = usuario.dataValues.id_user
    const rol = usuario.dataValues.rol
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
            {matricula ? (
              <p>{matricula}</p> 
            ) : (
              <input
                value={matricula}
                onChange={(e) => setMatricula(e.target.value)}
                placeholder="Ingresa tu matrícula"
              />
            )}
          </div>
        )}
  
        {rol === "Profesor" && (
          <div>
            <label>Departamento:</label>
            {departamento ? (
              <p>{departamento}</p> 
            ) : (
              <input
                value={departamento}
                onChange={(e) => setDepartamento(e.target.value)}
                placeholder="Ingresa tu departamento"
              />
            )}
          </div>
        )}
  
        
        {(!matricula && rol === "Alumno") || (!departamento && rol === "Profesor") ? (
          <button onClick={handleUpdate}>Actualizar Perfil</button>
        ) : null}
      </div>
    );
  };
  
export default Perfil