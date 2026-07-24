import React, { useState, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  FaUser, FaEnvelope, FaLock, FaPhone,
  FaCheckCircle, FaArrowLeft, FaEye, FaEyeSlash,
  FaUpload, FaStar, FaBriefcase, FaHandshake, FaRocket
} from 'react-icons/fa';
import workerImage from '../../assets/become_worker.jpeg';
import axios from 'axios';
import { AppContext } from '../../Context/Appcontext';

function VerifyOtp() {

  const { backendUrl,setcurrentCustomerData } = useContext(AppContext);

  const navigate = useNavigate();
  const inputRefs = useRef([]);

  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState(['', '', '', '', '']);
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    address: '',
    description: '',
    nic:'',
  });
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const benefits = [
    { icon: <FaRocket className="text-yellow-400" />, text: "Turn your skills into a steady income" },
    { icon: <FaHandshake className="text-green-400" />, text: "Connect with customers who need your expertise" },
    { icon: <FaBriefcase className="text-purple-400" />, text: "Choose jobs that match your experience" },
    { icon: <FaStar className="text-yellow-400" />, text: "Build your reputation through ratings" },
    { icon: <FaRocket className="text-orange-400" />, text: "Get more opportunities to grow" },
    { icon: <FaCheckCircle className="text-green-400" />, text: "Work with confidence on a trusted platform" },
  ];

  // OTP Handlers
  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(0, 1);
    setOtp(newOtp);
    if (value && index < 4) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData('text').slice(0, 5);
    const digits = paste.split('').filter(char => /^\d$/.test(char));
    const newOtp = [...otp];
    digits.forEach((digit, index) => {
      if (index < 5) newOtp[index] = digit;
    });
    setOtp(newOtp);
    const lastIndex = Math.min(digits.length, 4);
    if (inputRefs.current[lastIndex]) {
      inputRefs.current[lastIndex].focus();
    }
  };



//---------------image upload to cloudenary----------------//
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    

    if (!file) return;

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "Quick_hire");
    data.append("cloud_name", "dpxo105si");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dpxo105si/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      setImagePreview(URL.createObjectURL(file));
      const uploadImgURL = await response.json();
      setProfileImage(uploadImgURL.secure_url);
     
     
    } catch (error) {
      console.error(error);
    }
  };
//----------------------------------------------//

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };



  // call get otp function || otp sent to email
  const getOTP = async (e) => {
    e.preventDefault();
    try {
      let response;
      response = await axios.post(backendUrl + '/api/customer/becomWorker');
      if (response.data.success) {
        toast.success(response.data.message);
        setOtpSent(true);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);

    }
  }
  //----------------------------------------------//

  // call verify otp function
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const otpValue = otp.join('');
    if (otpValue.length !== 5) {
      toast.error('Please enter complete 5-digit OTP');
      return;
    }
    setIsLoading(true);
    try {
      let response;
      response = await axios.post(backendUrl + '/api/customer/verifybecomeWorkerOTP', { verifyotp: otpValue });
      if (response.data.success) {
        toast.success(response.data.message);
        setOtp('');
        setStep(2);

      } else {
        toast.error(response.data.message);
      }

    } catch (error) {
      toast.error(error.message);
    }
  };

  //----------------------------------------------//
  
    //-----------cretate worker function-----------------------//
