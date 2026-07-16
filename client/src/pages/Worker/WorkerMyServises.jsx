import React, { use, useState } from 'react';
import { FaEdit, FaTrash, FaEye, FaMapMarkerAlt, FaPhone, FaWrench ,} from 'react-icons/fa';
import { serviceDummyData } from '../../assets/dummyData';
import {useNavigate} from 'react-router-dom'
import {  MdOutlineWork } from "react-icons/md";



function WorkerMyServices() {
  const [services, setServices] = useState(serviceDummyData);
  const navigate=useNavigate()


  return (
    <div className="p-4 sm:p-6 dark:text-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
        <div>
          <div className='flex items-center justify-center gap-2'>
            <p className='text-4xl'><MdOutlineWork/></p>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
             My Services
          </h1>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Manage all your service offerings
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Total: <span className="font-semibold text-gray-800 dark:text-white">{services.length}</span>
          </span>
          <button onClick={()=>navigate('/worker/dashbord/workerAddServises')} className="bg-blue-600 hover:bg-blue-700 dark:bg-purple-600 dark:hover:bg-purple-700 
                           text-white px-4 py-2 rounded-lg text-sm font-medium transition duration-300
                           shadow-md hover:shadow-lg">
            + Add New
          </button>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {services.length > 0 ? (
          services.map((service) => (
            <div
              key={service.service_id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700
                       hover:shadow-lg hover:border-blue-300 dark:hover:border-purple-500 
                       transition-all duration-300 overflow-hidden"
            >
              {/* Card Header */}
              <div className="p-4 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/30">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg text-gray-800 dark:text-white">
                      {service.service_name}
                    </h3>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      ID: {service.service_id}
                    </span>
                  </div>
                 =
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 space-y-3">
                {/* Price */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">💰 Price</span>
                  <span className="text-xl font-bold text-green-600 dark:text-green-400">
                    LKR {service.price.toLocaleString()}
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

                {/* Skill */}
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                  <FaWrench className="text-orange-500 dark:text-orange-400" />
                  <span className="capitalize">{service.skill}</span>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 line-clamp-2">
                  {service.description}
                </p>
              </div>

              {/* Card Footer - Actions */}
              <div className="p-4 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/30">
                <div className="flex items-center justify-around">
                  
                  <button
                    onClick={() => handleEdit(service.service_id)}
                    className="flex items-center gap-1 px-3 py-1.5 text-yellow-600 dark:text-yellow-400 
                             hover:bg-yellow-50 dark:hover:bg-yellow-900/20 rounded-lg transition-colors text-sm"
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(service.service_id)}
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
          // Empty State
          <div className="col-span-full flex flex-col items-center justify-center py-16 text-gray-500 dark:text-gray-400">
            <span className="text-6xl mb-4">📭</span>
            <p className="text-xl font-medium">No services found</p>
            <p className="text-sm mt-1">You haven't added any services yet.</p>
            <button onClick={()=>navigate('/worker/dashbord/workerAddServises')} className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium">
              + Add Your First Service
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-6 px-4 py-3 bg-gray-100 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
          <span>Showing {services.length} service(s)</span>
          <span>Last updated: {new Date().toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
}

export default WorkerMyServices;