import React, { useState } from "react";
import NavBar from "../../Components/customer/NavBar";
import serviseDummyData from "../../assets/dummyData";
import Footer from "../../Components/customer/Footer";
import { useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { FaLocationArrow } from "react-icons/fa";
import { useContext } from "react";
import { AppContext } from "../../Context/Appcontext";
import { FaStar } from "react-icons/fa";

function WorkerList() {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const { allServicesData } = useContext(AppContext);
  //console.log("from workerList" + allServicesData);

  const navigate = useNavigate();

  const filteredWorkers = allServicesData.filter((service) => {
    const titleMatch = service.serviceName
      ?.toLowerCase()
      .includes(title.toLowerCase());

    const locationMatch = service.serviceLocation
      ?.toLowerCase()
      .includes(location.toLowerCase());

    const priceMatch =
      maxPrice === "" || Number(service.price) <= Number(maxPrice);

    return titleMatch && locationMatch && priceMatch;
  });

  return (
    <>
      <NavBar />

      <div className="min-h-screen bg-white dark:bg-[#1e1e1e] text-black dark:text-white">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="px-4 sm:px-6 md:px-10 lg:px-20 pt-8">
            <h1 className="text-2xl sm:text-3xl font-bold">
              Worker List
            </h1>

            <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 my-2">
              Home / Worker List
            </p>
          </div>
          <div className="px-4 flex justify-center items-center gap-3 sm:px-6 md:px-10 lg:px-20 pt-8">
            <div onClick={() => navigate("/customer/workerReservation")} className="bg-blue-600 flex items-center gap-3 dark:bg-purple-600 hover:dark:bg-purple-700 hover:bg-blue-700 text-white py-3 px-4 rounded-sm transition duration-300 cursor-pointer">
              <span><FaLocationArrow /></span>
              <button >
                My Reservations
              </button>
            </div>
          </div>
        </div>

        {/* Filter Section */}
        <div className="px-4 sm:px-6 md:px-10 lg:px-20 py-5 dark:bg-gray-800 bg-gray-200 mx-20 mb-5">
          <h2 className='text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200 flex items-center gap-2'>
            <p className="text-3xl"><CiSearch /></p>
            <p>Filter Workers</p>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">


            {/* Title */}
            <input
              type="text"
              placeholder="Search by Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 bg-white dark:bg-gray-800 outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
            />

            {/* Location */}
            <input
              type="text"
              placeholder="Search by Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 bg-white dark:bg-gray-800 outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
            />

            {/* Price */}
            <input
              type="number"
              placeholder="Maximum Price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 bg-white dark:bg-gray-800 outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
            />

            {/* Clear Button */}
            <button
              onClick={() => {
                setTitle("");
                setLocation("");
                setMaxPrice("");
              }}
              className="w-full bg-red-500 hover:bg-red-600 duration-300 text-white rounded-lg py-3 font-semibold cursor-pointer"
            >
              Clear Filters
            </button>

          </div>
          <h1 className="mt-3">All Services :<span className="font-bold dark:text-purple-600 text-blue-500">{filteredWorkers.length}</span></h1>
        </div>

        {/* Worker Cards */}
        {/* Worker Cards */}
        <div className="px-4 sm:px-6 md:px-10 lg:px-20 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

            {filteredWorkers.length > 0 ? (
              filteredWorkers.map((service) => (
                <div
                  key={service._id}
                  className="bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 hover:dark:bg-gray-700 duration-300 rounded-xl shadow-lg p-6"
                >
                  <div className="flex flex-col sm:flex-row items-center gap-6">

                    {/* Image */}
                    <img
                      src={service.workerId?.profile}
                      alt={service.workerId?.customerId?.customerName}
                      className="w-28 h-28 sm:w-32 sm:h-32 lg:w-36 lg:h-36 rounded-full object-cover border-4 border-blue-600 dark:border-purple-600"
                    />

                    {/* Details */}
                    <div className="flex-1 text-center sm:text-left">

                      <div className="flex items-center justify-center sm:justify-start gap-2">
                        <h2 className="text-xl capitalize lg:text-2xl font-bold mb-3">
                          {service.serviceName}
                        </h2>
                        <div className="text-yellow-500 flex justify-center items-center">
                          <h1>{service.rating.toFixed(1)}</h1>
                          <p><FaStar /></p>
                        </div>
                      </div>

                      <p className="text-gray-700 dark:text-gray-300">
                        <span className="font-semibold">Name:</span>{" "}
                        {service.workerId?.customerId?.customerName}
                      </p>

                      <p className="text-gray-700 dark:text-gray-300">
                        <span className="font-semibold">Location:</span>{" "}
                        {service.serviceLocation}
                      </p>

                      <p className="text-gray-700 dark:text-gray-300">
                        <span className="font-semibold">Phone:</span>{" "}
                        {service.servicePhone}
                      </p>

                      <p className="text-green-600 text-xl font-bold mt-3">
                        LKR. {service.price}
                      </p>

                      <button
                        onClick={() =>
                          navigate(`/customer/workerDetails/${service._id}`)
                        }
                        className="mt-5 w-full bg-blue-600 hover:bg-blue-700 dark:bg-purple-600 dark:hover:bg-purple-700 duration-300 text-white py-3 rounded-lg font-semibold cursor-pointer"
                      >
                        View Details
                      </button>

                    </div>

                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-16">
                <h2 className="text-2xl font-bold">
                  No workers found 😔
                </h2>

                <p className="text-gray-500 dark:text-gray-400 mt-2">
                  Try changing the filters.
                </p>
              </div>
            )}

          </div>
        </div>

      </div>

      <Footer />
    </>
  );
}

export default WorkerList;