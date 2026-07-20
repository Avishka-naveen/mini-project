import React, { useContext } from 'react';
import { FaWindowClose, FaUser, FaEnvelope, FaPhone, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';
import { MdBrowserUpdated } from "react-icons/md";
import { AppContext } from '../../Context/Appcontext';
import { toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function ProfileCard() {
  const { currentCustomerData,setcurrentCustomerData, setShowProfile,backendUrl,setIsLogged} = useContext(AppContext);
  const navigate = useNavigate();

  const logout=async(e)=>{
    e.preventDefault();

    try {
         axios.defaults.withCredentials = true;

         let response;
         response=await axios.post(backendUrl +'/api/customer/logout');
         if(response.data.success){
            setIsLogged(false);
            toast.success(response.data.massage);
            localStorage.removeItem('isLogged');
            setcurrentCustomerData('');
            navigate('/');

            
            // console.log(response.data.message);

         }else{
             toast.error(response.data.message);
         }
    } catch (error) {
        toast.error(error.message);
    }
 }

  return (
    <div className="absolute right-0 top-14 w-72 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50">
      
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/30">
        <h3 className="font-semibold text-gray-800 dark:text-white flex items-center gap-2">
          <FaUserCircle className="text-blue-600 dark:text-purple-500" />
          Profile
        </h3>
       
      </div>

      {/* Profile Content */}
      <div className="p-5 space-y-4">
        {/* Avatar */}
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 dark:from-purple-600 dark:to-blue-700 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
            {currentCustomerData?.customerName?.split(' ')[0][0].toUpperCase()}
            {currentCustomerData.customerName.split(' ')[1]?.[0].toUpperCase()}
          </div>
          <h4 className="mt-2 font-semibold capitalize text-gray-800 dark:text-white text-lg">
            {currentCustomerData?.customerName }
          </h4>
          <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
            Customer
          </span>
        </div>

        {/* User Details */}
        <div className="space-y-3 pt-3 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
            <FaUser className="text-blue-500 dark:text-purple-400 w-4" />
            <span className="text-sm font-medium truncate">
              {currentCustomerData?.customerName }
            </span>
          </div>
          <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
            <FaEnvelope className="text-blue-500 dark:text-purple-400 w-4" />
            <span className="text-sm truncate">
              {currentCustomerData?.customerEmail }
            </span>
          </div>
          <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
            <FaPhone className="text-blue-500 dark:text-purple-400 w-4" />
            <span className="text-sm">
              {currentCustomerData?.customerPhone }
            </span>
          </div>
        </div>

        {/* updatebutton */}
        <button className="mt-2 w-full flex items-center justify-center gap-2 bg-gradient-to-r cursor-pointer bg-blue-600 dark:bg-purple-600 text-white font-semibold py-2.5 rounded-lg transition duration-300 shadow-md hover:shadow-lg">
          <MdBrowserUpdated />
          Update Profile
        </button>

        {/* Logout Button */}
        <button onClick={logout}
          
          className=" w-full flex items-center justify-center gap-12 bg-gradient-to-r cursor-pointer from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-2.5 rounded-lg transition duration-300 shadow-md hover:shadow-lg"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </div>
  );
}

export default ProfileCard;