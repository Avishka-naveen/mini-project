import React from 'react';
import { FaUserCheck, FaShieldAlt, FaClock } from 'react-icons/fa';
import Aimg1 from '../../assets/skilled_professionals.jpg';
import Aimg2 from '../../assets/secure_platform.jpg';
import Aimg3 from '../../assets/convenient_hiring.png';

function About() {
  const AboutData = [
    {
      id: 1,
      img: Aimg1,
      title: 'Skilled Professionals',
      description: 'We connect you with experienced workers ready to handle any task with expertise and dedication.',
      icon: <FaUserCheck className="text-blue-600 dark:text-purple-400" />,
    },
    {
      id: 2,
      img: Aimg2,
      title: 'Secure Platform',
      description: 'Our system ensures safe communication and transactions between customers and trusted workers.',
      icon: <FaShieldAlt className="text-green-600 dark:text-green-400" />,
    },
    {
      id: 3,
      img: Aimg3,
      title: 'Convenient Hiring',
      description: 'Hire the right worker easily without wasting time searching offline. Quick, simple, and efficient.',
      icon: <FaClock className="text-purple-600 dark:text-purple-400" />,
    },
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-white dark:bg-gray-900">
      <div className="container mx-auto max-w-7xl">
  
        <div className="text-center mb-10 sm:mb-14">
          <span className="text-sm font-medium text-blue-600 dark:text-purple-400 uppercase tracking-wider">
            Why Choose Us
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mt-2">
            About <span className="text-blue-600 dark:text-purple-400">Us</span>
          </h2>
          <p className="mt-3 text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
            We connect customers with trusted professionals, making hiring simple, secure, and reliable.
          </p>
        </div>

      
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {AboutData.map((data) => (
            <div
              key={data.id}
              className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-700"
            >
              <div className="overflow-hidden h-48 sm:h-56">
                <img
                  src={data.img}
                  alt={data.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              <div className="p-5 sm:p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{data.icon}</span>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white">
                    {data.title}
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                  {data.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default About;