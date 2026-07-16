import React from 'react';
import { 
  FaHome, 
  FaUserCog, 
  FaSignOutAlt, 
  FaUserCircle, 
  FaUsers, 
  FaCalendarCheck, 
  FaChartBar,
  FaClipboardList,
  FaCog,
  FaBell,
  FaMoneyBillWave
} from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import ToggleBtn from '../customer/ToggleBtn';
import { MdLibraryAdd, MdOutlineWork, MdDashboard } from "react-icons/md";
import logo from '../../assets/logo.png';

function AdminSideBar() {
  const menuItems = [
    {
      id: 'workers',
      label: 'Manage Workers',
      icon: <MdOutlineWork />,
      path: '/admin/dashbord/manageWorkers'
    },
    {
      id: 'users',
      label: 'Manage Users',
      icon: <FaUsers />,
      path: '/admin/dashbord/manageUsers'
    },
    
    {
      id: 'bookings',
      label: 'Manage Bookings',
      icon: <FaCalendarCheck />,
      path: '/admin/dashbord/manageBookings'
    },
    {
      id: 'services',
      label: 'Manage Services',
      icon: <FaClipboardList />,
      path: '/admin/dashbord/manageServises'
    }
  ];

  return (
    <div className=" h-screen overflow-y-auto scrollbar-hide w-[280px] bg-gray-100 dark:bg-[#0f172a] text-black dark:text-white border-r-2 border-blue-600 dark:border-purple-600 ">

      {/* Sidebar Header */}
      <div className="p-4 border-b border-gray-300 dark:border-gray-700">
        <div className="text-xl flex justify-center items-center gap-4 text-blue-600 dark:text-purple-500">
          <p className='text-6xl'><FaUserCircle /></p>
          <div className='flex flex-col justify-center items-center'>
            <h2 className='font-bold text-lg'>Admin Panel</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Manage your platform
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
            <span className="text-lg">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}

        <div className='border-t-2 mt-20 pt-3 dark:border-t-purple-600 border-t-blue-600'>
          {/* Toggle Button */}
          <div className="flex items-center gap-3 py-3">
            <ToggleBtn />
            <span className="text-sm font-medium">Theme</span>
          </div>

          {/* Logout */}
          <button
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg
            text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30
            transition-all duration-200"
          >
            <FaSignOutAlt />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </nav>

      {/* Footer
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-[#0f172a]">
        <div className='flex justify-between items-center gap-4'>
          <img className='w-12 h-12 object-contain' src={logo} alt="Logo" />
          <p className="text-xs text-gray-400 dark:text-gray-500 text-center">
            Admin Panel v2.0
          </p>
        </div>
      </div> */}
    </div>
  );
}

export default AdminSideBar;