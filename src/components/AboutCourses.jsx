import React from "react";
import Header from "../pages/Header";
import CourseHero from "../pages/CourseHero";
import Podcast from "../pages/Podcast";
import Section2 from "../pages/Section2";
import Section3 from "../pages/Section3";
import Section4 from "../pages/Section4";
import Section5 from "../pages/Section5";
import Section6 from "../pages/Section6";
import Section7 from "../pages/Section7";
import Section8 from "../pages/Section8";
import Section9 from "../pages/Section9";
import Section10 from "../pages/Section10";
import Section11 from "../pages/Section11";
import CTASection from "../pages/CTASection";
import FAQSection from "../pages/FAQSection";
import Footer from "./Footer";
import MobileFooterNav from "./MobileFooterNav";

const AboutCourses = () => {
  return (
    <div className="w-full font-sans overflow-x-hidden">
      <Header />
      <CourseHero />
      <Podcast />
      <Section2 />
      <Section3 />
      <Section4 />
      <Section5 />
      <Section6 />
      <Section7 />
      <Section8 />
      <Section9 />
      <Section10 />
      <Section11 />
      <CTASection />
      <FAQSection />
      <Footer />
      <MobileFooterNav />
    </div>
  );
};

export default AboutCourses;
