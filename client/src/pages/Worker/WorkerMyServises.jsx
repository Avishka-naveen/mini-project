import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaMapMarkerAlt, FaPhone, FaWrench } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { MdOutlineWork } from "react-icons/md";
import { useContext } from 'react';
import { AppContext } from '../../Context/Appcontext';
import axios from 'axios';
import { toast } from 'react-toastify';

function WorkerMyServices() {
  // 1. Initialized as an empty array to prevent map errors before data loads
  const [services, setServices] = useState([]);
  const navigate = useNavigate();
  const { backendUrl } = useContext(AppContext);
  const [visibleDeleteModal, setVisibleDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [serviceId, setServiceId] = useState('');

  const fetchServicesData = async () => {
    try {
      const response = await axios.get(
        backendUrl + "/api/worker/getMyServices",
        { withCredentials: true }
      );

      if (response.data.success) {
        setServices(response.data.services);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching services data:", error);
    }
  };

  useEffect(() => {
    fetchServicesData();
  }, [backendUrl]);

  //---------------delete service function-----------------//
  const handleDelete = async (serviceId) => {
    try {
      let response = await axios.post(backendUrl + "/api/worker/deleteService", { serviceId }, { withCredentials: true });
      if (response.data.success) {
        toast.success(response.data.message);
        fetchServicesData();
        setVisibleDeleteModal(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };

  //---------------edit service function-----------------//
  const [editData, setEditData] = useState({
    serviceId: "",
    serviceName: "",
    price: "",
    location: "",
    phone: "",
    skill: "",
    description: "",
  });

  const handleEdit = (service) => {
    setEditData({
      serviceId: service._id,
      serviceName: service.serviceName,
      price: service.price,
      location: service.serviceLocation,
      phone: service.servicePhone,
      skill: service.serviceSkill,
      description: service.serviceDescription,
    });
    setShowEditModal(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Prevent page reload and handle update submission
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting updated data:", editData);

    // Uncomment and adjust this when your backend update route is ready
    /*
    try {
      const response = await axios.post(backendUrl + "/api/worker/updateService", editData, { withCredentials: true });
      if (response.data.success) {
        toast.success("Service updated successfully!");
        setShowEditModal(false);
        fetchServicesData(); // Refresh list to show new data
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error updating service:", error);
      toast.error("An error occurred");
    }
    */
  };

  return (
    <div className="p-4 sm:p-6 dark:text-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
        <div>
          <div className='flex items-center justify-center gap-2'>
            <p className='text-4xl'><MdOutlineWork /></p>
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
          <button onClick={() => navigate('/worker/dashbord/workerAddServises')} className="bg-blue-600 hover:bg-blue-700 dark:bg-purple-600 dark:hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition duration-300 shadow-md hover:shadow-lg">
            + Add New
          </button>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {services.length > 0 ? (
          // 2. Used [...services].reverse() to show newest items first
          [...services].reverse().map((service, index) => (
            <div
              key={service._id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:border-blue-300 dark:hover:border-purple-500 transition-all duration-300 overflow-hidden"
            >
              {/* Card Header */}
              <div className="p-4 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/30">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg text-gray-800 dark:text-white">
                      {service.serviceName}
                    </h3>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      NO: {services.length - index} {/* Adjusted index for reversed array */}
                    </span>
                  </div>
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
                  <span>{service.serviceLocation}</span>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                  <FaPhone className="text-blue-500 dark:text-blue-400" />
                  <span>{service.servicePhone}</span>
                </div>

                {/* Skill */}
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                  <FaWrench className="text-orange-500 dark:text-orange-400" />
                  <span className="capitalize">{service.serviceSkill}</span>
                </div>

                {/* Description */}
                <p>Description:</p>
                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                  {service.serviceDescription}
                </p>
              </div>

              {/* Card Footer - Actions */}
              <div className="p-4 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/30">
                <div className="flex items-center justify-around">
                  <button
                    onClick={() => handleEdit(service)}
                    className="flex items-center gap-1 px-3 py-1.5 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 rounded-lg transition-colors text-sm"
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    onClick={() => { setServiceId(service._id); setVisibleDeleteModal(true); }}
                    className="flex items-center gap-1 px-3 py-1.5 cursor-pointer text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors text-sm"
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
            <button onClick={() => navigate('/worker/dashbord/workerAddServises')} className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium">
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

      {/* delete service model */}
      {visibleDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-11/12 sm:w-96">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Delete Service</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">Are you sure you want to delete this service?</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setVisibleDeleteModal(false)}
                className="px-4 py-2 cursor-pointer text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(serviceId)}
                className="px-4 py-2 cursor-pointer bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* edit service model */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-scale-in">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white dark:bg-gray-800 rounded-t-2xl border-b border-gray-200 dark:border-gray-700 px-6 py-4 z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                      Edit Service
                    </h2>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Update your service details
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowEditModal(false)}
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
              <form onSubmit={handleUpdateSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Service Name */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                      Service Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="serviceName"
                        value={editData.serviceName} // 3. Changed to read from editData
                        onChange={handleEditChange}
                        placeholder="Enter service name"
                        className="w-full pl-4 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition duration-200"
                        required
                      />
                    </div>
                  </div>

                  {/* Price */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                      Price (LKR) <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        name="price"
                        value={editData.price} // 3. Changed to read from editData
                        onChange={handleEditChange}
                        placeholder="0.00"
                        className="w-full pl-4 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition duration-200"
                        min="0"
                        step="0.01"
                        required
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                      Phone <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        name="phone"
                        value={editData.phone} // 3. Changed to read from editData
                        onChange={handleEditChange}
                        placeholder="077 123 4567"
                        className="w-full pl-4 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition duration-200"
                        required
                      />
                    </div>
                  </div>

                  {/* Location */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                      Location <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="location"
                        value={editData.location} // 3. Changed to read from editData
                        onChange={handleEditChange}
                        placeholder="Colombo"
                        className="w-full pl-4 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition duration-200"
                        required
                      />
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                      Skills <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="skill"
                        value={editData.skill} // 3. Changed to read from editData
                        onChange={handleEditChange}
                        placeholder="Plumbing, Electrical, Painting"
                        className="w-full pl-4 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition duration-200"
                        required
                      />
                    </div>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                      Separate multiple skills with commas
                    </p>
                  </div>

                  {/* Description */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                      Description <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <textarea
                        rows="4"
                        name="description"
                        value={editData.description}
                        onChange={handleEditChange}
                        placeholder="Describe your service in detail..."
                        className="w-full pl-4 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition duration-200 resize-none"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="px-6 py-2.5 rounded-xl bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-medium transition duration-200 border border-gray-300 dark:border-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium transition duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    Update Service
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default WorkerMyServices;