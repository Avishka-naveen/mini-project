import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../Components/customer/NavBar';
import Footer from '../../Components/customer/Footer';
import { AppContext } from '../../Context/Appcontext';
import axios from 'axios';
import Rate from '../../Components/customer/Rate';
import {
  FaTimes, FaExclamationTriangle, FaEye, FaStar, FaEdit,
  FaCalendarAlt, FaClipboardList, FaFlag,FaCopy
} from 'react-icons/fa';
import { toast } from 'react-toastify';

function Bookings() {
  const { backendUrl } = useContext(AppContext);
  const navigate = useNavigate();

  const [reservations, setReservations] = useState([]);
  const [addRatingModalVisible, setAddRatingModalVisible] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [cancelModalVisible, setcancelModalVisible] = useState(false);
  const [reportModalVisible, setReportModalVisible] = useState(false);
  const [reportReason, setReportReason] = useState('');

  // ---------- Status color ----------
  const getStatusColor = (status) => {
    const map = {
      pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
      confirmed: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
      completed: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
      cancelled: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
      rejected: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
    };
    return map[status] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
  };

  // ---------- Fetch ----------
  const fetchReservations = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/customer/myReservations', { withCredentials: true });
      if (response.data.success) setReservations(response.data.reservations);
    } catch (error) {
      console.error('Error fetching reservations:', error);
    }
  };

  useEffect(() => { fetchReservations(); }, []);

  // ---------- Cancel ----------
  const handleDeleteBooking = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        backendUrl + '/api/customer/cancellbooking',
        { reservationId: selectedReservation._id },
        { withCredentials: true }
      );
      if (response.data.success) {
        setSelectedReservation(null);
        toast.success(response.data.message);
        fetchReservations();
        setcancelModalVisible(false);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // ---------- Report ----------
  const handleReport = async (e) => {
    e.preventDefault();
    if (!reportReason.trim()) {
      toast.error('Please describe the issue before submitting.');
      return;
    }
    console.log("workerID----",selectedReservation.workerId)
    console.log("services id----",selectedReservation.serviceId._id)
    console.log(reportReason)
    try {
      const response = await axios.post(backendUrl + '/api/customer/reportWorker',{
          workerId: selectedReservation.workerId,
          serviceId: selectedReservation.serviceId._id,
          reason: reportReason,
        },
        { withCredentials: true }
      );
      if (response.data.success) {
        toast.success('Report submitted. Our team will review it.');
        setReportModalVisible(false);
        setReportReason('');
      } else {
        toast.error(response.data.message || 'Failed to submit report.');
      }
    } catch (error) {
      toast.error(error.message || 'Error submitting report.');
    }
  };
  //console.log(selectedReservation)

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-[#1e1e1e] text-black dark:text-white">
      <NavBar />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
        {/* ---------- Header ---------- */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <FaClipboardList className="text-2xl text-blue-600 dark:text-purple-500" />
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
                My Bookings
              </h1>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              <span
                className="cursor-pointer hover:text-blue-500 dark:hover:text-purple-500"
                onClick={() => navigate('/customer/workerList')}
              >
                Worker List
              </span>{' '}
              / My Bookings
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Total: <span className="font-semibold text-gray-800 dark:text-white">{reservations.length}</span>
            </span>
            <button
              onClick={() => navigate('/customer/workerList')}
              className="bg-blue-600 hover:bg-blue-700 dark:bg-purple-600 dark:hover:bg-purple-700
                         text-white px-4 py-2 rounded-lg text-sm font-medium
                         transition duration-300 shadow-md hover:shadow-lg"
            >
              + New Booking
            </button>
          </div>
        </div>

        {/* ---------- Table ---------- */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider hidden sm:table-cell">
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
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {reservations.length > 0 ? (
                  reservations.map((booking, index) => (
                    <tr
                      key={booking._id || index}
                      className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                    >
                      <td className="px-4 py-3 hidden sm:table-cell text-gray-800 dark:text-gray-200 font-medium">
                        {String(index + 1).padStart(2, '0')}
                      </td>

                      <td className="px-4 py-3 text-gray-700 dark:text-gray-300 whitespace-nowrap">
                        {new Date(booking.date).toLocaleDateString('en-GB')}
                      </td>

                      <td className="px-4 py-3">
                        <button
                          onClick={() => navigate(`/customer/workerDetails/${booking.serviceId?._id}`)}
                          className="flex items-center gap-1.5 bg-blue-600 dark:bg-purple-600
                                     hover:bg-blue-700 dark:hover:bg-purple-700
                                     text-white px-3 py-1.5 rounded-md text-xs font-medium transition-colors"
                        >
                          <FaEye /> View Profile
                        </button>
                      </td>

                      <td className="px-4 py-3">
                        <span className={`inline-block px-3 py-1 rounded-md text-xs font-medium ${getStatusColor(booking.status)}`}>
                          {booking.status}
                        </span>
                      </td>

                      {/* Actions column — one consistent place for all buttons */}
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap items-center gap-2">
                          {booking.status === 'pending' && (
                            <button
                              onClick={() => {
                                setSelectedReservation(booking);
                                setcancelModalVisible(true);
                              }}
                              className="bg-red-600 hover:bg-red-700 text-white px-2.5 py-1 rounded-md text-xs font-medium transition-colors"
                            >
                              Cancel
                            </button>
                          )}

                          {booking.status === 'completed' && booking.isComment === false && (
                            <button
                              onClick={() => {
                                setAddRatingModalVisible(true);
                                setSelectedReservation(booking);
                              }}
                              className="flex items-center gap-1 bg-slate-200 hover:bg-slate-300
                                         dark:bg-slate-700 dark:hover:bg-slate-600
                                         text-slate-700 dark:text-slate-100 px-2.5 py-1 rounded-md text-xs font-medium transition-colors"
                            >
                              <FaStar className="text-yellow-500" /> Add Rate
                            </button>
                          )}

                          {booking.status === 'completed' && booking.isComment === true && (
                            <button
                              onClick={() => navigate(`/customer/workerDetails/${booking.serviceId?._id}?openComment=true`)}
                              className="flex items-center gap-1 bg-gray-400 hover:bg-gray-500 text-white
                                         px-2.5 py-1 rounded-md text-xs font-medium transition-colors"
                            >
                              <FaEdit /> Edit Rating
                            </button>
                          )}

                          {/* Report — available for confirmed/completed bookings */}
                          {(booking.status === 'confirmed' || booking.status === 'completed') && (
                            <button
                              onClick={() => {
                                setSelectedReservation(booking);
                                setReportModalVisible(true);
                              }}
                              className="flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium
                                         text-red-600 dark:text-red-400
                                         bg-red-50 dark:bg-red-900/20
                                         border border-red-200 dark:border-red-800/40
                                         hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors"
                            >
                              <FaFlag /> Report
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-4 py-12 text-center text-gray-500 dark:text-gray-400">
                      <div className="flex flex-col items-center gap-3">
                        <FaCalendarAlt className="text-5xl opacity-30" />
                        <p className="font-medium text-lg">No bookings found</p>
                        <p className="text-sm">You haven't made any bookings yet.</p>
                        <button
                          onClick={() => navigate('/customer/workerList')}
                          className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                        >
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

      {/* ---------- Rate modal ---------- */}
      {addRatingModalVisible && (
        <Rate
          addRatingModalVisible={addRatingModalVisible}
          setAddRatingModalVisible={setAddRatingModalVisible}
          selectedReservation={selectedReservation}
          fetchReservations={fetchReservations}
        />
      )}

      {/* ---------- Cancel modal ---------- */}
      {cancelModalVisible && selectedReservation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4 animate-fade-in">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md animate-scale-in overflow-hidden">
            <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                    <FaExclamationTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white">Cancel Booking</h2>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Are you sure you want to cancel?</p>
                  </div>
                </div>
                <button
                  onClick={() => setcancelModalVisible(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <FaTimes className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </button>
              </div>
            </div>

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
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedReservation.status)}`}>
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

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setcancelModalVisible(false)}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-medium transition"
                >
                  Keep Booking
                </button>
                <button
                  onClick={handleDeleteBooking}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-medium transition shadow-md hover:shadow-lg"
                >
                  Yes, Cancel Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ---------- Report modal ---------- */}
      {reportModalVisible && selectedReservation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4 animate-fade-in">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md animate-scale-in overflow-hidden">
            <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                    <FaFlag className="w-5 h-5 text-red-600 dark:text-red-400" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white">Report Worker</h2>
                    <h2
                      onClick={() => {{
                        navigator.clipboard.writeText(
                          selectedReservation.serviceId.workerId.workerCode
                        );
                        toast.success("copy code");
                       } }}
                      
                      className="bg-red-500 text-center flex items-center justify-center text-white text-sm rounded-2xl cursor-pointer hover:bg-red-600 px-3 py-1"
                    >
                      {selectedReservation.serviceId.workerId.workerCode}
                      <span className="ml-2 "><FaCopy /></span>
                    </h2>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Let us know what went wrong</p>
                  </div>
                </div>
                <button
                  onClick={() => { setReportModalVisible(false); setReportReason(''); }}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <FaTimes className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Reason for report <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows="4"
                  value={reportReason}
                  onChange={(e) => setReportReason(e.target.value)}
                  placeholder="Describe the issue (e.g. no-show, poor quality, unprofessional behaviour)..."
                  maxLength={500}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl
                             bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white
                             focus:ring-2 focus:ring-red-500 focus:border-transparent
                             outline-none transition resize-none"
                />
                <p className="text-xs text-right text-gray-400 mt-1">{reportReason.length}/500</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => { setReportModalVisible(false); setReportReason(''); }}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-medium transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleReport}
                  disabled={!reportReason.trim()}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-red-700
                             hover:from-red-700 hover:to-red-800 text-white font-medium transition
                             shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Submit Report
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