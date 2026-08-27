import React, { useState } from 'react';
import { FaStar, FaQuoteLeft, FaChevronLeft, FaChevronRight, FaUserCheck } from 'react-icons/fa';
import { MdOutlineVerified } from 'react-icons/md';

function Reviews() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Homeowner",
      rating: 5,
      date: "2 days ago",
      review: "Absolutely fantastic service! The carpenter arrived on time, did an amazing job on my custom shelves, and left the place spotless. Highly recommend!",
      service: "Carpenter",
      verified: true,
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Business Owner",
      rating: 5,
      date: "1 week ago",
      review: "The AC technician was professional and knowledgeable. Fixed my office AC in no time. Very reasonable prices too! Will definitely use again.",
      service: "AC Technician",
      verified: true,
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Property Manager",
      rating: 4,
      date: "2 weeks ago",
      review: "Great experience with the plumber. Came same day, fixed the leak quickly, and explained everything clearly. Very trustworthy service.",
      service: "Plumber",
      verified: true,
    },
    {
      id: 4,
      name: "David Thompson",
      role: "Homeowner",
      rating: 5,
      date: "3 weeks ago",
      review: "The painter did an exceptional job on my living room. The attention to detail was impressive and the work was completed ahead of schedule.",
      service: "Painter",
      verified: true,
    },
    {
      id: 5,
      name: "Lisa Park",
      role: "Office Manager",
      rating: 5,
      date: "1 month ago",
      review: "Best cleaning service I've ever used! They were thorough, efficient, and very professional. My office has never looked better.",
      service: "Cleaner",
      verified: true,
    },
  ];

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const currentReview = reviews[currentIndex];

  const totalReviews = reviews.length;
  const averageRating = (reviews.reduce((acc, curr) => acc + curr.rating, 0) / totalReviews).toFixed(1);

  return (
    <div className="py-12 sm:py-16 px-4 sm:px-6 ">
      <div className="container mx-auto max-w-6xl">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-yellow-100 dark:bg-yellow-900/30 rounded-full mb-4">
            <FaStar className="text-yellow-500" />
            <span className="text-xs sm:text-sm font-medium text-yellow-700 dark:text-yellow-300 uppercase tracking-wider">
              Customer Reviews
            </span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 dark:text-white">
            What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700">Customers Say</span>
          </h2>
          
          <p className="mt-3 text-sm text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Real reviews from real customers who used our services
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-10">
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <FaStar className="text-yellow-400 text-2xl mx-auto mb-1" />
            <p className="text-xl font-bold text-gray-800 dark:text-white">{averageRating}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Avg Rating</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <FaUserCheck className="text-blue-500 text-2xl mx-auto mb-1" />
            <p className="text-xl font-bold text-gray-800 dark:text-white">{totalReviews}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Reviews</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <MdOutlineVerified className="text-green-500 text-2xl mx-auto mb-1" />
            <p className="text-xl font-bold text-gray-800 dark:text-white">98%</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Satisfaction</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <FaStar className="text-yellow-400 text-2xl mx-auto mb-1" />
            <p className="text-xl font-bold text-gray-800 dark:text-white">5★</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Most Rated</p>
          </div>
        </div>

        {/* Review Card */}
        <div className="relative max-w-3xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100 dark:border-gray-700">
            
            {/* Avatar & Name */}
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                {currentReview.name.split(' ').map(n => n[0]).join('')}
              </div>
              
              <div className="flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h4 className="text-lg font-bold text-gray-800 dark:text-white">
                      {currentReview.name}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {currentReview.role} • {currentReview.service}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className={i < currentReview.rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'} size={14} />
                      ))}
                    </div>
                    {currentReview.verified && (
                      <MdOutlineVerified className="text-green-500 text-sm" />
                    )}
                  </div>
                </div>

                {/* Review Text */}
                <div className="relative mt-3">
                  <FaQuoteLeft className="text-yellow-500/20 text-2xl absolute -top-1 -left-1" />
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed pl-5">
                    {currentReview.review}
                  </p>
                </div>

                {/* Date */}
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-3">
                  {currentReview.date}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          {reviews.length > 1 && (
            <>
              <button
                onClick={prevReview}
                className="absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 sm:p-3 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:scale-110"
              >
                <FaChevronLeft className="text-gray-600 dark:text-gray-300 text-sm" />
              </button>
              <button
                onClick={nextReview}
                className="absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 sm:p-3 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:scale-110"
              >
                <FaChevronRight className="text-gray-600 dark:text-gray-300 text-sm" />
              </button>
            </>
          )}
        </div>

        {/* Dots */}
        {reviews.length > 1 && (
          <div className="flex justify-center gap-2 mt-6">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'w-8 bg-yellow-500' 
                    : 'w-2 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Reviews;