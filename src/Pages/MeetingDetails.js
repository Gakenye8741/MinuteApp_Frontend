import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useMemo } from "react";
import { useGetAllMeetingsQuery } from "../Features/Apis/meetingApis";
import { Navbar } from "../Components/Navbar";
import { useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";
import { motion } from "framer-motion";
import { Calendar, FileText, Search } from "lucide-react";
import PuffLoader from "react-spinners/PuffLoader";
const MeetingList = () => {
    const { data: meetings, isLoading, isError } = useGetAllMeetingsQuery({});
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [filterDate, setFilterDate] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6);
    const filteredMeetings = useMemo(() => {
        if (!meetings)
            return [];
        return meetings.filter((meeting) => {
            const matchesName = meeting.title
                .toLowerCase()
                .includes(search.toLowerCase());
            const matchesDate = filterDate
                ? new Date(meeting.date).toISOString().slice(0, 10) === filterDate
                : true;
            return matchesName && matchesDate;
        });
    }, [meetings, search, filterDate]);
    const totalPages = Math.ceil(filteredMeetings.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedMeetings = filteredMeetings.slice(startIndex, startIndex + itemsPerPage);
    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };
    return (_jsxs(_Fragment, { children: [_jsx(Navbar, {}), _jsxs("div", { className: "font-sans bg-base-100 dark:bg-base-200 text-base-content dark:text-base-content min-h-screen pt-[5rem] lg:pt-[6rem] pb-[4.5rem] lg:pb-0", children: [_jsxs(motion.section, { initial: { opacity: 0, y: -20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6 }, className: "py-12 px-4 sm:py-16 sm:px-6 lg:px-20 text-center", children: [_jsx("h1", { className: "text-3xl sm:text-4xl lg:text-5xl font-bold text-primary dark:text-primary-content mb-4", children: "Official Meetings" }), _jsx("p", { className: "text-base sm:text-lg lg:text-xl text-base-content/80 dark:text-base-content/70", children: "Browse all meetings and view detailed minutes for transparency and records." })] }), _jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-center px-4 sm:px-6 lg:px-20 mb-8", children: [_jsxs("div", { className: "relative w-full sm:w-1/2 lg:w-1/3", children: [_jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-300 w-5 h-5" }), _jsx("input", { type: "text", placeholder: "Search by meeting name...", value: search, onChange: (e) => {
                                            setSearch(e.target.value);
                                            setCurrentPage(1);
                                        }, className: "w-full pl-10 pr-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:outline-none bg-base-200 dark:bg-base-300 text-base-content dark:text-base-content placeholder-gray-500 dark:placeholder-gray-400" })] }), _jsx("input", { type: "date", value: filterDate, onChange: (e) => {
                                    setFilterDate(e.target.value);
                                    setCurrentPage(1);
                                }, className: "w-full sm:w-1/3 lg:w-1/4 px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:outline-none bg-base-200 dark:bg-base-300 text-base-content dark:text-base-content placeholder-gray-500 dark:placeholder-gray-400" })] }), _jsxs("main", { className: "py-10 px-4 sm:py-12 sm:px-6 lg:px-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6", children: [isLoading && (_jsx("div", { className: "col-span-full flex justify-center items-center py-20", children: _jsx(PuffLoader, { color: "#818cf8", size: 80 }) })), isError && (_jsx("div", { className: "col-span-full text-center py-10 text-error dark:text-error-content", children: "Error loading meetings." })), paginatedMeetings && paginatedMeetings.length > 0 ? (paginatedMeetings.map((meeting, index) => (_jsxs(motion.div, { initial: { opacity: 0, scale: 0.9, y: 20 }, animate: { opacity: 1, scale: 1, y: 0 }, transition: { delay: 0.4 + index * 0.1, duration: 0.5 }, whileHover: { scale: 1.03 }, className: "bg-base-100 dark:bg-base-200 p-6 rounded-xl shadow-md hover:shadow-lg flex flex-col justify-between border border-base-content/20 dark:border-base-content/40", children: [_jsxs("div", { children: [_jsxs("h2", { className: "text-xl sm:text-2xl font-bold text-primary dark:text-primary-content mb-2 flex items-center gap-2", children: [_jsx(FileText, { className: "w-5 h-5 text-primary dark:text-primary-content" }), meeting.title] }), _jsxs("p", { className: "text-base-content/70 dark:text-base-content/60 mb-4 flex items-center gap-2", children: [_jsx(Calendar, { className: "w-4 h-4 text-base-content/60 dark:text-base-content/50" }), new Date(meeting.date).toLocaleString()] })] }), _jsxs(motion.button, { whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, onClick: () => navigate(`/meetings/${meeting.id}`), className: "mt-auto btn btn-primary px-4 py-2 text-base sm:text-lg font-semibold w-full flex items-center justify-center gap-2", children: [_jsx(FileText, { className: "w-5 h-5" }), "View Details"] })] }, meeting.id)))) : (!isLoading && (_jsx("p", { className: "col-span-full text-center text-base-content/60 dark:text-base-content/50", children: "No meetings found." })))] }), !isLoading && filteredMeetings.length > 0 && (_jsxs("div", { className: "flex flex-col sm:flex-row justify-between items-center gap-4 px-6 lg:px-20 pb-12", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("label", { className: "text-base-content/70 dark:text-base-content/60", children: "Show:" }), _jsxs("select", { value: itemsPerPage, onChange: (e) => {
                                            setItemsPerPage(Number(e.target.value));
                                            setCurrentPage(1);
                                        }, className: "border rounded-lg px-3 py-1 shadow-sm focus:ring-2 focus:ring-primary focus:outline-none bg-base-200 dark:bg-base-300 text-base-content dark:text-base-content", children: [_jsx("option", { value: 3, children: "3" }), _jsx("option", { value: 6, children: "6" }), _jsx("option", { value: 9, children: "9" }), _jsx("option", { value: 12, children: "12" })] }), _jsx("span", { className: "text-base-content/70 dark:text-base-content/60", children: "per page" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("button", { disabled: currentPage === 1, onClick: () => goToPage(currentPage - 1), className: "px-3 py-1 border rounded-lg shadow-sm disabled:opacity-50 hover:bg-base-200 dark:hover:bg-base-300", children: "Prev" }), _jsxs("span", { className: "text-base-content/70 dark:text-base-content/60", children: ["Page ", currentPage, " of ", totalPages] }), _jsx("button", { disabled: currentPage === totalPages, onClick: () => goToPage(currentPage + 1), className: "px-3 py-1 border rounded-lg shadow-sm disabled:opacity-50 hover:bg-base-200 dark:hover:bg-base-300", children: "Next" })] })] })), _jsx(Footer, {})] })] }));
};
export default MeetingList;
