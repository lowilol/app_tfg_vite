import React, { useState } from "react";
import "../ModalStyle.css";
import AlertResponse  from "./alert"
const DetailsLabModel = ({ laboratorio, onClose, onDelete, onUpdate,errorMensage }) => {
   const [isEditing, setIsEditing] = useState(false);
   const [newCapacidad, setNewCapacidad] = useState(laboratorio.capacidad || "");

   if (!laboratorio) return null;

   const handleDelete = () => {
      if (window.confirm("¿Estás seguro de que deseas eliminar este laboratorio?")) {
         onDelete(laboratorio.id_laboratorio); // Llama a la función de eliminación
      }
   };

   const handleUpdate = () => {
    console.log(laboratorio)
    onUpdate(laboratorio.id_laboratorio, {
       capacidad: newCapacidad
    });
    setIsEditing(false); // Finaliza el modo de edición
 };

   return (
      <div className="laboratorio-modal-overlay" onClick={onClose}>
         
         <div className="laboratorio-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="laboratorio-modal-close" onClick={onClose}>
               &times;
            </button>
            <h3>Detalles del Laboratorio</h3>
            <AlertResponse mensage={errorMensage} color={"failure"}/>
            <div className="laboratorio-details">
               {!isEditing ? (
                  <>
                     <div className="detail-row">
                        <span className="detail-label">Nombre:</span>
                        <span className="detail-value">{laboratorio.nombre_laboratorio || "N/A"}</span>
                     </div>
                     <div className="detail-row">
                        <span className="detail-label">Ubicación:</span>
                        <span className="detail-value">{laboratorio.ubicación || "N/A"}</span>
                     </div>
                     <div className="detail-row">
                        <span className="detail-label">Capacidad:</span>
                        <span className="detail-value">{laboratorio.capacidad || "N/A"}</span>
                     </div>
                     <div className="detail-row">
                        <span className="detail-label">Capacidad Ocupada:</span>
                        <span className="detail-value">{laboratorio.capacidad_ocupada || "0"}</span>
                     </div>
                  </>
               ) : (
                  <>
                     <div className="detail-row">
                        <label className="detail-label" htmlFor="capacidad">
                           Capacidad:
                        </label>
                        <input
                           type="number"
                           id="capacidad"
                           value={newCapacidad}
                           onChange={(e) => setNewCapacidad(e.target.value)}
                           min="1"
                        />
                     </div>
                  </>
               )}
            </div>

            <div className="laboratorio-actions">
               {!isEditing ? (
                  <>
                     <button className="btn-edit" onClick={() => setIsEditing(true)}>
                        Editar
                     </button>
                     <button className="btn-delete" onClick={handleDelete}>
                        Eliminar
                     </button>
                  </>
               ) : (
                  <>
                     <button className="btn-save" onClick={handleUpdate}>
                        Guardar Cambios
                     </button>
                     <button className="btn-cancel" onClick={() => setIsEditing(false)}>
                        Cancelar
                     </button>
                  </>
               )}
            </div>
         </div>
      </div>
   );
};

export default DetailsLabModel ;