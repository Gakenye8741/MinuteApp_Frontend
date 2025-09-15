import React from "react";
import { Link } from "react-router-dom";
import { useGetAllMeetingsQuery } from "../../Features/Apis/meetingApis"; // adjust path if needed

const features = [
  { icon: "📄", title: "Browse Meetings", desc: "Access all official meetings quickly." },
  { icon: "🔍", title: "Search Topics", desc: "Find meetings by topic, date, or attendee." },
  { icon: "⬇️", title: "Download PDFs", desc: "Save meeting details for reference or offline use." },
];

const LandingPage: React.FC = () => {
  const { data: meetings, isLoading, isError } = useGetAllMeetingsQuery(undefined);

  // Take the last 3 meetings, sorted by date descending
  const latestMeetings = meetings
    ? [...meetings].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 3)
    : [];

  return (
    <div className="font-sans bg-base-100">

      {/* Hero Section */}
      <section className="py-10 px-4 text-center sm:py-12 sm:px-6 lg:px-20">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-3 sm:mb-4">
          Access Official Meetings
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-secondary mb-6 sm:mb-8">
          Browse, search, and download meeting details recorded by the Secretary General.
        </p>
        <Link
          to="/meetings"
          className="btn btn-primary px-4 py-2 sm:px-6 sm:py-3 text-base sm:text-lg font-semibold"
        >
          View Latest Meetings
        </Link>
      </section>

      {/* Features Section */}
      <section className="py-8 px-4 sm:py-10 sm:px-6 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-6 sm:mb-8">Key Features</h2>
        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
          {features.map((feature, idx) => (
            <div key={idx} className="bg-base-200 p-4 rounded-xl shadow-md w-full sm:w-64">
              <div className="text-3xl sm:text-4xl mb-2">{feature.icon}</div>
              <h3 className="text-lg sm:text-xl font-semibold mb-1 text-primary">{feature.title}</h3>
              <p className="text-secondary text-sm sm:text-base">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-8 px-4 sm:py-10 sm:px-6 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-6 sm:mb-8">How It Works</h2>
        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-5">
          {[
            "Browse or search meetings by date or attendee.",
            "Click to view full meeting details and discussions.",
            "Download or save meeting details for future reference."
          ].map((step, idx) => (
            <div key={idx} className="p-3 sm:p-4 w-full sm:w-64 border border-base-300 rounded-xl">
              <div className="text-xl sm:text-2xl font-bold mb-1 text-primary">Step {idx + 1}</div>
              <p className="text-secondary text-sm sm:text-base">{step}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Latest Meetings Preview */}
      <section className="py-8 px-4 sm:py-10 sm:px-6 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-6 sm:mb-8">Latest Meetings</h2>

        {isLoading && <p className="text-secondary">Loading meetings...</p>}
        {isError && <p className="text-red-500">Error fetching meetings.</p>}

        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 flex-wrap">
          {latestMeetings.map((meeting) => (
            <div key={meeting.id} className="bg-base-200 p-3 sm:p-4 rounded-xl shadow-md w-full sm:w-72 flex flex-col gap-2">
              <h3 className="text-lg sm:text-xl font-semibold mb-1 text-primary">{meeting.title}</h3>
              <p className="text-secondary mb-2 sm:mb-3 text-sm sm:text-base">
                {new Date(meeting.date).toLocaleDateString()}
              </p>

              <Link
                to={`/meetings/${meeting.id}`}
                className="btn btn-outline btn-primary w-full py-1.5 sm:py-2 text-sm sm:text-base"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-8 px-4 sm:py-10 sm:px-6 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-3 sm:mb-4">Stay Informed</h2>
        <p className="mb-3 sm:mb-4 text-secondary text-sm sm:text-base">
          Get quick access to the latest meetings anytime.
        </p>
        <Link
          to="/meetings"
          className="btn btn-primary px-4 py-2 sm:px-6 sm:py-3 text-base sm:text-lg font-semibold"
        >
          View All Meetings
        </Link>
      </section>

    </div>
  );
};

export default LandingPage;
