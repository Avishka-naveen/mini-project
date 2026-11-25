import React, { useContext, useEffect, useState } from 'react';
import { bookingDummyData } from '../../assets/dummyData';
import { FaBookmark, FaCheck, FaTimes, FaEye, FaUserCircle, FaEnvelope, FaPhone, FaMapMarkerAlt, FaInfoCircle, FaCheckCircle  } from 'react-icons/fa';
import { AppContext } from '../../Context/Appcontext';
import axios from 'axios';
import { IoMdClose } from "react-icons/io";
import { IoMdDoneAll } from "react-icons/io";
import { toast } from 'react-toastify';

function WorkerMyBookings() {
  const [reservation, setReservation] = useState([]);
  const { backendUrl } = useContext(AppContext);
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedReservation, setSelectedReservation] = useState('');
  const [visibleAcceptModel, setVisibleAcceptModel] = useState(false);
  const [visibleDeleteModel, setVisibleDeleteModel] = useState(false);
  const [visibleCompleteModel, setVisibleCompleteModel] = useState(false);

  const fetchBookingData = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/worker/getMyReservations', { withCredentials: true });
      if (response.data.success) {
        setReservation(response.data.reservation);
      }
    } catch (error) {
      console.error("Error fetching booking data:", error);
    }
  };

  useEffect(() => {
    fetchBookingData();
  }, []);

  // ---------- DATE CATEGORIZATION HELPERS ----------
  // Normalize a date to midnight (so time-of-day doesn't matter)
  const toMidnight = (d) => {
    const dt = new Date(d);
    dt.setHours(0, 0, 0, 0);
    return dt;
  };

  const today = toMidnight(new Date());
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const endOfWeek = new Date(today);
  endOfWeek.setDate(endOfWeek.getDate() + 7);


  const getDateCategory = (dateStr) => {
    const d = toMidnight(dateStr);
    if (d < today) return 'past';
    if (d.getTime() === today.getTime()) return 'today';
    if (d.getTime() === tomorrow.getTime()) return 'tomorrow';
    if (d < endOfWeek) return 'thisWeek';
    return 'later';
  };

  const CATEGORY_ORDER = [
    { key: 'today',    label: 'Today',        color: 'text-orange-600 dark:text-orange-400', border: 'border-orange-300 dark:border-orange-700/50' },
    { key: 'tomorrow', label: 'Tomorrow',      color: 'text-yellow-600 dark:text-yellow-400', border: 'border-yellow-300 dark:border-yellow-700/50' },
    { key: 'thisWeek', label: 'This Week',     color: 'text-blue-600 dark:text-blue-400',     border: 'border-blue-300 dark:border-blue-700/50' },
    { key: 'later',    label: 'Later',         color: 'text-purple-600 dark:text-purple-400', border: 'border-purple-300 dark:border-purple-700/50' },
    { key: 'past',     label: 'Past',   emoji: <FaCheckCircle />,       color: 'text-gray-600 dark:text-gray-400',     border: 'border-gray-300 dark:border-gray-700' },
  ];

  // Group reservations by category
  const groupedReservations = CATEGORY_ORDER.reduce((acc, cat) => {
    acc[cat.key] = [];
    return acc;
  }, {});

  reservation.forEach((r) => {
    const cat = getDateCategory(r.date);
    groupedReservations[cat].push(r);
  });

  // Sort each group by date ascending (past sorted descending so most recent first)
  Object.keys(groupedReservations).forEach((key) => {
    groupedReservations[key].sort((a, b) =>
      key === 'past'
        ? new Date(b.date) - new Date(a.date)
        : new Date(a.date) - new Date(b.date)
    );
  });


  const getStatusColor = (status) => {
    const colors = {
      'pending': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
      'confirmed': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
      'rejected': 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
      'completed': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    };
    return colors[status] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
  };

  const handleViewCustomer = (customer) => {
    setSelectedCustomer(customer);
    setDetailsVisible(true);
  };

  const handleCloseModal = () => {
    setDetailsVisible(false);
    setSelectedCustomer(null);
  };

  const handleAccept = async () => {
    try {
      const response = await axios.post(backendUrl + '/api/worker/acceptUserBooking', { reservationId: selectedReservation._id });
      if (response.data.success) {
        toast.success(response.data.message);
        setSelectedReservation('');
        fetchBookingData();
        setVisibleAcceptModel(false);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.post(backendUrl + '/api/worker/deleteUserBooking', { reservationId: selectedReservation._id });
      if (response.data.success) {
        toast.success(response.data.message);
        setSelectedReservation('');
        fetchBookingData();
        setVisibleDeleteModel(false);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const handleComplete = async () => {
    try {
      const response = await axios.post(backendUrl + '/api/worker/completeUserBooking', { reservationId: selectedReservation._id });
      if (response.data.success) {
        toast.success(response.data.message);
        setSelectedReservation('');
        fetchBookingData();
        setVisibleCompleteModel(false);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  // ---- reusable row renderer ----
  const renderBookingRow = (reservation, index) => (
    <tr
      key={reservation._id || index}
      className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200"
    >
      <td className="px-4 py-3 hidden sm:table-cell text-gray-800 dark:text-gray-200 font-medium">
        {index + 1}
      </td>

      <td className="px-4 py-3 text-gray-700 text-xs dark:text-gray-300">
        {new Date(reservation.date).toLocaleDateString("en-GB")}
      </td>

      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <div
            onClick={() => handleViewCustomer(reservation)}
            className="w-8 h-8 rounded-full cursor-pointer bg-blue-100 dark:bg-purple-900 flex items-center justify-center text-blue-600 dark:text-white text-xs font-bold"
          >
            {reservation.customerId?.customerName
              ?.split(" ")
              ?.map(name => name[0])
              .join("")
              .toUpperCase() || "C"}
          </div>
          <span className="text-gray-700 hidden sm:block dark:text-gray-300 text-sm">
            {reservation.customerId?.customerName || "Unknown"}
          </span>
        </div>
      </td>

      <td className="px-4 py-3 hidden sm:table-cell text-gray-700 dark:text-gray-300">
        {reservation.serviceId?.serviceName || "General Service"}
      </td>

      <td className="px-4 py-3 hidden sm:table-cell">
        <span className={`px-3 py-1 inline-block rounded-full text-xs font-medium ${getStatusColor(reservation.status)}`}>
          {reservation.status || "Pending"}
        </span>
      </td>

      <td className="px-4 py-3">
        <div className="flex items-center justify-center gap-2">
          {reservation.status === "confirmed" && (
            <button
              onClick={() => {
                setVisibleCompleteModel(true);
                setSelectedReservation(reservation);
              }}
              className="p-2 cursor-pointer text-white bg-blue-400 dark:bg-purple-400 hover:bg-blue-600 dark:hover:bg-purple-600 rounded-lg transition-colors"
            >
              <IoMdDoneAll />
            </button>
          )}

          {reservation.status === "pending" && (
            <>
              <button
                onClick={() => {
                  setSelectedReservation(reservation);
                  setVisibleAcceptModel(true);
                }}
                className="p-2 text-green-500 cursor-pointer dark:text-white bg-green-100 dark:bg-green-400 hover:text-green-700 dark:hover:text-white hover:bg-green-200 dark:hover:bg-green-600 rounded-lg transition-colors"
              >
                <FaCheck />
              </button>

              <button
                onClick={() => {
                  setSelectedReservation(reservation);
                  setVisibleDeleteModel(true);
                }}
                className="p-2 text-red-500 cursor-pointer dark:text-white bg-red-100 dark:bg-red-400 hover:text-red-700 dark:hover:text-white hover:bg-red-200 dark:hover:bg-red-600 rounded-lg transition-colors"
              >
                <FaTimes />
              </button>
            </>
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <div className="p-1 sm:p-6 dark:text-white">
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

      {/* Quick stats strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {CATEGORY_ORDER.filter(c => c.key !== 'past').map((cat) => (
          <div
            key={cat.key}
            className={`bg-white dark:bg-gray-800 rounded-xl border ${cat.border} p-3 shadow-sm`}
          >
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
              {cat.emoji} {cat.label}
            </p>
            <p className={`text-2xl font-bold ${cat.color}`}>
              {groupedReservations[cat.key]?.length || 0}
            </p>
          </div>
        ))}
      </div>

      {/* Grouped bookings */}
      {reservation.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-10 text-center">
          <span className="text-4xl">📭</span>
          <p className="font-medium mt-2">No bookings found</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            You don't have any bookings yet.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {CATEGORY_ORDER.map((cat) => {
            const items = groupedReservations[cat.key];
            if (!items || items.length === 0) return null;

            return (
              <div key={cat.key} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                {/* Section header */}
                <div className={`px-4 py-3 flex items-center justify-between border-l-4 ${cat.border} border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/40`}>
                  <div className="flex items-center gap-2">
                    <span className="text-lg text-green-600">{cat.emoji}</span>
                    <h2 className={`font-semibold ${cat.color}`}>
                      {cat.label}
                    </h2>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300">
                      {items.length}
                    </span>
                  </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 dark:bg-gray-700/30 border-b border-gray-200 dark:border-gray-600">
                        <th className="px-4 py-2 hidden sm:table-cell text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">No.</th>
                        <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Date</th>
                        <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Customer</th>
                        <th className="px-4 py-2 hidden sm:table-cell text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Service</th>
                        <th className="px-4 py-2 hidden sm:table-cell text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Status</th>
                        <th className="px-4 py-2 text-center text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((r, i) => renderBookingRow(r, i))}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })}
        </div>
      )}

   
      {/* Customer Details Modal */}
      {detailsVisible && selectedCustomer && (
        <>
          <div
            className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
            onClick={handleCloseModal}
          ></div>
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] max-w-md max-h-[90vh] overflow-y-auto animate-scale-in">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
              <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 dark:from-purple-700 dark:to-blue-800 px-6 pt-8 pb-12">
                <div className="flex justify-center">
                  <div className="flex items-center gap-3">
                    <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 z-50">
                      <div className="w-24 h-24 rounded-full dark:bg-gray-700 flex items-center justify-center font-bold text-3xl border-4 border-white dark:border-gray-800 text-blue-800 bg-blue-100 dark:text-white">
                        {selectedCustomer?.customerName?.split(' ')?.map(name => name[0]).join("").toUpperCase() || 'C'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-14 px-6 pb-4 space-y-4">
                <div className="text-center mb-4">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                    {selectedCustomer?.customerName || 'Customer'}
                  </h3>
                  <span className="inline-block mt-1 bg-blue-100 dark:bg-purple-900/50 text-blue-700 dark:text-purple-300 text-xs font-semibold px-3 py-1 rounded-full border border-blue-200 dark:border-purple-700/30">
                    {selectedCustomer?.role || 'Customer'}
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                    <FaUserCircle className="text-blue-500 dark:text-blue-400 text-lg flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Full Name</p>
                      <p className="text-sm text-gray-800 dark:text-white font-medium truncate">
                        {selectedCustomer?.customerName || 'N/A'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                    <FaEnvelope className="text-blue-500 dark:text-blue-400 text-lg flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Email</p>
                      <p className="text-sm text-gray-800 dark:text-white break-all">
                        {selectedCustomer?.customerEmail || 'N/A'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                    <FaPhone className="text-green-500 dark:text-green-400 text-lg flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Phone</p>
                      <p className="text-sm text-gray-800 dark:text-white">
                        {selectedCustomer?.customerPhone || 'N/A'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                    <FaMapMarkerAlt className="text-red-500 dark:text-red-400 text-lg flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Address</p>
                      <p className="text-sm text-gray-800 dark:text-white truncate">
                        {selectedCustomer?.customerAddress || 'N/A'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                    <FaInfoCircle className="text-purple-500 dark:text-purple-400 text-lg flex-shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Description</p>
                      <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
                        {selectedCustomer?.description || 'No description available'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <p className="text-xs text-center text-gray-400 dark:text-gray-500">
                    Customer since: {selectedCustomer?.createdAt
                      ? new Date(selectedCustomer.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
                      : 'N/A'}
                  </p>
                </div>
              </div>

              <div className="px-6 py-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/30">
                <button
                  onClick={handleCloseModal}
                  className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg transition duration-200 shadow-md hover:shadow-lg"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* accept booking model */}
      {visibleAcceptModel && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-11/12 sm:w-96">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Accept Booking</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">Are you sure you want to accept this Booking?</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setVisibleAcceptModel(false)}
                className="px-4 py-2 cursor-pointer text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAccept}
                className="px-4 py-2 cursor-pointer bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}

      {/* reject booking model */}
      {visibleDeleteModel && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-11/12 sm:w-96">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Reject Booking</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">Are you sure you want to Reject this Booking?</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setVisibleDeleteModel(false)}
                className="px-4 py-2 cursor-pointer text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 cursor-pointer bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      )}

      {/* complete booking model */}
      {visibleCompleteModel && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-11/12 sm:w-96">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Complete Booking</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">Are you sure you want to mark this booking as completed?</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setVisibleCompleteModel(false)}
                className="px-4 py-2 cursor-pointer text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleComplete}
                className="px-4 py-2 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Complete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default WorkerMyBookings;