import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useGetAllMeetingsQuery } from "../../Features/Apis/meetingApis";
import { useTheme } from "../../ThemeContext";

const features = [
  { icon: "📄", title: "Browse Meetings", desc: "Access all official meetings quickly." },
  { icon: "🔍", title: "Search Topics", desc: "Find meetings by topic, date, or attendee." },
  { icon: "⬇️", title: "Download PDFs", desc: "Save meeting details for reference or offline use." },
];

const LandingPage: React.FC = () => {
  const { theme } = useTheme();
  const { data: meetings, isLoading, isError } = useGetAllMeetingsQuery(undefined);

  const latestMeetings = meetings
    ? [...meetings].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 3)
    : [];

  const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

  return (
    <div className="font-sans" style={{ backgroundColor: theme["base-100"], color: theme["base-content"] }}>

      {/* Hero Section */}
      <motion.section
        className="py-10 px-4 text-center sm:py-12 sm:px-6 lg:px-20"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
      >
        <motion.h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4" style={{ color: theme.primary }} variants={fadeUp}>
          Access Official Meetings
        </motion.h1>
        <motion.p className="text-base sm:text-lg lg:text-xl mb-6 sm:mb-8" style={{ color: theme.secondary }} variants={fadeUp}>
          Browse, search, and download meeting details recorded by the Secretary General.
        </motion.p>
        <motion.div variants={fadeUp}>
          <Link
            to="/meetings"
            className="px-4 py-2 sm:px-6 sm:py-3 text-base sm:text-lg font-semibold rounded-lg transition hover:brightness-90"
            style={{ backgroundColor: theme.primary, color: theme["base-100"] }}
          >
            View Latest Meetings
          </Link>
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <section className="py-8 px-4 sm:py-10 sm:px-6 text-center">
        <motion.h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8" style={{ color: theme.primary }} initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 0.8 } }}>
          Key Features
        </motion.h2>
        <motion.div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6" initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.2 } } }}>
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              className="p-4 rounded-xl shadow-md w-full sm:w-64 transition hover:shadow-lg cursor-pointer"
              style={{ backgroundColor: theme["base-200"], color: theme["base-content"] }}
              variants={fadeUp}
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-3xl sm:text-4xl mb-2">{feature.icon}</div>
              <h3 className="text-lg sm:text-xl font-semibold mb-1" style={{ color: theme.primary }}>{feature.title}</h3>
              <p className="text-sm sm:text-base" style={{ color: theme["base-content"] }}>{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* How It Works Section */}
      <section className="py-8 px-4 sm:py-10 sm:px-6 text-center">
        <motion.h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8" style={{ color: theme.primary }} initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 0.8 } }}>
          How It Works
        </motion.h2>
        <motion.div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-5 flex-wrap" initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.15 } } }}>
          {[
            "Browse or search meetings by date or attendee.",
            "Click to view full meeting details and discussions.",
            "Download or save meeting details for future reference."
          ].map((step, idx) => (
            <motion.div
              key={idx}
              className="p-3 sm:p-4 w-full sm:w-64 rounded-xl border transition hover:shadow-md cursor-pointer"
              style={{ borderColor: theme["base-300"], backgroundColor: theme["base-200"], color: theme["base-content"] }}
              variants={fadeUp}
              whileHover={{ scale: 1.03 }}
            >
              <div className="text-xl sm:text-2xl font-bold mb-1" style={{ color: theme.primary }}>Step {idx + 1}</div>
              <p className="text-sm sm:text-base">{step}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Latest Meetings Preview */}
      <section className="py-8 px-4 sm:py-10 sm:px-6 text-center">
        <motion.h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8" style={{ color: theme.primary }} initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 0.8 } }}>
          Latest Meetings
        </motion.h2>

        {isLoading && <p style={{ color: theme.secondary }}>Loading meetings...</p>}
        {isError && <p className="text-red-500">Error fetching meetings.</p>}

        <motion.div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 flex-wrap" initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.2 } } }}>
          {latestMeetings.map((meeting) => (
            <motion.div
              key={meeting.id}
              className="p-3 sm:p-4 rounded-xl shadow-md w-full sm:w-72 flex flex-col gap-2 transition hover:shadow-lg cursor-pointer"
              style={{ backgroundColor: theme["base-200"], color: theme["base-content"] }}
              variants={fadeUp}
              whileHover={{ scale: 1.03 }}
            >
              <h3 className="text-lg sm:text-xl font-semibold mb-1" style={{ color: theme.primary }}>{meeting.title}</h3>
              <p className="mb-2 sm:mb-3 text-sm sm:text-base" style={{ color: theme.secondary }}>
                {new Date(meeting.date).toLocaleDateString()}
              </p>

              <Link
                to={`/meetings/${meeting.id}`}
                className="w-full py-1.5 sm:py-2 text-sm sm:text-base rounded-lg border border-primary text-primary transition hover:bg-primary hover:text-base-100 text-center"
                style={{ backgroundColor: "transparent" }}
              >
                View Details
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Call to Action */}
      <motion.section className="py-8 px-4 sm:py-10 sm:px-6 text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { duration: 0.8 } }}>
        <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4" style={{ color: theme.primary }}>Stay Informed</h2>
        <p className="mb-3 sm:mb-4 text-sm sm:text-base" style={{ color: theme.secondary }}>
          Get quick access to the latest meetings anytime.
        </p>
        <Link
          to="/meetings"
          className="px-4 py-2 sm:px-6 sm:py-3 text-base sm:text-lg font-semibold rounded-lg transition hover:brightness-90"
          style={{ backgroundColor: theme.primary, color: theme["base-100"] }}
        >
          View All Meetings
        </Link>
      </motion.section>

    </div>
  );
};

export default LandingPage;
