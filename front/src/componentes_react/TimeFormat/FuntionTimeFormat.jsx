

 // Formatear hora para eliminar segundos
 export const formatHour = (hour) => hour.split(":").slice(0, 2).join(":");

 // Formatear fecha para mostrarla como día/mes/año
 export const formatDate = (date) => {
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
 };

 export const normalizarFecha = (fechaRaw) => {
   
   try {
     if (!fechaRaw || typeof fechaRaw !== "string") {
       throw new Error("La fecha proporcionada no es válida.");
     }
 
     // Dividir la fecha cruda en partes
     const [datePart, timePart] = fechaRaw.split("T");
     if (!datePart || !timePart) {
       throw new Error("Formato inesperado en la fecha.");
     }
 
     const [year, month, day] = datePart.split("-");
     
   if (!day || !year || !month) {
       throw new Error("Faltan datos en la parte de la fecha.");
     }
 
     const [time, _] = (timePart || "").split(".");
     const [hour, minute] = (time || "").split(":");
     
 
     // Validar que el mes y el año son válidos
     if (!month || !year || !hour || !minute) {
       throw new Error("Datos incompletos para construir la fecha.");
     }
 
     // Meses en español
     const meses = [
       "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
       "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
     ];
 
     // Obtener nombre del mes
     const mesNombre = meses[parseInt(month, 10) - 1] || "Mes desconocido";
 
     // Construir la fecha normalizada
     return `${parseInt(day, 10)} de ${mesNombre} de ${year}, ${hour}:${minute}`;
   } catch (error) {
     console.error("Error al normalizar la fecha:", error);
     return "Fecha no válida";
   }
 }

  export const generateHourOptions = (start, end, filterAfter = null) => {
  const options = [];
  for (let hour = start; hour <= end; hour++) {
     if (filterAfter !== null && hour <= filterAfter) continue;
     const hourString = hour < 10 ? `0${hour}` : `${hour}`;
     options.push(
        <option key={hour} value={`${hourString}`}>
           {hourString}:00
        </option>
     );
  }
  return options;
};