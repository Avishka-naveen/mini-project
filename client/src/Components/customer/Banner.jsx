import React from 'react';
import Slider from "react-slick";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaArrowRight } from 'react-icons/fa';
import img1 from '../../assets/bannercarpenter.png';
import img2 from '../../assets/bannerelect.png';
import img3 from '../../assets/bannerPlumber.png';
import img4 from '../../assets/other_worker.png';


function Banner() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/register');
  };

  const slideData = [
    {
      id: 1,
      img: img1,
      subtitle: 'Bring Your Woodwork Ideas to Life',
      title: 'Carpenter',
      description: 'Professional carpentry services',
      color: 'from-amber-600 to-orange-700',
      bgClass: 'from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30',
    },
    {
      id: 2,
      img: img2,
      subtitle: 'Trusted Electrical Experts',
      title: 'Electrician',
      description: 'Fast, safe electrical services',
      color: 'from-blue-600 to-indigo-700',
      bgClass: 'from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30',
    },
    {
      id: 3,
      img: img3,
      subtitle: 'Need a Reliable Plumber?',
      title: 'Plumber',
      description: '24/7 Plumbing Solutions',
      color: 'from-cyan-600 to-teal-700',
      bgClass: 'from-cyan-50 to-teal-50 dark:from-cyan-900/30 dark:to-teal-900/30',
    },
    {
      id: 4,
      img: img4,
      subtitle: 'More Professional Services',
      title: 'Other Services',
      description: 'One Platform, Many Solutions',
      color: 'from-purple-600 to-pink-700',
      bgClass: 'from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30',
    },
  ];

  const settings = {
   
    dots: false,
    arrows: false,
    infinite: true,
    speed: 800,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    cssEase: "ease-in-out",
    pauseOnHover: false,
    pauseOnFocus: true,
    

   
  };

  return (
    <div className="relative w-full overflow-hidden  ">
      <Slider {...settings}>
        {slideData.map((data) => (
          <SlideItem key={data.id} data={data} onNavigate={handleNavigate} />
        ))}
      </Slider>
    </div>
  );
}


const SlideItem = ({ data, onNavigate }) => {
  const { img, subtitle, title, description, bgClass, color } = data;

  return (
    <div className="relative min-h-[60vh] sm:min-h-[70vh] lg:min-h-[80vh] overflow-hidden ">
      
      <div className={`absolute inset-0 bg-gradient-to-br ${bgClass} transition-all duration-700`} />

      
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-blue-500 blur-3xl" />
        <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-purple-500 blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 min-h-[60vh] sm:min-h-[70vh] lg:min-h-[80vh] flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center w-full py-8 sm:py-12 lg:py-16">
        
          <div className="flex flex-col items-start text-left order-2 lg:order-1 space-y-4 sm:space-y-6">
           
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/20 shadow-2xl dark:bg-white/10 backdrop-blur-md border border-white/30">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs  sm:text-sm font-medium text-gray-700 dark:text-white/90">
                Available Now
              </span>
            </div>

            <h3 className="text-lg sm:text-2xl lg:text-3xl font-medium text-gray-700 dark:text-white/90 leading-tight">
              {subtitle}
            </h3>

          
            <h1 className={`text-4xl sm:text-6xl whitespace-nowrap lg:text-7xl xl:text-8xl font-bold bg-gradient-to-r ${color} bg-clip-text text-transparent leading-tight`}>
              {title}
            </h1>

       
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-300 font-medium">
              {description}
            </p>

           
            <button
              onClick={onNavigate}
              className={`group relative overflow-hidden bg-gradient-to-r ${color} text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] text-sm sm:text-base`}
            >
              <span className="flex items-center gap-2 sm:gap-3">
                Book Now
                <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300 text-sm sm:text-base" />
              </span>
            </button>

         
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-2">
              <span className="flex items-center gap-1.5 shadow-xl p-2">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                100% Trusted
              </span>
              <span className="flex items-center shadow-xl p-2 gap-1.5">
                <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                4.8/5 Rating
              </span>
            </div>
          </div>

       
          <div className="order-1 lg:order-2 flex items-center justify-center">
            <div className="relative w-full max-w-[280px] sm:max-w-[350px] lg:max-w-[450px] xl:max-w-[500px]">
            
              <div className={`absolute inset-0 bg-gradient-to-r ${color} rounded-full opacity-10 blur-2xl scale-110`} />
              
          
              <div className="relative">
                <img
                  src={img}
                  alt={title}
                  className="w-full h-auto object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
              </div>

            
              <div className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl px-3 py-2 sm:px-4 sm:py-3 shadow-lg border border-gray-200/50 dark:border-gray-700/50 animate-bounce">
                <p className="text-xs sm:text-sm font-bold text-green-600 dark:text-green-400">
                  ✅ Verified
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r ${color}`} />
    </div>
  );
};

export default Banner;