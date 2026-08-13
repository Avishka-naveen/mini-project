import React, { useContext, useEffect, useState } from 'react';
import { dummyManageServicesData } from '../../assets/dummyData';
import {
  FaSearch, FaEye, FaEdit, FaTrash, FaMapMarkerAlt,
  FaPhone, FaWrench, FaDollarSign, FaUserCircle,
  FaStar, FaComment, FaClipboardList
} from 'react-icons/fa';
import axios from 'axios';
import { AppContext } from '../../Context/Appcontext';

function AdminManageServices() {
  const [services, setServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSkill, setFilterSkill] = useState('all');
  const [selectedService, setSelectedService] = useState('');
  const [viewDetailsModel, setViewDetailsModel] = useState(false);
  const [comments, setComments] = useState('');
  const { backendUrl } = useContext(AppContext);

  const fetchServices = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/admin/getAllServices');
      if (response.data.success) {
        setServices(response.data.services);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

 // call get comment  function
  const getComment = async (serviceId) => {
    try {
      const response = await axios.post(
        backendUrl + '/api/admin/getAllComment',
        {
          serviceId: serviceId
        }
      );

      if (response.data.success) {
        setComments(response.data.comments);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const filteredServices = services.filter(service => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch =
      service.serviceName?.toLowerCase().includes(searchLower) 

    return matchesSearch;
  });

  return (
    <div className="p-4 sm:p-6 dark:text-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <div className='flex gap-2 justify-center'>
            <p className='text-4xl'><FaClipboardList /></p>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
              Manage Services
            </h1>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            View and manage all service offerings
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Total: <span className="font-semibold text-gray-800 dark:text-white">{filteredServices.length}</span>
          </span>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search services by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg
                     bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                     focus:ring-2 focus:ring-blue-500 dark:focus:ring-purple-500 focus:border-transparent
                     outline-none transition duration-200"
          />
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
       
        {filteredServices.length > 0 ? (
          filteredServices.map((service) => (
            <div
              key={service._id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700
                       hover:shadow-xl hover:border-blue-300 dark:hover:border-purple-500 
                       transition-all duration-300 overflow-hidden"
            >
              {/* Card Header */}
              <div className="p-4 border-b border-gray-100 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-blue-100/50 dark:from-gray-700/50 dark:to-gray-700/30">
                <div className="flex justify-between items-start">
                  <div className='flex flex-col gap-1 justify-center items-center'>
                    <h3 className="font-bold text-lg text-gray-800 dark:text-white">
                      {service.serviceName}
                    </h3>
                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium">
                      {service.serviceSkill}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 space-y-3">
                {/* Price */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                    <FaDollarSign className="text-green-500" /> Price
                  </span>
                  <span className="text-xl font-bold text-green-600 dark:text-green-400">
                    LKR {service.price?.toLocaleString()}
                  </span>
                </div>

                {/* Location */}
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                  <FaMapMarkerAlt className="text-red-500 dark:text-red-400" />
                  <span>{service.serviceLocation}</span>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                  <FaPhone className="text-blue-500 dark:text-blue-400" />
                  <span>{service.servicePhone}</span>
                </div>

                {/* Worker */}
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                  <FaUserCircle className="text-purple-500 dark:text-purple-400" />
                  <h1>Worker Name: <span className='font-bold'>{service.workerId?.customerId?.customerName}</span></h1>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 line-clamp-2">
                  {service.serviceDescription}
                </p>

                {/* Comments & Rating */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-700">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                      <FaComment className="text-blue-500" />
                    </span>
                    <span className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                      <FaStar className="text-yellow-500" />
                      {service.rating}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Footer - Actions */}
              <div className="p-3 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/30">
                <div className="flex items-center justify-around">
                  <button
                    onClick={() => { setViewDetailsModel(true); setSelectedService(service); getComment(service._id) }}
                    className="flex items-center gap-1 px-3 py-1.5 text-blue-600 dark:text-blue-400 
                             hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors text-sm"
                  >
                    <FaEye /> View
                  </button>

                  <button
                    onClick={() => setSelectedService(service)}
                    className="flex items-center gap-1 px-3 py-1.5 text-red-600 dark:text-red-400 
                             hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors text-sm"
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-16 text-gray-500 dark:text-gray-400">
            <span className="text-6xl mb-4">📭</span>
            <p className="text-xl font-medium">No services found</p>
            <p className="text-sm mt-1">Try adjusting your search or filter.</p>
          </div>
        )}
      </div>

      {/* View Service Modal */}
      {viewDetailsModel && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
            <div className="sticky top-0 bg-white dark:bg-gray-800 rounded-t-2xl border-b border-gray-200 dark:border-gray-700 px-6 py-4 z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9.1-1.638M21 13.255V17.9a2.997 2.997 0 01-2.997 2.997H15.003a2.997 2.997 0 01-2.997-2.997V13.25m6-7.25a2.997 2.997 0 01-2.997 2.997H15.003a2.997 2.997 0 01-2.997-2.997M6 6.5V9m0 0a2.5 2.5 0 005 0m-5 0a2.5 2.5 0 005 0m-2.5 0A2.5 2.5 0 015 6.5 2.5 2.5 0 018.5 9m0 0V6.5a2.5 2.5 0 015 0m0 0A2.5 2.5 0 0111 9m-2.5 0A2.5 2.5 0 018.5 11.5m0 0A2.5 2.5 0 0111 9m0 0a2.5 2.5 0 012.5 2.5 2.5 2.5 0 01-5 0m0 0v5.5" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                      Service Details
                    </h2>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      View complete service information
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => { setSelectedService(''); setViewDetailsModel(false) }}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {/* Service Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Service Name */}
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-3">
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Service Name
                  </p>
                  <p className="text-sm font-semibold text-gray-800 dark:text-white mt-1">
                    {selectedService?.serviceName || 'N/A'}
                  </p>
                </div>

                {/* Price */}
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-3">
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Price
                  </p>
                  <p className="text-lg font-bold text-green-600 dark:text-green-400 mt-1">
                    LKR {selectedService?.price || 'N/A'}
                  </p>
                </div>

                {/* Location */}
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-3">
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Location
                  </p>
                  <p className="text-sm text-gray-800 dark:text-white mt-1">
                    {selectedService?.serviceLocation || selectedService?.location || 'N/A'}
                  </p>
                </div>

                {/* Skill */}
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-3">
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Skill
                  </p>
                  <p className="text-sm text-gray-800 dark:text-white mt-1">
                    {selectedService?.serviceSkill || selectedService?.skill || 'N/A'}
                  </p>
                </div>

                {/* Phone */}
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-3">
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Phone
                  </p>
                  <p className="text-sm text-gray-800 dark:text-white mt-1">
                    {selectedService?.servicePhone || selectedService?.phone || 'N/A'}
                  </p>
                </div>

                {/* Created At */}
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-3">
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Created At
                  </p>
                  <p className="text-sm text-gray-800 dark:text-white mt-1">
                    {selectedService?.createdAt
                      ? new Date(selectedService.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })
                      : 'N/A'
                    }
                  </p>
                </div>

                {/* Description - Full Width */}
                <div className="md:col-span-2 bg-gray-50 dark:bg-gray-700/50 rounded-xl p-3">
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Description
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1 leading-relaxed">
                    {selectedService?.serviceDescription || selectedService?.description || 'No description provided'}
                  </p>
                </div>
              </div>

              {/* Comments Section */}
              {comments.length > 0 && (
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                      💬 Comments
                      <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs px-2 py-0.5 rounded-full">
                        {comments.length}
                      </span>
                    </h3>
                  </div>

                  <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
                    {comments.map((comment, idx) => (
                      <div
                        key={idx}
                        className="bg-gray-50 dark:bg-gray-700/30 rounded-xl p-3 border border-gray-100 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                            {comment.customerId?.customerName?.[0]?.toUpperCase() || 'U'}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <p className="text-sm font-medium text-gray-800 dark:text-white">
                                {comment.customerId?.customerName || comment.user || 'Anonymous'}
                              </p>
                              <span className="text-xs text-gray-400 dark:text-gray-500">•</span>
                              <p className="text-xs text-gray-400 dark:text-gray-500">
                                {comment.createdAt
                                  ? new Date(comment.createdAt).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric'
                                  })
                                  : 'N/A'
                                }
                              </p>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mt-0.5">
                              {comment.comment}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* No Comments Message */}
              {comments.length === 0 && (
                <div className="mt-6 text-center py-4">
                  <p className="text-sm text-gray-400 dark:text-gray-500">
                    💬 No comments yet
                  </p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-white dark:bg-gray-800 rounded-b-2xl border-t border-gray-200 dark:border-gray-700 px-6 py-4">
              <div className="flex gap-3">
                <button
                  onClick={() => { setSelectedService(null); setViewDetailsModel(false) }}
                  className="flex-1 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 
                           text-white font-medium rounded-xl transition duration-200 shadow-md hover:shadow-lg"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="mt-6 px-4 py-3 bg-gray-100 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
          {/* UPDATED FOOTER TO SHOW FILTERED LENGTH */}
          <span>Showing {filteredServices.length} service(s)</span>
          <span>Last updated: {new Date().toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
}

export default AdminManageServices;