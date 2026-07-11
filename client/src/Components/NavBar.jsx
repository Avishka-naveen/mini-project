import React from 'react'
import logo from '../assets/logo.png'
import { FaUserCircle } from "react-icons/fa";
import { useLocation, useNavigate } from 'react-router-dom';
import ToggleBtn from './ToggleBtn';



function NavBar() {

    const location = useLocation();
    const navigate=useNavigate();

    const hiddenUserIcon = location.pathname === '/register' || location.pathname === '/';
    const hiddenSignInButton = location.pathname === '/'

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);

        if (element) {
            element.scrollIntoView({
                behavior: "smooth"
            });
        }
    };

    return (
        <div className='border-b-3 border-blue-600 dark:border-purple-600 mx-3 py-2 flex items-center justify-between bg-white dark:bg-[#1e1e1e] text-black dark:text-white'>
            <div>
                <img src={logo} alt='logo' className='w-15 h-15 lg:w-28 lg:h-25' />
            </div>
            <div className='flex items-center justify-center lg:gap-6 gap-1'>

                {/* link section */}
                <div className="hidden lg:flex items-center justify-center gap-6  text-lg ">
                    <ul className='flex items-center justify-center gap-6  text-lg '>
                        <li onClick={() => scrollToSection("services")}
                            className='cursor-pointer hover:text-blue-600 dark:hover:text-purple-600 duration-300'
                        >
                            Services
                        </li>
                        <li
                            onClick={() => scrollToSection("about")}
                            className='cursor-pointer hover:text-blue-600 dark:hover:text-purple-600 duration-300'
                        >
                            About Us
                        </li>
                    </ul>
                </div>

                {/* user icon section */}
                {!hiddenUserIcon && (
                    <div className='flex items-center justify-center gap-2'>
                        <FaUserCircle className='w-12 h-12' />
                        <p className='font-semibold '>Hi <span className='text-blue-600 dark:text-purple-600'>developer</span> !</p>
                    </div>
                )}

                {/* toggle button section */}
                <div className='flex items-center justify-center gap-2 bg-gray-200 dark:bg-[#1e1e1e] hover:bg-gray-500 lg:p-1 duration-300 rounded-full' >
                    <ToggleBtn />
                </div>

                {/* sign up button section */}
                {hiddenSignInButton && (
                    <div className='px-4 py-2'>
                        <button onClick={()=>navigate('/register')} className="px-3 py-1.5 text-sm sm:px-4 sm:py-2 sm:text-base lg:px-5 lg:py-2 lg:text-lg bg-blue-700 dark:bg-purple-600 hover:dark:bg-purple-500 hover:bg-blue-500 font-semibold text-white rounded  whitespace-nowrap
                        transition-all duration-300">
                            Sign In
                        </button>
                    </div>
                )}




            </div>
        </div>
    )
}

export default NavBar
