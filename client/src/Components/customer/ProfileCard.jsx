import React, { useContext, useState } from 'react';
import { 
  FaWindowClose, 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaSignOutAlt, 
  FaUserCircle,
  FaTimes,
  FaSave
} from 'react-icons/fa';
import { MdBrowserUpdated } from "react-icons/md";
import { AppContext } from '../../Context/Appcontext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ProfileCard() {
  const { 
    currentCustomerData, 
    setCurrentCustomerData, 
    setShowProfile, 
    backendUrl, 
    setIsLogged ,
    fetchCustomerData
  } = useContext(AppContext);
  const navigate = useNavigate();

  // State for update modal
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [updateData, setUpdateData] = useState({
    name: '',
    phone: '',
  });
console.log(showUpdateModal);

  const handleOpenUpdate = () => {
    setUpdateData({
      name: currentCustomerData?.customerName ,
      phone: currentCustomerData?.customerPhone ,
    });
    setShowUpdateModal(true);
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setUpdateData(prev => ({ ...prev, [name]: value }));
  };

  // ------- update profile function
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    
    if (!updateData.name.trim() || !updateData.phone.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    // console.log(updateData.name,updateData.phone)
   
    try {
      axios.defaults.withCredentials = true;
      
      const response = await axios.post(backendUrl + '/api/customer/updateProfile',{customerName: updateData.name,customerPhone: updateData.phone,});

      if (response.data.success) {
   
        
        toast.success(response.data.message );
        setShowUpdateModal(false);
        fetchCustomerData();
      } else {
        toast.error(response.data.message || 'Failed to update profile');
      }
    } catch (error) {
      toast.error(error.message);
    }
    
  };

  // Logout function
  const logout = async (e) => {
    e.preventDefault();

    try {
      axios.defaults.withCredentials = true;

      const response = await axios.post(backendUrl + '/api/customer/logout');
      if (response.data.success) {
        setIsLogged(false);
        toast.success(response.data.massage);
        localStorage.removeItem('isLogged');
        //setCurrentCustomerData('');
        navigate('/');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      {/* Profile Card */}
      <div className=" bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50">
        
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
              {currentCustomerData?.customerName?.split(' ')[0]?.[0]?.toUpperCase() || 'U'}
              {currentCustomerData?.customerName?.split(' ')[1]?.[0]?.toUpperCase() || ''}
            </div>
            <h4 className="mt-2 font-semibold capitalize text-gray-800 dark:text-white text-lg">
              {currentCustomerData?.customerName || 'User'}
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
                {currentCustomerData?.customerName || 'N/A'}
              </span>
            </div>
            <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
              <FaEnvelope className="text-blue-500 dark:text-purple-400 w-4" />
              <span className="text-sm truncate">
                {currentCustomerData?.customerEmail || 'N/A'}
              </span>
            </div>
            <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
              <FaPhone className="text-blue-500 dark:text-purple-400 w-4" />
              <span className="text-sm">
                {currentCustomerData?.customerPhone || 'N/A'}
              </span>
            </div>
          </div>

          {/* Update Button */}
          <button
            onClick={handleOpenUpdate}
            className="mt-2 w-full flex items-center justify-center gap-2 cursor-pointer 
                     bg-gradient-to-r from-blue-600 to-purple-600 
                     hover:from-blue-700 hover:to-purple-700
                     text-white font-semibold py-2.5 rounded-lg transition duration-300 shadow-md hover:shadow-lg"
          >
            <MdBrowserUpdated />
            Update Profile
          </button>

          {/* Logout Button */}
          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 cursor-pointer 
                     bg-gradient-to-r from-red-500 to-red-600 
                     hover:from-red-600 hover:to-red-700 
                     text-white font-semibold py-2.5 rounded-lg transition duration-300 shadow-md hover:shadow-lg"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </div>

      {/* Update Profile Modal */}
      {showUpdateModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50  z-50 p-4 animate-fade-in">
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md animate-scale-in">
            
            {/* Modal Header */}
            <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white">
                    <MdBrowserUpdated className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                      Update Profile
                    </h2>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Update your personal information
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowUpdateModal(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <FaTimes className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <form onSubmit={handleUpdateProfile} className="space-y-5">
                
                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaUser className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="name"
                      value={updateData.name}
                      onChange={handleUpdateChange}
                      placeholder="Enter your full name"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl
                               bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white
                               focus:ring-2 focus:ring-blue-500 dark:focus:ring-purple-500 focus:border-transparent
                               outline-none transition duration-200"
                      required
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaPhone className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      value={updateData.phone}
                      onChange={handleUpdateChange}
                      placeholder="077 123 4567"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl
                               bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white
                               focus:ring-2 focus:ring-blue-500 dark:focus:ring-purple-500 focus:border-transparent
                               outline-none transition duration-200"
                      required
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button
                    type="button"
                    onClick={() => setShowUpdateModal(false)}
                    className="px-6 py-2.5 rounded-xl bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 
                             text-gray-700 dark:text-gray-200 font-medium transition duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 
                             hover:from-blue-700 hover:to-purple-700 text-white font-medium 
                             transition duration-200 shadow-md hover:shadow-lg
                             flex items-center justify-center gap-2
                             disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Updating...
                      </>
                    ) : (
                      <>
                        <FaSave /> Update Profile
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

     
    </>
  );
}

export default ProfileCard;