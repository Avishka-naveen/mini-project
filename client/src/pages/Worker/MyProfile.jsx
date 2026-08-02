import React, { useContext, useState, useRef } from 'react';
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
    FaUserCircle,
    FaTimes,
    FaUpload,
    FaSave
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import axios from 'axios';

function MyProfile() {
    const { currentWorkerData, setCurrentWorkerData } = useContext(AppContext);
    const fileInputRef = useRef(null);

    const{backendUrl,fetchWorkerData}=useContext(AppContext);

    // State for edit modal
    const [showEditModal, setShowEditModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [editData, setEditData] = useState({
        description: '',
        location: '',
        phone: '',
        nic: '',
    });
    const [imagePreview, setImagePreview] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [profileImage, setProfileImage] = useState(null);

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

    // Open edit modal
    const handleOpenEdit = () => {
        setEditData({
            profileImage: currentWorkerData?.profile || '',
            description: currentWorkerData?.description || '',
            location: currentWorkerData?.address || currentWorkerData?.location || '',
            phone: currentWorkerData?.customerId?.customerPhone || '',
            nic: currentWorkerData?.nic || '',
        });
        setImagePreview(currentWorkerData?.profile || null);
        setShowEditModal(true);
    };


    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditData(prev => ({ ...prev, [name]: value }));
    };

    // Handle image upload to cloudnary and get secure link
    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "Quick_hire");
        data.append("cloud_name", "dpxo105si");

        try {
            const response = await fetch(
                "https://api.cloudinary.com/v1_1/dpxo105si/image/upload",
                {
                    method: "POST",
                    body: data,
                }
            );
            setImagePreview(URL.createObjectURL(file));
            const uploadImgURL = await response.json();
            setProfileImage(uploadImgURL.secure_url);
            // console.log(uploadImgURL.secure_url)
        } catch (error) {
            console.error(error);
        }

    };

    // ------------------caLL update profile function----------------//
    const handleSaveProfile = async () => {

        try {
            //console.log(editData.description,editData.location,editData.nic,profileImage);
            let response;
            response = await axios.post(backendUrl+'/api/worker/updateWorkerProfile',{profile:profileImage,address:editData.location,description:editData.description,nic:editData.nic},{withCredentials:true});
            if(response){
                  toast.success('Profile updated successfully!');
                  fetchWorkerData();
                 setShowEditModal(false);
            }
           
        } catch (error) {
            toast.error('Failed to update profile');
        }
    };

    return (
        <>
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">

                {/* Cover Image */}
                <div className="relative h-45 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-purple-700 dark:to-blue-800">
                    {/* Profile Avatar */}
                    <div className="absolute -bottom-20 left-6">
                        <div className="w-60 h-60 rounded-full bg-white dark:bg-gray-800 
                              flex items-center justify-center text-4xl font-bold 
                              text-blue-600 dark:text-purple-400  
                              border-4 border-white dark:border-gray-800">
                            {currentWorkerData?.profile ? (
                                <img
                                    src={currentWorkerData.profile}
                                    alt="Profile"
                                    className="w-full h-full rounded-full object-cover"
                                />
                            ) : (
                                getInitials(currentWorkerData?.customerId?.customerName)
                            )}
                        </div>
                    </div>

                    {/* Edit Button */}
                    <button
                        onClick={handleOpenEdit}
                        className="absolute top-3 right-3 bg-white/20 hover:bg-white/30 
                                 text-white p-2 rounded-lg transition-colors"
                    >
                        <FaEdit className="w-4 h-4" />
                    </button>
                </div>

                {/* Profile Content */}
                <div className="pt-25 px-6 pb-6">
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
                    <div className="grid mb-6">
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

                        {/* NIC */}
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/30">
                            <FaIdCard className="w-5 h-5 text-purple-600 dark:text-purple-400 mt-0.5" />
                            <div>
                                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">NIC</p>
                                <p className="text-sm text-gray-800 dark:text-white">
                                    {currentWorkerData?.nic || 'N/A'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Bio */}
                    {currentWorkerData?.description && (
                        <div className="mb-6 p-4 rounded-lg bg-gray-50 dark:bg-gray-700/30">
                            <p className="font-bold text-gray-900 dark:text-gray-300 mb-1">About Me</p>
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

            {/* Edit Profile Modal */}
            {showEditModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50  z-50 p-4 animate-fade-in">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-scale-in">

                        {/* Modal Header */}
                        <div className="sticky top-0 bg-white dark:bg-gray-800 rounded-t-2xl border-b border-gray-200 dark:border-gray-700 px-6 py-4 z-10">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white">
                                        <FaEdit className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                                            Edit Profile
                                        </h2>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            Update your personal information
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setShowEditModal(false)}
                                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                >
                                    <FaTimes className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                                </button>
                            </div>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6">
                            <form onSubmit={(e) => { e.preventDefault(); handleSaveProfile(); }} className="space-y-5">

                                {/* Profile Image Upload */}
                                <div className="flex flex-col items-center">
                                    <div className="relative">
                                        <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 
                                                      flex items-center justify-center overflow-hidden
                                                      border-4 border-blue-500 dark:border-purple-500">
                                            {imagePreview ? (
                                                <img src={imagePreview} alt="Profile" className="w-full h-full object-cover" />
                                            ) : (
                                                <FaUserCircle className="w-16 h-16 text-gray-400" />
                                            )}
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => fileInputRef.current.click()}
                                            className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 
                                                     text-white p-2 rounded-full shadow-lg transition-colors"
                                        >
                                            <FaUpload className="w-4 h-4" />
                                        </button>
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            className="hidden"
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                                        Click the upload button to change profile photo
                                    </p>
                                </div>

                                {/* Description / About */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                                        About Me <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        name="description"
                                        value={editData.description}
                                        onChange={handleEditChange}
                                        rows="3"
                                        placeholder="Tell customers about yourself..."
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl
                                                 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white
                                                 focus:ring-2 focus:ring-blue-500 dark:focus:ring-purple-500 focus:border-transparent
                                                 outline-none transition duration-200 resize-none"
                                        required
                                    />
                                </div>

                                {/* Location */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                                        Location <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FaMapMarkerAlt className="w-5 h-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            name="location"
                                            value={editData.location}
                                            onChange={handleEditChange}
                                            placeholder="Colombo, Sri Lanka"
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl
                                                     bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white
                                                     focus:ring-2 focus:ring-blue-500 dark:focus:ring-purple-500 focus:border-transparent
                                                     outline-none transition duration-200"
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
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FaPhone className="w-5 h-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={editData.phone}
                                            onChange={handleEditChange}
                                            placeholder="077 123 4567"
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl
                                                     bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white
                                                     focus:ring-2 focus:ring-blue-500 dark:focus:ring-purple-500 focus:border-transparent
                                                     outline-none transition duration-200"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* NIC */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                                        NIC <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FaIdCard className="w-5 h-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            name="nic"
                                            value={editData.nic}
                                            onChange={handleEditChange}
                                            placeholder="200012345678"
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl
                                                     bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white
                                                     focus:ring-2 focus:ring-blue-500 dark:focus:ring-purple-500 focus:border-transparent
                                                     outline-none transition duration-200"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                                    <button
                                        type="button"
                                        onClick={() => setShowEditModal(false)}
                                        className="px-6 py-2.5 rounded-xl bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 
                                                 text-gray-700 dark:text-gray-200 font-medium transition duration-200"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 
                                                 hover:from-blue-700 hover:to-purple-700 text-white font-medium 
                                                 transition duration-200 shadow-md hover:shadow-lg
                                                 flex items-center justify-center gap-2
                                                 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isLoading ? (
                                            <>
                                                <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Saving...
                                            </>
                                        ) : (
                                            <>
                                                <FaSave /> Save Changes
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}


        </>
    );
}

export default MyProfile;