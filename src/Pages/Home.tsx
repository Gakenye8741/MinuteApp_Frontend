import React from "react";
import { Navbar } from "../Components/Navbar";
import Footer from "../Components/Footer";
import HeroSection from "../Page Contents/Home/Hero";
import LandingPage from "../Page Contents/Home/LandingPage";
import { motion } from "framer-motion";

export const Home = () => {
  return (
    <>
      <Navbar />
      <div className="pt-[4.5rem] lg:pt-[0rem] pb-[4.5rem] lg:pb-0">
        
        {/* Hero Section with animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <HeroSection />
        </motion.div>

        {/* Landing Page Section with staggered fade-in */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2, duration: 0.8 } },
          }}
        >
          <LandingPage />
        </motion.div>
      </div>

      {/* Footer with subtle fade-in */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <Footer />
      </motion.div>
    </>
  );
};
