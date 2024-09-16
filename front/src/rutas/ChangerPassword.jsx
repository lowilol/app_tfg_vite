import '../output.css' 


export default function changerPassword() {
    
    
  
  return ( 
  
<div  className="bg-gray-100">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 flex justify-center items-center h-screen ">
      <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img className=" max-w-lg" src="https://www.upm.es/sfs/Rectorado/Gabinete%20del%20Rector/Logos/UPM/Logotipo/LOGOTIPO%20color%20PNG.png" alt="logo"/> 
      </a>
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Cambiar contraseña 
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">


              <div>
                      <label htmlFor="NewPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nueva contraseña</label>
                      <input type="password" name="NewPassword" id="NewPassword"  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                  </div>
                 
                  <div>
                      <label htmlFor="ConfirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">confimar contraseña</label>
                      <input type="password" name="ConfirmPassword" id="ConfirmPassword"  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                  </div>
                  <div className="flex items-center justify-between">
                      <div className="flex items-start">
                          
                        
                          
                          
                  
                          
                          
                      </div>
                     
                  </div>
                  <button  type="submit" className="bg-teal-400 w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                
              </form>
          </div>
      </div>
  </div>

  



</div>

  );


}

 
