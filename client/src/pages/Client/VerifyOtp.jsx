import React, { useState, useRef } from 'react';
import { FaEnvelope, FaLock, FaCheckCircle, FaArrowLeft, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import sitman_img from '../../assets/sitman.png';
import ToggleBtn from '../../Components/customer/ToggleBtn';

function VerifyOtp() {
  const navigate = useNavigate();
  const [step1, setStep1] = useState(true);
  const [step2, setStep2] = useState(false);
  const [step3, setStep3] = useState(false);


const handleBack = () => {
  if (step2) {
    setStep2(false);
    setStep1(true);
  }else if(step3){
    setStep3(false);
    setStep2(true)

  }
};
  return (
    
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 p-4">

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-5xl overflow-hidden">

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2">

          {/* Left Column - Image */}
          <div className="hidden lg:flex bg-gradient-to-br from-blue-600 to-purple-900 dark:from-purple-200 dark:to-blue-900 items-center justify-center p-8">
            <div className="text-center">
              <img
                src={sitman_img}
                alt="Sitman Illustration"
                className="w-80 h-auto mx-auto mb-6 drop-shadow-2xl"
              />
              <h2 className="text-3xl font-bold text-white mb-2">
                {step1 && 'Verify Your Email! 📧'}
                
                {step2 && 'Confirm Your Identity 🔐'}
                {step3  && 'Reset Your Password 🔑'} 
              </h2>
              <p className="text-white/80 text-sm max-w-xs mx-auto">
                {step1 && 'Enter your email to receive a verification code.'}
                {step2 && 'Enter the 6-digit code sent to your email.'}
                {step3 && 'Create a strong new password for your account.'}
              </p>
              <div className="flex justify-center gap-4 mt-6">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs">
                  {step1 && '📧 Step 1/3'}
                  {step2 && '🔐 Step 2/3'}
                  {step3 && '🔑 Step 3/3'}
                </span>
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs">
                  🔒 Secure
                </span>
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs">
                  ⚡ Quick
                </span>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="p-6 sm:p-8 lg:p-10">

            {/* Back Button */}
            {
              !step1 && (
                <button
              onClick={handleBack}
              className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors mb-6"
            >
              <FaArrowLeft /> Back
            </button>
              )
            }

            {/* Step Indicator */}
            <div className="flex justify-center gap-2 mb-6">
              <div className={`w-3 h-3 rounded-full `}></div>
              <div className={`w-3 h-3 rounded-full `}></div>
              <div className={`w-3 h-3 rounded-full `}></div>
            </div>

            {/* Step 1 Content */}
            {
              step1 && (
                <div className="text-center">
                  {/* Icon */}
                  <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaEnvelope className="text-3xl text-blue-600 dark:text-blue-400" />
                  </div>

                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-2">
                    Verify Your Email 📧
                  </h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                    Enter your email address to receive a 6-digit verification code.
                  </p>

                  <form className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 text-left">
                        Email Address
                      </label>
                      <div className="relative">
                        <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="email"

                          placeholder="you@example.com"
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg
                             bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white
                             focus:ring-2 focus:ring-blue-500 dark:focus:ring-purple-500 focus:border-transparent
                             outline-none transition duration-200"
                          required
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      onClick={() => {
                        setStep1(false)
                        setStep2(true)
                      }
                      }
                      className="w-full py-3 bg-blue-600 hover:bg-blue-700 dark:bg-purple-600 dark:hover:bg-purple-700
                         text-white font-semibold rounded-lg transition duration-300
                         shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      send
                    </button>
                    <button className="w-full py-3 bg-green-600 hover:bg-green-700 dark:bg-green-800 dark:hover:bg-green-900
                         text-white font-semibold rounded-lg transition duration-300
                         shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed">Back To Loging</button>
                  </form>
                </div>
              )
            }
            {/* <--------------end */}
            {/* stepp 2 */}
            {
              step2 && (
                <div className="text-center">
                  {/* Icon */}
                  <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-4xl">📧</span>
                  </div>

                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-2">
                    Verify OTP 🔐
                  </h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                    Enter the 6-digit verification code sent to
                  </p>
                  <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-6">
                    this email
                  </p>

                  <form className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 text-center">
                        Enter 6-digit code
                      </label>
                      <div className="flex justify-between gap-2" >
                        {Array(6).fill(0).map((_, index) => (
                          <input
                            key={index}

                            type="text"
                            inputMode="numeric"
                            maxLength={1}

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

                        className="text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        Resend OTP
                      </button>
                    </div>

                    <button
                      onClick={() => {
                        setStep1(false);
                        setStep2(false);
                        setStep3(true);
                      }}

                      className="w-full py-3 bg-blue-600 hover:bg-blue-700 dark:bg-purple-600 dark:hover:bg-purple-700
                     text-white font-semibold rounded-lg transition duration-300
                     shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      verify
                    </button>
                  </form>
                </div>
              )
            }
            {/* step 2 is end */}
            {/* step 3 */}
            {
              step3 && (
                <div className="text-center">
                  {/* Icon */}
                  <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaCheckCircle className="text-3xl text-green-600 dark:text-green-400" />
                  </div>

                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-2">
                    Reset Password 🔑
                  </h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                    Create a new password for your account.
                  </p>

                  <form  className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 text-left">
                        New Password
                      </label>
                      <div className="relative">
                        <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type='password'
                        placeholder="••••••••"
                          className="w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-lg
                         bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white
                         focus:ring-2 focus:ring-blue-500 dark:focus:ring-purple-500 focus:border-transparent
                         outline-none transition duration-200"
                          required
                          minLength="6"
                        />
                        <button
                          type="button"
                        
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        >
                           <FaEyeSlash />  <FaEye />
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 text-left">
                        Confirm New Password
                      </label>
                      <div className="relative">
                        <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type= 'password'
                    
                          
                          placeholder="••••••••"
                          className="w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-lg
                         bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white
                         focus:ring-2 focus:ring-blue-500 dark:focus:ring-purple-500 focus:border-transparent
                         outline-none transition duration-200"
                          required
                          minLength="6"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        >
                          <FaEyeSlash /> <FaEye />
                        </button>
                      </div>
                      
                        <p className="text-red-500 text-xs mt-1 text-left">Passwords do not match</p>
                      
                    </div>

                    <button
                      type="submit"
                     
                      className="w-full py-3 bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700
                     text-white font-semibold rounded-lg transition duration-300
                     shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                    reset
                    </button>
                  </form>
                </div>
              )
            }

          </div>
        </div>
      </div>
    </div>
  );
}

export default VerifyOtp;