import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import heroImage from "../assets/computer-laptop-macbook-coding.jpg";
import Footer from "../Components/Footer";
import { Navbar } from "../Components/Navbar";
import { useTheme } from "../ThemeContext";

// Leadership data
const keyLeaders = [
  { name: "Caleb Ogeto", role: "Chairperson", course: "Software Engineering", image: "/images/caleb.jpg" },
  { name: "Gakenye Ndiritu", role: "Secretary General", course: "Information Systems", image: "/images/gakenye.jpg" },
  { name: "Miuli Muthui", role: "Treasurer", course: "Information Technology", image: "/images/miuli.jpg" },
];

// Activities data
const activities = [
  { title: "Workshops & Training", desc: "Enhance coding, AI, and design skills through hands-on sessions." },
  { title: "Hackathons & Competitions", desc: "Participate in coding contests and showcase your technical talent." },
  { title: "Innovation Projects", desc: "Collaborate on real-world projects that solve community challenges." },
  { title: "Networking & Mentorship", desc: "Connect with tech professionals, alumni, and like-minded peers." },
];

const AboutPage: React.FC = () => {
  const { theme } = useTheme();

  return (
    <>
      <Navbar />
      <div
        className="font-sans pt-[4.5rem] lg:pt-[5rem] pb-[4.5rem] lg:pb-0"
        style={{ backgroundColor: theme["base-100"], color: theme["base-content"] }}
      >
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="py-12 px-4 sm:py-16 sm:px-6 lg:px-20 flex flex-col-reverse lg:flex-row items-center gap-10"
        >
          <motion.div
            className="flex-1 text-center lg:text-left"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4"
              style={{ color: theme.primary }}
            >
              Computing and Innovation Society of Laikipia University (CISLU)
            </h1>
            <p
              className="text-base sm:text-lg lg:text-xl mb-4 sm:mb-6 italic font-semibold"
              style={{ color: theme.secondary }}
            >
              "Connecting minds, creating solutions"
            </p>
            <Link
              to="/register"
              className="btn px-4 py-2 sm:px-6 sm:py-3 text-base sm:text-lg font-semibold"
              style={{ backgroundColor: theme.primary, color: theme["base-100"] }}
            >
              Become a Member
            </Link>
          </motion.div>
          <motion.div
            className="flex-1 flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <img
              src={heroImage}
              alt="Computing & Innovation Society"
              className="w-full max-w-md rounded-lg shadow-lg"
              style={{ borderColor: theme["base-300"] }}
            />
          </motion.div>
        </motion.section>

        {/* Mission & Vision */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="py-10 px-4 sm:py-12 sm:px-6 lg:px-20 text-center"
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8" style={{ color: theme.primary }}>
            Vision & Mission
          </h2>
          <p className="mb-4 text-sm sm:text-base" style={{ color: theme["base-content"] }}>
            <strong>Vision:</strong> To nurture and transform students into innovative technology leaders who will shape and impact the world through computing.
          </p>
          <p className="text-sm sm:text-base" style={{ color: theme["base-content"] }}>
            <strong>Mission:</strong> To contribute to the world by fostering excellence in computer science and technology through education, research, training, innovation, consultancy, and collaborative efforts within and beyond the university community.
          </p>
        </motion.section>

        {/* Leadership Section */}
        <section className="py-10 px-4 sm:py-12 sm:px-6 lg:px-20 text-center">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8"
            style={{ color: theme.primary }}
          >
            Leadership Team
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center">
            {keyLeaders.map((leader, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
                viewport={{ once: true }}
                className="p-4 rounded-xl shadow-md flex flex-col items-center"
                style={{
                  backgroundColor: theme["base-200"],
                  color: theme["base-content"],
                  borderColor: theme["base-300"],
                }}
              >
                <img src={leader.image} alt={leader.name} className="w-24 h-24 rounded-full object-cover mb-4" />
                <h3 className="text-lg sm:text-xl font-semibold mb-1" style={{ color: theme.primary }}>
                  {leader.name}
                </h3>
                <p className="text-sm mb-1" style={{ color: theme.secondary }}>
                  {leader.role}
                </p>
                <p className="text-sm" style={{ color: theme.secondary }}>
                  {leader.course}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Activities Section */}
        <section className="py-10 px-4 sm:py-12 sm:px-6 lg:px-20 text-center">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8"
            style={{ color: theme.primary }}
          >
            What We Do
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {activities.map((activity, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="p-4 rounded-xl shadow-md"
                style={{
                  backgroundColor: theme["base-200"],
                  color: theme["base-content"],
                  borderColor: theme["base-300"],
                }}
              >
                <h3 className="text-lg sm:text-xl font-semibold mb-1" style={{ color: theme.primary }}>
                  {activity.title}
                </h3>
                <p className="text-sm sm:text-base" style={{ color: theme.secondary }}>
                  {activity.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Purpose */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="py-10 px-4 sm:py-12 sm:px-6 lg:px-20 text-center"
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8" style={{ color: theme.primary }}>
            Purpose of This App
          </h2>
          <p className="text-sm sm:text-base max-w-3xl mx-auto" style={{ color: theme["base-content"] }}>
            This application allows members and students to easily access official meeting minutes posted by the Secretary General. 
            It ensures transparency, provides a central archive of records, and makes it easy to reference past discussions and decisions.
          </p>
        </motion.section>

        {/* Call to Action */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="py-10 px-4 sm:py-12 sm:px-6 lg:px-20 text-center"
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6" style={{ color: theme.primary }}>
            Join Us
          </h2>
          <p className="text-sm sm:text-base mb-4 sm:mb-6" style={{ color: theme["base-content"] }}>
            Be part of our growing community of innovators and tech enthusiasts.
          </p>
          <Link
            to="/register"
            className="btn px-4 py-2 sm:px-6 sm:py-3 text-base sm:text-lg font-semibold"
            style={{ backgroundColor: theme.primary, color: theme["base-100"] }}
          >
            Become a Member
          </Link>
        </motion.section>

        <Footer />
      </div>
    </>
  );
};

export default AboutPage;