const handleRegister = async (e) => {
    e.preventDefault();
    

    if (!formData.description || !formData.address || !profileImage || !formData.nic) {
      toast.error('Please fill in all required fields');
      return;
    }

   
    setIsLoading(true); 

    try {
     
      const response = await axios.post(backendUrl + '/api/customer/createWorker', { 
        profile: profileImage, 
        address: formData.address, 
        nic: formData.nic, 
        description: formData.description
      }, { withCredentials: true }); 

      if (response.data.success) {
        toast.success("Congratulations! You are now a Worker!");
        
        const workerResponse = await axios.get(`${backendUrl}/api/worker/getCurrentWorkerData`, { withCredentials: true });
        setcurrentCustomerData(workerResponse.data.worker); 
        
        navigate('/worker/dashbord/workerReservation');
      } else {
        toast.error(response.data.message);
      }
      
    } catch (error) {
      console.error(error);
      
      toast.error(error.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
     
      setIsLoading(false); 
    }
  };
//-------------------------------------------//

  return (
    <div className="min-h-screen w-full">


      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">


        <div className="relative hidden lg:block min-h-screen">
          <img
            src={workerImage}
            alt="Worker"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0  bg-gradient-to-br from-blue-600/80 via-purple-600/60 to-black/50  dark:from-purple-800/80 dark:via-blue-900/70 dark:to-black/90" />


          <div className="relative z-10 h-full flex flex-col justify-center px-12 py-16">
            <h1 className="text-3xl font-bold text-white mb-4">
              Become a <span className="text-yellow-400 text-5xl">Worker</span>!
            </h1>
            <p className="text-white/80 text-lg mb-8">
              Start earning money with your skills
            </p>

            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 bg-white/10 backdrop-blur-sm p-3 rounded-lg border border-white/10"
                >
                  <span className="text-xl mt-0.5">{benefit.icon}</span>
                  <p className="text-white/90 text-sm leading-relaxed">{benefit.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Form */}
        <div className="flex items-center justify-center p-6 sm:p-8 lg:p-10 bg-white dark:bg-gray-900 min-h-screen">
          <div className="w-full max-w-md">

            {/* Back Button */}
            {step === 1 && (
              <button
                onClick={() => navigate('/customer/workerList')}
                className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors mb-6"
              >
                <FaArrowLeft /> Back
              </button>
            )}

            {/* Step 1: OTP */}
            {step === 1 && (
              <div>
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">📧</span>
                  </div>
                  <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                    Verify Your OTP
                  </h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Enter the 5-digit code sent to your email
                  </p>
                </div>

                <form onSubmit={handleVerifyOtp} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 text-center">
                      Enter 5-digit code
                    </label>
                    <div className="flex justify-center gap-2" onPaste={handleOtpPaste}>
                      {Array(5).fill(0).map((_, index) => (
                        <input
                          key={index}
                          ref={(el) => (inputRefs.current[index] = el)}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          value={otp[index]}
                          onChange={(e) => handleOtpChange(index, e.target.value)}
                          onKeyDown={(e) => handleOtpKeyDown(index, e)}
                          className="w-12 h-14 text-center text-xl font-bold
                                   border-2 border-gray-300 dark:border-gray-600
                                   rounded-lg focus:border-blue-500 dark:focus:border-purple-500
                                   focus:ring-2 focus:ring-blue-200 dark:focus:ring-purple-200
                                   bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                                   outline-none transition duration-200"
                          autoFocus={index === 0}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500 dark:text-gray-400">
                      ⏱️ Code expires in 5:00
                    </span>
                    <button
                      type="button"
                      onClick={getOTP}
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      Resend OTP
                    </button>
                  </div>

                  <button disabled={otpSent} onClick={getOTP} className="w-full py-3 bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800
                             text-white font-semibold rounded-lg transition duration-300
                             shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed">Get OTP</button>
                  <button

                    disabled={isLoading || otp.join('').length < 5}
                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 dark:bg-purple-600 dark:hover:bg-purple-700
                             text-white font-semibold rounded-lg transition duration-300
                             shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Verifying...' : 'Verify OTP'}
                  </button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-xs text-gray-400 dark:text-gray-500">
                    Didn't receive the code? Check your spam folder.
                  </p>
                </div>
              </div>
            )}

            {/* Step 2: Registration */}
            {step === 2 && (
              <div>
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaCheckCircle className="text-3xl text-green-600 dark:text-green-400" />
                  </div>
                  <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                    Complete Your Profile
                  </h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Fill in your details to start earning
                  </p>
                </div>

                <form onSubmit={handleRegister} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
                  {/* Profile Image */}
                  <div className="flex flex-col items-center">
                    <div className="relative">
                      <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden border-4 border-blue-500 dark:border-purple-500">
                        {imagePreview ? (
                          <img src={imagePreview} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                          <FaUser className="text-4xl text-gray-400" />
                        )}
                      </div>
                      <label className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white p-1.5 rounded-full cursor-pointer text-xs">
                        <FaUpload />
                        <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                      </label>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Upload Profile Photo</p>
                  </div>

                  <div className="grid grid-cols-1 gap-3">

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Your address.."
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
                                 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white
                                 focus:ring-2 focus:ring-blue-500 dark:focus:ring-purple-500 outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        NIC <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="nic"
                        value={formData.nic}
                        onChange={handleChange}
                        placeholder="NIC"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
                                 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white
                                 focus:ring-2 focus:ring-blue-500 dark:focus:ring-purple-500 outline-none"
                        required
                      />
                    </div>


                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Bio / About You
                      </label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="2"
                        placeholder="Tell customers about yourself..."
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
                                 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white
                                 focus:ring-2 focus:ring-blue-500 dark:focus:ring-purple-500 outline-none resize-none"
                      ></textarea>
                    </div>
                  </div>

                  <button
                    type="submit"
                    
                    className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700
                             text-white font-semibold rounded-lg transition duration-300 shadow-md hover:shadow-lg
                             disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Create Worker Profile
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerifyOtp;