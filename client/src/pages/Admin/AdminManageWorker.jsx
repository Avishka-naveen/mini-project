import React, { useContext, useEffect, useState, useMemo } from 'react';
import {
  FaUserCircle, FaIdCard, FaTrash, FaInfoCircle, FaExclamationTriangle,
  FaMapMarkerAlt, FaTimes, FaSearch, FaEnvelope, FaPhone, FaFilter
} from 'react-icons/fa';
import { MdOutlineWork } from "react-icons/md";
import { AppContext } from '../../Context/Appcontext';
import axios from 'axios';
import { BiSolidToggleLeft, BiSolidToggleRight } from "react-icons/bi";
import { toast } from 'react-toastify';

function AdminManageWorker() {
  const [workers, setWorkers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterWorkerCode, setFilterWorkerCode] = useState('all'); // 👈 new
  const [detailsVisible, setDetailsvisiable] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [deleteModelVisible, setdeleteModelVisible] = useState(false);
  const { backendUrl } = useContext(AppContext);
  const [loading, setLoading] = useState(true);

  // ---------- Fetch ----------
  const fetchworkers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(backendUrl + '/api/admin/getAllWorkers');
      if (response.data.success) setWorkers(response.data.workers);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchworkers(); }, []);



  // ---------- Filter: name / email / workerCode ----------
  const filteredWorkers = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    return workers.filter((worker) => {
      const name = worker.customerId?.customerName?.toLowerCase() || '';
      const email = worker.customerId?.customerEmail?.toLowerCase() || '';
      const code = worker.workerCode?.toLowerCase() || '';

      const matchesSearch =
        !term || name.includes(term) || email.includes(term) || code.includes(term);

      const matchesCode =
        filterWorkerCode === 'all' || worker.workerCode === filterWorkerCode;

      return matchesSearch && matchesCode;
    });
  }, [workers, searchTerm, filterWorkerCode]);

  // ---------- Delete ----------
  const handleDelete = async () => {
    try {
      const response = await axios.post(backendUrl + '/api/admin/deleteWorker', { workerId: selectedWorker._id });
      if (response.data.success) {
        toast.success(response.data.message);
        setSelectedWorker(null);
        setdeleteModelVisible(false);
        fetchworkers();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ---------- Toggle active ----------
  const handleEnable = async (workerId) => {
    try {
      const response = await axios.post(backendUrl + '/api/admin/disableWorker', { workerId }, { withCredentials: true });
      if (response.data.success) {
        toast.success(response.data.message);
        fetchworkers();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handledisable = async (workerId) => {
    try {
      const response = await axios.post(backendUrl + '/api/admin/enableWorker', { workerId }, { withCredentials: true });
      if (response.data.success) {
        toast.success(response.data.message);
        fetchworkers();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-4 sm:p-6 dark:text-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <div className="flex gap-2">
            <p className="text-4xl"><MdOutlineWork /></p>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
              Manage Workers
            </h1>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            View and manage all registered workers
          </p>
        </div>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Total: <span className="font-semibold text-gray-800 dark:text-white">{workers.length}</span>
        </span>
      </div>

      {/* Search + workerCode filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        {/* Search */}
        <div className="flex-1 relative">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, email or worker code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg
                       bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                       focus:ring-2 focus:ring-blue-500 dark:focus:ring-purple-500 focus:border-transparent
                       outline-none transition duration-200"
          />
        </div>


      </div>

      {/* Active filter chips */}
      {(filterWorkerCode !== 'all' || searchTerm) && (
        <div className="flex flex-wrap gap-2 mb-4">
          {filterWorkerCode !== 'all' && (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium
                             bg-blue-100 dark:bg-purple-900/40 text-blue-700 dark:text-purple-300">
              Code: {filterWorkerCode}
              <button onClick={() => setFilterWorkerCode('all')} className="hover:text-red-600">
                <FaTimes className="text-[10px]" />
              </button>
            </span>
          )}
          {searchTerm && (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium
                             bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
              Search: "{searchTerm}"
              <button onClick={() => setSearchTerm('')} className="hover:text-red-600">
                <FaTimes className="text-[10px]" />
              </button>
            </span>
          )}
        </div>
      )}

      {/* Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-500 dark:text-gray-400 w-full max-w-sm px-6">
              <div className="w-full space-y-3 mb-4">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-full"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-5/6"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-4/6"></div>
              </div>  
            </div>
          ) : (<table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">No.</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Worker</th>
                <th className="px-4 py-3 text-left text-xs hidden sm:table-cell font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Worker Code</th>
                <th className="px-4 py-3 text-left text-xs hidden sm:table-cell font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Joined At</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredWorkers.length > 0 ? (
                filteredWorkers.map((worker, index) => (
                  <tr
                    key={worker._id || index}
                    className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200"
                  >
                    <td className="px-4 py-3 text-gray-800 dark:text-gray-200 font-medium">
                      {String(index + 1).padStart(2, '0')}
                    </td>

                    <td className="px-4 py-3">
                      <div
                        onClick={() => { setDetailsvisiable(true); setSelectedWorker(worker); }}
                        className="flex cursor-pointer items-center gap-3"
                      >
                        {worker.profile ? (
                          <img
                            src={worker.profile}
                            alt={worker.customerId?.customerName || 'worker'}
                            className="w-12 h-12 rounded-full object-cover border-2 border-blue-500 dark:border-purple-600"
                          />
                        ) : (
                          <FaUserCircle className="text-3xl text-gray-400 dark:text-gray-500" />
                        )}
                        <div>
                          <p className="font-medium text-gray-800 dark:text-white">
                            {worker.customerId?.customerName || 'Unknown'}
                          </p>
                          <span className="text-sm text-blue-600 dark:text-purple-400 font-mono">
                            {worker.workerCode}
                          </span>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {worker.customerId?.customerEmail}
                          </p>
                        </div>
                      </div>
                    </td>


                    <td className="px-4 py-3 hidden sm:table-cell">
                      <span className="inline-block px-2.5 py-1 rounded-md text-xs font-mono font-semibold
                                       bg-blue-100 dark:bg-purple-900/40 text-blue-700 dark:text-purple-300
                                       border border-blue-200 dark:border-purple-700/30">
                        {worker.workerCode || '—'}
                      </span>
                    </td>

                    <td className="px-4 py-3 hidden sm:table-cell text-gray-700 dark:text-gray-300 text-xs">
                      {worker.createdAt ? new Date(worker.createdAt).toLocaleDateString() : 'N/A'}
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => { setSelectedWorker(worker); setdeleteModelVisible(true); }}
                          className="p-2 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300
                                     hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                          title="Delete Worker"
                        >
                          <FaTrash />
                        </button>
                        <div className="flex items-center justify-center text-2xl">
                          {worker.isActive ? (
                            <button onClick={() => handleEnable(worker._id)} className="text-green-500 cursor-pointer" title="Disable">
                              <BiSolidToggleRight />
                            </button>
                          ) : (
                            <button onClick={() => handledisable(worker._id)} className="text-blue-500 cursor-pointer dark:text-purple-600" title="Enable">
                              <BiSolidToggleLeft />
                            </button>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-4xl">📭</span>
                      <p className="font-medium">No workers found</p>
                      <p className="text-sm">Try adjusting your search or filter.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>)
          }

        </div>

        <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-600">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <span>Showing {filteredWorkers.length} of {workers.length} worker(s)</span>
            {filterWorkerCode !== 'all' && <span>Filtered by: {filterWorkerCode}</span>}
          </div>
        </div>
      </div>

      {/* Worker Details Modal */}
      {detailsVisible && selectedWorker && (
        <>
          <div
            className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 transition-opacity"
            onClick={() => setDetailsvisiable(false)}
          ></div>
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[95%] max-w-2xl max-h-[90vh] overflow-y-auto animate-scale-in">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
              <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 dark:from-purple-700 dark:to-blue-800 px-6 pt-6 pb-12">
                <div className="flex justify-center">
                  <div className="flex items-center gap-3">
                    <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 z-50">
                      {selectedWorker.profile ? (
                        <img
                          className="rounded-full w-36 h-36 object-cover border-4 border-white dark:border-gray-800"
                          src={selectedWorker.profile}
                          alt="worker"
                        />
                      ) : (
                        <div className="rounded-full w-36 h-36 flex items-center justify-center bg-gray-200 dark:bg-gray-700 border-4 border-white dark:border-gray-800">
                          <FaUserCircle className="text-7xl text-gray-400" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-24 px-6 pb-6 space-y-6">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                    {selectedWorker?.customerId?.customerName}
                  </h3>
                  {selectedWorker?.workerCode && (
                    <p className="mt-1 text-sm font-mono font-semibold text-blue-600 dark:text-purple-400">
                      {selectedWorker.workerCode}
                    </p>
                  )}
                  <span className="inline-block mt-2 bg-blue-100 dark:bg-purple-900/50 text-blue-700 dark:text-purple-300 text-xs font-semibold px-4 py-1.5 rounded-full border border-blue-200 dark:border-purple-700/30">
                    Worker Profile
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-700/40 border border-gray-100 dark:border-gray-700/50">
                    <FaUserCircle className="text-blue-500 dark:text-blue-400 text-xl flex-shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider mb-1">Full Name</p>
                      <p className="text-sm text-gray-800 dark:text-white font-semibold truncate">
                        {selectedWorker?.customerId?.customerName}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-700/40 border border-gray-100 dark:border-gray-700/50">
                    <FaIdCard className="text-purple-500 dark:text-purple-400 text-xl flex-shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider mb-1">NIC Number</p>
                      <p className="text-sm text-gray-800 dark:text-white font-semibold truncate">
                        {selectedWorker?.nic || 'N/A'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-700/40 border border-gray-100 dark:border-gray-700/50">
                    <FaEnvelope className="text-blue-500 dark:text-blue-400 text-xl flex-shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider mb-1">Email</p>
                      <p className="text-sm text-gray-800 dark:text-white font-semibold break-all">
                        {selectedWorker?.customerId?.customerEmail}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-700/40 border border-gray-100 dark:border-gray-700/50">
                    <FaPhone className="text-green-500 dark:text-green-400 text-xl flex-shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider mb-1">Phone</p>
                      <p className="text-sm text-gray-800 dark:text-white font-semibold">
                        {selectedWorker?.customerId?.customerPhone}
                      </p>
                    </div>
                  </div>

                  <div className="col-span-1 sm:col-span-2 flex items-start gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-700/40 border border-gray-100 dark:border-gray-700/50">
                    <FaMapMarkerAlt className="text-red-500 dark:text-red-400 text-xl flex-shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider mb-1">Address</p>
                      <p className="text-sm text-gray-800 dark:text-white font-medium">
                        {selectedWorker?.address}
                      </p>
                    </div>
                  </div>

                  <div className="col-span-1 sm:col-span-2 flex items-start gap-3 p-4 rounded-xl bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800/30">
                    <FaInfoCircle className="text-blue-500 dark:text-blue-400 text-xl flex-shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-blue-600 dark:text-blue-400 font-bold uppercase tracking-wider mb-1.5">Worker Description</p>
                      <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                        {selectedWorker?.description || 'No description provided for this worker.'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-6">
                  <p className="text-xs text-center text-gray-700 dark:text-gray-500">
                    Joined system on: {selectedWorker?.createdAt
                      ? new Date(selectedWorker.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
                      : 'N/A'}
                  </p>
                </div>
              </div>

              <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/80">
                <button
                  onClick={() => setDetailsvisiable(false)}
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.98]"
                >
                  Close Profile
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Delete Modal  */}
      {deleteModelVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4 animate-fade-in">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md animate-scale-in overflow-hidden">
            <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                    <FaExclamationTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white">Delete Worker</h2>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Are you sure you want to Delete?</p>
                  </div>
                </div>
                <button
                  onClick={() => setdeleteModelVisible(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <FaTimes className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800/30 rounded-lg p-3 mb-4">
                <p className="text-sm text-yellow-800 dark:text-yellow-300 flex items-center gap-2">
                  <FaExclamationTriangle className="w-4 h-4" />
                  This action cannot be undone.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setdeleteModelVisible(false)}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-medium transition duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-medium transition duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                >
                  Yes, Delete Worker
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminManageWorker;