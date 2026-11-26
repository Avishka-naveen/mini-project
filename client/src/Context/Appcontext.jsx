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
  const [currentCustomerId, setcurrentCustomerId] = useState('');
  const [allServicesData, setAllServicesData] = useState([]);
  const [customerNotifications, setCustomerNotifications] = useState([]);
  const navigate = useNavigate();

  // Fetch Customer Data
  const fetchCustomerData = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/customer/currentCustomerData');

      if (response.data.success) {
        setIsLogged(true);
        localStorage.setItem('isLogged', 'true');
        setcurrentCustomerData(response.data.customer);
        setcurrentCustomerId(response.data.customer._id);
        return response.data.customer;
      } else {
        setIsLogged(false);
        localStorage.removeItem('isLogged');
        setcurrentCustomerData('');
        setcurrentCustomerId('');
        return null;
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      setIsLogged(false);
      localStorage.removeItem('isLogged');
      return null;
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

  // Fetch allServices data
const fetchAllServises = async (customerId = currentCustomerId) => {
  try {
    const response = await axios.post(
      backendUrl + "/api/worker/getAllServices",
      { customerId }
    );
    if (response.data.success) {
      setAllServicesData(response.data.services);
    }
  } catch (error) {
    console.error("Services fetch failed:", error);
  }
};

//fetch allnotifications for customer

const fetchCustomerNotifications = async () => {
  try {
    const response = await axios.post(backendUrl + "/api/customer/getCustomerNotifications");
    if (response.data.success) {
      setCustomerNotifications(response.data.notifications);
      
    }
  } catch (error) {
    console.error("Notifications fetch failed:", error);
  }
};


 //console.log(customerNotifications)
  // Run when refresh
  useEffect(() => {
    if (localStorage.getItem("isLogged") === "true") {
      const initData = async () => {
        const customer = await fetchCustomerData();
        await fetchWorkerData();
        await fetchAllServises(customer?._id);
        await fetchCustomerNotifications();
      };
      initData();
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
    fetchAllServises,
    currentCustomerId,
    setAllServicesData,
    customerNotifications,
    setCustomerNotifications,
    fetchCustomerNotifications,
   
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};