import Footer from "../Components/Footer"
import { Navbar } from "../Components/Navbar"
import HeroSection from "../Page Contents/Home/Hero"
import LandingPage from "../Page Contents/Home/LandingPage"


export const Home = () => {
  return (
   <>
    <Navbar/>
    <HeroSection />
    <LandingPage />
    <Footer />
   </>
  )
}
