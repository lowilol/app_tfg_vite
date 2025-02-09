
import React, { useContext, createContext, useState, useEffect } from "react";
import { useNavigate} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";  
import { toast } from "react-toastify";
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
  const navigate = useNavigate();
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
   
  
  setAccessToken(accessToken);;
  }

  function getUser() {
    return user;
  }

  const logout = () =>{
    
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('accessToken');
    localStorage.removeItem("user");
    setUser(null);
    setIsAuthenticated(false);
    navigate('/'); 
 
   }

  async function checkAuth() {
    try {
      const storedUser = localStorage.getItem("user");
      const storedAccessToken = sessionStorage.getItem("accessToken");

      if (storedAccessToken) {
        
        const response = await fetch("http://localhost:5000/api/verifyToken", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedAccessToken}`,
          },
        });

        if (response.ok) {
          setUser(JSON.parse(storedUser));
          setIsAuthenticated(true);
        } else {
          toast.error("⚠️ Tu sesión ha expirado. Inicia sesión nuevamente."); 
          setTimeout(() => logout(), 10000); 
        }
      } else {
        toast.error("⚠️ Tu sesión ha expirado. Inicia sesión nuevamente."); 
        setTimeout(() => logout(), 10000); 
      }
    } catch (error) {
      console.error("Error en la autenticación:", error);
      toast.error("⚠️ Tu sesión ha expirado. Inicia sesión nuevamente.");
          setTimeout(() => logout(), 10000);
    } finally {
      setIsLoading(false);
    }
  }

  
  useEffect(() => {
    checkAuth();
    const interval = setInterval(checkAuth, 480000); 
    console.log("escaneando...")
    return () => clearInterval(interval);
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
        checkAuth
      }}
    >
      {isloading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
}


export const useAuth = () => useContext(AuthContext);