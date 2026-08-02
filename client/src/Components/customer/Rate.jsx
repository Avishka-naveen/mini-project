import axios from 'axios';
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { AppContext } from '../../Context/Appcontext';

function Rate({ addRatingModalVisible, setAddRatingModalVisible, selectedReservation }) {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [comment, setComment] = useState('');
    const { backendUrl } = useContext(AppContext)

    //console.log(selectedReservation.serviceId?._id);
    const handleSubmitRating = async () => {
        if (!rating || !comment.trim()) {
            toast.error('Please provide both rating and review');
            return;
        }

        //console.log(rating,comment,selectedReservation.serviceId?._id);

        try {

            let response;
            response = await axios.post(backendUrl + '/api/customer/addComment', {  serviceId: selectedReservation.serviceId?._id, rating, comment }, { withCredentials: true });
            if (response.data.success) {
                toast.success('Thank you for your review!');
                setAddRatingModalVisible(false);
                setRating(0);
                setComment('');
            }


        } catch (error) {
            toast.error('Failed to submit review', error);
        }
    };
    return (
        <div>
            <div className="fixed inset-0 flex items-center justify-center bg-black/50  z-50 animate-fade-in p-4">

                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md animate-scale-in">

                    {/* Modal Header */}
                    <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                                    Rate & Review
                                </h2>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Share your experience with this service
                                </p>
                            </div>
                            <button
                                onClick={() => setAddRatingModalVisible(false)}
                                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            >
                                <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Modal Body */}
                    <div className="p-6 space-y-5">

                        {/* Service Info */}
                        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                                {selectedReservation?.serviceId?.serviceName?.[0]?.toUpperCase()}
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-800 dark:text-white">
                                    {selectedReservation?.serviceId?.serviceName || 'Service'}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    by {selectedReservation?.serviceId?.workerId?.customerId?.customerName || 'Worker'}
                                </p>
                            </div>
                        </div>

                        {/* Rating Stars */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Your Rating <span className="text-red-500">*</span>
                            </label>
                            <div className="flex items-center gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        onClick={() => setRating(star)}
                                        onMouseEnter={() => setHoverRating(star)}
                                        onMouseLeave={() => setHoverRating(0)}
                                        className="p-1 transition-transform hover:scale-110 focus:outline-none"
                                    >
                                        <svg
                                            className={`w-10 h-10 ${(hoverRating || rating) >= star
                                                ? 'text-yellow-400'
                                                : 'text-gray-300 dark:text-gray-600'
                                                } transition-colors duration-200`}
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    </button>
                                ))}
                                <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                                    {rating > 0 ? `${rating} / 5` : 'Select rating'}
                                </span>
                            </div>
                        </div>

                        {/* Comment */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Your Comment <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <textarea
                                    rows="4"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder="Share your experience with this service..."
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl
                       bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white
                       focus:ring-2 focus:ring-blue-500 dark:focus:ring-purple-500 focus:border-transparent
                       outline-none transition duration-200 resize-none"
                                    maxLength={500}
                                />
                                <span className="absolute bottom-3 right-3 text-xs text-gray-400 dark:text-gray-500">
                                    {comment.length}/500
                                </span>
                            </div>
                        </div>

                        {/* Quick Review Tags */}
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                                Quick tags (click to add)
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {['Professional,', 'On Time,', 'Quality Work,', 'Friendly,', 'Good Value,', 'Reliable,'].map((tag) => (
                                    <button
                                        key={tag}
                                        onClick={() => {
                                            const newComment = comment ? `${comment} ${tag}` : tag;
                                            setComment(newComment);
                                        }}
                                        className="px-3 py-1 text-xs rounded-full bg-gray-200 dark:bg-gray-700 
                         text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-purple-900/30 
                         hover:text-blue-600 dark:hover:text-purple-300 transition-colors
                         border border-transparent hover:border-blue-400 dark:hover:border-purple-400"
                                    >
                                        {tag}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Modal Footer */}
                    <div className="border-t border-gray-200 dark:border-gray-700 px-6 py-4 bg-gray-50 dark:bg-gray-700/30 rounded-b-2xl">
                        <div className="flex flex-col sm:flex-row justify-end gap-3">
                            <button
                                onClick={() => {
                                    setAddRatingModalVisible(false);
                                    setRating(0);
                                    setComment('');
                                }}
                                className="px-6 py-2.5 rounded-xl bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 
                     text-gray-700 dark:text-gray-200 font-medium transition duration-200"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmitRating}
                                disabled={!rating || !comment.trim()}
                                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 
                     hover:from-blue-700 hover:to-purple-700 text-white font-medium 
                     transition duration-200 shadow-md hover:shadow-lg
                     disabled:opacity-50 disabled:cursor-not-allowed
                     flex items-center justify-center gap-2"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                                </svg>
                                Submit Review
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Rate
