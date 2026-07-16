
import SideBar from '../../Components/admin/SideBar'
import React, { useState, useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaTimes } from "react-icons/fa";
import Navbar from "../../Components/customer/NavBar";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { SlCalender } from "react-icons/sl";
import { Outlet } from "react-router-dom";


function AdminDashbord() {
  const [showSidebar, setShowSidebar] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [date, setDate] = useState(new Date());
    const [showCalendar, setShowCalendar] = useState(false);
  
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
                  Welcome back! Here's what's happening today.
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
        </div>
      </div>
    </>
  )
}

export default AdminDashbord
