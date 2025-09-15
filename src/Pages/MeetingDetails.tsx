import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTheme } from "../ThemeContext";
import { Navbar } from "../Components/Navbar";
import Footer from "../Components/Footer";
import PuffLoader from "react-spinners/PuffLoader";
import { Calendar, FileText, UserCheck, Book, ChevronDown, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// API hooks
import { useGetAllMeetingsQuery } from "../Features/Apis/meetingApis";
import { useGetAllAttendeesQuery } from "../Features/Apis/AttendeesApi";
import { useGetTopicsByMeetingIdQuery } from "../Features/Apis/Topics.Api";
import { useGetSignaturesByMeetingIdQuery } from "../Features/Apis/SignaturesApi";

const MeetingDetailsPage: React.FC = () => {
  const { theme } = useTheme();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [openTopics, setOpenTopics] = useState<Set<number>>(new Set());

  const { data: meetings, isLoading: meetingLoading, isError: meetingError } = useGetAllMeetingsQuery({});
  const meeting = meetings?.find((m: any) => m.id === Number(id));

  const { data: attendees, isLoading: attendeesLoading } = useGetAllAttendeesQuery(id);
  const { data: topics, isLoading: topicsLoading } = useGetTopicsByMeetingIdQuery(id!);
  const { data: signatures, isLoading: signaturesLoading } = useGetSignaturesByMeetingIdQuery(Number(id));

  if (meetingLoading || attendeesLoading || topicsLoading || signaturesLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <PuffLoader color={theme.primary} size={80} />
      </div>
    );
  }

  if (meetingError || !meeting) {
    return (
      <div className="flex justify-center items-center h-screen text-center" style={{ color: theme.error }}>
        <p>Meeting not found or an error occurred.</p>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "present":
        return theme.secondary;
      case "late":
        return theme.accent;
      case "absent":
        return theme["neutral"];
      default:
        return theme["base-content"];
    }
  };

  const toggleTopic = (id: number) => {
    const newSet = new Set(openTopics);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setOpenTopics(newSet);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-[5rem] lg:pt-[6rem] pb-[4.5rem] lg:pb-0 px-4 sm:px-6 lg:px-20" style={{ backgroundColor: theme["base-100"], color: theme["base-content"] }}>
        
        {/* Go Back Button */}
        <motion.button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 btn btn-outline"
          style={{ borderColor: theme.primary, color: theme.primary }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft className="w-4 h-4" /> Go Back
        </motion.button>

        {/* Meeting Header */}
        <motion.div className="mb-8" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 flex items-center gap-2" style={{ color: theme.primary }}>
            <FileText className="w-6 h-6" /> {meeting.title}
          </h1>
          <p className="flex items-center gap-2 mb-2" style={{ color: theme["base-content"] + "CC" }}>
            <Calendar className="w-5 h-5" /> {new Date(meeting.date).toLocaleString()}
          </p>
          {meeting.description && <p style={{ color: theme["base-content"] + "AA" }}>{meeting.description}</p>}
        </motion.div>

        {/* Attendees */}
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-2 flex items-center gap-2" style={{ color: theme.primary }}>
            <UserCheck className="w-5 h-5" /> Attendees
          </h2>
          {attendees && attendees.length > 0 ? (
            <motion.ul
              className="list-disc pl-5 space-y-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {attendees.map((a: any) => (
                <motion.li
                  key={a.id}
                  style={{ color: getStatusColor(a.status), backgroundColor: theme["base-200"], padding: "4px 8px", borderRadius: "4px" }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * a.id }}
                >
                  {a.name} - {a.email} ({a.status})
                </motion.li>
              ))}
            </motion.ul>
          ) : (
            <p style={{ color: theme["base-content"] + "88" }}>No attendees found.</p>
          )}
        </section>

        {/* Topics with Framer Motion */}
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-2 flex items-center gap-2" style={{ color: theme.primary }}>
            <Book className="w-5 h-5" /> Topics
          </h2>
          {topics && topics.length > 0 ? (
            <div className="space-y-2">
              {topics.map((t: any) => {
                const isOpen = openTopics.has(t.id);
                return (
                  <motion.div
                    key={t.id}
                    className="border rounded-lg shadow-sm overflow-hidden"
                    style={{ borderColor: theme["base-300"], backgroundColor: theme["base-200"] }}
                    layout
                  >
                    <motion.button
                      onClick={() => toggleTopic(t.id)}
                      className="w-full px-4 py-2 flex justify-between items-center font-semibold"
                      style={{ color: theme["base-content"] }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      {t.subject}
                      <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.4 }}>
                        <ChevronDown className="w-4 h-4" />
                      </motion.span>
                    </motion.button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4 }}
                          className="px-4 py-2 space-y-1 text-sm"
                          style={{ color: theme["base-content"] }}
                        >
                          <p><strong>Notes:</strong> {t.notes}</p>
                          <p><strong>Decisions:</strong> {t.decisions}</p>
                          <p><strong>Actions:</strong> {t.actions}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <p style={{ color: theme["base-content"] + "88" }}>No topics found.</p>
          )}
        </section>

        {/* Signatures */}
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-2 flex items-center gap-2" style={{ color: theme.primary }}>
            <FileText className="w-5 h-5" /> Signatures
          </h2>
          {signatures && signatures.length > 0 ? (
            <motion.ul
              className="list-disc pl-5 space-y-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {signatures.map((s: any) => (
                <motion.li
                  key={s.id}
                  style={{ color: theme["base-content"] }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * s.id }}
                >
                  Signed By: <span style={{ fontWeight: 600 }}>{s.user.fullName}</span> on {new Date(s.signedAt).toLocaleString()} ({s.role})
                </motion.li>
              ))}
            </motion.ul>
          ) : (
            <p style={{ color: theme["base-content"] + "88" }}>No signatures found.</p>
          )}
        </section>
      </div>
      <Footer />
    </>
  );
};

export default MeetingDetailsPage;
