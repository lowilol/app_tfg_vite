import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';


import Timeline from './Timeline';
import RecentLaboratories from './Laboratorio_card';
import Calendar from './Calendar';
import '../Dashboard.css'; // Agrega estilos personalizados aquí



export default function Dashboard() {
   const [message, setMessage] = useState("");
   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [rol, setRol] = useState("");
   const [error, setError] = useState("");
   const { isAuthenticated, logout } = useAuth(); // Añade logout aquí
   const navigate = useNavigate();

   useEffect(() => {
      if (!isAuthenticated) {
         navigate('/');
         return;
      }
      
      const userDataRaw = sessionStorage.getItem('user');
      const accessToken = sessionStorage.getItem('accessToken');
      if (userDataRaw) {
         try {
            const userData = JSON.parse(userDataRaw);
            setName(userData.FirstName + " " + userData.LastName)
            setEmail(userData.Email)
            setRol(userData.Rol)
            fetchDashboardMessage(accessToken);
            console.log(userData)
         } catch (error) {
            console.error("Error al parsear user data:", error);
            setError("Error al recuperar los datos del usuario");
         }
      } else {
         setError("No se encontró la información del usuario en sessionStorage.");
      }
   }, [isAuthenticated, navigate]);

   const fetchDashboardMessage = async (accessToken) => {
      try {
         const response = await fetch('http://localhost:5000/api/dashboard', {
            method: 'GET',
            headers: {
               'Content-Type': 'application/json',
               'Authorization': `Bearer ${accessToken}`,
            }
         });

         const data = await response.json();
         if (response.ok) {
            setMessage(data.response);
         } else {
            setError(data.error || "Error obteniendo el mensaje");
         }
      } catch (error) {
         console.error('Error al obtener datos del dashboard:', error);
         setError("Error de conexión con el servidor");
      }
   };

   const handleLogout = () => {
      logout();
      navigate('/'); // Redirige a la página de inicio de sesión
   };

   return (
      <div>
         {error ? <p style={{ color: 'red' }}>{error}</p> : <p>{message}</p>}
         {name && email && rol && (
            <div>
               <p>Nombre: {name}</p>
               <p>Email: {email}</p>
               <p>Rol: {rol}</p>
            </div>
         )}
         <button onClick={handleLogout}>Cerrar sesión</button> {/* Botón de logout */}


         <div className="dashboard">
      <header className="dashboard-header">
        <h1>¡Hola, USUARIO! 👋</h1>
      </header>
      <div className="timeline-section">
        <h2>Línea de tiempo</h2>
        <Timeline />
      </div>
      <div className="recent-laboratories-section">
        <h2>Laboratorios a los que se ha accedido recientemente</h2>
        <RecentLaboratories />
      </div>
      <div className="calendar-section">
        <h2>Calendario</h2>
        <Calendar />
      </div>
    </div>

      </div>



   );
}