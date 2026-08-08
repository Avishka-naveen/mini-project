import React, { useState, useEffect, useContext } from "react";
import SideBar from "../../Components/worker/SideBar";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaTimes } from "react-icons/fa";
import Navbar from "../../Components/customer/NavBar";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { SlCalender } from "react-icons/sl";
import { Outlet, useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/Appcontext";


function WorkerDashboard() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [date, setDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const navigate =useNavigate()

  const { currentWorkerData, fetchWorkerData } = useContext(AppContext);

  // Check screen size
  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setShowSidebar(true);
      } else {
        setShowSidebar(false);
      }
    };

    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);


  // Close sidebar on mobile
  const closeSidebar = () => {
    if (isMobile) {
      setShowSidebar(false);
    }
  };

  return (
    <>


      <div className="flex  h-screen bg-gray-50 dark:bg-[#1e1e1e] relative">

        {/* Overlay for mobile */}
        {showSidebar && isMobile && (
          <div
            className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
            onClick={closeSidebar}
          />
        )}

        {/* Sidebar */}
        <div className={`  ${showSidebar ? 'block' : 'hidden'} lg:relative z-50  top-[64px] lg:top-0 transition-transform duration-300 ease-in-out  `}>
          <SideBar />
        </div>
        {/* ${showSidebar ? 'translate-x-0' : '-translate-x-full'} */}

        {/* Content Area */}
        <div className="flex-1 transition-all  duration-300">
          {/* Header with Menu Button */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowSidebar(!showSidebar)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label="Toggle sidebar"
              >

                <GiHamburgerMenu className="text-2xl text-gray-600 dark:text-gray-300" />

              </button>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">
                  Dashboard
                </h1>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                  Welcome back!<span className="capitalize text-blue-600 dark:text-purple-600 font-semibold ">{currentWorkerData?.customerId?.customerName}</span> Here's what's happening today.
                </p>


                {/* <p className="mt-5">
        Selected Date: {date.toDateString()}
      </p> */}
              </div>
            </div>
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setShowCalendar(!showCalendar)}>
              <span className="text-xl p-2 bg-blue-100 dark:bg-yellow-900/30 rounded-lg">
                <SlCalender className="text-blue-600 dark:text-purple-600 dark:text-purple-400" />
              </span>
              <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                {new Date().toLocaleDateString('en-US', {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric'
                })}
              </span>
              {showCalendar && (
                <div className="absolute right-4 top-20 z-50">
                  <Calendar
                    onChange={setDate}
                    value={date}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Your Content */}
          <div className="p-4 sm:p-6">
            <div className="h-[85vh] overflow-y-auto bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 sm:p-6">

              <Outlet />


            </div>
          </div>

          {/* account block model */}


          {currentWorkerData?.isActive ? (
           
            <span ></span>
          ) : (
            
            <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 p-4 animate-fade-in">

              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-scale-in">

              
                <div className="relative bg-gradient-to-r from-red-600 to-red-700 dark:from-red-800 dark:to-red-900 px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white text-2xl">
                      🚫
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white">
                        Account Blocked
                      </h2>
                      <p className="text-white/80 text-sm">
                        Your account has been temporarily restricted
                      </p>
                    </div>
                  </div>
                </div>

                
                <div className="p-6">
                  <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 dark:border-red-400 p-4 rounded-lg mb-4">
                    <p className="text-red-700 dark:text-red-300 text-sm font-medium">
                      ⚠️ Your account has been temporarily blocked by the administrator.
                    </p>
                  </div>

                  <div className="space-y-3 text-gray-600 dark:text-gray-300">
                    <p className="text-sm">
                      This action may have been taken due to:
                    </p>
                    <ul className="text-sm space-y-1.5 list-disc list-inside text-gray-500 dark:text-gray-400">
                      <li>Violation of our terms of service</li>
                      <li>Suspicious activity detected</li>
                      <li>Reported content or behavior</li>
                    </ul>
                  </div>

                  {/* Contact Support */}
                  <div className="mt-5 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-700">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                      📧 Need help? Contact our support team:
                    </p>
                    <a
                      href="mailto:quickhiresupport@gmail.com"
                      className="text-blue-600 dark:text-blue-400 font-medium hover:underline flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      quickhiresupport@gmail.com
                    </a>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-6 flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => window.location.href = 'mailto:quickhiresupport@gmail.com'}
                      className="flex-1 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 
                     hover:from-blue-700 hover:to-purple-700 text-white font-medium 
                     rounded-xl transition duration-200 shadow-md hover:shadow-lg
                     flex items-center justify-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Contact Support
                    </button>
                    <button
                      onClick={()=>navigate('/customer/workerList')}
                      className="flex-1 py-2.5 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 
                     text-gray-700 cursor-pointer dark:text-gray-200 font-medium rounded-xl transition duration-200"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default WorkerDashboard;