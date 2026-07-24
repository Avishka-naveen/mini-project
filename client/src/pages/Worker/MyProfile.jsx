import React, { useContext } from 'react';
import { AppContext } from '../../Context/Appcontext';
import {
    FaEnvelope,
    FaPhone,
    FaMapMarkerAlt,
    FaUser,
    FaCalendarAlt,
    FaIdCard,
    FaStar,
    FaClock,
    FaBriefcase,
    FaEdit,
    FaUserCircle
} from 'react-icons/fa';

function MyProfile() {
    const { currentWorkerData } = useContext(AppContext);

    // Helper function to format date
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    // Get initials
    const getInitials = (name) => {
        if (!name) return 'W';
        return name.charAt(0).toUpperCase();
    };



    return (
        <div className="bg-white  dark:bg-gray-800 rounded-2xl  border border-gray-200 dark:border-gray-700 overflow-hidden">

            {/* Cover Image */}
            <div className="relative h-45 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-purple-700 dark:to-blue-800">
                {/* Profile Avatar */}
                <div className="absolute -bottom-12 left-6">
                    <div className="w-50 h-50 rounded-full bg-white dark:bg-gray-800 
                          flex items-center justify-center text-4xl font-bold 
                          text-blue-600 dark:text-purple-400  
                          border-4 border-white dark:border-gray-800">
                        {currentWorkerData?.profile ? (
                            <img
                                src={currentWorkerData?.profile}
                                alt="Profile"
                                className="w-full h-full rounded-full object-cover"
                            />
                        ) : (
                            getInitials(currentWorkerData?.customerId?.customerName)
                        )}
                    </div>
                </div>

                {/* Edit Button */}
                <button className="absolute top-3 right-3 bg-white/20 hover:bg-white/30 
                         text-white p-2 rounded-lg transition-colors">
                    <FaEdit className="w-4 h-4" />
                </button>
            </div>

            {/* Profile Content */}
            <div className="pt-14 px-6 pb-6">
                {/* Name & Role */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white capitalize">
                            {currentWorkerData?.customerId?.customerName || 'Worker'}
                        </h2>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="inline-block bg-blue-100 dark:bg-purple-900/50 
                             text-blue-700 dark:text-purple-300 
                             text-xs font-semibold px-3 py-1 rounded-full 
                             border border-blue-200 dark:border-purple-700/30">
                                {currentWorkerData?.customerId?.role || 'Worker'}
                            </span>

                        </div>
                    </div>


                </div>

                {/* Stats Grid */}
                <div className="grid  mb-6">
                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 text-left">
                        <p className="text-lg font-bold text-gray-800 dark:text-white">
                            <span className="text-xs text-gray-500 dark:text-gray-400">Total Services</span> 1
                        </p>

                    </div>



                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {/* Email */}
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/30">
                        <FaEnvelope className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                        <div>
                            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Email</p>
                            <p className="text-sm text-gray-800 dark:text-white">
                                {currentWorkerData?.customerId?.customerEmail || 'N/A'}
                            </p>
                        </div>
                    </div>

                    {/* Phone */}
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/30">
                        <FaPhone className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5" />
                        <div>
                            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Phone</p>
                            <p className="text-sm text-gray-800 dark:text-white">
                                {currentWorkerData?.customerId?.customerPhone || 'N/A'}
                            </p>
                        </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/30">
                        <FaMapMarkerAlt className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
                        <div>
                            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Location</p>
                            <p className="text-sm text-gray-800 dark:text-white">
                                {currentWorkerData?.address || currentWorkerData?.location || 'N/A'}
                            </p>
                        </div>
                    </div>

                    {/* nic */}
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/30">
                        <FaIdCard className="w-5 h-5 text-purple-600 dark:text-purple-400 mt-0.5" />
                        <div>
                            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">NIC</p>
                            <div className="flex flex-wrap gap-1 mt-0.5 dark:text-white">
                                {currentWorkerData?.nic}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bio */}
                {currentWorkerData?.description && (
                    <div className="mb-6 p-4 rounded-lg bg-gray-50 dark:bg-gray-700/30">
                        <p className=" font-bold text-gray-900 dark:text-gray-300 mb-1">About Me</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                            {currentWorkerData?.description || 'No description provided'}
                        </p>
                    </div>
                )}

                {/* Joined Date */}
                <div className="flex items-center gap-2 text-xs text-gray-800 dark:text-gray-500 border-t border-gray-200 dark:border-gray-700 pt-4">
                    <FaCalendarAlt className="w-3 h-3" />
                    <span>Joined {formatDate(currentWorkerData?.createdAt)}</span>



                </div>
            </div>
        </div>
    );
}

export default MyProfile;