import React from 'react'
import ReactDOM from 'react-dom/client'
import Login from "./rutas/login.jsx";
import Signup from "./rutas/signup.jsx";
import ChangerPassword from "./rutas/ChangerPassword.jsx";
import Profile from "./rutas/profile.jsx";
import Dashboard from "./rutas/dashboard.jsx";
import RequestPasssword from "./rutas/RequestPassword.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { AuthProvider } from "./auth/AuthProvider";

import ProtectedRoute from "./rutas/protectedRoute.jsx";



const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },

  {
    path: "/changerPassword/:token",
    element: <ChangerPassword />,
  },
  {
    path: "/requestPassword",
    element: <RequestPasssword />,
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "/dashboard/", // Aquí se define el parámetro token en la ruta
        element: <Dashboard />,
      },
      {
        path: "/me",
        element: <Profile />,
      },
    ],
  },
  
]);

const rootElement = document.getElementById('root');

if (rootElement) {

ReactDOM.createRoot(document.getElementById("root") ).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
}
else {
  console.error('No se encontró un elemento con el ID "root" en el DOM.');
}