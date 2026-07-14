
import NavBar from '../../Components/NavBar'
import Footer from '../../Components/Footer'
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import serviseDummyData from "../../assets/dummyData";
import { FaMoneyCheck, FaUser } from "react-icons/fa";
import { MdOutlineDescription, MdEmail } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import { FaPhone } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import { useState ,React} from 'react';


function WorkerDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const[showCommentes,setShowComments] =useState(false);

  const worker = serviseDummyData.find(
    (service) => service._id === id
  );

  if (!worker) {
    return (
      <>
        <NavBar />
        <div className="flex items-center justify-center min-h-screen bg-white dark:bg-[#1e1e1e]">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Worker Not Found</h1>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <NavBar />

      <div className='min-h-screen bg-white dark:bg-[#1e1e1e] text-black dark:text-white px-4 sm:px-6 md:px-10 lg:px-20 py-6'>

        {/* Breadcrumb */}
        <p className='text-sm text-gray-500 dark:text-gray-400 mb-4 cursor-pointer ' >
          <span className='hover:text-blue-500' onClick={() => navigate('/')} >Home</span> / <span className='hover:text-blue-500' onClick={() => navigate('/customer/workerList')}>Worker List</span> / {worker.title}
        </p>

        {/* Main Container - Responsive Grid */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>

          {/* Left Side - Details Section (2/3 width on large screens) */}
          <div className='lg:col-span-2'>
            <div className='flex flex-col p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700'>

              <h1 className='font-bold text-2xl sm:text-3xl text-gray-800 dark:text-white mb-4'>
                About
              </h1>

              <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                <div className='bg-gray-50 dark:bg-gray-700 p-3 rounded-lg'>
                  <p className='text-xs sm:text-sm text-gray-500 dark:text-gray-400'>Title</p>
                  <p className='font-medium text-gray-800 dark:text-white text-sm sm:text-base'>
                    {worker.title}
                  </p>
                </div>

                <div className='bg-gray-50 dark:bg-gray-700 p-3 rounded-lg'>
                  <div className='flex items-center gap-2'>
                    <FaMoneyCheck />
                    <p className='text-xs sm:text-sm text-gray-500 dark:text-gray-400'>Price</p>
                  </div>
                  <p className='font-bold text-green-600 dark:text-green-400 text-sm sm:text-base'>
                    LKR {worker.price}
                  </p>
                </div>

                <div className='bg-gray-50 dark:bg-gray-700 p-3 rounded-lg sm:col-span-2'>

                  <div className='flex items-center gap-2'>
                    <MdOutlineDescription />
                    <p className='text-xs sm:text-sm text-gray-500 dark:text-gray-400'>Description</p>

                  </div>
                  <p className='text-gray-700 dark:text-gray-300 text-sm sm:text-base'>
                    {worker.description}
                  </p>
                </div>

                <div className='bg-gray-50 dark:bg-gray-700 p-3 rounded-lg sm:col-span-2'>
                  <p className='text-xs sm:text-sm text-gray-500 dark:text-gray-400'>Skills</p>
                  <div className='flex flex-wrap gap-2 mt-1'>
                    {worker.skills?.split(',').map((skill, index) => (
                      <span
                        key={index}
                        className='bg-blue-100 dark:bg-purple-900 text-blue-700 dark:text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm'
                      >
                        {skill.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Contact Worker Section */}
              <div className='mt-6 pt-4 border-t border-gray-200 dark:border-gray-700'>
                <h2 className='font-semibold text-lg sm:text-xl text-gray-800 dark:text-white mb-3'>
                  Contact Worker
                </h2>

                <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                  <div className='bg-gray-50 dark:bg-gray-700 p-3 rounded-lg'>
                    <div className='flex items-center ju gap-2'>
                      <FaUser />
                      <p className='text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1'>Name</p>
                    </div>
                    <p className='text-gray-800 dark:text-white text-sm sm:text-base'>
                      {worker.workerDetails.name}
                    </p>
                  </div>

                  <div className='bg-gray-50 dark:bg-gray-700 p-3 rounded-lg'>
                    <div className='flex items-center gap-2'>
                      <IoLocationSharp />
                      <p className='text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1'> Location</p>
                    </div>
                    <p className='text-gray-800 dark:text-white text-sm sm:text-base'>
                      {worker.workerDetails.location}
                    </p>
                  </div>

                  <div className='bg-gray-50 dark:bg-gray-700 p-3 rounded-lg'>
                    <div className='flex items-center gap-2'>
                      <MdEmail />
                      <p className='text-xs sm:text-sm text-gray-500 dark:text-gray-400 '> Email</p>
                    </div>
                    <p
                      p
                      className='text-blue-600 dark:text-blue-400 hover:underline text-sm sm:text-base break-all'
                    >
                      {worker.workerDetails.email}
                    </p>
                  </div>

                  <div className='bg-gray-50 dark:bg-gray-700 p-3 rounded-lg'>
                    <div className='flex items-center gap-2'>
                      <FaPhone />
                      <p className='text-xs sm:text-sm text-gray-500 dark:text-gray-400'> Phone</p>
                    </div>
                    <p

                      className='text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 text-sm sm:text-base'
                    >
                      {worker.workerDetails.phone}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className='mt-6 flex flex-col sm:flex-row gap-3'>
                <button className=' cursor-pointer bg-blue-600 w-full hover:bg-blue-700 dark:bg-purple-600 dark:hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition duration-300'>
                  Book Now
                </button>

              </div>

            </div>
          </div>

          {/* Right Side - Profile Image (1/3 width on large screens) */}
          <div className='flex flex-col items-center'>
            <div className='w-full  border-gray-100  p-4 sm:p-6'>
              <img
                src={worker.workerDetails.profileImage}
                alt={worker.workerDetails.name}
                className='w-full max-w-[250px] h-auto aspect-square object-cover rounded-full mx-auto shadow-lg'

              />
              <h2 className='text-center font-bold text-xl sm:text-2xl mt-4 text-gray-800 dark:text-white'>
                {worker.workerDetails.name}
              </h2>
              <p className='text-center text-gray-500 dark:text-gray-400 text-sm'>
                {worker.title}
              </p>
              <div className='flex justify-center gap-2 mt-3'>
                <p><FaStar /></p>
                <span className='bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-3 py-1 rounded-full text-xs sm:text-sm font-medium'>
                  {worker.rating || '4.5'}
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* comments section */}
        <h1>Feedbacks</h1>
        <div>view comments</div>
      </div>

      <Footer />
    </>
  );
}

export default WorkerDetails;