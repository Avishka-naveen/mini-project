import React, { useState, useRef } from 'react';
import city_img from '../../assets/city2.jpg';
import { useNavigate } from 'react-router-dom';
import ToggleBtn from '../../Components/ToggleBtn';


function VerifyOtp() {
  const navigate = useNavigate();
  const inputRefs = useRef([]);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);

  // Handle OTP input change
  const handleChange = (index, value) => {
    // Only allow single digit
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(0, 1);
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Handle backspace
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // Handle paste
  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData('text').slice(0, 6);
    const digits = paste.split('').filter(char => /^\d$/.test(char));

    const newOtp = [...otp];
    digits.forEach((digit, index) => {
      if (index < 6) {
        newOtp[index] = digit;
      }
    });
    setOtp(newOtp);

    // Focus last filled field
    const lastIndex = Math.min(digits.length, 5);
    if (inputRefs.current[lastIndex]) {
      inputRefs.current[lastIndex].focus();
    }
  };





  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-[#1e1e1e]">
      {/* Left Side - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
      
        <img
          src={city_img}
          alt="Verification"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/100 via-black/60 to-transparent flex flex-col justify-center p-12">
        <div className='text-white text-5xl font-bold'>Join <span className="text-blue-600 text-7xl dark:text-purple-600">Quick Hire</span> and bring your services to life.</div>
          <h2 className="text-white text-3xl font-bold">Verify Your Account</h2>
          <p className="text-white/80 text-sm mt-2 max-w-sm">
            Enter the 6-digit verification code sent to your email to complete your registration.
          </p>
          <div className="flex items-center gap-4 mt-4">
            <span className="bg-white/20 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full">
              🔒 Secure
            </span>
            <span className="bg-green-500/30 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full">
              ⚡ Quick
            </span>
          </div>
        </div>
      </div>

      {/* Right Side - OTP Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-8">
        <div className='fixed top-5 right-5'>
          <ToggleBtn />
        </div>
        <div className="w-full max-w-md">
          {/* Logo/Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl mb-4">
              <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Verify OTP
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Please enter the 6-digit verification code sent to your email
            </p>
          </div>

          {/* OTP Input Fields */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 text-center">
              Enter 6-digit code
            </label>
            <div
              className="flex justify-between gap-2 sm:gap-3"
              onPaste={handlePaste}
            >
              {Array(6).fill(0).map((_, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={otp[index]}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-14 sm:w-14 sm:h-16 text-center text-xl font-bold 
                           border-2 border-gray-300 dark:border-gray-600 
                           rounded-xl focus:border-blue-500 dark:focus:border-purple-500 
                           focus:ring-2 focus:ring-blue-200 dark:focus:ring-purple-200
                           bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                           outline-none transition duration-200"
                  autoFocus={index === 0}
                />
              ))}
            </div>
          </div>

          {/* Verify Button */}
          <button
            
            disabled={isLoading || otp.join('').length < 6}
            className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 dark:bg-purple-600 dark:hover:bg-purple-700
                     text-white font-semibold rounded-xl transition duration-300
                     shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Verifying...
              </div>
            ) : (
              'Verify OTP'
            )}
          </button>

          {/* Footer Links */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Didn't receive the code?
              <button
                
                className="ml-1 text-blue-600 dark:text-purple-400 font-semibold hover:underline"
              >
                Resend OTP
              </button>
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
              The code will expire in 10 minutes
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerifyOtp;