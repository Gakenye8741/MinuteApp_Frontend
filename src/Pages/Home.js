import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Navbar } from "../Components/Navbar";
import Footer from "../Components/Footer";
import HeroSection from "../Page Contents/Home/Hero";
import LandingPage from "../Page Contents/Home/LandingPage";
import { motion } from "framer-motion";
export const Home = () => {
    return (_jsxs(_Fragment, { children: [_jsx(Navbar, {}), _jsxs("div", { className: "pt-[4.5rem] lg:pt-[0rem] pb-[4.5rem] lg:pb-0", children: [_jsx(motion.div, { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8 }, children: _jsx(HeroSection, {}) }), _jsx(motion.div, { initial: "hidden", animate: "visible", variants: {
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2, duration: 0.8 } },
                        }, children: _jsx(LandingPage, {}) })] }), _jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 0.5, duration: 0.8 }, children: _jsx(Footer, {}) })] }));
};
