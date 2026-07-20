import React, { useContext } from 'react'
import logo from '../../assets/logo.png'
import { FaUserCircle } from "react-icons/fa";
import { useLocation, useNavigate } from 'react-router-dom';
import ToggleBtn from './ToggleBtn';
import ProfileCard from './ProfileCard';
import { useState } from 'react';
import { AppContext } from '../../Context/Appcontext';



function NavBar() {

    const location = useLocation();
    const navigate = useNavigate();

    const { currentCustomerData } = useContext(AppContext);
    // console.log(currentCustomerData);

    const hiddenUserIcon = location.pathname === '/register' || location.pathname === '/';
    const hiddenSignInButton = location.pathname === '/';
    const hiddenLinks = location.pathname === '/';

    const [openProfileCard, setOpenProfileCard] = useState(false);

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);

        if (element) {
            element.scrollIntoView({
                behavior: "smooth"
            });
        }
    };

    return (
        <div className='border-b-3 px-3  border-blue-600 dark:border-purple-600  py-2 flex items-center justify-between bg-gray-100 dark:bg-[#0f172a] text-black dark:text-white'>
            <div>
                <img src={logo} alt='logo' className='w-15 h-15 lg:w-28 lg:h-25' />
            </div>
            <div className='flex items-center justify-center lg:gap-6 gap-1'>

                {/* link section */}
                {
                    hiddenLinks && (
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
                    )
                }

                {/* user icon section */}

                {!hiddenUserIcon && (
                    <div className="relative inline-block">
                        {/* User Icon */}
                        <div className="flex items-center gap-2 cursor-pointer " onClick={() => setOpenProfileCard(!openProfileCard)}>
                          
                            {!openProfileCard && currentCustomerData?.customerName && (
                                <div className='uppercase bg-gradient-to-br from-blue-500 to-purple-600 dark:from-purple-600 dark:to-blue-700 rounded-full w-13 h-13 flex items-center justify-center font-light text-2xl gap-1 text-white'>
                                    <h1>
                                        {currentCustomerData.customerName.split(' ')[0][0]}
                                        {currentCustomerData.customerName.split(' ')[1]?.[0]}
                                    </h1>
                                </div>
                            )}
                            <p className='flex items-center gap-1'>
                                Hi <span className="text-blue-600 hidden sm:block capitalize dark:text-purple-600">{currentCustomerData.customerName}</span>!
                            </p>
                        </div>


                        {/* profile card section */}
                        {
                            openProfileCard && <ProfileCard />
                        }


                    </div>
                )}






                {/* toggle button section */}
                <div className='flex items-center justify-center gap-2 bg-gray-200 dark:bg-[#1e1e1e] hover:bg-gray-500 lg:p-1 duration-300 rounded-full' >
                    <ToggleBtn />
                </div>

                {/* sign up button section */}
                {hiddenSignInButton && (
                    <div className='px-4 py-2'>
                        <button onClick={() => navigate('/register')} className="px-3 py-1.5 text-sm sm:px-4 sm:py-2 sm:text-base lg:px-5 lg:py-2 lg:text-lg bg-blue-700 dark:bg-purple-600 hover:dark:bg-purple-500 hover:bg-blue-500 font-semibold text-white rounded  whitespace-nowrap
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
