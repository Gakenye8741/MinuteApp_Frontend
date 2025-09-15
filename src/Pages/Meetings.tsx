import React, { useState, useMemo } from "react";
import { useGetAllMeetingsQuery } from "../Features/Apis/meetingApis";
import { Navbar } from "../Components/Navbar";
import { useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";
import { motion } from "framer-motion";
import { Calendar, FileText, Search } from "lucide-react";
import PuffLoader from "react-spinners/PuffLoader";

const MeetingList: React.FC = () => {
  const { data: meetings, isLoading, isError } = useGetAllMeetingsQuery({});
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6); // default 6 meetings per page

  // Filter meetings by name or date
  const filteredMeetings = useMemo(() => {
    if (!meetings) return [];
    return meetings.filter((meeting: any) => {
      const matchesName = meeting.title
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesDate = filterDate
        ? new Date(meeting.date).toISOString().slice(0, 10) === filterDate
        : true;
      return matchesName && matchesDate;
    });
  }, [meetings, search, filterDate]);

  // Pagination logic
  const totalPages = Math.ceil(filteredMeetings.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedMeetings = filteredMeetings.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Handle page change
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <>
      <Navbar />
      <div className="font-sans bg-base-100 text-secondary min-h-screen">
        {/* Hero / Page Header */}
        <motion.section
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="py-12 px-4 sm:py-16 sm:px-6 lg:px-20 text-center"
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-4">
            Official Meetings
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600">
            Browse all meetings and view detailed minutes for transparency and
            records.
          </p>
        </motion.section>

        {/* Search & Filter Controls */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center px-4 sm:px-6 lg:px-20 mb-8">
          {/* Search by name */}
          <div className="relative w-full sm:w-1/2 lg:w-1/3">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by meeting name..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1); // reset pagination
              }}
              className="w-full pl-10 pr-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>

          {/* Filter by date */}
          <input
            type="date"
            value={filterDate}
            onChange={(e) => {
              setFilterDate(e.target.value);
              setCurrentPage(1); // reset pagination
            }}
            className="w-full sm:w-1/3 lg:w-1/4 px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:outline-none"
          />
        </div>

        {/* Meetings Grid */}
        <main className="py-10 px-4 sm:py-12 sm:px-6 lg:px-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading && (
            <div className="col-span-full flex justify-center items-center py-20">
              <PuffLoader color="#2563EB" size={80} />
            </div>
          )}
          {isError && (
            <div className="col-span-full text-center py-10 text-red-500">
              Error loading meetings.
            </div>
          )}

          {paginatedMeetings && paginatedMeetings.length > 0 ? (
            paginatedMeetings.map((meeting: any, index: number) => (
              <motion.div
                key={meeting.id}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.03 }}
                className="bg-base-100 p-6 rounded-xl shadow-md hover:shadow-lg flex flex-col justify-between border border-text-primary"
              >
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-primary mb-2 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" />
                    {meeting.title}
                  </h2>

                  <p className="text-gray-600 mb-4 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    {new Date(meeting.date).toLocaleString()}
                  </p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate(`/meetings/${meeting.id}`)}
                  className="mt-auto btn btn-primary px-4 py-2 text-base sm:text-lg font-semibold w-full flex items-center justify-center gap-2"
                >
                  <FileText className="w-5 h-5" />
                  View Details
                </motion.button>
              </motion.div>
            ))
          ) : (
            !isLoading && (
              <p className="col-span-full text-center text-gray-500">
                No meetings found.
              </p>
            )
          )}
        </main>

        {/* Pagination Controls */}
        {!isLoading && filteredMeetings.length > 0 && (
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 px-6 lg:px-20 pb-12">
            {/* Items per page dropdown */}
            <div className="flex items-center gap-2">
              <label htmlFor="itemsPerPage" className="text-gray-600">
                Show:
              </label>
              <select
                id="itemsPerPage"
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1); // reset to first page
                }}
                className="border rounded-lg px-3 py-1 shadow-sm focus:ring-2 focus:ring-primary focus:outline-none"
              >
                <option value={3}>3</option>
                <option value={6}>6</option>
                <option value={9}>9</option>
                <option value={12}>12</option>
              </select>
              <span className="text-gray-600">per page</span>
            </div>

            {/* Page navigation */}
            <div className="flex items-center gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => goToPage(currentPage - 1)}
                className="px-3 py-1 border rounded-lg shadow-sm disabled:opacity-50 hover:bg-gray-100"
              >
                Prev
              </button>
              <span className="text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
              <button
                disabled={currentPage === totalPages}
                onClick={() => goToPage(currentPage + 1)}
                className="px-3 py-1 border rounded-lg shadow-sm disabled:opacity-50 hover:bg-gray-100"
              >
                Next
              </button>
            </div>
          </div>
        )}

        <Footer />
      </div>
    </>
  );
};

export default MeetingList;
