import React, { useState, useEffect } from 'react';

// Ejemplo de datos de reserva
const reservations = [
  { date: '2024-11-13', lab: 'Laboratorio A' },
  { date: '2024-11-14', lab: 'Laboratorio B' },
  { date: '2024-12-01', lab: 'Laboratorio C' },
  // Añade más reservas aquí
];

const Calendar = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [daysInMonth, setDaysInMonth] = useState([]);

  useEffect(() => {
    const days = generateDaysForMonth(selectedYear, selectedMonth);
    setDaysInMonth(days);
  }, [selectedYear, selectedMonth]);

  const generateDaysForMonth = (year, month) => {
    const date = new Date(year, month, 1);
    const days = [];
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  };

  const getReservationsForDay = (day) => {
    const dayString = day.toISOString().split('T')[0];
    return reservations.filter((res) => res.date === dayString);
  };

  return (
    <div className="calendar">
      <div className="calendar-controls">
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <option key={i} value={i}>
              {new Date(0, i).toLocaleString("default", { month: "long" })}
            </option>
          ))}
        </select>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(parseInt(e.target.value))}
        >
          {Array.from({ length: 5 }).map((_, i) => {
            const year = new Date().getFullYear() + i - 2; // Año actual +/- 2 años
            return (
              <option key={year} value={year}>
                {year}
              </option>
            );
          })}
        </select>
        <button className="calendar-button">Nuevo evento</button>
      </div>
      
      <div className="calendar-grid">
        {daysInMonth.map((day) => (
          <div key={day} className="calendar-day">
            <div className="day-number">{day.getDate()}</div>
            <div className="reservations">
              {getReservationsForDay(day).map((reservation, index) => (
                <div key={index} className="reservation">
                  {reservation.lab}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar