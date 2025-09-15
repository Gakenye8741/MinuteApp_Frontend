import React from "react";
import { Link } from "react-router-dom";
import heroIllustration from "../../assets/abstract-php-c-analytics.jpg"; // Replace with a more relevant club image if available

const HeroSection: React.FC = () => {
  return (
    <section className="bg-base-100 py-16">
      <div className="container mx-auto px-6 lg:px-20 flex flex-col-reverse lg:flex-row items-center gap-12">

        {/* Text Content */}
        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-4xl lg:text-5xl font-bold text-primary mb-4">
            Join the Computing & Innovation Society
          </h1>
          
          {/* Club Motto */}
          <h2 className="text-2xl lg:text-3xl font-semibold text-secondary mb-6 italic">
            "Connecting Minds, Creating Solutions"
          </h2>

          <p className="text-lg lg:text-xl text-gray-700 mb-8">
            At the Computing and Innovation Society of Laikipia University, we nurture creativity and technical skills in students. 
            Engage in tech workshops, coding competitions, innovation challenges, and collaborative projects that empower you to shape the future.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
            <Link
              to="/register"
              className="btn btn-primary px-6 py-3 text-lg font-semibold"
            >
              Become a Member
            </Link>
            <Link
              to="/about"
              className="btn btn-outline px-6 py-3 text-lg font-semibold"
            >
              Learn More
            </Link>
          </div>

          {/* Key Activities / Features */}
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center lg:text-left">
            <div>
              <h3 className="font-bold text-lg">Workshops & Training</h3>
              <p className="text-gray-600 text-sm">Enhance your coding, AI, and design skills through hands-on sessions.</p>
            </div>
            <div>
              <h3 className="font-bold text-lg">Innovation Projects</h3>
              <p className="text-gray-600 text-sm">Collaborate on real-world projects that solve community challenges.</p>
            </div>
            <div>
              <h3 className="font-bold text-lg">Competitions & Hackathons</h3>
              <p className="text-gray-600 text-sm">Participate in coding contests and showcase your technical talent.</p>
            </div>
            <div>
              <h3 className="font-bold text-lg">Networking & Mentorship</h3>
              <p className="text-gray-600 text-sm">Connect with tech professionals, alumni, and like-minded peers.</p>
            </div>
          </div>
        </div>

        {/* Illustration */}
        <div className="flex-1 flex justify-center lg:justify-end">
          <img
            src={heroIllustration}
            alt="Computing and Innovation Society Illustration"
            className="w-full max-w-md rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
