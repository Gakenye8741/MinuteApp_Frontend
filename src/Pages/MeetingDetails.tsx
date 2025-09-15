import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTheme } from "../ThemeContext";
import { Navbar } from "../Components/Navbar";
import Footer from "../Components/Footer";
import PuffLoader from "react-spinners/PuffLoader";
import { Calendar, FileText, UserCheck, Book, ChevronDown, ChevronUp, ArrowLeft } from "lucide-react";

// API hooks
import { useGetAllMeetingsQuery } from "../Features/Apis/meetingApis";
import { useGetAllAttendeesQuery } from "../Features/Apis/AttendeesApi";
import { useGetTopicsByMeetingIdQuery } from "../Features/Apis/Topics.Api";
import { useGetSignaturesByMeetingIdQuery } from "../Features/Apis/SignaturesApi";

const MeetingDetailsPage: React.FC = () => {
  const { theme } = useTheme();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [openTopicIds, setOpenTopicIds] = useState<number[]>([]);

  // Fetch meeting
  const { data: meetings, isLoading: meetingLoading, isError: meetingError } =
    useGetAllMeetingsQuery({});
  const meeting = meetings?.find((m: any) => m.id === Number(id));

  // Fetch attendees, topics, signatures
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
      <div
        className="flex justify-center items-center h-screen text-center"
        style={{ color: theme.error }}
      >
        <p>Meeting not found or an error occurred.</p>
      </div>
    );
  }

  // Helper to get attendee color
  const getAttendeeColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "present":
        return theme.secondary;
      case "late":
        return theme.accent;
      case "absent":
        return theme["base-content"] + "80";
      default:
        return theme["base-content"];
    }
  };

  return (
    <>
      <Navbar />

      {/* Back Button */}
      <div className="px-4 sm:px-6 lg:px-20 pt-[6rem]">
        <button
          onClick={() => navigate(-1)}
          className="btn btn-outline mb-4 flex items-center gap-2"
          style={{ borderColor: theme.primary, color: theme.primary }}
        >
          <ArrowLeft className="w-4 h-4" /> Go Back
        </button>
      </div>

      <div
        className="min-h-screen pb-[4.5rem] lg:pb-0 px-4 sm:px-6 lg:px-20"
        style={{ backgroundColor: theme["base-100"], color: theme["base-content"] }}
      >
        {/* Meeting Header */}
        <div className="mb-8">
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 flex items-center gap-2"
            style={{ color: theme.primary }}
          >
            <FileText className="w-6 h-6" /> {meeting.title}
          </h1>
          <p className="flex items-center gap-2 mb-2">
            <Calendar className="w-5 h-5" /> {new Date(meeting.date).toLocaleString()}
          </p>
          {meeting.description && (
            <p className="text-base-content/80">{meeting.description}</p>
          )}
        </div>

        {/* Attendees */}
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
            <UserCheck className="w-5 h-5" /> Attendees
          </h2>
          {attendees && attendees.length > 0 ? (
            <ul className="list-disc pl-5 space-y-1">
              {attendees.map((a: any) => (
                <li
                  key={a.id}
                  style={{ color: getAttendeeColor(a.status) }}
                >
                  {a.name} - {a.email} ({a.status})
                </li>
              ))}
            </ul>
          ) : (
            <p style={{ color: theme["base-content"] + "88" }}>No attendees found.</p>
          )}
        </section>

        {/* Topics as collapsible dropdown */}
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
            <Book className="w-5 h-5" /> Topics
          </h2>
          {topics && topics.length > 0 ? (
            <div className="space-y-2">
              {topics.map((t: any) => {
                const isOpen = openTopicIds.includes(t.id);
                return (
                  <div
                    key={t.id}
                    className="border rounded-lg shadow-sm overflow-hidden"
                    style={{
                      borderColor: theme["base-300"],
                      backgroundColor: theme["base-200"],
                    }}
                  >
                    <button
                      onClick={() => {
                        if (isOpen) {
                          setOpenTopicIds(openTopicIds.filter((id) => id !== t.id));
                        } else {
                          setOpenTopicIds([...openTopicIds, t.id]);
                        }
                      }}
                      className="w-full px-4 py-2 flex justify-between items-center font-semibold"
                      style={{ color: theme["base-content"] }}
                    >
                      {t.subject}
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="px-4 py-2 space-y-1 text-sm" style={{ color: theme["base-content"] }}>
                        <p><strong>Notes:</strong> {t.notes}</p>
                        <p><strong>Decisions:</strong> {t.decisions}</p>
                        <p><strong>Actions:</strong> {t.actions}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <p style={{ color: theme["base-content"] + "88" }}>No topics found.</p>
          )}
        </section>

        {/* Signatures */}
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
            <FileText className="w-5 h-5" /> Signatures
          </h2>
          {signatures && signatures.length > 0 ? (
            <ul className="list-disc pl-5 space-y-1">
              {signatures.map((s: any) => (
                <li key={s.id} style={{ color: theme["base-content"] }}>
                  Signed By: <span style={{ fontWeight: 600 }}>{s.user.fullName}</span> on{" "}
                  {new Date(s.signedAt).toLocaleString()} ({s.role})
                </li>
              ))}
            </ul>
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
