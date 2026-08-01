import React, { useContext, useEffect, useState } from 'react';
import { bookingDummyData } from '../../assets/dummyData';
import { FaBookmark, FaCheck, FaTimes, FaEye, FaUserCircle, FaEnvelope, FaPhone, FaMapMarkerAlt, FaInfoCircle } from 'react-icons/fa';
import { AppContext } from '../../Context/Appcontext';
import axios from 'axios';
import { IoMdClose } from "react-icons/io";

function WorkerMyBookings() {
  const [reservation, setReservation] = useState([]);
  const { backendUrl } = useContext(AppContext);
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const fetchBookingData = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/worker/getMyReservations', { withCredentials: true });
      if (response.data.success) {
        setReservation(response.data.reservation);
        //console.log(response.data.reservation);
      }
    } catch (error) {
      console.error("Error fetching booking data:", error);
    }
  };

  useEffect(() => {
    fetchBookingData();
  }, []);

  // Get status color
  const getStatusColor = (status) => {
    const colors = {
      'pending': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
      'confirmed': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
      'rejected': 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
      'completed': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    };
    return colors[status] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
  };

  // Handle view customer details
  const handleViewCustomer = (customer) => {
    setSelectedCustomer(customer);
    setDetailsVisible(true);
    console.log(selectedCustomer)
  };

  // Handle close modal
  const handleCloseModal = () => {
    setDetailsVisible(false);
    setSelectedCustomer(null);
  };

  return (
    <div className="p-4 sm:p-6 dark:text-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
        <div>
          <div className='flex items-center justify-center gap-2'>
            <p className='text-3xl'><FaBookmark /></p>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
              My Bookings
            </h1>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Manage all your customer bookings
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Total: <span className="font-semibold text-gray-800 dark:text-white">{reservation.length}</span>
          </span>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">No.</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Date</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Customer</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Service</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody>
              {reservation.length > 0 ? (
                reservation.map((reservation, index) => (
                  <tr
                    key={reservation._id || index}
                    className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200"
                  >
                    <td className="px-4 py-3 text-gray-800 dark:text-gray-200 font-medium">
                      {String(index + 1)}
                    </td>
                    <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                      {new Date(reservation.date).toLocaleDateString("en-GB")}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div 
                          onClick={() => handleViewCustomer(reservation)}
                          className="w-8 h-8 rounded-full cursor-pointer bg-blue-100 dark:bg-purple-900 flex items-center justify-center text-blue-600 dark:text-white text-xs font-bold"
                        >
                          {reservation.customerId?.customerName?.split(' ')?.map(name => name[0]).join("").toUpperCase() || 'C'}
                        </div>
                        <span className="text-gray-700 dark:text-gray-300 text-sm">
                          {reservation.customerId?.customerName || 'Unknown'}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                      {reservation.serviceId?.serviceName || 'General Service'}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(reservation.status)}`}>
                        {reservation.status || 'Pending'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-2">
                        
                        {reservation.status === 'pending' && (
                          <>
                            <button className="p-2 text-green-500 cursor-pointer dark:text-white bg-green-100 dark:bg-green-400 hover:text-green-700 dark:hover:text-white hover:bg-green-200 dark:hover:bg-green-600 rounded-lg transition-colors">
                              <FaCheck />
                            </button>
                            <button className="p-2 text-red-500 cursor-pointer dark:text-white bg-red-100 dark:bg-red-400 hover:text-red-700 dark:hover:text-white hover:bg-red-200 dark:hover:bg-red-600 rounded-lg transition-colors">
                              <FaTimes />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-4xl">📭</span>
                      <p className="font-medium">No bookings found</p>
                      <p className="text-sm">You don't have any bookings yet.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-600">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <span>Showing {reservation.length} booking(s)</span>
          </div>
        </div>
      </div>

      {/* Customer Details Modal */}
      {detailsVisible && selectedCustomer && (
  <>
    {/* Backdrop */}
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-fade-in"
      onClick={handleCloseModal}
    ></div>

    {/* Modal - Responsive */}
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] max-w-md max-h-[90vh] overflow-y-auto animate-scale-in">
      
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
        
        {/* Modal Header - Fixed */}
        <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 dark:from-purple-700 dark:to-blue-800 px-6 pt-8 pb-12">
          <div className="flex justify-center">
            <div className="flex items-center gap-3">
              {/* Avatar - Fixed position */}
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 z-50">
                <div className="w-24 h-24 rounded-full  dark:bg-gray-700 
                                flex items-center justify-center  font-bold text-3xl
                                border-4 border-white dark:border-gray-800 
                                text-blue-800 bg-blue-100 dark:text-white">
                  {selectedCustomer?.customerName?.split(' ')?.map(name => name[0]).join("").toUpperCase() || 'C'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Body - Added padding-top for avatar space */}
        <div className="pt-14 px-6 pb-4 space-y-4">
          {/* Customer Name - Centered */}
          <div className="text-center mb-4">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">
              {selectedCustomer?.customerName || 'Customer'}
            </h3>
            <span className="inline-block mt-1 bg-blue-100 dark:bg-purple-900/50 
                           text-blue-700 dark:text-purple-300 
                           text-xs font-semibold px-3 py-1 rounded-full 
                           border border-blue-200 dark:border-purple-700/30">
              {selectedCustomer?.role || 'Customer'}
            </span>
          </div>

          {/* Customer Details Grid */}
          <div className="grid grid-cols-1 gap-3">
            {/* Name */}
            <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
              <FaUserCircle className="text-blue-500 dark:text-blue-400 text-lg flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Full Name</p>
                <p className="text-sm text-gray-800 dark:text-white font-medium truncate">
                  {selectedCustomer?.customerName || 'N/A'}
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
              <FaEnvelope className="text-blue-500 dark:text-blue-400 text-lg flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Email</p>
                <p className="text-sm text-gray-800 dark:text-white break-all">
                  {selectedCustomer?.customerEmail || 'N/A'}
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
              <FaPhone className="text-green-500 dark:text-green-400 text-lg flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Phone</p>
                <p className="text-sm text-gray-800 dark:text-white">
                  {selectedCustomer?.customerPhone || 'N/A'}
                </p>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
              <FaMapMarkerAlt className="text-red-500 dark:text-red-400 text-lg flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Address</p>
                <p className="text-sm text-gray-800 dark:text-white truncate">
                  {selectedCustomer?.customerAddress || 'N/A'}
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
              <FaInfoCircle className="text-purple-500 dark:text-purple-400 text-lg flex-shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Description</p>
                <p className="text-sm text-gray-700 dark:text-gray-300  line-clamp-3">
                  {selectedCustomer?.description || 'No description available'}
                </p>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <p className="text-xs text-center text-gray-400 dark:text-gray-500">
              Customer since: {selectedCustomer?.createdAt 
                ? new Date(selectedCustomer.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })
                : 'N/A'
              }
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/30">
          <button
            onClick={handleCloseModal}
            className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 
                     text-white font-medium rounded-lg transition duration-200 shadow-md hover:shadow-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </>
)}
     
    </div>
  );
}

export default WorkerMyBookings;