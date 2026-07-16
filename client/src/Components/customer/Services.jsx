import React, { useState } from 'react'
import img1 from '../../assets/air_condion_technetian.jpg'
import img2 from '../../assets/carpenter.jpg'
import img3 from '../../assets/cleaner.jpg'
import img4 from '../../assets/painter.jpg'
import img5 from '../../assets/plumber.jpg'
import img6 from '../../assets/skilled_professionals.jpg'

const gallary = [
    { id: 1, img: img1, title: "Air Conditioning Technician" },
    { id: 2, img: img2, title: "Carpenter" },
    { id: 3, img: img3, title: "Cleaner" },
    { id: 4, img: img4, title: "Painter" },
    { id: 5, img: img5, title: "Plumber" },
    { id: 6, img: img6, title: "Skilled Professionals" }
]

function Services() {

    const [showAll, setShowAll] = useState(false);

    const visibleImages = showAll ? gallary : gallary.slice(0, 3);

    return (
        <div className="py-10">

            <h1 className="text-center text-4xl font-bold text-gray-800 dark:text-white pb-10">
                Our <span className='text-blue-600 dark:text-purple-600'>Services</span>
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {visibleImages.map((data) => (
                    <div
                        key={data.id}
                        className="rounded-lg overflow-hidden shadow-lg hover:scale-105 duration-300"
                    >
                        <img
                            src={data.img}
                            alt={data.title}
                            className="w-full h-66 object-cover"
                        />



                    </div>
                ))}

            </div>

            {/* Show More Button */}
            {!showAll && (
                <div className="flex justify-center mt-8">
                    <button
                        onClick={() => setShowAll(true)}
                        className="px-6 py-3 bg-blue-600 dark:bg-purple-600 text-white rounded-lg hover:opacity-90 duration-300"
                    >
                        Show More
                    </button>
                </div>
            )}
            {showAll && (
                <div className="flex justify-center mt-8">
                    <button className="px-6 py-3 bg-blue-600 dark:bg-purple-600 text-white rounded-lg hover:opacity-90 duration-300" onClick={() => setShowAll(false)}>show Less</button>
                </div>
            )}
        </div>
    )
}

export default Services;