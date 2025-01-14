
import React, { useState } from 'react';
import '../../Dashboard.css';
import { formatDate, formatHour } from "../TimeFormat/FuntionTimeFormat";
const TurnoTable = ({ Turnos, handleRowClickTurno  }) => {
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedNombre, setSelectedNombre] = useState('');
  
    
   



    const filteredTurnos = Turnos.filter((turno) => {
        const laboratorioNombre = turno.laboratorio?.nombre_laboratorio.toLowerCase() || '';
        const fechaTurno = turno.fecha || '';
    
        const nombreMatch = selectedNombre ? laboratorioNombre.includes(selectedNombre.toLowerCase()) : true;
        const fechaMatch = selectedDate ? fechaTurno === selectedDate : true;
    
        return nombreMatch && fechaMatch;
      });
  
    return (
      <div className="table-container">
        <div className="filters">
          <input
            type="text"
            placeholder="Buscar por laboratorio"
            value={selectedNombre}
            maxLength={4}
            onKeyDown={(e) => {
                    if (!/^\d$/.test(e.key) && e.key !== 'Backspace') {
                      e.preventDefault();
                    }
                    
                  }}
            onChange={(e) => setSelectedNombre(e.target.value)}
            className="filter-input"
          />
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="filter-date"
          />
        </div>
  
       
        <table className="turnos-table">
          <thead>
            <tr>
              <th>Laboratorio</th>
              <th>Fecha</th>
              <th>Hora Inicio</th>
              <th>Hora Fin</th>
              <th>Ocupación</th>
            </tr>
          </thead>
          <tbody>
            {filteredTurnos.map((turno) => (
              <tr
                key={turno.id_turno}
                onClick={() => handleRowClickTurno(turno)}
                className="turno-row"
              >
                <td>{turno.laboratorio?.nombre_laboratorio || 'No disponible'}</td>
                <td>{formatDate(turno.fecha)}</td>
                <td>{formatHour(turno.hora_inicio)}</td>
                <td>{formatHour(turno.hora_fin)}</td>
                <td>{turno.capacidad_ocupada}</td>
              </tr>
            ))}
            
          </tbody>
        </table>
      </div>
    );
  };
  
  export default TurnoTable;