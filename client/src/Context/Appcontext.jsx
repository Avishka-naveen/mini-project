import axios from 'axios';
import { useEffect, useState, createContext } from 'react';

export const AppContext = createContext();

axios.defaults.withCredentials = true;

export const AppContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [isLogged, setIsLogged] = useState(localStorage.getItem('isLogged') === 'true');
  const [currentCustomerData, setcurrentCustomerData] = useState(''); 
  const [currentWorkerData, setcurrentWorkerData] = useState(''); 

  //  Fetch Customer Data
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

  //  Fetch Worker Data 
  const fetchWorkerData = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/worker/getCurrentWorkerData');
      
      if (response.data.success) {
        setcurrentWorkerData(response.data.worker);
      } else {
        setcurrentWorkerData('');
      }
    } catch (error) {
      console.error("Worker fetch failed:", error);
      setcurrentWorkerData('');
    }
  };

  //  Run when refresh
  useEffect(() => {
    if (localStorage.getItem('isLogged') === 'true') {
      fetchCustomerData();
      fetchWorkerData(); 
    }
  }, [backendUrl]); 

 
  const value = {
    backendUrl,
    isLogged,
    setIsLogged,
    currentCustomerData,
    setcurrentCustomerData,
    fetchCustomerData,
    currentWorkerData, 
    setcurrentWorkerData,
    fetchWorkerData // <--- Missing here previously!
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};