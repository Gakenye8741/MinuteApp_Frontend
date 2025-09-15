import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTheme } from "../ThemeContext";
import { Navbar } from "../Components/Navbar";
import Footer from "../Components/Footer";
import PuffLoader from "react-spinners/PuffLoader";
import { Calendar, FileText, UserCheck, Book } from "lucide-react";

// API hooks
import { useGetAllMeetingsQuery } from "../Features/Apis/meetingApis";
import { useGetAllAttendeesQuery } from "../Features/Apis/AttendeesApi";
import { useGetTopicsByMeetingIdQuery } from "../Features/Apis/Topics.Api";
import { useGetSignaturesByMeetingIdQuery } from "../Features/Apis/SignaturesApi";

const MeetingDetailsPage: React.FC = () => {
  const { theme } = useTheme();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Fetch meeting
  const { data: meetings, isLoading: meetingLoading, isError: meetingError } =
    useGetAllMeetingsQuery({});
  const meeting = meetings?.find((m: any) => m.id === Number(id));

  // Fetch attendees, topics, signatures
  const { data: attendees, isLoading: attendeesLoading } = useGetAllAttendeesQuery(id);
  const { data: topics, isLoading: topicsLoading } = useGetTopicsByMeetingIdQuery(id!);
  const { data: signatures, isLoading: signaturesLoading } = useGetSignaturesByMeetingIdQuery(Number(id));

  // Loading state
  if (meetingLoading || attendeesLoading || topicsLoading || signaturesLoading) {
    return (
      <div className="flex justify-center items-center h-screen" style={{ backgroundColor: theme["base-100"] }}>
        <PuffLoader color={theme.primary} size={80} />
      </div>
    );
  }

  // Error state
  if (meetingError || !meeting) {
    return (
      <div
        className="flex justify-center items-center h-screen text-center"
        style={{ color: theme.error, backgroundColor: theme["base-100"] }}
      >
        <p>Meeting not found or an error occurred.</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div
        className="min-h-screen pt-[5rem] lg:pt-[6rem] pb-[4.5rem] lg:pb-0 px-4 sm:px-6 lg:px-20"
        style={{ backgroundColor: theme["base-100"], color: theme["base-content"] }}
      >
        {/* Meeting Header */}
        <div className="mb-8">
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 flex items-center gap-2"
            style={{ color: theme.primary }}
          >
            <FileText className="w-6 h-6" style={{ color: theme.primary }} /> {meeting.title}
          </h1>
          <p className="flex items-center gap-2 mb-2" style={{ color: theme["base-content"] + "CC" }}>
            <Calendar className="w-5 h-5" style={{ color: theme["base-content"] + "80" }} /> {new Date(meeting.date).toLocaleString()}
          </p>
          {meeting.description && (
            <p style={{ color: theme["base-content"] + "B3" }}>{meeting.description}</p>
          )}
        </div>

        {/* Attendees */}
        <section className="mb-6">
          <h2
            className="text-xl font-bold mb-2 flex items-center gap-2"
            style={{ color: theme.primary }}
          >
            <UserCheck className="w-5 h-5" style={{ color: theme.primary }} /> Attendees
          </h2>
          {attendees && attendees.length > 0 ? (
            <ul className="space-y-2">
              {attendees.map((a: any) => (
                <li
                  key={a.id}
                  className="p-2 rounded-lg border shadow-sm"
                  style={{
                    backgroundColor: theme["base-200"],
                    borderColor: theme["base-300"],
                    color: theme["base-content"],
                  }}
                >
                  {a.name} - {a.email} ({a.status})
                </li>
              ))}
            </ul>
          ) : (
            <p style={{ color: theme["base-content"] + "80" }}>No attendees found.</p>
          )}
        </section>

        {/* Topics */}
        <section className="mb-6">
          <h2
            className="text-xl font-bold mb-2 flex items-center gap-2"
            style={{ color: theme.primary }}
          >
            <Book className="w-5 h-5" style={{ color: theme.primary }} /> Topics
          </h2>
          {topics && topics.length > 0 ? (
            <ul className="space-y-2 list-decimal pl-5">
              {topics.map((t: any) => (
                <li
                  key={t.id}
                  className="p-2 rounded-lg border shadow-sm"
                  style={{
                    backgroundColor: theme["base-200"],
                    borderColor: theme["base-300"],
                    color: theme["base-content"],
                  }}
                >
                  {t.title}
                </li>
              ))}
            </ul>
          ) : (
            <p style={{ color: theme["base-content"] + "80" }}>No topics found.</p>
          )}
        </section>

        {/* Signatures */}
        <section className="mb-6">
          <h2
            className="text-xl font-bold mb-2 flex items-center gap-2"
            style={{ color: theme.primary }}
          >
            <FileText className="w-5 h-5" style={{ color: theme.primary }} /> Signatures
          </h2>
          {signatures && signatures.length > 0 ? (
            <ul className="space-y-2">
              {signatures.map((s: any) => (
                <li
                  key={s.id}
                  className="p-2 rounded-lg border shadow-sm"
                  style={{
                    backgroundColor: theme["base-200"],
                    borderColor: theme["base-300"],
                    color: theme["base-content"],
                  }}
                >
                  {s.signedBy} ({s.role})
                </li>
              ))}
            </ul>
          ) : (
            <p style={{ color: theme["base-content"] + "80" }}>No signatures found.</p>
          )}
        </section>

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mt-4 btn btn-outline"
          style={{
            borderColor: theme.primary,
            color: theme.primary,
            backgroundColor: theme["base-100"],
          }}
        >
          Go Back
        </button>
      </div>
      <Footer />
    </>
  );
};

export default MeetingDetailsPage;
