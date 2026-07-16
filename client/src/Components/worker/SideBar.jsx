import React from 'react';
import { FaBookmark, FaUserCog, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import ToggleBtn from '../customer/ToggleBtn';
import { MdLibraryAdd, MdOutlineWork } from "react-icons/md";
import logo from '../../assets/logo.png'

function SideBar() {

    const menuItems = [

        {
            id: 'reservations',
            label: 'My Reservations',
            icon: <FaBookmark />,
            path: '/worker/dashbord/workerReservation'
        },
        {
            id: 'myservices',
            label: 'My Services',
            icon: <MdOutlineWork />,
            path: '/worker/dashbord/workerServises'
        },
        {
            id: 'addservices',
            label: 'Add Services',
            icon: <MdLibraryAdd />,
            path: '/worker/dashbord/workerAddServises'
        }
    ];


    return (
        <div className="h-full overflow-y-auto scrollbar-hide w-[280px] bg-gray-100 dark:bg-[#0f172a] text-black dark:text-white border-r-2 border-blue-600 dark:border-purple-600 flex-shrink-0">

            {/* Sidebar Header */}
            <div className="p-4 border-b border-gray-300 dark:border-gray-700">
                <div className="text-xl flex justify-center items-center gap-4  text-blue-600 dark:text-purple-500">

                    <p className='text-6xl'><FaUserCircle /></p>
                    <div className='flex flex-col justify-center items-center'>
                        <h2 className='font-bold'> Worker Panel</h2>
                        <p className="text-xs  text-gray-500 dark:text-gray-400 mt-1">
                            Manage your services !
                        </p>
                    </div>

                </div>


            </div>


            {/* Navigation Menu */}
            <nav className="p-3 space-y-1">

                {menuItems.map((item) => (

                    <NavLink
                        key={item.id}
                        to={item.path}
                        className={({ isActive }) =>
                            `w-full flex items-center gap-3 px-4 py-5 mt-2 rounded-lg
              transition-all duration-200 text-sm font-medium
              ${isActive
                                ? 'bg-blue-100 dark:bg-purple-600/40 text-blue-600 dark:text-white'
                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700/50'
                            }`
                        }
                    >

                        <span className="text-lg">
                            {item.icon}
                        </span>

                        {item.label}

                    </NavLink>

                ))}


                <div className='border-t-2 mt-40 pt-2 dark:border-t-purple-600 border-t-blue-600'>
                    {/* Toggle Button */}
                    <div className="flex items-center gap-3 py-3">
                        <ToggleBtn />
                        <span>Theme</span>
                    </div>


                    {/* Logout */}
                    <button
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg
          text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30"
                    >
                        <FaSignOutAlt />
                        Logout
                    </button>
                </div>


            </nav>


            {/* Footer */}
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-300 dark:border-gray-700">
                <div className='flex justify-between items-center gap-4'>
                    <img className='w-15' src={logo} ></img>
                    <p className="text-xs text-gray-400 dark:text-gray-500 text-center">
                        Worker Panel
                    </p>

                </div>
            </div>


        </div>
    );
}

export default SideBar;