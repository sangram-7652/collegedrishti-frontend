import React, { lazy, Suspense } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "../api/axios";

import Header from "../pages/Header";
import MobileMenu from "../pages/MobileMenu";
import CourseHero from "../pages/CourseHero";
import InfoWithPodcast from "../pages/InfoWithPodcast";

const Section3 = lazy(() => import("../pages/Section3"));
const Section4 = lazy(() => import("../pages/Section4"));
const Section5 = lazy(() => import("../pages/Section5"));
const Section6 = lazy(() => import("../pages/Section6"));
const Section7 = lazy(() => import("../pages/Section7"));
const Section8 = lazy(() => import("../pages/Section8"));
const Section9 = lazy(() => import("../pages/Section9"));
const Section10 = lazy(() => import("../pages/Section10"));
const Section11 = lazy(() => import("../pages/Section11"));
const CTASection = lazy(() => import("../pages/CTASection"));
const FAQSection = lazy(() => import("../pages/FAQSection"));

import Footer from "./Footer";
import MobileFooterNav from "./MobileFooterNav";

const CoursePage = () => {
  const { slug } = useParams();

  // ✅ API call (React Query handle करेगा)
  const fetchCourse = async () => {
    const response = await api.get(`/course/${slug}`);
    return response.data.data;
  };

  // ✅ React Query
 const { data } = useQuery({
  queryKey: ["coursepage", slug],
  queryFn: fetchCourse,
  staleTime: 10 * 60 * 1000,
  retry: 2, // auto retry
  refetchOnWindowFocus: false, // unnecessary reload stop
  placeholderData: {
    course: {},
    specializations: [],
    universities: []
  }
});

  // ✅ data
  const course = data?.course || {};
const specializations = data?.specializations || [];
const universities = data?.universities || [];

 
  return (
    <main className="bg-white text-gray-900 animate-fadeIn">
      {/* Header */}
      <div className="hidden md:block">
        <Header />
      </div>

      <div className="block md:hidden">
        <MobileMenu />
      </div>

      {/* ✅ ABOUT */}
      <div id="about" className="scroll-mt-24">
        <CourseHero course={course} />
      </div>

      <section className="w-full font-sans overflow-x-hidden">

        <InfoWithPodcast data={course} />

        {/* ✅ COURSES */}
        <div id="courses" className="scroll-mt-24">
          <Suspense fallback={<div className="h-20 bg-white"></div>}>
            <Section3 course={course} />
          </Suspense>
        </div>

        {/* ✅ FEES */}
        <div id="fees" className="scroll-mt-24">
          <Suspense fallback={<div className="h-20 bg-white"></div>}>
            <Section4 courseSlug={slug} />
          </Suspense>
        </div>

        {/* ✅ PLACEMENTS */}
        <div id="placements" className="scroll-mt-24">
          <Suspense fallback={<div className="h-20 bg-white"></div>}>
            <Section5 universities={universities} />
          </Suspense>
        </div>

        {/* ✅ SPECIALIZATION */}
        <Suspense fallback={<div className="h-20 bg-white"></div>}>
          <Section6 course={course} specializations={specializations} />
        </Suspense>

        {/* ✅ REVIEWS */}
        <div id="reviews" className="scroll-mt-24">
          <Suspense fallback={<div className="h-20 bg-white"></div>}>
            <Section7 course={course} />
          </Suspense>
        </div>

        {/* ✅ ADMISSIONS */}
        <div id="admissions" className="scroll-mt-24">
          <Suspense fallback={<div className="h-20 bg-white"></div>}>
            <Section8 course={course} />
          </Suspense>
        </div>

        {/* ✅ APPROVALS */}
        <div id="approvals" className="scroll-mt-24">
          <Suspense fallback={<div className="h-20 bg-white"></div>}>
            <Section9 course={course} />
          </Suspense>
        </div>

        <Suspense fallback={<div className="h-20 bg-white"></div>}>
          <Section10 course={course} />
        </Suspense>

        <Suspense fallback={<div className="h-20 bg-white"></div>}>
          <Section11 course={course} />
        </Suspense>

        <Suspense fallback={<div className="h-20 bg-white"></div>}>
          <CTASection course={course} />
        </Suspense>

        <Suspense fallback={<div className="h-20 bg-white"></div>}>
          <FAQSection subCourseId={course?.sub_co_id} />
        </Suspense>

      </section>

      <Footer />
      <MobileFooterNav />

    </main>
  );
};

export default CoursePage;
