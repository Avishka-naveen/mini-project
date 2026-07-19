import axios from 'axios';
import { useState } from 'react';
import { createContext } from 'react';

export const AppContext = createContext();

axios.defaults.withCredentials = true;


export const AppContextProvider = (props) => {

    const[isLogged,setIsLogged]=useState(false);
  
    
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const value = {
    backendUrl,isLogged,setIsLogged
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};