import React from "react";
import { useParams, Link } from "react-router-dom";
import { useGetMeetingByIdQuery } from "../Features/Apis/meetingApis";
import { useGetAllAttendeesQuery } from "../Features/Apis/AttendeesApi";
import { useGetTopicsByMeetingIdQuery } from "../Features/Apis/Topics.Api";
import { useGetSignaturesByMeetingIdQuery } from "../Features/Apis/SignaturesApi";
import { Navbar } from "../Components/Navbar";
import Footer from "../Components/Footer";
import { motion } from "framer-motion";
import { Users, BookOpen, PenTool, ChevronLeft } from "lucide-react";
import PuffLoader from "react-spinners/PuffLoader";

const MeetingDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const meetingId = id ? Number(id) : undefined;

  const { data: meeting, isLoading: loadingMeeting } = useGetMeetingByIdQuery(id!);
  const { data: attendees } = useGetAllAttendeesQuery(meetingId ? String(meetingId) : undefined);
  const { data: topics } = useGetTopicsByMeetingIdQuery(id!);
  const { data: signatures } = useGetSignaturesByMeetingIdQuery(meetingId!);

  if (loadingMeeting)
    return (
      <div className="flex justify-center items-center h-screen">
        <PuffLoader color="#2563EB" size={80} />
      </div>
    );

  if (!meeting)
    return <div className="text-center py-10 text-red-500">Meeting not found.</div>;

  return (
    <div className="font-sans bg-base-100 text-secondary min-h-screen pt-[6rem] lg:pt-[6rem] pb-[4.5rem] lg:pb-0">
      <Navbar />

      <main className="px-4 sm:px-6 lg:px-20 max-w-5xl mx-auto space-y-10">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4"
        >
          <Link
            to="/meetings"
            className="inline-flex items-center gap-2 text-primary font-medium bg-base-200 hover:bg-base-300 transition-colors px-4 py-2 rounded-lg shadow-sm"
          >
            <ChevronLeft className="w-5 h-5" /> Back to Meetings
          </Link>
        </motion.div>

        {/* Meeting Info */}
        <motion.section
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-base-100 p-6 sm:p-8 rounded-xl shadow-md hover:shadow-lg border border-text-primary"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-3xl sm:text-4xl font-bold text-primary mb-3"
          >
            {meeting.title}
          </motion.h1>
          <p className="text-gray-600 mb-6 text-lg">
            {new Date(meeting.date).toLocaleString()}
          </p>

          {/* Attendees */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-semibold text-primary mb-3 flex items-center gap-2">
              <Users className="w-6 h-6 text-primary" /> Attendees
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {attendees?.map((att: any, index: number) => (
                <motion.li
                  key={att.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className={getStatusColor(att.status)}
                >
                  {att.name} ({att.status})
                </motion.li>
              ))}
              {(!attendees || attendees.length === 0) && (
                <p className="text-gray-500">No attendees recorded.</p>
              )}
            </ul>
          </motion.div>

          {/* Topics / Minutes */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-semibold text-primary mb-3 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-primary" /> Topics / Minutes
            </h2>
            <div className="space-y-4">
              {topics?.map((topic: any, index: number) => (
                <motion.div
                  key={topic.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.15, duration: 0.5 }}
                  className="bg-base-200 p-4 rounded-xl border border-text-primary shadow-sm hover:shadow-md"
                >
                  <h3 className="text-xl font-medium text-primary mb-2">
                    {topic.subject}
                  </h3>
                  {topic.notes && (
                    <p className="text-gray-600 mb-1">
                      <strong>Notes:</strong> {topic.notes}
                    </p>
                  )}
                  {topic.decisions && (
                    <p className="text-gray-600 mb-1">
                      <strong>Decisions:</strong> {topic.decisions}
                    </p>
                  )}
                  {topic.actions && (
                    <p className="text-gray-600">
                      <strong>Actions:</strong> {topic.actions}
                    </p>
                  )}
                </motion.div>
              ))}
              {(!topics || topics.length === 0) && (
                <p className="text-gray-500">No topics/minutes available.</p>
              )}
            </div>
          </motion.div>

          {/* Signatures */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <h2 className="text-2xl font-semibold text-primary mb-3 flex items-center gap-2">
              <PenTool className="w-6 h-6 text-primary" /> Signatures
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {signatures?.map((sig: any, index: number) => (
                <motion.li
                  key={sig.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="text-gray-700"
                >
                  {sig.role} - Signed by {sig.signedBy} at{" "}
                  {sig.signedAt
                    ? new Date(sig.signedAt).toLocaleString()
                    : "Unknown time"}
                </motion.li>
              ))}
              {(!signatures || signatures.length === 0) && (
                <p className="text-gray-500">No signatures recorded.</p>
              )}
            </ul>
          </motion.div>
        </motion.section>
      </main>

      <Footer />
    </div>
  );
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "Present":
      return "text-green-600";
    case "Absent":
      return "text-red-600";
    case "Late":
      return "text-yellow-600";
    default:
      return "text-gray-600";
  }
};

export default MeetingDetails;
