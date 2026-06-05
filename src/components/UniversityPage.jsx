// UniversityPage.jsx

import React, { useEffect, useState, lazy, Suspense } from "react";
import { useParams } from "react-router-dom";

import Header from "../pages/Header";
import Footer from "./Footer";
import MobileFooterNav from "./MobileFooterNav";
import MobileMenu from "../pages/MobileMenu";
import SEO from "./SEO";
import api from "../api/axios";


const UniversityHighlight = lazy(() => import("../pages/UniversityHighlight"));
const InfoWithPodcast = lazy(() => import("../pages/InfoWithPodcast"));
const AboutUniversity = lazy(() => import("../pages/AboutUniversity"));
const UniversityFee = lazy(() => import("../pages/UniversityFee"));
const AdvantageSection = lazy(() => import("../pages/AdvantageSection"));
const Section7 = lazy(() => import("../pages/Section7"));
const Section8 = lazy(() => import("../pages/Section8"));
const Section9 = lazy(() => import("../pages/Section9"));
const Section10 = lazy(() => import("../pages/Section10"));
const Section11 = lazy(() => import("../pages/Section11"));
const CTASection = lazy(() => import("../pages/CTASection"));
const FAQSection = lazy(() => import("../pages/FAQSection"));



const UniversityPage = () => {
  const { slug } = useParams();

  const [universityData, setUniversityData] = useState({});
  const [loading, setLoading] = useState(true);

  const university =
    universityData && typeof universityData === "object"
      ? universityData.university ?? universityData
      : {};


  useEffect(() => {
    if (!slug) return;

    const origin =
      typeof window !== "undefined" ? window.location.origin : "";
    const path = `/university/${slug}`;

    if (!loading && !university?.id) {
      document.title = "University not found | College Drishti";
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", "description");
        document.head.appendChild(meta);
      }
      meta.setAttribute(
        "content",
        "The university you are looking for could not be found."
      );
      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement("link");
        canonical.setAttribute("rel", "canonical");
        document.head.appendChild(canonical);
      }
      canonical.setAttribute("href", `${origin}${path}`);
      return;
    }

    if (!university?.name) return;

    const plain =
      (university.details_plain && String(university.details_plain)) || "";
    const desc =
      (plain && `${plain.slice(0, 155)}${plain.length > 155 ? "…" : ""}`) ||
      `${university.name} — online programs, fees, placements, and admissions on College Drishti.`;

    document.title = `${university.name} | College Drishti`;

    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", desc);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", `${origin}${path}`);
  }, [slug, loading, university?.id, university?.name, university?.details_plain]);

  useEffect(() => {
    if (!slug) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/university/${encodeURIComponent(slug)}`);

        if (res.data.success) {
          setUniversityData(res.data.data);
        } else {
          setUniversityData({});
        }
      } catch (err) {
        console.error("API error:", err);
        setUniversityData({});
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-white">
        <h2 className="text-2xl font-semibold text-[#004AAD]">
          Loading University...
        </h2>
      </div>
    );
  }


  if (!university?.id) {
    return (
      <div className="w-full font-sans overflow-x-hidden bg-white text-black min-h-screen">
        <div className="hidden md:block">
          <Header />
        </div>
        <div className="block md:hidden">
          <MobileMenu />
        </div>
        <div className="flex flex-col items-center justify-center px-4 py-24">
          <h1 className="text-2xl font-semibold text-gray-800">
            University not found
          </h1>
          <p className="text-gray-600 mt-2 text-center max-w-md">
            No university matches “{slug}”. Check the URL or browse universities
            from the home page.
          </p>
        </div>
        <Footer />
        <MobileFooterNav />
      </div>
    );
  }


  console.log("University Data:", universityData);

  return (
    <div className="w-full font-sans overflow-x-hidden bg-white text-black min-h-screen">
      <SEO
        title={university.name}
        description={
          university.details_plain?.replace(/<[^>]+>/g, "").slice(0, 160)
        }
        keywords={`${university.name}, Online University`}
        canonical={`https://collegedrishti.com/university/${university.slug}`}
        image={university.image}
      />
      <div className="hidden md:block">
        <Header />
      </div>

      <div className="block md:hidden">
        <MobileMenu />
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <div className="scroll-mt-24">
          <UniversityHighlight university={university} slug={slug} />
        </div>

        <InfoWithPodcast className="bg-white" data={university} />

        <div id="about" className="scroll-mt-24">
          <AboutUniversity className="bg-white" data={university} />
        </div>

        <div id="courses" className="scroll-mt-24">
          <UniversityFee className="bg-white" slug={slug} />
        </div>

        <div id="placements" className="scroll-mt-24">
          <AdvantageSection className="bg-white" data={universityData} />
        </div>

        <div id="reviews" className="scroll-mt-24">
          <Section7 className="bg-white" data={universityData} />
        </div>

        <div id="admissions" className="scroll-mt-24">
          <Section8 className="bg-white" data={universityData} />
        </div>

        <div id="approvals" className="scroll-mt-24">
          <Section9 data={university} />
        </div>

        <Section10 className="bg-white" data={universityData} />

        <Section11 className="bg-white" data={universityData} />

        <CTASection className="bg-white" data={universityData} />

        <FAQSection className="bg-white" universityId={university.id} />
      </Suspense>

      <Footer />

      <MobileFooterNav />
    </div>
  );
};

export default UniversityPage;
