
import NavBar from '../../Components/customer/NavBar'
import Footer from '../../Components/customer/Footer'
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import serviseDummyData from "../../assets/dummyData";
import { FaMoneyCheck, FaUser } from "react-icons/fa";
import { MdOutlineDescription, MdEmail } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import { FaPhone } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import { AiOutlineCaretDown } from "react-icons/ai";
import { FaCircleUser } from "react-icons/fa6";
import { useState, React } from 'react';
import city_img from '../../assets/city.jpg'
import axios from 'axios';
import { useContext } from 'react';
import { AppContext } from '../../Context/Appcontext';
import { useEffect } from 'react';
import { toast } from 'react-toastify';



function WorkerDetails() {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [showCommentes, setShowComments] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  const { backendUrl } = useContext(AppContext);

  const [serviceData, setServiceData] = useState('');
  const [comments, SetComments] = useState('');


  //-----------------fetch services detalis------------------------//
  const getEachServiceDetails = async () => {

    try {
      const response = await axios.get(
        backendUrl + `/api/worker/getServiseData/${serviceId}`
      );

      if (response.data.success) {
        setServiceData(response.data.service);
        console.log("4. SUCCESS! Service Data:", response.data.service);
        console.log(serviceData.workerId._id)
       
      } else {
        console.log(" FAILED in backend. Message:", response.data.message);
      }
    } catch (error) {
      console.error("ERROR (Network/CORS/Code):", error);
    }
  };


  // ---------------------------fetch comment details--------------------------//
  const getAllComments = async () => {
    // console.log(serviceId)
    try {
      const response = await axios.get(backendUrl + `/api/worker/getAllCommets/${serviceId}`);
      if (response.data.success) {
        SetComments(response.data.comments);
        //console.log(response.data.comments);
      } else {
        toast.error("comment loading error!")
      }
    } catch (error) {
      toast.error(error);
    }
  }
  useEffect(() => {
    if (serviceId) {
      getEachServiceDetails();
      getAllComments();
    }
  }, [serviceId]);

  // ------------------reservation formhandle --------------------//


  const [formData, setFormData] = useState({
    name: '',
    email: '',
    number: '',
    address: '',
    date: '',
    description: '',
  })

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const hadleClear = () => {
    setFormData({
      name: '',
      email: '',
      number: '',
      address: '',
      date: '',
      description: '',
    });
  }

  const handleSubmit=async(e)=>{
    e.preventDefault();
    if(!formData.name || !formData.email || !formData.number || !formData.address || !formData.date || !formData.description) {
      toast.error("Please fill in all fields.");
      return;
    }
    try {
      let response;
      response=await axios.post(backendUrl+'/api/customer/addReservation',{serviceId:serviceId,workerId:serviceData.workerId._id,customerName:formData.name,customerEmail:formData.email,customerPhone:formData.number,customerAddress:formData.address,date:formData.date,description:formData.description,status:"pending"},{withCredentials:true});
      if(response.data.success){
        toast.success("Reservation added successfully!");
        setShowBooking(false);
        hadleClear();
      }else{
        toast.error("Failed to add reservation.");
      }
    } catch (error) {
      toast.error("Error submitting form.");
    }

  }

  if (!serviceData) {
    return (
      <>
        <NavBar />
        <div className="flex items-center justify-center min-h-screen bg-white dark:bg-[#1e1e1e]">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Loding.....</h1>
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
          <span className='hover:text-blue-500' onClick={() => navigate('/')} >Home</span> / <span className='hover:text-blue-500' onClick={() => navigate('/customer/workerList')}>Worker List</span> / {serviceData.serviceName}
        </p>

        {/* Main Container - Responsive Grid */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>

          {/* Left Side - Details Section (2/3 width on large screens) */}
          <div className='lg:col-span-2'>
            <div className='flex flex-col p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700'>

              <h1 className='font-bold text-2xl sm:text-3xl text-gray-800 dark:text-white mb-4'>
                About
              </h1>
              <div className='bg-gray-50 dark:bg-gray-700 p-3 rounded-lg my-3'>
                <p className='text-xs sm:text-sm text-gray-500 dark:text-gray-400'>Worker Description</p>
                <p className='font-medium text-gray-800 dark:text-white text-sm sm:text-base'>
                  {serviceData?.workerId?.description}
                </p>
              </div>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>

                <div className='bg-gray-50 dark:bg-gray-700 p-3 rounded-lg'>
                  <p className='text-xs sm:text-sm text-gray-500 dark:text-gray-400'>Title</p>
                  <p className='font-medium text-gray-800 dark:text-white text-sm sm:text-base'>
                    {serviceData.serviceName}
                  </p>
                </div>

                <div className='bg-gray-50 dark:bg-gray-700 p-3 rounded-lg'>
                  <div className='flex items-center gap-2'>
                    <FaMoneyCheck />
                    <p className='text-xs sm:text-sm text-gray-500 dark:text-gray-400'>Price</p>
                  </div>
                  <p className='font-bold text-green-600 dark:text-green-400 text-sm sm:text-base'>
                    LKR {serviceData.price}
                  </p>
                </div>

                <div className='bg-gray-50 dark:bg-gray-700 p-3 rounded-lg sm:col-span-2'>

                  <div className='flex items-center gap-2'>
                    <MdOutlineDescription />
                    <p className='text-xs sm:text-sm text-gray-500 dark:text-gray-400'>Service Description</p>

                  </div>
                  <p className='text-gray-700 dark:text-gray-300 text-sm sm:text-base'>
                    {serviceData.serviceDescription}descrption
                  </p>
                </div>

                <div className='bg-gray-50 dark:bg-gray-700 p-3 rounded-lg sm:col-span-2'>
                  <p className='text-xs sm:text-sm text-gray-500 dark:text-gray-400'>Skills</p>
                  <div className='flex flex-wrap gap-2 mt-1'>
                    {serviceData.serviceSkill?.split(',').map((skill, index) => (
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
                      {serviceData?.workerId?.customerId?.customerName}
                    </p>
                  </div>

                  <div className='bg-gray-50 dark:bg-gray-700 p-3 rounded-lg'>
                    <div className='flex items-center gap-2'>
                      <IoLocationSharp />
                      <p className='text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1'> Location</p>
                    </div>
                    <p className='text-gray-800 dark:text-white text-sm sm:text-base'>
                      {serviceData.serviceLocation}
                    </p>
                  </div>

                  <div className='bg-gray-50 dark:bg-gray-700 p-3 rounded-lg'>
                    <div className='flex items-center gap-2'>
                      <MdEmail />
                      <p className='text-xs sm:text-sm text-gray-500 dark:text-gray-400 '> Email</p>
                    </div>
                    <p

                      className='text-blue-600 dark:text-blue-400 hover:underline text-sm sm:text-base break-all'
                    >
                      {serviceData?.workerId?.customerId?.customerEmail}
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
                      {serviceData.servicePhone}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className='mt-6 flex flex-col sm:flex-row gap-3'>
                <button onClick={() => setShowBooking(true)} className=' cursor-pointer bg-blue-600 w-full hover:bg-blue-700 dark:bg-purple-600 dark:hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition duration-300'>
                  Book Now
                </button>

              </div>

            </div>
          </div>

          {/* Right Side - Profile Image (1/3 width on large screens) */}
          <div className='flex flex-col items-center'>
            <div className='w-full  border-gray-100  p-4 sm:p-6'>
              <img
                src={serviceData?.workerId?.profile}

                className='w-full max-w-[250px] h-auto  border-3 border-blue-600 dark:border-purple-600 aspect-square object-cover rounded-full mx-auto shadow-lg'

              />
              <h2 className='text-center font-bold text-xl sm:text-2xl mt-4 text-gray-800 dark:text-white'>
                {serviceData?.workerId?.customerId?.customerName}
              </h2>
              <p className='text-center text-gray-500 dark:text-gray-400 text-sm'>
                {serviceData.serviceName}
              </p>
              <div className='flex justify-center gap-2 mt-3'>
                <p><FaStar /></p>
                <span className='bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-3 py-1 rounded-full text-xs sm:text-sm font-medium'>
                  {'4.5'}
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* comments section */}


        <div className='flex gap-1 mt-10 items-center ' onClick={() => setShowComments(!showCommentes)}>
          <p className={`${showCommentes ? "rotate-180" : "rotate-0"} duration-300`}><AiOutlineCaretDown /></p>
          <div className='cursor-pointer text-xl' > comments({comments.length}) </div>
        </div>
        {
          showCommentes && (
            <div className='mt-4'>


              {/* Comments Container with Scroll Bar */}
              <div className='max-h-72  border border-gray-200 dark:border-gray-700 p-4 overflow-y-auto pr-2 space-y-3 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200 dark:scrollbar-track-gray-700'>
                {comments?.length > 0 ? (
                  comments.map((comment, index) => (
                    <div
                      key={index}
                      className='border-b border-gray-200 dark:border-gray-700 pb-3 last:border-b-0'
                    >
                      <div className='flex items-center gap-3'>
                        <span className='bg-blue-600 text-white dark:bg-purple-600 p-2 rounded-full'>{comment.customerId?.customerName?.split(" ").map(name => name[0]).join("").toUpperCase()}</span>
                        <div className='flex-1'>
                          <div className='flex items-center gap-2 flex-wrap'>
                            <span className='font-semibold text-gray-800 dark:text-white text-sm'>
                              {comment.customerId?.customerName || 'Anonymous'}
                            </span>
                            <span className='text-xs text-gray-400 dark:text-gray-500'>
                              •
                            </span>
                            <span className='text-xs text-gray-400 dark:text-gray-500'>
                              📅 {new Date(comment.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          <p className='text-gray-700 dark:text-gray-300 text-sm mt-1'>
                            {comment.comment}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className='flex flex-col items-center justify-center py-8 text-gray-400 dark:text-gray-500'>
                    <FaCircleUser className='text-5xl mb-2 opacity-30' />
                    <p className='text-sm'>No comments yet. Be the first to comment!</p>
                  </div>
                )}
              </div>
            </div>
          )
        }



        <>
          {/* booking form section */}
          {/* Full-screen dark overlay */}


          {showBooking && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">

                <div className="grid grid-cols-1 lg:grid-cols-2">

                  {/* Left Side - Image & Info */}
                  <div className="relative h-64 lg:h-auto rounded-t-2xl lg:rounded-l-2xl lg:rounded-r-none overflow-hidden">
                    <img
                      src={city_img}
                      alt="Booking"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                      <h2 className="text-white text-2xl font-bold">Book Your Service</h2>
                      <p className="text-white/80 text-sm mt-1">Fill in the details below to get started</p>
                      <div className="flex items-center gap-2 mt-3">
                        <span className="bg-blue-500/30 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full">
                          ⚡ Quick Booking
                        </span>
                        <span className="bg-green-500/30 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full">
                          ✅ Secure
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Side - Booking Form */}
                  <div className="p-6 sm:p-8">
                    {/* Header with Close Button */}
                    <div className="flex items-center  border-b-2 border-blue-600  dark:border-purple-600 pb-3 justify-between mb-6">
                      <h2 className="text-2xl  font-bold text-gray-800 dark:text-white">
                        Booking Form
                      </h2>
                      <button
                        onClick={() => setShowBooking(false)}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    <form className="space-y-4">
                      {/* Name & Email Row */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Full Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            onChange={handleChange}
                            value={formData.name}
                            name="name"
                            type="text"
                            placeholder="John Doe"
                            className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg 
                         bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white
                         focus:ring-2 focus:ring-blue-500 dark:focus:ring-purple-500 focus:border-transparent
                         outline-none transition duration-200"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Email <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="email"
                            value={formData.email}
                            name='email'
                            onChange={handleChange}
                            placeholder="john@example.com"
                            className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg 
                         bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white
                         focus:ring-2 focus:ring-blue-500 dark:focus:ring-purple-500 focus:border-transparent
                         outline-none transition duration-200"
                          />
                        </div>
                      </div>

                      {/* Phone & Address */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Phone Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          name='number'
                          value={formData.number}
                          onChange={handleChange}
                          placeholder="+94 77 123 4567"
                          className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg 
                       bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white
                       focus:ring-2 focus:ring-blue-500 dark:focus:ring-purple-500 focus:border-transparent
                       outline-none transition duration-200"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Service Address
                        </label>
                        <input
                          type="text"
                          name='address'
                          value={formData.address}
                          onChange={handleChange}
                          placeholder="123 Main Street, Colombo"
                          className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg 
                       bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white
                       focus:ring-2 focus:ring-blue-500 dark:focus:ring-purple-500 focus:border-transparent
                       outline-none transition duration-200"
                        />
                      </div>

                      {/* Date & Time */}
                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Booking Date
                          </label>
                          <input
                            type="date"
                            name='date'
                            value={formData.date}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg 
                         bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white
                         focus:ring-2 focus:ring-blue-500 dark:focus:ring-purple-500 focus:border-transparent
                         outline-none transition duration-200"
                          />
                        </div>

                      </div>

                      {/* Description */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Description / Special Requests
                        </label>
                        <textarea
                          rows="2"
                          name='description'
                          value={formData.description}
                          onChange={handleChange}
                          placeholder="Brief description of the service required..."
                          className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg 
                       bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white
                       focus:ring-2 focus:ring-blue-500 dark:focus:ring-purple-500 focus:border-transparent
                       outline-none transition duration-200 resize-none"
                        ></textarea>
                      </div>



                      {/* Buttons */}
                      <div className="flex gap-3 pt-2">
                        <button
                        onClick={handleSubmit}
                          type="submit"
                          className="flex-1 bg-blue-600 hover:bg-blue-700 dark:bg-purple-600 dark:hover:bg-purple-700 
                       text-white font-semibold py-3 rounded-lg transition duration-300
                       shadow-lg hover:shadow-xl"
                        >
                          Book Now
                        </button>
                        <button
                          type="button"
                          onClick={
                            hadleClear
                          }
                          className="px-6 py-3 border border-gray-300 dark:border-gray-700 
                       text-gray-700 dark:text-gray-300 font-semibold rounded-lg 
                       hover:bg-gray-100 dark:hover:bg-gray-800 transition duration-300"
                        >
                          Reset
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>

          )}

        </>
      </div>

      <Footer />
    </>
  );
}

export default WorkerDetails;