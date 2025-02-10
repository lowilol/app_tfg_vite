
import React, { useContext, createContext, useState, useEffect } from "react";
import { useNavigate} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";  
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
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
    document.cookie = `user=${JSON.stringify(userData)}; path=/;`;
    setUser(userData);
    setIsAuthenticated(true);
  }

 
   
  
  

  function getUser() {
    return user;
  }

  function logout() {
    document.cookie = "access_token=; path=/; max-age=0"; 
    document.cookie = "user=; path=/; max-age=0"; 
    setUser(null);
    setIsAuthenticated(false);
    navigate("/");
  }

  async function checkAuth() {
    try {
     // setIsLoading(true); 
      const token = getAccessToken()
      if (token) {
        
        const response = await fetch("http://localhost:5000/api/verifyToken", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
           
            
          },
          credentials: 'include'
        });

        if (response.ok) {
          const userData =await response.json();
          setUser(userData.user);
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
  }, []);
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        getAccessToken,
        saveUser,
        getUser,
        logout,
        checkAuth
      }}
    >
     {isloading ? (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
          <ClipLoader color="#3498db" size={50} />
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}


export const useAuth = () => useContext(AuthContext);