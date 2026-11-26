import React, { useContext, useEffect, useState, useMemo } from 'react';
import {
  FaSearch, FaEye, FaTrash, FaMapMarkerAlt,
  FaPhone, FaUserCircle, FaStar, FaComment, FaClipboardList,
  FaChevronDown, FaChevronUp, FaFilter
} from 'react-icons/fa';
import axios from 'axios';
import { AppContext } from '../../Context/Appcontext';

function AdminManageServices() {
  const [services, setServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeWorker, setActiveWorker] = useState('all');
  const [selectedService, setSelectedService] = useState(null);
  const [viewDetailsModel, setViewDetailsModel] = useState(false);
  const [comments, setComments] = useState([]);
  const [collapsed, setCollapsed] = useState({});
  const { backendUrl } = useContext(AppContext);

  const fetchServices = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/admin/getAllServices');
      if (response.data.success) setServices(response.data.services);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => { fetchServices(); }, []);

  const getComment = async (serviceId) => {
    try {
      const response = await axios.post(
        backendUrl + '/api/admin/getAllComment',
        { serviceId }
      );
      if (response.data.success) setComments(response.data.comments);
    } catch (error) {
      console.log(error);
    }
  };

  // ---------- Group key = worker name ----------
  const getWorkerName = (service) =>
    service.workerId?.customerId?.customerName?.trim() || 'Unknown Worker';

  // Build worker list + counts
  const workers = useMemo(() => {
    const map = new Map();
    services.forEach((s) => {
      const name = getWorkerName(s);
      map.set(name, (map.get(name) || 0) + 1);
    });
    return Array.from(map.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, [services]);

  // Filter
  const filteredServices = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return services.filter((s) => {
      const matchesSearch = s.serviceName?.toLowerCase().includes(term);
      const matchesWorker =
        activeWorker === 'all' || getWorkerName(s) === activeWorker;
      return matchesSearch && matchesWorker;
    });
  }, [services, searchTerm, activeWorker]);

  // Group filtered services by worker
  const groupedServices = useMemo(() => {
    const groups = {};
    filteredServices.forEach((s) => {
      const name = getWorkerName(s);
      if (!groups[name]) groups[name] = [];
      groups[name].push(s);
    });
    return groups;
  }, [filteredServices]);

  const toggleWorker = (name) =>
    setCollapsed((prev) => ({ ...prev, [name]: !prev[name] }));

  // ---------- Card ----------
  const renderServiceCard = (service) => (
    <div
      key={service._id}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700
                 hover:shadow-xl hover:border-blue-300 dark:hover:border-purple-500
                 transition-all duration-300 overflow-hidden flex flex-col"
    >
      <div className="p-4 border-b border-gray-100 dark:border-gray-700
                      bg-gradient-to-r from-blue-50 to-blue-100/50 dark:from-gray-700/50 dark:to-gray-700/30">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-bold text-base text-gray-800 dark:text-white line-clamp-1">
            {service.serviceName}
          </h3>
          <span className="flex-shrink-0 flex items-center gap-1 text-xs text-gray-600 dark:text-gray-300 bg-white/70 dark:bg-gray-800/70 px-2 py-0.5 rounded-full">
            <FaStar className="text-yellow-500" /> {service.rating ?? 'N/A'}
          </span>
        </div>
        {service.serviceSkill && (
          <div className="flex flex-wrap gap-1 mt-2">
            {service.serviceSkill.split(',').slice(0, 3).map((skill, i) => (
              <span
                key={i}
                className="text-[11px] px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/30
                           text-blue-700 dark:text-blue-300 font-medium"
              >
                {skill.trim()}
              </span>
            ))}
            {service.serviceSkill.split(',').length > 3 && (
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                +{service.serviceSkill.split(',').length - 3}
              </span>
            )}
          </div>
        )}
      </div>

      <div className="p-4 space-y-2 flex-1">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500 dark:text-gray-400">Price</span>
          <span className="font-bold text-green-600 dark:text-green-400">
            LKR {service.price?.toLocaleString() ?? '0'}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
          <FaMapMarkerAlt className="text-red-500 flex-shrink-0" />
          <span className="truncate">{service.serviceLocation || 'N/A'}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
          <FaPhone className="text-blue-500 flex-shrink-0" />
          <span className="truncate">{service.servicePhone || 'N/A'}</span>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 line-clamp-2">
          {service.serviceDescription || 'No description'}
        </p>
      </div>

      <div className="p-3 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/30">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
            <FaComment className="text-blue-500" /> Feedback
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => {
                setViewDetailsModel(true);
                setSelectedService(service);
                getComment(service._id);
              }}
              className="flex items-center gap-1 px-2.5 py-1.5 text-blue-600 dark:text-blue-400
                         hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg text-xs transition-colors"
            >
              <FaEye /> View
            </button>
            <button
              onClick={() => setSelectedService(service)}
              className="flex items-center gap-1 px-2.5 py-1.5 text-red-600 dark:text-red-400
                         hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-xs transition-colors"
            >
              <FaTrash /> Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-4 sm:p-6 dark:text-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <div className="flex gap-2 items-center">
            <p className="text-3xl text-blue-600 dark:text-purple-500"><FaClipboardList /></p>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
              Manage Services
            </h1>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Browse services grouped by worker
          </p>
        </div>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Total: <span className="font-semibold text-gray-800 dark:text-white">{services.length}</span>
        </span>
      </div>

      {/* Search + worker filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex-1 relative">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search services by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg
                       bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                       focus:ring-2 focus:ring-blue-500 dark:focus:ring-purple-500
                       focus:border-transparent outline-none transition"
          />
        </div>

        <div className="relative sm:w-64">
          <FaFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
          <select
            value={activeWorker}
            onChange={(e) => setActiveWorker(e.target.value)}
            className="w-full pl-8 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg
                       bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                       focus:ring-2 focus:ring-blue-500 outline-none transition appearance-none"
          >
            <option value="all">All workers ({services.length})</option>
            {workers.map((w) => (
              <option key={w.name} value={w.name}>
                {w.name} ({w.count})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Worker chips */}
      {workers.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setActiveWorker('all')}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors
              ${activeWorker === 'all'
                ? 'bg-blue-600 text-white dark:bg-purple-600'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
          >
            All ({services.length})
          </button>
          {workers.map((w) => (
            <button
              key={w.name}
              onClick={() => setActiveWorker(w.name)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors
                ${activeWorker === w.name
                  ? 'bg-blue-600 text-white dark:bg-purple-600'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
            >
              {w.name} ({w.count})
            </button>
          ))}
        </div>
      )}

      {/* Grouped by worker */}
      {filteredServices.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-gray-500 dark:text-gray-400">
          <span className="text-6xl mb-4">📭</span>
          <p className="text-xl font-medium">No services found</p>
          <p className="text-sm mt-1">Try adjusting your search or worker filter.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {Object.entries(groupedServices).map(([workerName, items]) => {
            const isCollapsed = collapsed[workerName];
            const firstService = items[0];
            const workerRole = firstService?.workerId?.customerId?.role;
            return (
              <section key={workerName}>
                {/* Worker section header */}
                <button
                  onClick={() => toggleWorker(workerName)}
                  className="w-full flex items-center justify-between mb-3 group
                             p-3 rounded-xl bg-gradient-to-r from-blue-50 to-transparent
                             dark:from-gray-800 dark:to-transparent border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-center gap-3">
                    {/* Worker avatar */}
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600
                                    text-white flex items-center justify-center font-semibold text-sm uppercase flex-shrink-0">
                      {workerName.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                    </div>
                    <div className="text-left">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h2 className="text-base font-semibold text-gray-800 dark:text-white">
                          {workerName}
                        </h2>
                        {workerRole && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded-full uppercase
                                           bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                            {workerRole}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {items.length} service{items.length > 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>
                  <span className="text-gray-400 group-hover:text-blue-600 dark:group-hover:text-purple-400 transition-colors">
                    {isCollapsed ? <FaChevronDown /> : <FaChevronUp />}
                  </span>
                </button>

                {!isCollapsed && (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {items.map(renderServiceCard)}
                  </div>
                )}
              </section>
            );
          })}
        </div>
      )}

      {/* Footer summary */}
      <div className="mt-6 px-4 py-3 bg-gray-100 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
          <span>
            Showing {filteredServices.length} of {services.length} service(s)
            {activeWorker !== 'all' && ` • ${activeWorker}`}
          </span>
          <span>
            {Object.keys(groupedServices).length} worker{Object.keys(groupedServices).length === 1 ? '' : 's'}
          </span>
        </div>
      </div>

      {/* View modal (unchanged) */}
      {viewDetailsModel && selectedService && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
            <div className="sticky top-0 bg-white dark:bg-gray-800 rounded-t-2xl border-b border-gray-200 dark:border-gray-700 px-6 py-4 z-10">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-800 dark:text-white">Service Details</h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400">View complete service information</p>
                </div>
                <button
                  onClick={() => { setSelectedService(null); setViewDetailsModel(false); }}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  ['Service Name', selectedService.serviceName],
                  ['Price', `LKR ${selectedService.price ?? 'N/A'}`],
                  ['Location', selectedService.serviceLocation],
                  ['Skill', selectedService.serviceSkill],
                  ['Phone', selectedService.servicePhone],
                  ['Worker', getWorkerName(selectedService)],
                  ['Created At', selectedService.createdAt
                    ? new Date(selectedService.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric', month: 'long', day: 'numeric'
                      })
                    : 'N/A'],
                ].map(([label, value]) => (
                  <div key={label} className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-3">
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      {label}
                    </p>
                    <p className="text-sm font-semibold text-gray-800 dark:text-white mt-1">
                      {value || 'N/A'}
                    </p>
                  </div>
                ))}

                <div className="md:col-span-2 bg-gray-50 dark:bg-gray-700/50 rounded-xl p-3">
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Description
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1 leading-relaxed">
                    {selectedService.serviceDescription || 'No description provided'}
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="font-semibold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                  💬 Comments
                  <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs px-2 py-0.5 rounded-full">
                    {comments.length}
                  </span>
                </h3>

                {comments.length > 0 ? (
                  <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
                    {comments.map((comment, idx) => (
                      <div key={idx} className="bg-gray-50 dark:bg-gray-700/30 rounded-xl p-3">
                        <div className="flex items-start gap-3">
                          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-500
                                          flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                            {comment.customerId?.customerName?.[0]?.toUpperCase() || 'U'}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-800 dark:text-white">
                              {comment.customerId?.customerName || 'Anonymous'}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mt-0.5">
                              {comment.comment}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-400 dark:text-gray-500 text-center py-4">
                    💬 No comments yet
                  </p>
                )}
              </div>
            </div>

            <div className="sticky bottom-0 bg-white dark:bg-gray-800 rounded-b-2xl border-t border-gray-200 dark:border-gray-700 px-6 py-4">
              <button
                onClick={() => { setSelectedService(null); setViewDetailsModel(false); }}
                className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700
                           text-white font-medium rounded-xl transition shadow-md hover:shadow-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminManageServices;