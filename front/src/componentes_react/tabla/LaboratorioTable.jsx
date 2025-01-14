import React, { useState } from 'react';
import '../../Dashboard.css';



const LaboratorioTable = ({ Laboratorios , handleRowClickLab }) => {
  const [selectedBloque , setSelectedBloque] = useState('');
  const [selectedNombre, setSelectedNombre] = useState('');
  
 
  const filteredLaboratorios = Laboratorios.filter((laboratorio) => {
    const bloqueLaboratorio = laboratorio.ubicación.toLowerCase();
    const nombreLaboratorio = laboratorio.nombre_laboratorio.toLowerCase();

    const bloqueMatch = selectedBloque ? bloqueLaboratorio.includes(selectedBloque.toLowerCase()) : true;
    const nombreMatch = selectedNombre ? nombreLaboratorio.includes(selectedNombre.toLowerCase()) : true;

    return bloqueMatch && nombreMatch;
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
                  onChange={(e) => {

                      setSelectedNombre(e.target.value); 
                  }}
                  className="filter-input"
              />

              <select
                  value={selectedBloque}
                  onChange={(e) => setSelectedBloque(e.target.value)}
                  className="filter-select"
              >
                  <option value="">Todas las ubicaciones</option>
                    {Array.from(new Set(Laboratorios.map((lab) => lab.ubicación))).map((ubicacion, index) => (
                        <option key={index} value={ubicacion}>
                            {ubicacion}
                        </option>
                    ))}
                </select>
            </div>

            <table className="turnos-table">
                <thead>
                    <tr>
                        <th>Laboratorio</th>
                        <th>Ubicación</th>
                        <th>Capacidad</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredLaboratorios.map((laboratorio) => (
                        <tr key={laboratorio.id_laboratorio} className="turno-row" onClick={() => handleRowClickLab(laboratorio)}>
                            <td>{laboratorio.nombre_laboratorio || "No disponible"}</td>
                            <td>{laboratorio.ubicación || "No disponible"}</td>
                            <td>{laboratorio.capacidad}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default LaboratorioTable;