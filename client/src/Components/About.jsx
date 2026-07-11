import React from 'react'
import Aimg1 from '../assets/skilled_professionals.jpg'
import Aimg2 from '../assets/secure_platform.jpg'
import Aimg3 from '../assets/convenient_hiring.png'

function About() {

     const AboutData = [
        {
          id: 1,
          img: Aimg1,
          title: 'Skilled Profssionals',
          description: 'We connect you  with experienced workers ready to handle any task.'
        },
        {
          id: 2,
          img: Aimg2,
          title: 'Secure Platform',
          description: 'Our system ensures safe commiunication between customers and workers.'
        },
        {
          id: 3,
          img: Aimg3,
          title: 'Convenient Hiring',
          description: 'Hire the right worker easily without wasting time searching offline.'
        },
      ]
  return (
     <div className='py-10'>
          <h1 className='text-center text-4xl font-bold text-gray-800 dark:text-white pb-10'>About <span className='text-blue-600 dark:text-purple-600'>U</span>s</h1>
          <div className=" mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {
              AboutData.map((data) => (

                <div key={data.id} >

                  <div className="bg-gray-100 pb-2 hover:bg-gray-200 duration-300 dark:bg-[#2d0c58] hover:dark:bg-[#3f107c] rounded-lg overflow-hidden flex flex-col">
                    <img src={data.img}></img>
                    <h1 className='text-center text-xl font-semibold py-2'>{data.title}</h1>
                    <p className='p-2 text-gray-700 dark:text-white'>{data.description}</p>

                  </div>
                </div>

              ))
            }
          </div>
        </div>
  )
}

export default About
