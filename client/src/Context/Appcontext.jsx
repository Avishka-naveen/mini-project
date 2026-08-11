import axios from 'axios';
import { useEffect, useState, createContext } from 'react';
import { useNavigate } from 'react-router-dom';

export const AppContext = createContext();

axios.defaults.withCredentials = true;

export const AppContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [isLogged, setIsLogged] = useState(localStorage.getItem('isLogged') === 'true');
  const [currentCustomerData, setcurrentCustomerData] = useState('');
  const [currentWorkerData, setcurrentWorkerData] = useState('');
  const [allServicesData, setAllServicesData] = useState([]);
  const navigate = useNavigate();

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

  // fetch allServices data
  const fetchAllServises = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/worker/getAllServices");

      if (response.data.success) {
        setAllServicesData(response.data.services);
        //console.log(response.data.services);
      }
    } catch (error) {
      console.error("Services fetch failed:", error);
    }
  };

  //  Run when refresh
  useEffect(() => {
    if (localStorage.getItem("isLogged") === "true") {
      fetchCustomerData();
      fetchWorkerData();
      fetchAllServises();
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
    fetchWorkerData,
    allServicesData,
    fetchAllServises
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};