import React, { useState } from "react";
import "../ModalStyle.css";
import { formatDate, formatHour} from "./TimeFormat/FuntionTimeFormat";
import  {generateHourOptions}  from "./TimeFormat/FuntionTimeFormat";
import AlertResponse  from "./alert"
const DetailsTurnoModal = ({ turno, onClose, onDelete, onUpdate, onReserve, id_user, rol,ErrorMensageReserva }) => {
   const [isEditing, setIsEditing] = useState(false);
   const [newFecha, setNewFecha] = useState(turno.fecha || "");
   const [newHoraInicio, setNewHoraInicio] = useState(turno.hora_inicio || "");
   const [newHoraFin, setNewHoraFin] = useState(turno.hora_fin || "");
  


   if (!turno) return null;

   

   const laboratorioNombre = turno?.laboratorio?.nombre_laboratorio || "N/A";
   const capacidadTotal = turno?.laboratorio?.capacidad || "N/A";
   const capacidadOcupada = turno.capacidad_ocupada;
   const profesorNombre = turno?.profesor
      ? `${turno.profesor.usuario.FirstName} ${turno.profesor.usuario.LastName}`
      : "Desconocido";

   const isOwner = rol === "Profesor" && turno.id_profesor === id_user;
   const canReserve = rol === "Alumno" && capacidadOcupada < capacidadTotal;

   const handleDelete = () => {
      if (window.confirm("¿Estás seguro de que deseas eliminar este turno?")) {
         onDelete(turno.id_turno);
      }
   };

   const handleReserve = () => {
      onReserve(turno.id_turno);
      

   };

   

   const handleUpdate = () => {
      onUpdate(turno.id_turno, {
         fecha: newFecha,
         hora_inicio: newHoraInicio,
         hora_fin: newHoraFin,
      });
      setIsEditing(false);
   };

   return (
      <div className="turno-modal-overlay" onClick={onClose }>
         
         <div className="turno-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="turno-modal-close" onClick={onClose}>
               &times;
            </button>
            <h3>Detalles del Turno</h3>
            <div><AlertResponse mensage={ErrorMensageReserva } color={"failure"}/></div>
            
            <div className="turno-details">
               {!isEditing ? (
                  <>
                     <div className="detail-row">
                        <span className="detail-label">Laboratorio:</span>
                        <span className="detail-value">{laboratorioNombre}</span>
                     </div>
                     <div className="detail-row">
                        <span className="detail-label">Fecha:</span>
                        <span className="detail-value">{formatDate(turno.fecha) || "N/A"}</span>
                     </div>
                     <div className="detail-row">
                        <span className="detail-label">Hora Inicio:</span>
                        <span className="detail-value">{formatHour(turno.hora_inicio) || "N/A"}</span>
                     </div>
                     <div className="detail-row">
                        <span className="detail-label">Hora Fin:</span>
                        <span className="detail-value">{formatHour(turno.hora_fin) || "N/A"}</span>
                     </div>
                     <div className="detail-row">
                        <span className="detail-label">Profesor:</span>
                        <span className="detail-value">{profesorNombre}</span>
                     </div>
                     <div className="detail-row">
                        <span className="detail-label">Capacidad Total:</span>
                        <span className="detail-value">{capacidadTotal}</span>
                     </div>
                     <div className="detail-row">
                        <span className="detail-label">Capacidad Ocupada:</span>
                        <span className="detail-value">{capacidadOcupada}</span>
                     </div>
                  </>
               ) : (
                  <>
                     <div className="detail-row">
                        <label className="detail-label" htmlFor="fecha">
                           Fecha:
                        </label>
                        <input
                           type="date"
                           id="fecha"
                           value={newFecha}
                           onChange={(e) => setNewFecha(e.target.value)}
                        />
                     </div>
                     <div className="detail-row">
                        <label className="detail-label" htmlFor="horaInicio">
                           Hora Inicio:
                        </label>
                        <select
                           id="horaInicio"
                           value={newHoraInicio.split(":")[0]}
                           onChange={(e) => setNewHoraInicio(`${e.target.value}:00`)}
                           required
                        >
                           <option value="">Selecciona una hora</option>
                           {generateHourOptions(9, 21)}
                        </select>
                     </div>
                     <div className="detail-row">
                        <label className="detail-label" htmlFor="horaFin">
                           Hora Fin:
                        </label>
                        <select
                           id="horaFin"
                           value={newHoraFin.split(":")[0]}
                           onChange={(e) => setNewHoraFin(`${e.target.value}:00`)}
                           required
                        >
                           <option value="">Selecciona una hora</option>
                           {newHoraInicio
                              ? generateHourOptions(9, 21, parseInt(newHoraInicio.split(":")[0]))
                              : generateHourOptions(9, 21)}
                        </select>
                     </div>
                  </>
               )}
            </div>

            <div className="turno-actions">
               {isOwner && !isEditing && (
                  <>
                     <button className="btn-edit" onClick={() => setIsEditing(true)}>
                        Editar
                     </button>
                     <button className="btn-delete" onClick={handleDelete}>
                        Eliminar
                     </button>
                  </>
               )}
               {isEditing && (
                  <>
                     <button className="btn-save" onClick={handleUpdate}>
                        Guardar Cambios
                     </button>
                     <button className="btn-cancel" onClick={() => setIsEditing(false)}>
                        Cancelar
                     </button>
                  </>
               )}
               {canReserve && (
                  <button className="btn-reserve" onClick={handleReserve}>
                     Reservar
                  </button>
               )}
            </div>
         </div>
      </div>
   );
};

export default DetailsTurnoModal;