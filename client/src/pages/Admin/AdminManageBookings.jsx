import React, { useContext, useEffect, useState } from 'react';
// import { dummybookingData } from '../../assets/dummyData'; 
import { FaSearch, FaTrash, FaCalendarCheck,FaUserCircle, FaIdCard, FaEnvelope, FaPhone, FaMapMarkerAlt, FaTimes, FaInfoCircle, FaExclamationTriangle } from 'react-icons/fa';
import axios from 'axios';
import { AppContext } from '../../Context/Appcontext';
import { toast } from 'react-toastify';

function AdminManageBookings() {
  const { backendUrl } = useContext(AppContext);


  const [reservations, setReservations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedWorker, setSelectedWorker] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [workerDetailsVisible, setWorkerDetailsVisible] = useState('');
  const [customerDetailsVisible, setCustomerDetailsVisible] = useState('');
  const [deleteModelVisible, setdeleteModelVisible] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState('');


  const getReservations = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/admin/getAllReservations');
      if (response.data.success) {
        setReservations(response.data.reservations);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getReservations();
  }, []);

  // Handle Delete Function
  const handleDelete = async () => {
    try {
      const response = await axios.post(backendUrl + '/api/admin/deleteReservation', { reservationId: selectedReservation._id });
      if (response.data.success) {
        toast.success(response.data.message);
        getReservations();
      }

    } catch (error) {
      console.log(error);
    }

  };

  // Get status badge color
  const getStatusBadge = (status) => {
    const statusMap = {
      'pending': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
      'confirmed': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
      'completed': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
      'cancelled': 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
      'in progress': 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
    };
    return statusMap[status?.toLowerCase()] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
  };


  const filteredBookings = reservations.filter(booking => {

    const workerName = booking.workerId?.customerId?.customerName || '';
    const customerName = booking.customerName || '';
    const serviceName = booking.serviceId?.serviceName || '';
    const status = booking.status || 'pending';

    const matchesSearch =
      workerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      serviceName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filterStatus === 'all' || status.toLowerCase() === filterStatus.toLowerCase();

    return matchesSearch && matchesStatus;
  }


  );

  return (
    <div className="  sm:p-6 dark:text-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl flex items-center gap-1 sm:text-3xl font-bold text-gray-800 dark:text-white">
            <FaCalendarCheck /> <p>Manage Bookings</p>
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            View and manage all customer bookings
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Total: <span className="font-semibold text-gray-800 dark:text-white">{filteredBookings.length}</span>
          </span>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by worker, customer, or service..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-purple-500 focus:border-transparent outline-none transition duration-200"
          />
        </div>

        {/* Filter Dropdown */}
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-purple-500 outline-none transition duration-200"
        >
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="in progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* Table Container */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">


        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                <th className="px-4 py-3 hidden sm:table-cell text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider whitespace-nowrap">
                  No.
                </th>
                <th className="px-2 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider whitespace-nowrap">
                  Worker
                </th>
                <th className="px-2 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider whitespace-nowrap">
                  Customer
                </th>
                <th className="px-2 py-3 hidden sm:table-cell text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider whitespace-nowrap">
                  Service
                </th>

                <th className="px-2 py-3 hidden sm:table-cell text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider whitespace-nowrap">
                  Booking Date
                </th>
                <th className="px-2 py-3 hidden sm:table-cell text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider whitespace-nowrap">
                  Status
                </th>
                <th className="px-2 py-3 text-center text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider whitespace-nowrap">
                  Actions
                </th>

              </tr>
            </thead>

            <tbody>

              {filteredBookings.length > 0 ? (

                filteredBookings.map((booking, index) => (
                  
                  <tr
                    key={booking._id || booking.id || index}
                    className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200"
                  >

                    {/* No. */}
                    <td className="px-4 py-3 hidden sm:table-cell text-gray-800 dark:text-gray-200 font-medium whitespace-nowrap">
                      {String(index + 1).padStart(2, "0")}
                    </td>

                    {/* Worker */}
                    <td className="px-2 py-3">
                      <div className="flex items-center gap-2">

                        <div
                          onClick={() => {
                            setSelectedWorker(booking);
                            setWorkerDetailsVisible(true);
                          }}
                          className="w-8 h-8 min-w-8 rounded-full bg-blue-100
                    dark:bg-blue-900 flex items-center justify-center
                    text-blue-600 dark:text-blue-400 text-xs font-bold
                    cursor-pointer overflow-hidden"
                        >

                          <img
                            src={booking.workerId?.profile}
                            alt="Worker"
                            className="w-8 h-8 rounded-full object-cover"
                          />

                        </div>

                        <span className="hidden sm:inline text-gray-700 dark:text-gray-300 whitespace-nowrap">
                          {booking.workerId?.customerId?.customerName || "Unknown"}
                        </span>

                      </div>
                    </td>

                    {/* Customer */}
                    <td className="px-2 py-3">
                      <div className="flex items-center gap-2">

                        <div
                          onClick={() => {
                            setSelectedCustomer(booking);
                            setCustomerDetailsVisible(true);
                          }}
                          className="w-8 h-8 min-w-8 rounded-full bg-green-100
                    dark:bg-green-900 flex items-center justify-center
                    text-green-600 dark:text-green-400 text-xs font-bold
                    cursor-pointer"
                        >
                          {booking.customerName?.charAt(0) || "C"}
                        </div>

                        <span className="hidden sm:inline text-gray-700 dark:text-gray-300 whitespace-nowrap">
                          {booking.customerName || "Unknown"}
                        </span>

                      </div>
                    </td>

                    {/* Service */}
                    <td className="px-2 py-3 hidden sm:table-cell text-gray-700 dark:text-gray-300 whitespace-nowrap">
                      {booking.serviceId?.serviceName || "N/A"}
                    </td>

                    {/* Booking Date */}
                    <td className="px-2 py-3 hidden sm:table-cell whitespace-nowrap">

                      <div className="flex items-center gap-2">

                        <span className="text-gray-700 dark:text-gray-300 text-xs">
                          {booking.date
                            ? new Date(booking.date).toLocaleDateString()
                            : "N/A"}
                        </span>

                      </div>

                    </td>

                    {/* Status */}
                    <td className="px-2 py-3 hidden sm:table-cell whitespace-nowrap">

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(
                          booking.status
                        )}`}
                      >
                        {booking.status || "Pending"}
                      </span>

                    </td>

                    {/* Actions */}
                    <td className="px-2 py-3 whitespace-nowrap">

                      <div className="flex items-center justify-center gap-1.5">

                        {/* Delete Button */}
                        <button
                          onClick={() => {
                            setdeleteModelVisible(true);
                            setSelectedReservation(booking);
                          }}
                          className="p-1.5 text-red-500 hover:text-red-700
                    dark:text-red-400 dark:hover:text-red-300
                    hover:bg-red-50 dark:hover:bg-red-900/20
                    rounded-lg transition-colors"
                          title="Delete Booking"
                        >
                          <FaTrash size={14} />
                        </button>

                      </div>

                    </td>
                   

                  </tr>
                  
                  

                ))

              ) : (

             
                <tr>

                  <td
                    colSpan="7"
                    className="px-4 py-8 text-center text-gray-500 dark:text-gray-400"
                  >

                    <div className="flex flex-col items-center gap-2">

                      <span className="text-4xl">
                        📭
                      </span>

                      <p className="font-medium">
                        No bookings found
                      </p>

                      <p className="text-sm">
                        Try adjusting your search or filter.
                      </p>

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

            <span>
              Showing {filteredBookings.length} booking(s)
            </span>

          </div>

        </div>

      </div>

      {/* Worker Details Modal */}
      {workerDetailsVisible && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 transition-opacity"
            onClick={() => setWorkerDetailsVisible(false)}
          ></div>

          {/* Modal - Responsive */}
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[95%] max-w-2xl max-h-[90vh] overflow-y-auto animate-scale-in">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700">


              <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 dark:from-purple-700 dark:to-blue-800 px-6 pt-6 pb-12">
                <div className="flex justify-center">
                  <div className="flex items-center gap-3">

                    <div className="absolute -bottom-25 left-1/2 -translate-x-1/2 z-50">

                      <img className=' rounded-full w-40 h-40 object-cover' src={selectedWorker?.workerId?.profile}></img>

                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-30 px-6 pb-6 space-y-6">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                    {selectedWorker?.workerId?.customerId?.customerName}

                  </h3>
                  <span className="inline-block mt-2 bg-blue-100 dark:bg-purple-900/50 text-blue-700 dark:text-purple-300 text-xs font-semibold px-4 py-1.5 rounded-full border border-blue-200 dark:border-purple-700/30">
                    Worker Profile
                  </span>
                </div>


                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">


                  <div className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-700/40 border border-gray-100 dark:border-gray-700/50 hover:shadow-sm transition-shadow">
                    <FaUserCircle className="text-blue-500 dark:text-blue-400 text-xl flex-shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider mb-1">Full Name</p>
                      <p className="text-sm text-gray-800 dark:text-white font-semibold truncate">
                        {selectedWorker?.workerId?.customerId?.customerName}

                      </p>
                    </div>
                  </div>

                  {/* NIC */}
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-700/40 border border-gray-100 dark:border-gray-700/50 hover:shadow-sm transition-shadow">
                    <FaIdCard className="text-purple-500 dark:text-purple-400 text-xl flex-shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider mb-1">NIC Number</p>
                      <p className="text-sm text-gray-800 dark:text-white font-semibold truncate">
                        {selectedWorker?.workerId?.nic || 'N/A'}

                      </p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-700/40 border border-gray-100 dark:border-gray-700/50 hover:shadow-sm transition-shadow">
                    <FaEnvelope className="text-blue-500 dark:text-blue-400 text-xl flex-shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider mb-1">Email</p>
                      <p className="text-sm text-gray-800 dark:text-white font-semibold break-all">
                        {selectedWorker?.workerId?.customerId?.customerEmail}

                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-700/40 border border-gray-100 dark:border-gray-700/50 hover:shadow-sm transition-shadow">
                    <FaPhone className="text-green-500 dark:text-green-400 text-xl flex-shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider mb-1">Phone</p>
                      <p className="text-sm text-gray-800 dark:text-white font-semibold">
                        {selectedWorker?.workerId?.customerId?.customerPhone}

                      </p>
                    </div>
                  </div>

                  {/* Address - Spans full width */}
                  <div className="col-span-1 sm:col-span-2 flex items-start gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-700/40 border border-gray-100 dark:border-gray-700/50 hover:shadow-sm transition-shadow">
                    <FaMapMarkerAlt className="text-red-500 dark:text-red-400 text-xl flex-shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider mb-1">Address</p>
                      <p className="text-sm text-gray-800 dark:text-white font-medium">
                        {selectedWorker?.workerId?.address}

                      </p>
                    </div>
                  </div>

                  {/* Description - Spans full width */}
                  <div className="col-span-1 sm:col-span-2 flex items-start gap-3 p-4 rounded-xl bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800/30">
                    <FaInfoCircle className="text-blue-500 dark:text-blue-400 text-xl flex-shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-blue-600 dark:text-blue-400 font-bold uppercase tracking-wider mb-1.5">Worker Description</p>
                      <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                        {selectedWorker?.description || 'No description provided for this worker.'}
                      </p>
                    </div>
                  </div>

                </div>

                {/* Footer Info */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-6">
                  <p className="text-xs text-center text-gray-700 dark:text-gray-500">
                    Joined system on:
                    {selectedWorker?.createdAt ? new Date(selectedWorker.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A'}
                  </p>
                </div>
              </div>

              {/* Modal Action Footer */}
              <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/80">
                <button
                  onClick={() => setWorkerDetailsVisible(false)}
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.98]"
                >
                  Close Profile
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ///////////////////////////////////////// */}

      {/* customer  Details Modal */}
      {customerDetailsVisible && (
        <>
          {/* Backdrop */}
          <div onClick={() => setCustomerDetailsVisible(false)}
            className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"

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
                  onClick={() => setCustomerDetailsVisible(false)}
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


      {/* delete booking model */}

      {deleteModelVisible && (
        <div onClick={() => setdeleteModelVisible(false)} className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4 animate-fade-in">

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md animate-scale-in overflow-hidden">

            {/* Modal Header */}
            <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                    <FaExclamationTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                      Delete Booking
                    </h2>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Are you sure you want to Booking?
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setdeleteModelVisible(false);

                  }}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <FaTimes className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6">


              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800/30 rounded-lg p-3 mb-4">
                <p className="text-sm text-yellow-800 dark:text-yellow-300 flex items-center gap-2">
                  <FaExclamationTriangle className="w-4 h-4" />
                  This action cannot be undone.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => {
                    setdeleteModelVisible(false);

                  }}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 
                                 text-gray-700 dark:text-gray-200 font-medium transition duration-200"
                >
                  Cancel
                </button>
                <button onClick={handleDelete} className="flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-red-700 
                                 hover:from-red-700 hover:to-red-800 text-white font-medium 
                                 transition duration-200 shadow-md hover:shadow-lg
                                 flex items-center justify-center gap-2
                                 disabled:opacity-50 disabled:cursor-not-allowed">
                  Yes, Delete Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default AdminManageBookings;