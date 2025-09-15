import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import heroIllustration from "../../assets/abstract-php-c-analytics.jpg"; 
import { useTheme } from "../../ThemeContext";

const HeroSection: React.FC = () => {
  const { theme } = useTheme();

  const activityData = [
    { title: "Workshops & Training", desc: "Enhance your coding, AI, and design skills through hands-on sessions." },
    { title: "Innovation Projects", desc: "Collaborate on real-world projects that solve community challenges." },
    { title: "Competitions & Hackathons", desc: "Participate in coding contests and showcase your technical talent." },
    { title: "Networking & Mentorship", desc: "Connect with tech professionals, alumni, and like-minded peers." },
  ];

  return (
    <section
      className="py-16"
      style={{ backgroundColor: theme["base-100"], color: theme["base-content"] }}
    >
      <div className="container mx-auto px-6 lg:px-20 flex flex-col-reverse lg:flex-row items-center gap-12">

        {/* Text Content */}
        <motion.div
          className="flex-1 text-center lg:text-left"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1
            className="text-4xl lg:text-5xl font-bold mb-4"
            style={{ color: theme.primary }}
          >
            Join the Computing & Innovation Society
          </h1>
          
          {/* Club Motto */}
          <h2
            className="text-2xl lg:text-3xl font-semibold mb-6 italic"
            style={{ color: theme.secondary }}
          >
            "Connecting Minds, Creating Solutions"
          </h2>

          <p
            className="text-lg lg:text-xl mb-8"
            style={{ color: theme["base-content"] }}
          >
            At the Computing and Innovation Society of Laikipia University, we nurture creativity and technical skills in students. 
            Engage in tech workshops, coding competitions, innovation challenges, and collaborative projects that empower you to shape the future.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 mb-10">
            <Link
              to="/register"
              className="px-6 py-3 text-lg font-semibold rounded-lg transition hover:brightness-90"
              style={{ backgroundColor: theme.primary, color: theme["base-100"] }}
            >
              Become a Member
            </Link>
            <Link
              to="/about"
              className="px-6 py-3 text-lg font-semibold rounded-lg border transition hover:bg-base-200"
              style={{ 
                color: theme.primary, 
                borderColor: theme.primary, 
                backgroundColor: "transparent" 
              }}
            >
              Learn More
            </Link>
          </div>

          {/* Key Activities / Features */}
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center lg:text-left"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { 
                transition: { staggerChildren: 0.15 } 
              }
            }}
          >
            {activityData.map((activity, idx) => (
              <motion.div
                key={idx}
                className="p-4 rounded-xl shadow-md transition hover:shadow-lg"
                style={{ backgroundColor: theme["base-200"], color: theme["base-content"] }}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
                }}
              >
                <h3 className="font-bold text-lg mb-1" style={{ color: theme.primary }}>
                  {activity.title}
                </h3>
                <p className="text-sm" style={{ color: theme["base-content"] }}>
                  {activity.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Illustration */}
        <motion.div
          className="flex-1 flex justify-center lg:justify-end"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src={heroIllustration}
            alt="Computing and Innovation Society Illustration"
            className="w-full max-w-md rounded-lg shadow-lg"
            style={{
              border: `2px solid ${theme["base-300"]}`,
              backgroundColor: theme["base-100"],
            }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
