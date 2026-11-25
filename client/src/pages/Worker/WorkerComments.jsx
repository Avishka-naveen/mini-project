import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { FaStar, FaReply, FaPaperPlane } from 'react-icons/fa';
import { FaCircleUser } from 'react-icons/fa6';
import { MdCancel } from 'react-icons/md';
import { AppContext } from '../../Context/Appcontext';
import { toast } from 'react-toastify';


function WorkerComments() {
    const [services, setServices] = useState([]);
    const [comments, setComments] = useState([]);
    const [selectedServiceId, setSelectedServiceId] = useState('');
    const { backendUrl } = useContext(AppContext);
    const [visibleReplyForm, setVisibleReplyForm] = useState('');
    const [replyText, setReplyText] = useState('');
    const [selectedCommentId, setSelectedCommentId] = useState('')



    const fetchWorkerComments = async () => {
        try {
            const response = await axios.post(backendUrl + '/api/worker/getWorkerComments', {}, { withCredentials: true });
            if (response.data.success) {
                const loadedServices = response.data.services;
                setServices(loadedServices);
                setComments(response.data.comments);
                if (loadedServices.length > 0) {
                    setSelectedServiceId((prev) => prev || loadedServices[0]._id);
                }
            }
            //console.log(response.data);
        } catch (error) {
            console.error("Failed to fetch comments:", error);
        }
    };

    useEffect(() => {
        fetchWorkerComments();
    }, [backendUrl]);


    const filteredComments = comments.filter(
        (c) => String(c.serviceId?._id || c.serviceId) === String(selectedServiceId)
    );

    const handleReplySubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(replyText);
            console.log(selectedCommentId);
            const response = await axios.post(backendUrl + '/api/worker/replyToComment', { commentId: selectedCommentId, reply: replyText });
            if (response.data.success) {
               fetchWorkerComments();
                setVisibleReplyForm(false);
                setReplyText('');
                setSelectedCommentId('');
                toast.success("Reply added successfully!");
            }

        } catch (error) {
            console.error("Failed to submit reply:", error);
        }
    }

    return (
        <div className="p-4 sm:p-6 max-w-6xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">
                Comments & Replies
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">
                View customer feedback and reply to them
            </p>

            {/* Service selector */}
            <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Select Service
                </label>
                <select
                    value={selectedServiceId}
                    onChange={(e) => {
                        setSelectedServiceId(e.target.value);

                    }}
                    className="w-full sm:w-72 px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600
                     bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                     focus:ring-2 focus:ring-blue-500 outline-none"
                >
                    {services.map((s) => (
                        <option key={s._id} value={s._id}>
                            {s.serviceName}
                        </option>
                    ))}
                </select>
            </div>

            {/* Comments section*/}
            {filteredComments.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-gray-400 dark:text-gray-500">
                    <FaCircleUser className="text-5xl mb-2 opacity-30" />
                    <p className="text-sm">No comments for this service yet.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {filteredComments.map((comment) => (
                        <div
                            key={comment._id}
                            className="border border-gray-200 dark:border-gray-700 rounded-xl p-4
                         bg-white dark:bg-gray-800 shadow-sm"
                        >
                            <div className="flex items-start gap-3">
                                <span
                                    className="bg-blue-600 dark:bg-purple-600 text-white w-10 h-10 rounded-full
                             flex items-center justify-center font-semibold flex-shrink-0"
                                >
                                    {comment.customerId?.customerName
                                        ?.split(' ')
                                        .map((n) => n[0])
                                        .join('')
                                        .toUpperCase() || 'A'}
                                </span>

                                <div className="flex-1 min-w-0">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className="font-semibold text-gray-800 dark:text-white text-sm">
                                            {comment.customerId?.customerName || 'Anonymous'}
                                        </span>
                                        <span className="text-xs text-gray-400">
                                            - {new Date(comment.createdAt).toLocaleDateString()}
                                        </span>
                                        <span className="flex items-center gap-0.5 text-sm">
                                            {[...Array(5)].map((_, i) => (
                                                <FaStar
                                                    key={i}
                                                    className={
                                                        i < comment.rating
                                                            ? 'text-yellow-400'
                                                            : 'text-gray-300 dark:text-gray-600'
                                                    }
                                                />
                                            ))}
                                            <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">
                                                {comment.rating}/5
                                            </span>
                                        </span>
                                    </div>

                                    <p className="text-gray-700 dark:text-gray-300 text-sm mt-1 break-words">
                                        {comment.comment}
                                    </p>

                                    {/* Existing reply */}

                                    <div className={`mt-3 ml-2 py-2 pl-3 border-l-2 border-blue-500 ${comment?.reply ? 'bg-blue-600/10' : ''} dark:border-purple-500`}>
                                        <p className="text-xs font-semibold text-blue-600 dark:text-purple-400">
                                            Your reply
                                        </p>
                                        <p className="text-sm text-gray-700  dark:text-gray-300">
                                            {comment?.reply || " No reply yet."}
                                        </p>
                                    </div>
                                    {/* )} */}

                                    {/* Reply form */}
                                    <div className="mt-2">

                                        {
                                            comment._id === visibleReplyForm && (
                                                <div className="mt-2 space-y-2">
                                                    <textarea
                                                        rows="2"
                                                        value={replyText}
                                                        onChange={(e) => setReplyText(e.target.value)}
                                                        placeholder="Write your reply..."
                                                        maxLength={300}
                                                        className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600
             bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white
             focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                                                    />
                                                    <div className="flex mb-2 gap-2">
                                                        <button
                                                            onClick={handleReplySubmit}
                                                            disabled={!replyText.trim()}
                                                            className="flex items-center gap-1.5 px-4 py-1.5 text-sm rounded-lg
                                       bg-blue-600 hover:bg-blue-700 dark:bg-purple-600 dark:hover:bg-purple-700
                                       text-white font-medium transition disabled:opacity-50"
                                                        >
                                                            <FaPaperPlane className="text-xs" />
                                                            Post
                                                        </button>
                                                        <button
                                                            onClick={() => setVisibleReplyForm(false)}
                                                            className="flex items-center gap-1 px-3 py-1.5 text-sm rounded-lg
                                       bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600
                                       text-gray-700 dark:text-gray-200 transition"
                                                        >
                                                            <MdCancel /> Cancel
                                                        </button>
                                                    </div>
                                                </div>
                                            )
                                        }

                                        <button onClick={() => {
                                            setVisibleReplyForm(comment._id)
                                            setSelectedCommentId(comment._id)
                                            setReplyText('')
                                        }} className="flex items-center gap-1.5 text-sm text-blue-600 dark:text-purple-400 hover:underline"
                                        >
                                            <FaReply />  {comment?.reply ? "Edit Reply" : "Reply"}
                                        </button>

                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default WorkerComments;