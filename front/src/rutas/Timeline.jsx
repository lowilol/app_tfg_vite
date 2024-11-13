export default function Timeline() {
    
    return (
      
        <div className="timeline">
        <div className="timeline-filters">
          <select>
            <option>Próximos 7 días</option>
            <option>Próximos 30 días</option>
          </select>
          <select>
            <option>Ordenar por fecha</option>
            <option>Ordenar por laboratorio</option>
          </select>
          <input type="text" placeholder="Buscar por laboratorio o actividad" />
        </div>
        <div className="timeline-item">
          <p>miércoles, 13 de noviembre de 2024</p>
          <a href="#" className="timeline-link">Reserva de Laboratorio A</a>
          <span className="timeline-details">Hora: 10:00 - 12:00</span>
        </div>
      </div>
    
 
  
    );
  
  
  }