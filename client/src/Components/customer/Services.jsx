import React, { useState } from 'react';
import { FaArrowRight, FaArrowLeft, FaStar, FaUserCheck, FaClock } from 'react-icons/fa';
import { MdOutlineVerified } from 'react-icons/md';
import img1 from '../../assets/air_condion_technetian.jpg';
import img2 from '../../assets/carpenter.jpg';
import img3 from '../../assets/cleaner.jpg';
import img4 from '../../assets/painter.jpg';
import img5 from '../../assets/plumber.jpg';
import img6 from '../../assets/skilled_professionals.jpg';

// ============================================================
// SERVICES COMPONENT
// ============================================================
function Services() {
  const [showAll, setShowAll] = useState(false);
  const [hoveredId, setHoveredId] = useState(null);

  const gallery = [
    { 
      id: 1, 
      img: img1, 
      title: "Air Conditioning Technician",
      category: "HVAC",
      rating: 4.8,
      jobs: 342,
      price: "LKR.45/hr",
      available: true,
    },
    { 
      id: 2, 
      img: img2, 
      title: "Carpenter",
      category: "Woodwork",
      rating: 4.9,
      jobs: 512,
      price: "LKR55/hr",
      available: true,
    },
    { 
      id: 3, 
      img: img3, 
      title: "Cleaner",
      category: "Cleaning",
      rating: 4.7,
      jobs: 823,
      price: "LKR.35/hr",
      available: true,
    },
    { 
      id: 4, 
      img: img4, 
      title: "Painter",
      category: "Painting",
      rating: 4.6,
      jobs: 267,
      price: "LKR.40/hr",
      available: true,
    },
    { 
      id: 5, 
      img: img5, 
      title: "Plumber",
      category: "Plumbing",
      rating: 4.9,
      jobs: 456,
      price: "LKR.60/hr",
      available: true,
    },
    { 
      id: 6, 
      img: img6, 
      title: "Skilled Professionals",
      category: "General",
      rating: 4.8,
      jobs: 1024,
      price: "LKR.50/hr",
      available: true,
    },
  ];

  const visibleImages = showAll ? gallery : gallery.slice(0, 3);

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6  ">
      <div className="container mx-auto max-w-7xl">
        
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-14 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
            <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-purple-500 animate-pulse" />
            <span className="text-xs sm:text-sm font-medium text-blue-700 dark:text-blue-300 uppercase tracking-wider">
              Our Services
            </span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 dark:text-white">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">Services</span>
          </h2>
          
          <p className="mt-3 text-sm sm:text-base text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Discover our wide range of professional services tailored to meet your needs.
          </p>
          
          {/* Decorative Line */}
          <div className="mt-4 flex justify-center">
            <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full" />
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {visibleImages.map((data, index) => (
            <ServiceCard
              key={data.id}
              data={data}
              index={index}
              isHovered={hoveredId === data.id}
              onHover={() => setHoveredId(data.id)}
              onLeave={() => setHoveredId(null)}
            />
          ))}
        </div>

        
        <div className="flex justify-center mt-10 sm:mt-12">
          <button
            onClick={() => setShowAll(!showAll)}
            className="group relative overflow-hidden px-8 py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
          >
            <span className="flex items-center gap-2">
              {showAll ? (
                <>
                  Show Less
                  <FaArrowLeft className="group-hover:-translate-x-1 transition-transform duration-300" />
                </>
              ) : (
                <>
                  View All Services
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
                </>
              )}
            </span>
          </button>
        </div>

      
      </div>
    </section>
  );
}

const ServiceCard = ({ data, index, isHovered, onHover, onLeave }) => {
  const { img, title, category, rating, jobs, price, available } = data;

  return (
    <div
      className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden h-56 sm:h-64 lg:h-72">
        <img
          src={img}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        
        {/* Overlay Gradient */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
        
        {/* Price Badge - Top Right */}
        <div className="absolute top-3 right-3 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <span className="text-sm font-bold text-blue-600 dark:text-purple-400">
            {price}
          </span>
        </div>

        {/* Availability Badge - Top Left */}
        <div className="absolute top-3 left-3">
          <span className="flex items-center gap-1.5 bg-green-500/90 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            Available
          </span>
        </div>

        {/* Category Badge - Bottom Left (visible on hover) */}
        <div className={`absolute bottom-4 left-4 transition-all duration-500 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <span className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-gray-700 dark:text-gray-300 text-xs font-medium px-3 py-1.5 rounded-full border border-gray-200 dark:border-gray-700">
            {category}
          </span>
        </div>

        {/* Quick Action - Bottom Right (visible on hover) */}
        <div className={`absolute bottom-4 right-4 transition-all duration-500 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <button className="bg-blue-600 hover:bg-blue-700 dark:bg-purple-600 dark:hover:bg-purple-700 text-white text-xs font-semibold px-4 py-2 rounded-full shadow-lg transition-all duration-300 hover:scale-105">
            Book Now
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-purple-400 transition-colors duration-300">
            {title}
          </h3>
        </div>

        {/* Rating & Jobs */}
        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
          <span className="flex items-center gap-1">
            <FaStar className="text-yellow-400 text-xs" />
            {rating} (5)
          </span>
          <span className="w-px h-4 bg-gray-300 dark:bg-gray-600" />
          <span>{jobs}+ jobs done</span>
        </div>

        {/* Progress Bar (visual indicator of popularity) */}
        <div className="mt-3">
          <div className="flex justify-between text-xs text-gray-400 dark:text-gray-500 mb-1">
            <span>Popularity</span>
            <span>{Math.round((jobs / 1024) * 100)}%</span>
          </div>
          <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full transition-all duration-1000"
              style={{ width: `${(jobs / 1024) * 100}%` }}
            />
          </div>
        </div>

        {/* Hover Action - Learn More */}
        <div className="mt-4 flex items-center gap-2 text-blue-600 dark:text-purple-400 opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-2 group-hover:translate-x-0">
          <span className="text-sm font-medium cursor-pointer">Learn More</span>
          <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform duration-300" />
        </div>
      </div>

      {/* Decorative Corner */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-600/10 to-purple-600/10 dark:from-blue-400/10 dark:to-purple-400/10 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
};


export default Services;