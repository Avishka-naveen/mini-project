import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaArrowRight, FaStar, FaShieldAlt } from 'react-icons/fa';
import subbannerPhoto from '../../assets/subbannerphoto.png';

function SubBanner() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/register');
    toast.success('Please Register to Book Services', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  return (
    <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="relative  rounded-2xl sm:rounded-3xl shadow-2xl bg-gradient-to-br from-blue-700 to-indigo-700 dark:from-slate-900 dark:to-indigo-900">
          
          {/* Decorative Background */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl" />
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-5 gap-8 items-center p-6 sm:p-8 lg:p-12">
            
      
            <div className="lg:col-span-2 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs font-medium text-white/90">Trusted Platform</span>
              </div>
              
              <p className="text-sm text-white/80 font-medium tracking-wider uppercase">
                Find Trusted
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight">
                Workers
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-400">
                  Near You
                </span>
              </h1>
              
              <div className="flex  items-center gap-4">
                <div className="flex text-yellow-400">
                  <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                </div>
                <span className="text-white/80 text-sm">4.9/5</span>
                <span className="text-white/30">|</span>
                <span className="text-white/80 text-sm flex items-center gap-1.5">
                  <FaShieldAlt className="text-green-400" />
                  Verified
                </span>
              </div>
            </div>

     
            <div className="lg:col-span-1 flex justify-center">
              <div className="relative">
               <img
  src={subbannerPhoto}
  alt="Workers"
  className="w-full max-w-[200px] sm:max-w-[280px] md:max-w-[320px] lg:max-w-[400px] xl:max-w-[450px] 
           h-auto object-contain drop-shadow-2xl 
           mx-auto
           scale-100 sm:scale-110 md:scale-125 lg:scale-150 xl:scale-290
           pb-2 sm:pb-4 
           "
  loading="lazy"
/>
                <div className="absolute sm:-top-15 sm:-right-52  -top-2 -right-2 bg-green-500 rounded-full px-2 py-1 text-white text-xs font-bold shadow-lg animate-bounce">
                  24/7
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 flex flex-col items-center lg:items-end text-center lg:text-right">
              <div className="space-y-4 max-w-md">
                <p className="text-white/90 text-base font-medium">
                  Hire Skilled Professionals
                </p>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
                  Get Your Job
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-400">
                    Done Right
                  </span>
                </h2>
                <p className="text-white/70 text-sm leading-relaxed">
                  Connect with verified professionals in your area.
                </p>
                
                <button
                  onClick={handleNavigate}
                  className="group inline-flex items-center gap-2 bg-white text-blue-700 font-bold py-3 px-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105 active:scale-95"
                >
                  Hire Now
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </div>
          </div>

    
          <div className="relative z-10 border-t border-white/10 px-6 py-3 bg-black/10 backdrop-blur-sm">
            <div className="grid grid-cols-3 max-w-md mx-auto">
              <div className="text-center">
                <p className="text-white font-bold">500+</p>
                <p className="text-white/60 text-xs">Workers</p>
              </div>
              <div className="text-center border-x border-white/10">
                <p className="text-white font-bold">4.9★</p>
                <p className="text-white/60 text-xs">Rating</p>
              </div>
              <div className="text-center">
                <p className="text-white font-bold">24/7</p>
                <p className="text-white/60 text-xs">Support</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SubBanner;