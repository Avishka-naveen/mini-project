import React, { useState } from 'react';
import {dummyManageServicesData} from '../../assets/dummyData';
import { 
  FaSearch, FaEye, FaEdit, FaTrash, FaMapMarkerAlt, 
  FaPhone, FaWrench, FaDollarSign, FaUserCircle,
  FaStar, FaComment,FaClipboardList
} from 'react-icons/fa';


function AdminManageServices() {
  const [services, setServices] = useState(dummyManageServicesData);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSkill, setFilterSkill] = useState('all');
  const [selectedService, setSelectedService] = useState(null);
 console.log(dummyManageServicesData)
  // Get unique skills for filter
 


  // Handle View Service Details
  const handleView = (service) => {
    setSelectedService(service);
  };

 
  // Filter services based on search and skill
  const filteredServices = services.filter(service => {
    const matchesSearch = 
      service.service_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.location?.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch ;
  });

  // Get comment count
  const getCommentCount = (comments) => {
    return comments?.length || 0;
  };

  

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
            placeholder="Search services by name, description, or location..."
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
              key={service.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700
                       hover:shadow-xl hover:border-blue-300 dark:hover:border-purple-500 
                       transition-all duration-300 overflow-hidden"
            >
              {/* Card Header */}
              <div className="p-4 border-b border-gray-100 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-blue-100/50 dark:from-gray-700/50 dark:to-gray-700/30">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg text-gray-800 dark:text-white">
                      {service.service_name}
                    </h3>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      ID: {service.service_id || service.id}
                    </span>
                  </div>
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium">
                    {service.skill}
                  </span>
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
                  <span>{service.location}</span>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                  <FaPhone className="text-blue-500 dark:text-blue-400" />
                  <span>{service.phone}</span>
                </div>

                {/* Worker */}
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                  <FaUserCircle className="text-purple-500 dark:text-purple-400" />
                  <span>Worker ID: {service.workerId}</span>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 line-clamp-2">
                  {service.description}
                </p>

                {/* Comments & Rating */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-700">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                      <FaComment className="text-blue-500" />
                      {getCommentCount(service.comment)}
                    </span>
                    <span className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                      <FaStar className="text-yellow-500" />
                     
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Footer - Actions */}
              <div className="p-3 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/30">
                <div className="flex items-center justify-around">
                  <button
                    onClick={() => handleView(service)}
                    className="flex items-center gap-1 px-3 py-1.5 text-blue-600 dark:text-blue-400 
                             hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors text-sm"
                  >
                    <FaEye /> View
                  </button>
                  <button
                    onClick={() => handleEdit(service.id)}
                    className="flex items-center gap-1 px-3 py-1.5 text-yellow-600 dark:text-yellow-400 
                             hover:bg-yellow-50 dark:hover:bg-yellow-900/20 rounded-lg transition-colors text-sm"
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(service.id)}
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
      {selectedService && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                Service Details
              </h2>
              <button
                onClick={() => setSelectedService(null)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Service Name</p>
                  <p className="font-medium">{selectedService.service_name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Price</p>
                  <p className="font-bold text-green-600 dark:text-green-400">LKR {selectedService.price}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
                  <p>{selectedService.location}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Skill</p>
                  <p>{selectedService.skill}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Description</p>
                  <p>{selectedService.description}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                  <p>{selectedService.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Worker ID</p>
                  <p>{selectedService.workerId}</p>
                </div>
              </div>
              
              {selectedService.comment?.length > 0 && (
                <div className="mt-4">
                  <h3 className="font-semibold mb-2">Comments ({selectedService.comment.length})</h3>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {selectedService.comment.map((c, idx) => (
                      <div key={idx} className="bg-gray-50 dark:bg-gray-700/50 p-2 rounded">
                        <p className="text-sm font-medium">{c.user}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{c.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <button
              onClick={() => setSelectedService(null)}
              className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="mt-6 px-4 py-3 bg-gray-100 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
          <span>Showing {filteredServices.length} service(s)</span>
          <span>Last updated: {new Date().toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
}

export default AdminManageServices;