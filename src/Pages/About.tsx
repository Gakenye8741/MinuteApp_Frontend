import React from "react";
import { Link } from "react-router-dom";

import heroImage from "../assets/computer-laptop-macbook-coding.jpg";
import Footer from "../Components/Footer";
import { Navbar } from "../Components/Navbar";

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
  return (
    <>
      <Navbar />
      <div className="font-sans bg-base-100 text-secondary 
                      pt-[4.5rem] lg:pt-[5rem] pb-[4.5rem] lg:pb-0">
        {/* Desktop: padding-top 5rem (navbar height) */}
        {/* Mobile: padding-bottom 4.5rem (bottom navbar height) */}

        {/* Hero Section */}
        <section className="py-12 px-4 sm:py-16 sm:px-6 lg:px-20 flex flex-col-reverse lg:flex-row items-center gap-10">
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-3 sm:mb-4">
              Computing and Innovation Society of Laikipia University (CISLU)
            </h1>
            <p className="text-base sm:text-lg lg:text-xl mb-4 sm:mb-6 italic font-semibold">
              "Connecting minds, creating solutions"
            </p>
            <Link
              to="/register"
              className="btn btn-primary px-4 py-2 sm:px-6 sm:py-3 text-base sm:text-lg font-semibold"
            >
              Become a Member
            </Link>
          </div>
          <div className="flex-1 flex justify-center lg:justify-end">
            <img
              src={heroImage}
              alt="Computing & Innovation Society"
              className="w-full max-w-md rounded-lg shadow-lg"
            />
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-10 px-4 sm:py-12 sm:px-6 lg:px-20 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-6 sm:mb-8">Vision & Mission</h2>
          <p className="mb-4 text-sm sm:text-base">
            <strong>Vision:</strong> To nurture and transform students into innovative technology leaders who will shape and impact the world through computing.
          </p>
          <p className="text-sm sm:text-base">
            <strong>Mission:</strong> To contribute to the world by fostering excellence in computer science and technology through education, research, training, innovation, consultancy, and collaborative efforts within and beyond the university community.
          </p>
        </section>

        {/* Leadership Section */}
        <section className="py-10 px-4 sm:py-12 sm:px-6 lg:px-20 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-6 sm:mb-8">
            Leadership Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center">
            {keyLeaders.map((leader, idx) => (
              <div
                key={idx}
                className="bg-base-200 p-4 rounded-xl shadow-md flex flex-col items-center"
              >
                <img
                  src={leader.image}
                  alt={leader.name}
                  className="w-24 h-24 rounded-full object-cover mb-4"
                />
                <h3 className="text-lg sm:text-xl font-semibold text-primary mb-1">
                  {leader.name}
                </h3>
                <p className="text-secondary text-sm mb-1">{leader.role}</p>
                <p className="text-secondary text-sm">{leader.course}</p>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <a
              href="/leaders"
              className="btn btn-outline btn-primary px-6 py-2 sm:px-8 sm:py-3 text-base sm:text-lg font-semibold"
            >
              More Leaders
            </a>
          </div>
        </section>

        {/* Activities Section */}
        <section className="py-10 px-4 sm:py-12 sm:px-6 lg:px-20 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-6 sm:mb-8">What We Do</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {activities.map((activity, idx) => (
              <div key={idx} className="bg-base-200 p-4 rounded-xl shadow-md">
                <h3 className="text-lg sm:text-xl font-semibold text-primary mb-1">{activity.title}</h3>
                <p className="text-secondary text-sm sm:text-base">{activity.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Purpose of the App */}
        <section className="py-10 px-4 sm:py-12 sm:px-6 lg:px-20 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-6 sm:mb-8">Purpose of This App</h2>
          <p className="text-sm sm:text-base max-w-3xl mx-auto">
            This application allows members and students to easily access official meeting minutes posted by the Secretary General. 
            It ensures transparency, provides a central archive of records, and makes it easy to reference past discussions and decisions.
          </p>
        </section>

        {/* Call to Action */}
        <section className="py-10 px-4 sm:py-12 sm:px-6 lg:px-20 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-4 sm:mb-6">Join Us</h2>
          <p className="text-sm sm:text-base mb-4 sm:mb-6">
            Be part of our growing community of innovators and tech enthusiasts.
          </p>
          <Link
            to="/register"
            className="btn btn-primary px-4 py-2 sm:px-6 sm:py-3 text-base sm:text-lg font-semibold"
          >
            Become a Member
          </Link>
        </section>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default AboutPage;
