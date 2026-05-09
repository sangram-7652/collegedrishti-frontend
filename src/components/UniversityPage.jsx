

import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import Header from "../pages/Header";
import UniversityHighlight from "../pages/UniversityHighlight";
import InfoWithPodcast from "../pages/InfoWithPodcast";

// import Podcast from "../pages/Podcast";
import AboutUniversity from "../pages/AboutUniversity";
import UniversityFee from "../pages/UniversityFee";
import AdvantageSection from "../pages/AdvantageSection";
import Section7 from "../pages/Section7";
import Section8 from "../pages/Section8";
import Section9 from "../pages/Section9";
import Section10 from "../pages/Section10";
import Section11 from "../pages/Section11";
import CTASection from "../pages/CTASection";
import FAQSection from "../pages/FAQSection";
import Footer from "./Footer";
import MobileFooterNav from './MobileFooterNav';
import MobileMenu from "../pages/MobileMenu";
import api from '../api/axios';



const UniversityPage = () => {
  const { slug } = useParams();
  const [universityData, setUniversityData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);


  useEffect(() => {
  if (!slug) return;

  const fetchData = async () => {
    try {
      const res = await api.get(`/university-page/${slug}`);

      if (res.data.success) {
        setUniversityData(res.data.data);
      } else {    
        setUniversityData({});
      }

    } catch (err) {
      console.error("API error:", err);

      // silent fail
      setUniversityData({});
    }
  };

  fetchData();
}, [slug]);


  return (
    <div className="w-full font-sans overflow-x-hidden bg-white text-black min-h-screen animate-fadeIn">
      {/* Header */}
      <div className="hidden md:block">
        <Header />
      </div>

      <div className="block md:hidden">
        <MobileMenu />
      </div>

      {/* ✅ ABOUT */}
      <div id="about" className="scroll-mt-24">
        <UniversityHighlight data={universityData} />
      </div>

      {/* ✅ NAVIGATION */}
      <InfoWithPodcast className="bg-white" data={universityData?.university} />

      {/* ✅ ABOUT DETAILS */}
      <div id="courses" className="scroll-mt-24">
        <AboutUniversity className="bg-white" data={universityData} />
      </div>

      {/* ✅ FEES */}
      <div id="fees" className="scroll-mt-24">
        <UniversityFee className="bg-white" universityId={universityData?.university?.id} />
      </div>

      {/* ✅ PLACEMENTS */}
      <AdvantageSection className="bg-white" data={universityData} />

      {/* ✅ REVIEWS */}
      <div id="reviews" className="scroll-mt-24">
        <Section7 className="bg-white" data={universityData} />
      </div>

      {/* ✅ ADMISSIONS */}
      <div id="admissions" className="scroll-mt-24">
        <Section8 className="bg-white" data={universityData} />
      </div>

      {/* ✅ APPROVALS */}
      <div id="approvals" className="scroll-mt-24">
        <Section9 data={universityData} />
      </div>

      <Section10 className="bg-white" data={universityData} />
      <Section11 className="bg-white" data={universityData} />
      <div id="placements" className="scroll-mt-24">
        <CTASection className="bg-white" data={universityData} />
      </div>

      <FAQSection className="bg-white" universityId={universityData?.university?.id} />

      <Footer />
      <MobileFooterNav />

    </div>
  );
};

export default UniversityPage;

