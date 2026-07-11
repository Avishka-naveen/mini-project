import React from 'react'
import Slider from "react-slick";
import img1 from '../assets/bannercarpenter.png'
import img2 from '../assets/bannerelect.png'
import img3 from '../assets/bannerPlumber.png'
import img4 from '../assets/other_worker.png'

function Banner() {

  const SlideData = [
    {
      id: 1,
      img: img1,
      subtitle: 'Bring Your Woodwork Ideas to Life.',
      title: 'Carpenter',
      title2: 'Professional carpentry services!',
    },
    {
      id: 2,
      img: img2,
      subtitle: 'Trusted Electrical Experts.',
      title: 'Electrician',
      title2: 'Fast, safe electrical services!',
    },
    {
      id: 3,
      img: img3,
      subtitle: 'Need a Reliable Plumber?.',
      title: 'Plumber',
      title2: '24/7 Plumbing Solutions!',
    },
    {
      id: 4,
      img: img4,
      subtitle: 'More Professional Services',
      title: 'Other Services',
      title2: 'One Platform, Many Solutions!',
    }
  ]
  const settings = {

    dots: false,
    arrows: false,
    infinite: true,
    speed: 800,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    cssEase: "ease-in-out",
    pauseOnHover: false,
    pauseOnFocus: true,

  };

  return (
    <div>
      <div className='w-full overflow-hidden rounded-3xl    '>
        <Slider {...settings}>
          {SlideData.map((data) => (
            <div key={data.id}>
              <div className="
grid grid-cols-1 sm:grid-cols-2
items-center min-h-[80vh]
bg-gradient-to-r
from-gray-300 to-slate-100
dark:from-slate-900 dark:via-blue-600 dark:to-purple-900
py-10 px-15
">
                {/* Text */}
                <div className='flex flex-col gap-4  items-start justify-center relative z-10'>
                  <h3 className='text-2xl sm:text-6xl lg:text-xl font-bold lg:text-nowrap'>{data.subtitle}</h3>
                   <p className='text-gray-800 dark:text-white font-bold text-5xl  lg:text-nowrap'>{data.title2}</p>

                  <h1 className='text-5xl lg:text-nowrap uppercase text-white sm:text-[80px] md-text-[100px] xl:text-[150px] font-bold'>{data.title}</h1>
                 
                  <button className='text-white hover:bg-blue-800 bg-blue-700 py-3 px-5 rounded-md hover:dark:bg-purple-700 dark:bg-purple-600'>Book Now</button>
                </div>

                {/* Image */}
                <div>
                  <img
                    src={data.img}
                    alt={data.title}
                    className="w-[500px] h-[500px] relative z-40 sm:h-[450px] sm:scale-105 lg:scale-110 object-contain mx-auto drop-shadow-[-8px_4px_6px_rgba(0,0,0,.4)]"
                  />
                </div>

              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  )
}

export default Banner
