import Footer from "../Components/Footer";
import { Navbar } from "../Components/Navbar";
import HeroSection from "../Page Contents/Home/Hero";
import LandingPage from "../Page Contents/Home/LandingPage";

export const Home = () => {
  return (
    <>
      <Navbar />
      <div className="pt-[4.5rem] lg:pt-[5rem] pb-[4.5rem] lg:pb-0">
        <HeroSection />
        <LandingPage />
      </div>
      <Footer />
    </>
  );
};
