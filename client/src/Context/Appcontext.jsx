import axios from 'axios';
import { useEffect, useState, createContext } from 'react';

export const AppContext = createContext();

axios.defaults.withCredentials = true;

export const AppContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;


  const [isLogged, setIsLogged] = useState(localStorage.getItem('isLogged') === 'true');
  const [currentCustomerData, setcurrentCustomerData] = useState(''); 


  //-----------------get current customer data--------------------//
  const fetchCustomerData = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/customer/currentCustomerData');
      
      if (response.data.success) {
        setIsLogged(true);
        localStorage.setItem('isLogged', 'true'); 
        setcurrentCustomerData(response.data.customer);
      } else {
      
        setIsLogged(false);
        localStorage.removeItem('isLogged'); 
        setcurrentCustomerData('');
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      setIsLogged(false);
      localStorage.removeItem('isLogged');
    }
  };

  useEffect(() => {
    // ONLY call the API on refresh if the localStorage flag says they are logged in
    if (localStorage.getItem('isLogged') === 'true') {
      fetchCustomerData();
    }
  }, [backendUrl]); 

  const value = {
    backendUrl,
    isLogged,
    setIsLogged,
    currentCustomerData,
    setcurrentCustomerData,
    fetchCustomerData 
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};