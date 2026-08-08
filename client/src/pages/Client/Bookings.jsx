import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../Components/customer/NavBar';
import Footer from '../../Components/customer/Footer';
import { bookingDummyData } from '../../assets/dummyData';
import { AppContext } from '../../Context/Appcontext';
import axios from 'axios';
import Rate from '../../Components/customer/Rate';
import { FaTimes, FaExclamationTriangle } from 'react-icons/fa';
import { toast } from 'react-toastify';

function Bookings() {

  const { backendUrl } = useContext(AppContext)
  const navigate = useNavigate();
  const [reservations, setReservations] = React.useState('');
  const [addRatingModalVisible, setAddRatingModalVisible] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState('');
  const [cancelModalVisible, setcancelModalVisible] = useState(false);

  //console.log(selectedReservation);


  // Status color mapping
  const getStatusColor = (status) => {
    const statusMap = {
      'pending': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
      'confirmed': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
      'completed': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
      'cancelled': 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
      'rejected': 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
    };
    return statusMap[status] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
  };

  //----------call get reservation function --------------------//

  const fetchReservations = async () => {
    try {
      let response;
      response = await axios.get(backendUrl + '/api/customer/myReservations', { withCredentials: true });
      if (response.data.success) {
        setReservations(response.data.reservations);
      }
      //console.log(response.data.reservations);
    } catch (error) {
      console.error("Error fetching reservations:", error);
    }
  }

  useEffect(() => {
    fetchReservations();
  }, []);


  //------------------call delete booking function------------//

  const handleDeleteBooking = async (e) => {
    e.preventDefault();
    try {
      let response;
      response = await axios.post(backendUrl + "/api/customer/cancellbooking", { reservationId: selectedReservation._id }, { withCredentials: true });
      if (response.data.success) {
        setSelectedReservation('');
        toast.success(response.data.message);
        fetchReservations();
        setcancelModalVisible(false);
      }

    } catch (error) {
      toast.error(error.message);
    }

  }
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-[#1e1e1e] text-black dark:text-white">
      <NavBar />

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
              My Bookings
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              View and manage all your booking requests
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Total: <span className="font-semibold text-gray-800 dark:text-white">{reservations.length}</span>
            </span>
            <button onClick={() => navigate('/customer/workerList')} className="bg-blue-600 hover:bg-blue-700 dark:bg-purple-600 dark:hover:bg-purple-700 
                             text-white px-4 py-2 rounded-lg text-sm font-medium transition duration-300
                             shadow-md hover:shadow-lg">
              + New Booking
            </button>
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">

          {/* Responsive Table Wrapper */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase hidden sm:block tracking-wider">
                    No.
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                    Worker
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>

                </tr>
              </thead>
              <tbody>
                {reservations.length > 0 ? (
                  reservations.map((booking, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200"
                    >
                      <td className="px-4 py-3 hidden sm:block  text-gray-800 dark:text-gray-200 font-medium">
                        {String(index + 1)}
                      </td>
                      <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                        {new Date(booking.date).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">

                          <span className="text-gray-700 dark:text-gray-300">
                            {/* {booking.serviceId || 'Unknown Worker'} */}
                            <button onClick={() => navigate(`/customer/workerDetails/${booking.serviceId?._id}`)} className="cursor-pointer bg-blue-600 dark:bg-purple-600 hover:bg-blue-600 text-white py-1 px-3 rounded-md text-sm">
                              View Profile
                            </button>
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-3 py-2 rounded-md text-xs cursor-pointer font-medium ${getStatusColor(booking.status)}`}>
                          {booking.status}
                        </span>
                        {
                          booking.status === 'pending' && (
                            <button onClick={() => { setSelectedReservation(booking); setcancelModalVisible(true) }} className="ml-2 bg-red-600 cursor-pointer hover:bg-red-700 text-white px-2 py-1 rounded-md text-xs">
                              Cancel
                            </button>
                          )
                        }
                        {
                          booking.status === 'completed' && (
                            <button onClick={() => { setAddRatingModalVisible(true); setSelectedReservation(booking) }} className="ml-2 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-100 px-2 py-1 rounded-md text-xs cursor-pointer">
                              Add Rate
                            </button>
                          )
                        }
                      </td>

                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                      <div className="flex flex-col items-center gap-2">
                        <span className="text-4xl">📭</span>
                        <p className="font-medium">No bookings found</p>
                        <p className="text-sm">You haven't made any bookings yet.</p>
                        <button className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm">
                          Browse Workers
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-600">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <span>Showing {reservations.length} booking(s)</span>
            </div>
          </div>
        </div>
      </main>

      {/* add reating and comment model */}
      {addRatingModalVisible && (
        <Rate addRatingModalVisible={addRatingModalVisible} setAddRatingModalVisible={setAddRatingModalVisible} selectedReservation={selectedReservation} />
      )}
      +
      {/* Cancel Booking Modal */}
      {cancelModalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4 animate-fade-in">

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
                      Cancel Booking
                    </h2>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Are you sure you want to cancel?
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setcancelModalVisible(false);

                  }}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <FaTimes className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 mb-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Date</span>
                    <span className="text-gray-800 dark:text-white">
                      {new Date(selectedReservation.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Status</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium  ${getStatusColor(selectedReservation.status)}`}>

                      {selectedReservation.status}
                    </span>
                  </div>
                </div>
              </div>

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
                    setcancelModalVisible(false);

                  }}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 
                           text-gray-700 dark:text-gray-200 font-medium transition duration-200"
                >
                  Keep Booking
                </button>
                <button onClick={handleDeleteBooking} className="flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-red-700 
                           hover:from-red-700 hover:to-red-800 text-white font-medium 
                           transition duration-200 shadow-md hover:shadow-lg
                           flex items-center justify-center gap-2
                           disabled:opacity-50 disabled:cursor-not-allowed">
                  Yes, Cancel Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default Bookings;