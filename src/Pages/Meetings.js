import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useMemo } from "react";
import { useGetAllMeetingsQuery } from "../Features/Apis/meetingApis";
import { Navbar } from "../Components/Navbar";
import { useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";
import { motion } from "framer-motion";
import { Calendar, FileText, Search } from "lucide-react";
import PuffLoader from "react-spinners/PuffLoader";
import { useTheme } from "../ThemeContext";
const MeetingList = () => {
    const { theme } = useTheme(); // Theme context
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
    return (_jsxs(_Fragment, { children: [_jsx(Navbar, {}), _jsxs("div", { className: "font-sans min-h-screen pt-[5rem] lg:pt-[6rem] pb-[4.5rem] lg:pb-0", style: {
                    backgroundColor: theme["base-100"],
                    color: theme["base-content"],
                }, children: [_jsxs(motion.section, { initial: { opacity: 0, y: -20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6 }, className: "py-12 px-4 sm:py-16 sm:px-6 lg:px-20 text-center", children: [_jsx("h1", { className: "text-3xl sm:text-4xl lg:text-5xl font-bold mb-4", style: { color: theme.primary }, children: "Official Meetings" }), _jsx("p", { style: { color: theme["base-content"] }, children: "Browse all meetings and view detailed minutes for transparency and records." })] }), _jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-center px-4 sm:px-6 lg:px-20 mb-8", children: [_jsxs("div", { className: "relative w-full sm:w-1/2 lg:w-1/3", children: [_jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5", style: { color: theme["base-content"] + "80" } }), _jsx("input", { type: "text", placeholder: "Search by meeting name...", value: search, onChange: (e) => {
                                            setSearch(e.target.value);
                                            setCurrentPage(1);
                                        }, className: "w-full pl-10 pr-4 py-2 border rounded-lg shadow-sm focus:outline-none", style: {
                                            backgroundColor: theme["base-200"],
                                            color: theme["base-content"],
                                            borderColor: theme.primary,
                                            caretColor: theme.primary,
                                        } })] }), _jsx("input", { type: "date", value: filterDate, onChange: (e) => {
                                    setFilterDate(e.target.value);
                                    setCurrentPage(1);
                                }, className: "w-full sm:w-1/3 lg:w-1/4 px-4 py-2 border rounded-lg shadow-sm focus:outline-none", style: {
                                    backgroundColor: theme["base-200"],
                                    color: theme["base-content"],
                                    borderColor: theme.primary,
                                    caretColor: theme.primary,
                                } })] }), _jsxs("main", { className: "py-10 px-4 sm:py-12 sm:px-6 lg:px-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6", children: [isLoading && (_jsx("div", { className: "col-span-full flex justify-center items-center py-20", children: _jsx(PuffLoader, { color: theme.primary, size: 80 }) })), isError && (_jsx("div", { className: "col-span-full text-center py-10", style: { color: theme.error }, children: "Error loading meetings." })), paginatedMeetings && paginatedMeetings.length > 0 ? (paginatedMeetings.map((meeting, index) => (_jsxs(motion.div, { initial: { opacity: 0, scale: 0.9, y: 20 }, animate: { opacity: 1, scale: 1, y: 0 }, transition: { delay: 0.4 + index * 0.1, duration: 0.5 }, whileHover: { scale: 1.03 }, className: "p-6 rounded-xl shadow-md hover:shadow-lg flex flex-col justify-between border", style: {
                                    backgroundColor: theme["base-100"],
                                    color: theme["base-content"],
                                    borderColor: theme["base-300"],
                                }, children: [_jsxs("div", { children: [_jsxs("h2", { className: "text-xl sm:text-2xl font-bold mb-2 flex items-center gap-2", style: { color: theme.primary }, children: [_jsx(FileText, { className: "w-5 h-5", style: { color: theme.primary } }), meeting.title] }), _jsxs("p", { className: "mb-4 flex items-center gap-2", style: { color: theme["base-content"] + "CC" }, children: [_jsx(Calendar, { className: "w-4 h-4", style: { color: theme["base-content"] + "80" } }), new Date(meeting.date).toLocaleString()] })] }), _jsxs(motion.button, { whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, onClick: () => navigate(`/meetings/${meeting.id}`), className: "mt-auto btn px-4 py-2 text-base sm:text-lg font-semibold w-full flex items-center justify-center gap-2", style: {
                                            backgroundColor: theme.primary,
                                            color: theme["base-100"],
                                        }, children: [_jsx(FileText, { className: "w-5 h-5" }), "View Details"] })] }, meeting.id)))) : (!isLoading && (_jsx("p", { className: "col-span-full text-center", style: { color: theme["base-content"] + "80" }, children: "No meetings found." })))] }), !isLoading && filteredMeetings.length > 0 && (_jsxs("div", { className: "flex flex-col sm:flex-row justify-between items-center gap-4 px-6 lg:px-20 pb-12", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("label", { style: { color: theme["base-content"] + "CC" }, children: "Show:" }), _jsxs("select", { id: "itemsPerPage", value: itemsPerPage, onChange: (e) => {
                                            setItemsPerPage(Number(e.target.value));
                                            setCurrentPage(1);
                                        }, className: "border rounded-lg px-3 py-1 shadow-sm focus:outline-none", style: {
                                            backgroundColor: theme["base-200"],
                                            color: theme["base-content"],
                                            borderColor: theme.primary,
                                        }, children: [_jsx("option", { value: 3, children: "3" }), _jsx("option", { value: 6, children: "6" }), _jsx("option", { value: 9, children: "9" }), _jsx("option", { value: 12, children: "12" })] }), _jsx("span", { style: { color: theme["base-content"] + "CC" }, children: "per page" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("button", { disabled: currentPage === 1, onClick: () => goToPage(currentPage - 1), className: "px-3 py-1 border rounded-lg shadow-sm disabled:opacity-50", style: {
                                            backgroundColor: theme["base-200"],
                                            color: theme["base-content"],
                                            borderColor: theme["base-300"],
                                        }, children: "Prev" }), _jsxs("span", { style: { color: theme["base-content"] + "CC" }, children: ["Page ", currentPage, " of ", totalPages] }), _jsx("button", { disabled: currentPage === totalPages, onClick: () => goToPage(currentPage + 1), className: "px-3 py-1 border rounded-lg shadow-sm disabled:opacity-50", style: {
                                            backgroundColor: theme["base-200"],
                                            color: theme["base-content"],
                                            borderColor: theme["base-300"],
                                        }, children: "Next" })] })] })), _jsx(Footer, {})] })] }));
};
export default MeetingList;
