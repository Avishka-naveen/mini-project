import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaLock, FaPhone, FaEye, FaEyeSlash, FaGoogle, FaFacebook, FaTwitter } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'
import axios from 'axios'

import sitman_img from '../../assets/sitman.png';
import { useContext } from 'react';
import { AppContext } from '../../Context/Appcontext';
import { useEffect } from 'react';

function Register() {
  const navigate = useNavigate();
  const { backendUrl,isLogged,setIsLogged,setcurrentCustomerData,fetchCustomerData } = useContext(AppContext);

  const [isSignIn, setIsSignIn] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Form States
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });


  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle Login Input Change
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({ ...prev, [name]: value }));
  };

  // Handle Sign Up Submit
  const handleSignUp = async (e) => {

    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone || !formData.password) {
      toast.error('Please fill in all fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match. Check again!');
      return;
    }

    try {
      axios.defaults.withCredentials = true;

      const response = await axios.post(backendUrl + '/api/customer/register', {
        customerName: formData.name,
        customerEmail: formData.email,
        customerPassword: formData.password,
        customerPhone: formData.phone,
      });

      if (response.data.success) {
        toast.success(response.data.message);


        setFormData({
          name: '',
          email: '',
          phone: '',
          password: '',
          confirmPassword: ''
        });

      } else {

        toast.error(response.data.message);
      }

    } catch (error) {
      toast.error(error.message);
      //console.log(error);
    }
  };
  // Handle Sign In Submit
  const handleSignIn = async (e) => {
    e.preventDefault();


    try {
      axios.defaults.withCredentials = true;

      let response;
      let customerData;

      response = await axios.post(backendUrl + '/api/customer/login', {
        customerEmail: loginData.email,
        customerPassword: loginData.password
      });

      if (response.data.success) {
        setLoginData({
          email: '',
          password: ''
        });
        setIsLogged(true);
         localStorage.setItem('isLogged', 'true');
        toast.success(response.data.message);
        fetchCustomerData();
        navigate('/customer/workerList');
        

      } else {
        toast.error(response.data.message);

      }


    } catch (error) {
      toast.error(error.message);
    }




  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 p-4">

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-5xl overflow-hidden">

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2">

          {/* Left Column - Image */}
          <div className="hidden lg:flex bg-gradient-to-br from-blue-600 to-purple-600 dark:from-purple-800 dark:to-blue-900 items-center justify-center p-8">
            <div className="text-center">
              <img
                src={sitman_img}
                alt="Sitman Illustration"
                className="w-80 h-auto mx-auto mb-6 drop-shadow-2xl"
              />
              <h2 className="text-3xl font-bold text-white mb-2">
                {isSignIn ? 'Welcome Back!' : 'Join Our Community!'}
              </h2>
              <p className="text-white/80 text-sm max-w-xs mx-auto">
                {isSignIn
                  ? 'Sign in to continue your journey with us.'
                  : 'Create your account and start exploring amazing features.'}
              </p>
              <div className="flex justify-center gap-4 mt-6">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs">
                  🔒 Secure
                </span>
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs">
                  ⚡ Fast
                </span>
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs">
                  🌟 Trusted
                </span>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="p-6 sm:p-8 lg:p-10">
            {/* Header */}
            <div className="text-center mb-6">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
                {isSignIn ? 'Welcome Back! 👋' : 'Create Account ✨'}
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {isSignIn
                  ? 'Sign in to continue to your account'
                  : 'Join us and start your journey today'}
              </p>
            </div>

            {/* Toggle Buttons */}
            <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1 mb-5">
              <button
                onClick={() => setIsSignIn(true)}
                className={`flex-1 py-2 rounded-lg font-semibold text-sm transition duration-300 ${isSignIn
                  ? 'bg-white dark:bg-gray-600 shadow-md text-blue-600 dark:text-white'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setIsSignIn(false)}
                className={`flex-1 py-2 rounded-lg font-semibold text-sm transition duration-300 ${!isSignIn
                  ? 'bg-white dark:bg-gray-600 shadow-md text-blue-600 dark:text-white'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
              >
                Sign Up
              </button>
            </div>

            {/* Sign In Form */}
            {isSignIn ? (
              <form onSubmit={handleSignIn} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={loginData.email}
                      onChange={handleLoginChange}
                      placeholder="you@example.com"
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg
                               bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white
                               focus:ring-2 focus:ring-blue-500 dark:focus:ring-purple-500 focus:border-transparent
                               outline-none transition duration-200"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type='password'
                      name="password"
                      value={loginData.password}
                      onChange={handleLoginChange}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-12 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg
                               bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white
                               focus:ring-2 focus:ring-blue-500 dark:focus:ring-purple-500 focus:border-transparent
                               outline-none transition duration-200"
                      required
                    />

                  </div>
                </div>

                <div className="text-right" onClick={() => navigate('/customer/verifyOtp')}>
                  <a href="#" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                    Forgot password?
                  </a>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 dark:bg-purple-600 dark:hover:bg-purple-700
                           text-white font-semibold rounded-lg transition duration-300
                           shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Signing In...
                    </div>
                  ) : (
                    'Sign In'
                  )}
                </button>
              </form>
            ) : (
              /* Sign Up Form */
              <form onSubmit={handleSignUp} className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg
                               bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white
                               focus:ring-2 focus:ring-blue-500 dark:focus:ring-purple-500 focus:border-transparent
                               outline-none transition duration-200"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg
                               bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white
                               focus:ring-2 focus:ring-blue-500 dark:focus:ring-purple-500 focus:border-transparent
                               outline-none transition duration-200"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Phone Number
                  </label>
                  <div className="relative">
                    <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="077 123 4567"
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg
                               bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white
                               focus:ring-2 focus:ring-blue-500 dark:focus:ring-purple-500 focus:border-transparent
                               outline-none transition duration-200"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type='password'
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-12 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg
                               bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white
                               focus:ring-2 focus:ring-blue-500 dark:focus:ring-purple-500 focus:border-transparent
                               outline-none transition duration-200"
                      required
                    />

                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-12 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg
                               bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white
                               focus:ring-2 focus:ring-blue-500 dark:focus:ring-purple-500 focus:border-transparent
                               outline-none transition duration-200"
                      required
                    />

                  </div>
                </div>


                {/* check box */}
                {/* <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="terms"
                    className="w-4 h-4 text-blue-600 dark:text-purple-600 rounded"
                    required
                  />
                  <label htmlFor="terms" className="text-xs text-gray-600 dark:text-gray-400">
                    I agree to the{' '}
                    <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">
                      Terms & Conditions
                    </a>
                    {' '}and{' '}
                    <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">
                      Privacy Policy
                    </a>
                  </label>
                </div> */}

                <button
                  type="submit"

                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 dark:bg-purple-600 dark:hover:bg-purple-700
                           text-white font-semibold rounded-lg transition duration-300
                           shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating Account...
                    </div>
                  ) : (
                    'Create Account'
                  )}
                </button>
              </form>
            )}

            {/* Social Login */}
            <div className="mt-5">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 pb-3 dark:border-gray-600"></div>
                </div>

              </div>


            </div>

            {/* Toggle Text */}
            <p className="text-center text-xs text-gray-600 dark:text-gray-400 mt-4">
              {isSignIn ? (
                <>
                  Don't have an account?{' '}
                  <button
                    onClick={() => { setIsSignIn(false) }}
                    className="text-blue-600 dark:text-blue-400 font-semibold  hover:underline"
                  >
                    Sign Up
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{' '}
                  <button
                    onClick={() => setIsSignIn(true)}
                    className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
                  >
                    Sign In
                  </button>
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;