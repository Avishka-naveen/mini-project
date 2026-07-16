import React, { useState } from 'react';
import { FaUser, FaMapMarkerAlt, FaPhone, FaWrench, FaDollarSign, FaFileAlt } from 'react-icons/fa';
import { MdLibraryAdd } from "react-icons/md";


function WorkerAddServices() {
  const [formData, setFormData] = useState({
    service_name: '',
    price: '',
    location: '',
    description: '',
    phone: '',
    skill: '',
  });



  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };



  // Handle reset
  const handleReset = () => {
    setFormData({
      service_name: '',
      price: '',
      location: '',
      description: '',
      phone: '',
      skill: '',
    });
  };

  return (
    <div className="p-4 sm:p-6 dark:text-white">
      {/* Header */}
      <div className="mb-6">
        <div className='flex items-center gap-2'>
          <p className='text-4xl'><MdLibraryAdd /></p>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
            Add New Service
          </h1>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Fill in the details below to add a new service offering
        </p>
      </div>

      {/* Form Container */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 sm:p-8">
        <form >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Service Name */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Service Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <FaWrench className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="service_name"
                  value={formData.service_name}
                  onChange={handleChange}
                  placeholder="e.g., Plumbing Service"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg
                           bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white
                           focus:ring-2 focus:ring-blue-500 dark:focus:ring-purple-500 focus:border-transparent
                           outline-none transition duration-200"
                  required
                />
              </div>
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Price (LKR) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <FaDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="5000"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg
                           bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white
                           focus:ring-2 focus:ring-blue-500 dark:focus:ring-purple-500 focus:border-transparent
                           outline-none transition duration-200"
                  min="0"
                  required
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="0771234567"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg
                           bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white
                           focus:ring-2 focus:ring-blue-500 dark:focus:ring-purple-500 focus:border-transparent
                           outline-none transition duration-200"
                  required
                />
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Location <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Colombo"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg
                           bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white
                           focus:ring-2 focus:ring-blue-500 dark:focus:ring-purple-500 focus:border-transparent
                           outline-none transition duration-200"
                  required
                />
              </div>
            </div>

            {/* Skill */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Skills <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="skill"
                  value={formData.skill}
                  onChange={handleChange}
                  placeholder="Plumber, Electrician"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg
                           bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white
                           focus:ring-2 focus:ring-blue-500 dark:focus:ring-purple-500 focus:border-transparent
                           outline-none transition duration-200"
                  required
                />
              </div>
              <p className="text-xs text-gray-400 dark:text-red-400 mt-1">
                Separate multiple skills with commas
              </p>
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <FaFileAlt className="absolute left-3 top-3 text-gray-400" />
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your service in detail..."
                  rows="4"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg
                           bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white
                           focus:ring-2 focus:ring-blue-500 dark:focus:ring-purple-500 focus:border-transparent
                           outline-none transition duration-200 resize-none"
                  required
                ></textarea>
              </div>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                Provide a clear description of your service (50-200 characters)
              </p>
            </div>

          </div>

          {/* Form Actions */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <button
              type="submit"

              className="flex-1 bg-blue-600 hover:bg-blue-700 dark:bg-purple-600 dark:hover:bg-purple-700
                       text-white font-semibold py-3 px-6 rounded-lg transition duration-300
                       shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed
                       flex items-center justify-center gap-2"
            >Add Service

            </button>
            <button
              type="button"
              onClick={handleReset}
              className="flex-1 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600
                       text-gray-700 dark:text-gray-300 font-semibold py-3 px-6 rounded-lg transition duration-300"
            >
              🔄 Reset Form
            </button>
          </div>
        </form>

        {/* Preview Section */}
        <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2">
            📋 Preview
          </h3>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            <p><strong>Service:</strong> {formData.service_name || 'Not set'}</p>
            <p><strong>Price:</strong> {formData.price ? `LKR ${formData.price}` : 'Not set'}</p>
            <p><strong>Location:</strong> {formData.location || 'Not set'}</p>
            <p><strong>Phone:</strong> {formData.phone || 'Not set'}</p>
            <p><strong>Skills:</strong> {formData.skill || 'Not set'}</p>
            <p><strong>Description:</strong> {formData.description || 'Not set'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WorkerAddServices;