import React, { useContext, useEffect, useState } from 'react';
import { usersDummmyData } from '../../assets/dummyData';
import { FaTimes, FaExclamationTriangle, FaInfoCircle, FaMapMarkerAlt, FaPhone, FaUserCircle, FaEye, FaTrash, FaEdit, FaSearch, FaEnvelope, FaUserPlus, FaUsers } from 'react-icons/fa';
import axios from 'axios';
import { AppContext } from '../../Context/Appcontext';
import { toast } from 'react-toastify';

function AdminManageUsers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [usersData, setUsersData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(false);
  const [detailsVisible, setdetailsVisible] = useState(false);
  const [deleteModelVisible, setdeleteModelVisible] = useState(false);

  const { backendUrl } = useContext(AppContext);


  //console.log(selectedUser._id);

  const fetchUsersData = async () => {
    try {
      const response = await axios.get(
        backendUrl + "/api/admin/getAllUsersData"
      );

      if (response.data.success) {
        setUsersData(response.data.users);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsersData();
  }, []);


  const filteredUsers = usersData.filter(user => {
    const matchesSearch =
      user.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.customerEmail?.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearch;
  });

  //------------------delete user function-----------------//
  const handleDelete = async () => {
    //console.log(selectedUser._id);

    try {
      let response;
      response = await axios.post(backendUrl + "/api/admin/deleteCustomer", { customerId: selectedUser._id }, { withCredentials: true });
      if (response.data.success) {
        toast.success(response.data.message);
        setSelectedUser('');
        fetchUsersData();
        setdeleteModelVisible(false);
      }


    } catch (error) {
      console.log(error);
    }

  };

  return (
    <div className="p-4 sm:p-6 dark:text-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <div className='flex justify-center gap-2'>
            <p className='text-4xl'> <FaUsers /></p>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
              Manage Users
            </h1>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            View and manage all registered users
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Total: <span className="font-semibold text-gray-800 dark:text-white">{usersData.length}</span>
          </span>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg
                      bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                      focus:ring-2 focus:ring-blue-500 dark:focus:ring-purple-500 focus:border-transparent
                      outline-none transition duration-200"
          />
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
        {/* Responsive Table Wrapper */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                {/* FIX: Changed sm:block to sm:table-cell */}
                <th className="px-4 py-3 text-left text-xs font-semibold  text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  No.
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  User
                </th>
                {/* FIX: Changed sm:block to sm:table-cell */}
                <th className="px-4 py-3 text-left text-xs hidden sm:table-cell font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  Email
                </th>
                {/* FIX: Changed sm:block to sm:table-cell */}
                <th className="px-4 py-3 text-left text-xs hidden sm:table-cell font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  Joined At
                </th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user, index) => (
                  <tr
                    key={user.id || index}
                    className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200"
                  >
                    {/* FIX: Changed sm:block to sm:table-cell */}
                    <td className="px-4 py-3  text-gray-800 dark:text-gray-200 font-medium">
                      {String(index + 1).padStart(2, '0')}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                       
                        <div
                          onClick={() => { setdetailsVisible(true); setSelectedUser(user); }}
                          className={`cursor-pointer flex items-center justify-center text-white h-8 w-8 rounded-full ${user.role === 'worker' ? "bg-green-500 dark:bg-green-600" : "bg-blue-500 dark:bg-purple-500"}`}
                        >
                          <p>{user.customerName ? user.customerName[0] :''}</p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-800 dark:text-white">
                            {user.customerName }
                          </p>
                        </div>
                      </div>
                    </td>
                    
                    <td className="px-4 py-3 hidden sm:table-cell text-gray-600 dark:text-gray-300">
                      {user.customerEmail }
                    </td>
                    <td className="px-4 hidden sm:table-cell py-3 text-gray-700 dark:text-gray-300 text-xs">
                      {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-2">
                        {/* Delete Button */}
                        <button
                          onClick={() => { setdeleteModelVisible(true); setSelectedUser(user) }}
                          className="p-2 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 
                                     hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                          title="Delete User"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-4xl">📭</span>
                      <p className="font-medium">No users found</p>
                      <p className="text-sm">Try adjusting your search or filter.</p>
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
            <span>Showing {filteredUsers.length} of {usersData?.length || 0} user(s)</span>
            <span>Last updated: {new Date().toLocaleDateString()}</span>
          </div>
        </div>
      </div>


      {/* Customer Details Modal */}
      {detailsVisible && selectedUser && (
        <>
          {/* Backdrop */}
          <div
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
                        {selectedUser?.customerName?.split(' ')?.map(name => name[0]).join("").toUpperCase() || 'C'}
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
                    {selectedUser?.customerName || 'Customer'}
                  </h3>
                  <span className="inline-block mt-1 bg-blue-100 dark:bg-purple-900/50 
                                 text-blue-700 dark:text-purple-300 
                                 text-xs font-semibold px-3 py-1 rounded-full 
                                 border border-blue-200 dark:border-purple-700/30">
                    {selectedUser?.role || 'Customer'}
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
                        {selectedUser?.customerName || 'N/A'}
                      </p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                    <FaEnvelope className="text-blue-500 dark:text-blue-400 text-lg flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Email</p>
                      <p className="text-sm text-gray-800 dark:text-white break-all">
                        {selectedUser?.customerEmail || 'N/A'}
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                    <FaPhone className="text-green-500 dark:text-green-400 text-lg flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Phone</p>
                      <p className="text-sm text-gray-800 dark:text-white">
                        {selectedUser?.customerPhone || 'N/A'}
                      </p>
                    </div>
                  </div>





                </div>

                {/* Additional Info */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <p className="text-xs text-center text-gray-400 dark:text-gray-500">
                    Customer since: {selectedUser?.createdAt
                      ? new Date(selectedUser.createdAt).toLocaleDateString('en-US', {
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
                  onClick={() => setdetailsVisible(false)}
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

      {/* delete customer model */}
      {deleteModelVisible && (
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
                      Delete User
                    </h2>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Are you sure you want to Delete?
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
                  Yes, Delete user
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>

  );
}

export default AdminManageUsers;