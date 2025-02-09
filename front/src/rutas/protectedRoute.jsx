import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider'; // Importa el hook useAuth

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth(); // Obtén el estado de autenticación

  if (!isAuthenticated) {
    
    return <Navigate to="/"  />;
  }

  
  return <Outlet />;
};

export default ProtectedRoute;