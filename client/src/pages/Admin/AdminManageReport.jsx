import React, { useContext, useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
    FaFlag, FaUserCircle, FaSearch, FaFilter, FaCheck, FaTimes,
    FaExclamationTriangle, FaCalendarAlt, FaEnvelope, FaPhone,
    FaIdCard, FaMapMarkerAlt, FaEye, FaTrash, FaChevronDown, FaChevronUp
} from 'react-icons/fa';
import { AppContext } from '../../Context/Appcontext';

function AdminManageReport() {
    const { backendUrl } = useContext(AppContext);

    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [selectedReport, setSelectedReport] = useState(null);
    const [detailsVisible, setDetailsVisible] = useState(false);
    const [actionModal, setActionModal] = useState({ open: false, type: null, report: null });

    // ---------- Fetch reports ----------
    const fetchReports = async () => {
        setLoading(true);
        try {
            const response = await axios.get(backendUrl + '/api/admin/getAllReports', { withCredentials: true });
            if (response.data.success) {
                setReports(response.data.reports || []);
            }
        } catch (error) {
            console.log(error);
            toast.error('Failed to load reports.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchReports(); }, []);

    const getStatusColor = (status) => {
        const map = {
            pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
            reviewed: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
            resolved: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
            dismissed: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
        };
        return map[status] || map.pending;
    };


    const statuses = useMemo(() => {
        return ['all', ...Array.from(new Set(reports.map((r) => r.status).filter(Boolean)))];
    }, [reports]);


    const filteredReports = useMemo(() => {
        const term = searchTerm.toLowerCase().trim();
        return reports.filter((r) => {
            const workerName = r.workerId?.customerId?.customerName?.toLowerCase() || '';
            const workerCode = r.workerId?.workerCode?.trim().toLowerCase() || '';
            const reporterName = r.reportedBy?.customerName?.toLowerCase() || '';
            const reason = r.reason?.toLowerCase() || '';

            const matchesSearch =
                !term ||
                workerName.includes(term) ||
                workerCode.includes(term) ||
                reporterName.includes(term) ||
                reason.includes(term);

            const matchesStatus = filterStatus === 'all' || r.status === filterStatus;

            return matchesSearch && matchesStatus;
        });
    }, [reports, searchTerm, filterStatus]);

    // ---------- Stats ----------
    const stats = useMemo(() => {
        return {
            total: reports.length,
            pending: reports.filter((r) => r.status === 'pending').length,
            resolved: reports.filter((r) => r.status === 'resolved').length,
        };
    }, [reports]);

    // ---------- Actions ----------
    const handleAction = async () => {
        const { type, report } = actionModal;
        if (!report) return;

        try {
            if (type === 'delete') {
                const response = await axios.post(
                    backendUrl + '/api/admin/deleteReport',
                    { reportId: report._id },
                    { withCredentials: true }
                );
                if (response.data.success) {
                    toast.success('Report deleted.');
                    setReports((prev) => prev.filter((r) => r._id !== report._id));
                }
            } else {
                // 'resolve' or 'dismiss' → update status
                const newStatus = type === 'resolve' ? 'resolved' : 'dismissed';
                const response = await axios.post(
                    backendUrl + '/api/admin/updateReportStatus',
                    { reportId: report._id, status: newStatus },
                    { withCredentials: true }
                );
                if (response.data.success) {
                    toast.success(`Report ${newStatus}.`);
                    setReports((prev) =>
                        prev.map((r) => (r._id === report._id ? { ...r, status: newStatus } : r))
                    );
                }
            }
            setActionModal({ open: false, type: null, report: null });
        } catch (error) {
            toast.error(error.message || 'Action failed.');
        }
    };

    return (
        <div className="p-4 sm:p-6 dark:text-white max-w-7xl mx-auto">
            {/* ---------- Header ---------- */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                    <div className="flex items-center gap-2">
                        <p className="text-3xl text-red-600 dark:text-red-400"><FaFlag /></p>
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
                            Manage Reports
                        </h1>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Review and take action on worker reports
                    </p>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                    Total: <span className="font-semibold text-gray-800 dark:text-white">{stats.total}</span>
                </span>
            </div>

            {/* ---------- Stats ---------- */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 shadow-sm">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Total Reports</p>
                    <p className="text-2xl font-bold text-gray-800 dark:text-white">{stats.total}</p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-yellow-300 dark:border-yellow-700/50 p-4 shadow-sm">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">⏳ Pending</p>
                    <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{stats.pending}</p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-green-300 dark:border-green-700/50 p-4 shadow-sm">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">✅ Resolved</p>
                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.resolved}</p>
                </div>
            </div>

            {/* ---------- Search + Filter ---------- */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <div className="flex-1 relative">
                    <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by worker, reporter, code or reason..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg
                       bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                       focus:ring-2 focus:ring-blue-500 dark:focus:ring-purple-500
                       focus:border-transparent outline-none transition"
                    />
                </div>
                <div className="relative sm:w-56">
                    <FaFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="w-full pl-8 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg
                       bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                       focus:ring-2 focus:ring-blue-500 outline-none transition appearance-none"
                    >
                        {statuses.map((s) => (
                            <option key={s} value={s}>
                                {s === 'all' ? 'All statuses' : s.charAt(0).toUpperCase() + s.slice(1)}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* ---------- Content ---------- */}
            {loading ? (
                <div className="flex flex-col items-center justify-center py-20 text-gray-500 dark:text-gray-400 w-full max-w-sm px-6">
                    <div className="w-full space-y-3 mb-4">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-full"></div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-5/6"></div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-4/6"></div>
                    </div>
                   
                </div>
            ) : filteredReports.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-gray-500 dark:text-gray-400">
                    <FaFlag className="text-6xl mb-4 opacity-30" />
                    <p className="text-xl font-medium">No reports found</p>
                    <p className="text-sm mt-1">Try adjusting your search or filter.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {filteredReports.map((report) => (
                        <div
                            key={report._id}
                            className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700
                         hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col"
                        >
                            {/* Card header */}
                            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-700
                             ">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                                        <FaExclamationTriangle className="text-red-600 dark:text-red-400 text-sm" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Reported Worker</p>
                                        <p className="text-sm font-semibold text-gray-800 dark:text-white">
                                            {report.workerId?.customerId?.customerName || 'Unknown'} - {report.workerId.workerCode}
                                        </p>
                                    </div>
                                </div>
                                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                                    {report.status}
                                </span>
                            </div>

                            {/* Body */}
                            <div className="p-4 space-y-3 flex-1">
                                {/* Reason */}
                                <div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Reason</p>
                                    <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3 leading-relaxed">
                                        {report.reason || 'No reason provided'}
                                    </p>
                                </div>

                                {/* Reporter + date */}
                                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 pt-2 border-t border-gray-100 dark:border-gray-700">
                                    <span className="flex items-center gap-1.5">
                                        <FaUserCircle /> {report.reportedBy?.customerName || 'Anonymous'}
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <FaCalendarAlt /> {new Date(report.createdAt).toLocaleDateString('en-GB')}
                                    </span>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="px-4 py-3 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/30">
                                <div className="flex items-center justify-between gap-2">
                                    <button
                                        onClick={() => { setSelectedReport(report); setDetailsVisible(true); }}
                                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-blue-600
                               dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                                    >
                                        <FaEye /> View
                                    </button>

                                    <div className="flex items-center gap-1.5">
                                        {report.status === 'pending' && (
                                            <>
                                                <button
                                                    onClick={() => setActionModal({ open: true, type: 'resolve', report })}
                                                    className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-white
                                     bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
                                                >
                                                    <FaCheck /> Resolve
                                                </button>
                                                <button
                                                    onClick={() => setActionModal({ open: true, type: 'dismiss', report })}
                                                    className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-gray-700
                                     dark:text-gray-300 bg-gray-200 dark:bg-gray-700
                                     hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg transition-colors"
                                                >
                                                    <FaTimes /> Dismiss
                                                </button>
                                            </>
                                        )}
                                        <button
                                            onClick={() => setActionModal({ open: true, type: 'delete', report })}
                                            className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-red-600
                                 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* ---------- Footer ---------- */}
            <div className="mt-6 px-4 py-3 bg-gray-100 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <span>Showing {filteredReports.length} of {reports.length} report(s)</span>
                    {filterStatus !== 'all' && <span>Filtered by: {filterStatus}</span>}
                </div>
            </div>

            {/* ---------- Details Modal ---------- */}
            {detailsVisible && selectedReport && (
                <>
                    <div
                        className="fixed inset-0 bg-black/60 z-50"
                        onClick={() => setDetailsVisible(false)}
                    ></div>
                    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[95%] max-w-2xl max-h-[90vh] overflow-y-auto animate-scale-in">
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
                            {/* Header */}
                            <div className="relative bg-gradient-to-r from-red-600 to-red-700 dark:from-red-800 dark:to-red-900 px-6 py-5">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                                            <FaExclamationTriangle className="text-white" />
                                        </div>
                                        <div>
                                            <h2 className="text-white font-bold text-lg">Report Details</h2>
                                            <p className="text-white/80 text-xs">
                                                {new Date(selectedReport.createdAt).toLocaleString('en-GB')}
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setDetailsVisible(false)}
                                        className="p-2 rounded-lg hover:bg-white/20 transition-colors"
                                    >
                                        <FaTimes className="text-white" />
                                    </button>
                                </div>
                            </div>

                            {/* Body */}
                            <div className="p-6 space-y-5">
                                {/* Worker */}
                                <div>
                                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                                        Reported Worker
                                    </p>
                                    <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-700/40">
                                        {selectedReport.workerId?.profile ? (
                                            <img
                                                src={selectedReport.workerId.profile}
                                                alt="worker"
                                                className="w-14 h-14 rounded-full object-cover border-2 border-red-500"
                                            />
                                        ) : (
                                            <FaUserCircle className="text-4xl text-gray-400" />
                                        )}
                                        <div className="flex-1 min-w-0">
                                            <p className="font-semibold text-gray-800 dark:text-white">
                                                {selectedReport.workerId?.customerId?.customerName || 'Unknown'}
                                            </p>
                                            <p className="text-xs font-mono text-blue-600 dark:text-purple-400">
                                                {selectedReport.workerId?.workerCode?.trim() || 'N/A'}
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                                {selectedReport.serviceId?.serviceName || 'N/A'}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Reporter */}
                                <div>
                                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                                        Reported By
                                    </p>
                                    <div className="space-y-2 p-3 rounded-xl bg-gray-50 dark:bg-gray-700/40">
                                        <div className="flex items-center gap-2 text-sm">
                                            <FaUserCircle className="text-blue-500" />
                                            <span className="text-gray-800 dark:text-white font-medium">
                                                {selectedReport.reportedBy?.customerName || 'Anonymous'}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                            <FaEnvelope className="text-blue-500 text-xs" />
                                            <span className="break-all">{selectedReport.reportedBy?.customerEmail || 'N/A'}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                            <FaPhone className="text-green-500 text-xs" />
                                            <span>{selectedReport.reportedBy?.customerPhone || 'N/A'}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Reason */}
                                <div>
                                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                                        Reason
                                    </p>
                                    <div className="p-4 rounded-xl bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800/40">
                                        <p className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed whitespace-pre-wrap">
                                            {selectedReport.reason || 'No reason provided'}
                                        </p>
                                    </div>
                                </div>

                                {/* Status + Date */}
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-700/40">
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Status</p>
                                        <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedReport.status)}`}>
                                            {selectedReport.status}
                                        </span>
                                    </div>
                                    <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-700/40">
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Reported At</p>
                                        <p className="text-sm text-gray-800 dark:text-white font-medium">
                                            {new Date(selectedReport.createdAt).toLocaleDateString('en-GB')}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/80">
                                <button
                                    onClick={() => setDetailsVisible(false)}
                                    className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-purple-600
                             hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-xl
                             transition shadow-md hover:shadow-lg"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {/* ---------- Action Confirm Modal ---------- */}
            {actionModal.open && actionModal.report && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4 animate-fade-in">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md animate-scale-in overflow-hidden">
                        <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center
                    ${actionModal.type === 'delete'
                                            ? 'bg-red-100 dark:bg-red-900/30'
                                            : actionModal.type === 'resolve'
                                                ? 'bg-green-100 dark:bg-green-900/30'
                                                : 'bg-gray-100 dark:bg-gray-700'}`}>
                                        {actionModal.type === 'delete' && <FaTrash className="text-red-600 dark:text-red-400" />}
                                        {actionModal.type === 'resolve' && <FaCheck className="text-green-600 dark:text-green-400" />}
                                        {actionModal.type === 'dismiss' && <FaTimes className="text-gray-600 dark:text-gray-400" />}
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-bold text-gray-800 dark:text-white">
                                            {actionModal.type === 'delete' && 'Delete Report'}
                                            {actionModal.type === 'resolve' && 'Resolve Report'}
                                            {actionModal.type === 'dismiss' && 'Dismiss Report'}
                                        </h2>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            {actionModal.type === 'delete' && 'This cannot be undone'}
                                            {actionModal.type === 'resolve' && 'Mark as resolved'}
                                            {actionModal.type === 'dismiss' && 'Mark as dismissed'}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setActionModal({ open: false, type: null, report: null })}
                                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                >
                                    <FaTimes className="w-5 h-5 text-gray-500" />
                                </button>
                            </div>
                        </div>

                        <div className="p-6">
                            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                                Are you sure you want to{' '}
                                <strong>
                                    {actionModal.type === 'delete' ? 'delete' : actionModal.type}
                                </strong>{' '}
                                the report against{' '}
                                <strong>{actionModal.report.workerId?.customerId?.customerName}</strong>?
                            </p>

                            <div className="flex flex-col sm:flex-row gap-3">
                                <button
                                    onClick={() => setActionModal({ open: false, type: null, report: null })}
                                    className="flex-1 px-4 py-2.5 rounded-xl bg-gray-200 hover:bg-gray-300
                             dark:bg-gray-700 dark:hover:bg-gray-600
                             text-gray-700 dark:text-gray-200 font-medium transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleAction}
                                    className={`flex-1 px-4 py-2.5 rounded-xl text-white font-medium transition shadow-md hover:shadow-lg
                    ${actionModal.type === 'delete'
                                            ? 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800'
                                            : actionModal.type === 'resolve'
                                                ? 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800'
                                                : 'bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800'}`}
                                >
                                    Yes, {actionModal.type === 'delete' ? 'Delete' : actionModal.type === 'resolve' ? 'Resolve' : 'Dismiss'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminManageReport;