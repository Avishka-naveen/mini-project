
import React, { useState, useContext } from "react";
import NavBar from "../../Components/customer/NavBar";
import Footer from "../../Components/customer/Footer";
import { useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { FaLocationArrow, FaStar } from "react-icons/fa";
import { AppContext } from "../../Context/Appcontext";

function WorkerList() {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const { allServicesData = [], loading } = useContext(AppContext);

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

        <div className="flex items-center justify-between">
          <div className="px-4 sm:px-6 md:px-10 lg:px-20 pt-8">
            <h1 className="text-2xl sm:text-3xl font-bold">
              Worker List
            </h1>

            <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 my-2">
              Home / Worker List
            </p>
          </div>

          <div className="scale-[0.7] sm:scale-[1] px-4 flex justify-center items-center gap-3 sm:px-6 md:px-10 lg:px-20 pt-8">
            <div
              onClick={() => navigate("/customer/workerReservation")}
              className="bg-blue-600 flex items-center gap-3 dark:bg-purple-600 hover:dark:bg-purple-700 hover:bg-blue-700 text-white py-3 px-4 rounded-sm transition duration-300 cursor-pointer"
            >
              <span><FaLocationArrow /></span>
              <button type="button">
                My Reservations
              </button>
            </div>
          </div>
        </div>

        <div className="px-4 sm:px-6 md:px-10 lg:px-20 py-5 dark:bg-gray-800 bg-gray-200 sm:mx-20 mx-4 mb-5">
          <h2 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200 flex items-center gap-2">
            <p className="text-3xl"><CiSearch /></p>
            <p>Filter Workers</p>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

            <input
              type="text"
              placeholder="Search by Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 bg-white dark:bg-gray-800 outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
            />

            <input
              type="text"
              placeholder="Search by Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 bg-white dark:bg-gray-800 outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
            />

            <input
              type="number"
              placeholder="Maximum Price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              min="0"
              className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 bg-white dark:bg-gray-800 outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
            />

            <button
              type="button"
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

          <h1 className="mt-3">
            All Services :
            <span className="font-bold dark:text-purple-600 text-blue-500">
              {loading ? " Loading..." : filteredWorkers.length}
            </span>
          </h1>
        </div>

        {loading ? (

          <div className="flex flex-col items-center justify-center py-20 text-gray-500 dark:text-gray-400">
            <div className="flex items-end space-x-1.5 mb-6 h-16">
              <div className="w-2.5 bg-gradient-to-t from-blue-600 to-blue-400 rounded-full animate-[wave_1.2s_ease-in-out_infinite] h-8 [animation-delay:-0.9s]"></div>

              <div className="w-2.5 bg-gradient-to-t from-blue-600 to-blue-400 rounded-full animate-[wave_1.2s_ease-in-out_infinite] h-12 [animation-delay:-0.75s]"></div>

              <div className="w-2.5 bg-gradient-to-t from-blue-600 to-blue-400 rounded-full animate-[wave_1.2s_ease-in-out_infinite] h-16 [animation-delay:-0.6s]"></div>

              <div className="w-2.5 bg-gradient-to-t from-blue-600 to-blue-400 rounded-full animate-[wave_1.2s_ease-in-out_infinite] h-10 [animation-delay:-0.45s]"></div>

              <div className="w-2.5 bg-gradient-to-t from-blue-600 to-blue-400 rounded-full animate-[wave_1.2s_ease-in-out_infinite] h-14 [animation-delay:-0.3s]"></div>
            </div>

            <p className="text-sm font-medium tracking-wide">
              Loading Services...
            </p>

            <p className="text-xs mt-1 opacity-70">
              Fetching your latest data
            </p>

            <style>{`
              @keyframes wave {
                0%, 100% {
                  transform: scaleY(0.4);
                  opacity: 0.6;
                }
                50% {
                  transform: scaleY(1);
                  opacity: 1;
                }
              }
            `}</style>
          </div>

        ) : (

          <div className="px-4 sm:px-6 md:px-10 lg:px-20 pb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

              {filteredWorkers.length > 0 ? (

                filteredWorkers.map((service) => (

                  <div
                    key={service._id}
                    className="bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 hover:dark:bg-gray-700 duration-300 rounded-xl shadow-lg p-6"
                  >
                    <div className="flex flex-col sm:flex-row items-center gap-6">

                      <img
                        src={service.workerId?.profile}
                        alt={service.workerId?.customerId?.customerName || "Worker"}
                        className="w-28 h-28 sm:w-32 sm:h-32 lg:w-36 lg:h-36 rounded-full object-cover border-4 border-blue-600 dark:border-purple-600"
                      />

                      <div className="flex-1 text-center sm:text-left">

                        <div className="flex items-center justify-center sm:justify-start gap-2">
                          <h2 className="text-xl capitalize lg:text-2xl font-bold mb-3">
                            {service.serviceName}
                          </h2>

                          <div className="text-yellow-500 flex justify-center items-center gap-1">
                            <h1>
                              {Number(service.rating || 0).toFixed(1)}
                            </h1>
                            <FaStar />
                          </div>
                        </div>

                        <p className="text-gray-700 dark:text-gray-300">
                          <span className="font-semibold">Name:</span>{" "}
                          {service.workerId?.customerId?.customerName || "Not available"}
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
                          LKR. {Number(service.price || 0).toLocaleString()}
                        </p>

                        <button
                          type="button"
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

                <div className="col-span-full flex flex-col items-center justify-center py-16 text-gray-500 dark:text-gray-400">
                  <span className="text-6xl mb-4">📭</span>

                  <p className="text-xl font-semibold">
                    No services found
                  </p>

                  <p className="text-sm mt-1">
                    Try changing your search filters.
                  </p>

                  <button
                    type="button"
                    onClick={() => {
                      setTitle("");
                      setLocation("");
                      setMaxPrice("");
                    }}
                    className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
                  >
                    Clear Filters
                  </button>
                </div>

              )}

            </div>
          </div>

        )}

      </div>

      <Footer />
    </>
  );
}

export default WorkerList;
