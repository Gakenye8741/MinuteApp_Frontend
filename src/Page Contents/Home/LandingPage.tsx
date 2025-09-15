import React from "react";
import { Link } from "react-router-dom";

const features = [
  { icon: "📄", title: "Browse Minutes", desc: "Access all official meeting minutes quickly." },
  { icon: "🔍", title: "Search Topics", desc: "Find minutes by topic, date, or meeting." },
  { icon: "⬇️", title: "Download PDFs", desc: "Save minutes for reference or offline use." },
];

const latestMinutes = [
  { id: 1, title: "Board Meeting - July 2025", date: "2025-07-10" },
  { id: 2, title: "Executive Committee - June 2025", date: "2025-06-15" },
  { id: 3, title: "Annual Review - May 2025", date: "2025-05-20" },
];

const LandingPage: React.FC = () => {
  return (
    <div className="font-sans bg-base-100">

      {/* Hero Section */}
      <section className="py-10 px-4 text-center sm:py-12 sm:px-6 lg:px-20">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-3 sm:mb-4">
          Access Official Meeting Minutes
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-secondary mb-6 sm:mb-8">
          Browse, search, and download minutes recorded by the Secretary General.
        </p>
        <Link
          to="/minutes"
          className="btn btn-primary px-4 py-2 sm:px-6 sm:py-3 text-base sm:text-lg font-semibold"
        >
          View Latest Minutes
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
            "Browse or search the minutes by date or meeting.",
            "Click to view full meeting details and discussions.",
            "Download or save minutes for future reference."
          ].map((step, idx) => (
            <div key={idx} className="p-3 sm:p-4 w-full sm:w-64 border border-base-300 rounded-xl">
              <div className="text-xl sm:text-2xl font-bold mb-1 text-primary">Step {idx + 1}</div>
              <p className="text-secondary text-sm sm:text-base">{step}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Latest Minutes Preview */}
      <section className="py-8 px-4 sm:py-10 sm:px-6 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-6 sm:mb-8">Latest Minutes</h2>
        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 flex-wrap">
          {latestMinutes.map((minute) => (
            <div key={minute.id} className="bg-base-200 p-3 sm:p-4 rounded-xl shadow-md w-full sm:w-72">
              <h3 className="text-lg sm:text-xl font-semibold mb-1 text-primary">{minute.title}</h3>
              <p className="text-secondary mb-2 sm:mb-3 text-sm sm:text-base">{minute.date}</p>
              <Link
                to={`/minutes/${minute.id}`}
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
          Get quick access to the latest minutes anytime.
        </p>
        <Link
          to="/minutes"
          className="btn btn-primary px-4 py-2 sm:px-6 sm:py-3 text-base sm:text-lg font-semibold"
        >
          View All Minutes
        </Link>
      </section>

    </div>
  );
};

export default LandingPage;
