import '../output.css' 

import { Link } from 'react-router-dom';
import { useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import { Navigate } from "react-router-dom";


export default function login() {

  const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorResponse, setErrorResponse] = useState("");
  
    const auth = useAuth();
  
    function handleChange(e) {
      const { name, value } = e.target;
      if (name === "username") {
        setUsername(value);
      }
      if (name === "password") {
        setPassword(value);
      }
    }
  
    async function handleSubmit(e) {
      e.preventDefault();
       //auth.setIsAuthenticated(true);
      try {
        const response = await fetch("http://localhost:3000/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        });
        if (response.ok) {
          const json = await response.json();
          console.log(json);
  
          if (json.body.accessToken && json.body.refreshToken) {
            auth.saveUser(json);
          }
        } else {
          const json = await response.json();
  
          setErrorResponse(json.body.error);
        }
      } catch (error) {
        console.log(error);
      }
    }
    if (auth.isAuthenticated) {
      return <Navigate to="/dashboard" />;
    }
    
  
  return (
    
 
    
  
<body  className="bg-gray-100">
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 flex justify-center items-center h-screen ">
      <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img class=" max-w-lg" src="https://www.upm.es/sfs/Rectorado/Gabinete%20del%20Rector/Logos/UPM/Logotipo/LOGOTIPO%20color%20PNG.png" alt="logo"/> 
      </a>
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              
              <form class="space-y-4 md:space-y-6" form onSubmit={handleSubmit} className="form" >
              
                  <div>
                      {!!errorResponse && <div className="errorMessage">{errorResponse}</div>}
                      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Correo </label>
                      <input type="text" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required=""/>
                  </div>
                  <div>
                      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contraseña</label>
                      <input type="password" name="password" id="password"  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                  </div>
                  <div class="flex items-center justify-between">
                      <div class="flex items-start">
                          <div class="flex items-center h-5">
                            <input id="remember" aria-describedby="remember" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""/>
                          </div>
                          <div class="ml-3 text-sm">
                            <label for="remember" class="text-gray-500 dark:text-gray-300">Recordar</label>
                            
                          </div>

                          
                  
                          
                          
                      </div>
                      <Link to="/changerPassword" class="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">¿Olvidó la contaseña?</Link>
                  </div>
                  <button  type="submit" class="bg-teal-400 w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                  <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                      ¿Aún no tienes una cuenta ya creada? <Link to="/signup" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Registrarse</Link>
                  </p>
              </form>
          </div>
      </div>
  </div>
</body>

  );


}

 
