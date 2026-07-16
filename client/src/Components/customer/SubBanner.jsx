import React from 'react'
import subbannerPhoto from '../../assets/subbannerphoto.png'

function SubBanner() {
    return (
        <div className='min-h-[550px] py-12 mt-[70px]'>
            <div>
                <div
                    className="
grid grid-cols-1 md:grid-cols-3 gap-6 items-center
text-white rounded-3xl p-6
bg-blue-700
dark:bg-gradient-to-r dark:from-[#0f172a] dark:via-[#1e1b4b] dark:to-[#4c1d95]
">

                    {/* first col */}
                    <div className='p-6 sm:p-8'>
                        <p
                           
                            className='text-sm'>Find Trusted</p>
                        <h1  className='uppercase text-4xl lg:text-7xl font-bold'>&nbsp;Workres</h1>
                        
                    </div>
                    {/* second col */}
                    <div className="h-full flex items-center">
                        <img
                            src={subbannerPhoto}
                            className="
      w-full h-auto object-contain
      drop-shadow-[0_20px_40px_rgba(0,0,0,0.4),0_10px_20px_rgba(0,0,0,0.3)]
     
      mx-auto
      -translate-y-2 sm:-translate-y-4 lg:-translate-y-14 sm:scale-150 lg:scale-135
    "
                        />
                    </div>

                    {/* third col */}
                    <div className='flex flex-col justify-center items-center gap-4 p-6 sm:p-8'>
                        <p className='font-bold text-xl'>Hire skilled</p>
                        <p className='text-3xl sm:text-5xl font-bold'> WORKERS</p>
                        <p className='text-sm tracking-wide leading-5 font-sans'>near you.</p>
                        <div  >
                            <button

                                className="p-3 px-8 font-bold rounded-full text-white 
                                        border-2 border-white/30
                                        hover:bg-white hover:text-gray-800 
                                        transition-all duration-300 
                                        hover:scale-105 shadow-lg"
                            >
                                Hire Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SubBanner
