
import React, { useContext, createContext, useState, useEffect } from "react";

const AuthContext = createContext({
  isAuthenticated: false,
  getAccessToken: () =>({}),
  ObtainAccessToken: () => {},
  setAccessToken: (_accessToken) => {},
  saveUser: (_userData) => {},
  getUser: () => ({}),
  signout: () => {},
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const [accessToken, setAccessToken] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isloading, setIsLoading] = useState(true);

  function getAccessToken() {
    
    const cookieString = document.cookie
    .split("; ")
    .find((row) => row.startsWith("access_token="));
  return cookieString ? cookieString.split("=")[1] : null;
  }

  function saveUser(userData) {

    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    setIsAuthenticated(true);
  }

  function ObtainAccessToken(accessToken) {
   
  // Actualiza los estados locales
  setAccessToken(accessToken);;
  }

  function getUser() {
    return user;
  }

  const logout = () =>{
   // Elimina el usuario de localStorage al cerrar sesión
   sessionStorage.removeItem('user');
   sessionStorage.removeItem('accessToken');
   localStorage.removeItem("user");
   setUser(null);
   setIsAuthenticated(false);

  }

  async function checkAuth() {
    try {
      const storedUser = localStorage.getItem('user');
      
      const storedAccessToken = sessionStorage.getItem("accessToken");
      console.log(storedAccessToken)
      if (storedAccessToken) {
         setUser(JSON.parse(storedUser));
         setIsAuthenticated(true);
      }else{
        logout()
      }
    } catch (error) {
      console.log("Error en la autenticación:", error);
      signout(); // En caso de error, también se termina sesión
    } finally {
      setIsLoading(false);
    }
  }
   

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        getAccessToken,
        ObtainAccessToken,
        saveUser,
        getUser,
        logout,
      }}
    >
      {isloading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
}

async function retrieveUserInfo(accessToken) {
  try {
    const response = await fetch("http://localhost:5000/api/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.ok) {
      const json = await response.json();
      console.log(json);
      return json.body;
    }else {
      throw new Error("Error retrieving user info");
    }
  } 
   catch (error) {console.error("Failed to retrieve user info:", error);
    return null;}
}

export const useAuth = () => useContext(AuthContext);