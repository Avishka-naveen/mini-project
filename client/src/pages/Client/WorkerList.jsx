import React, { useState } from "react";
import NavBar from "../../Components/NavBar";
import serviseDummyData from "../../assets/dummyData";
import Footer from "../../Components/Footer";
import { useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { FaLocationArrow } from "react-icons/fa";

function WorkerList() {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const navigate = useNavigate();

  const filteredWorkers = serviseDummyData.filter((service) => {
    const titleMatch = service.title
      .toLowerCase()
      .includes(title.toLowerCase());

    const locationMatch = service.workerDetails.location
      .toLowerCase()
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
                      src={service.workerDetails.profileImage}
                      alt={service.workerDetails.name}
                      className="w-28 h-28 sm:w-32 sm:h-32 lg:w-36 lg:h-36 rounded-full object-cover border-4 border-blue-600 dark:border-purple-600"
                    />

                    {/* Details */}
                    <div className="flex-1 text-center sm:text-left">

                      <h2 className="text-xl lg:text-2xl font-bold mb-3">
                        {service.title}
                      </h2>

                      <p className="text-gray-700 dark:text-gray-300">
                        <span className="font-semibold">Name:</span>{" "}
                        {service.workerDetails.name}
                      </p>

                      <p className="text-gray-700 dark:text-gray-300">
                        <span className="font-semibold">Location:</span>{" "}
                        {service.workerDetails.location}
                      </p>

                      <p className="text-gray-700 dark:text-gray-300">
                        <span className="font-semibold">Phone:</span>{" "}
                        {service.workerDetails.phone}
                      </p>

                      <p className="text-green-600 text-xl font-bold mt-3">
                        Rs. {service.price}
                      </p>

                      <button onClick={() => navigate(`/customer/workerDetails/${service._id}`)} className="mt-5 w-full bg-blue-600 hover:bg-blue-700 dark:bg-purple-600 dark:hover:bg-purple-700 duration-300 text-white py-3 rounded-lg font-semibold cursor-pointer">
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