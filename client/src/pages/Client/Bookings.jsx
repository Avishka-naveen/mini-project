import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../Components/NavBar';
import Footer from '../../Components/Footer';
import { bookingDummyData } from '../../assets/dummyData';

function Bookings() {

  const navigate = useNavigate();
  // Status color mapping
  const getStatusColor = (status) => {
    const statusMap = {
      'Pending': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
      'Confirmed': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
      'Completed': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
      'Cancelled': 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
      'In Progress': 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
    };
    return statusMap[status] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
  };

  console.log(bookingDummyData);

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
              Total: <span className="font-semibold text-gray-800 dark:text-white">{bookingDummyData.length}</span>
            </span>
            <button onClick={()=>navigate('/customer/workerList')} className="bg-blue-600 hover:bg-blue-700 dark:bg-purple-600 dark:hover:bg-purple-700 
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
                {bookingDummyData.length > 0 ? (
                  bookingDummyData.map((booking, index) => (
                    <tr 
                      key={index}
                      className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200"
                    >
                      <td className="px-4 py-3 hidden sm:block  text-gray-800 dark:text-gray-200 font-medium">
                        {String(index + 1)}
                      </td>
                      <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                        {booking.date}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          
                          <span className="text-gray-700 dark:text-gray-300">
                            {/* {booking.serviceId || 'Unknown Worker'} */}
                            <button onClick={() => navigate(`/customer/workerDetails/${booking.serviceId}`)} className="cursor-pointer bg-blue-600 dark:bg-purple-600 hover:bg-blue-600 text-white py-1 px-3 rounded-md text-sm">
                              View Profile
                            </button>
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-3 py-2 rounded-md text-xs cursor-pointer font-medium ${getStatusColor(booking.status)}`}>
                          {booking.status }
                        </span>
                        {
                          booking.status === 'Pending' && (
                            <button className="ml-2 bg-red-600 cursor-pointer hover:bg-red-700 text-white px-2 py-1 rounded-md text-xs">
                              Cancel
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
              <span>Showing {bookingDummyData.length} booking(s)</span>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Bookings;