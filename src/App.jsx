// src/App.jsx
import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import MetaPixel from "./components/MetaPixel";
import Chatbot from "./components/Chatbot";
import WhatsappButton from "./components/WhatsappButton";
import FloatingActions from "./components/FloatingActions";
import Dashboard from "./components/Dashboard";
import ThankYou from "./pages/ThankYou";
import GlobalPopup from "./components/GlobalPopup";






/* ===== LAZY IMPORTS (VERY IMPORTANT) ===== */
import Login from "./components/Login";
const Signup = lazy(() => import("./components/Signup"));
// const Dashboard = lazy(() => import("./components/Dashboard"));
const UserDashboard = lazy(() => import("./pages/UserDashboard")); //user details
const CourseFilter = lazy(() => import("./components/CourseFilter"));
const CoursePage = lazy(() => import("./components/CoursePage"));
const UniversityPage = lazy(() => import("./components/UniversityPage"));
const Comparisonpage = lazy(() => import("./components/Comparisonpage"));
const RecommendationResults = lazy(() => import("./pages/RecommendationResults"));
const SuggestedUniversity = lazy(() => import("./components/SuggestedUniversity"));
const BlogPage = lazy(() => import("./pages/Blogpage"));
const Blogdetail = lazy(() => import("./pages/Blogdetail"));
const AboutJainUniversity = lazy(() => import("./pages/AboutJainUniversity"));
const CollegeSearchPage = lazy(() => import("./pages/CollegeSearchPage"));
const MentorSlider = lazy(() => import("./pages/MentorSlider"));
const AboutCourses = lazy(() => import("./components/AboutCourses"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const CompareFee = lazy(() => import("./pages/CompareFee"));
const ContactUs = lazy(() => import("./components/ContactUs"));
const SuggestMentor = lazy(() => import("./pages/SuggestMentor"));
const SpecializationDetails = lazy(() => import("./pages/SpecializationDetails"));



const Layout = lazy(() => import("./components/Layout"));
const Refund = lazy(() => import("./pages/Refund"));
const Disclaimer = lazy(() => import("./pages/Disclaimer"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const Terms = lazy(() => import("./pages/Terms"));
const NotFound = lazy(() => import("./pages/NotFound"));





const App = () => {
  return (
    <>
      <ScrollToTop />
      <MetaPixel />
      <Chatbot />
      <WhatsappButton />
      <FloatingActions />

      {/* ✅ GLOBAL POPUP */}
      <GlobalPopup />


      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/CourseFilter" element={<CourseFilter />} />
          <Route path="/coursepage/:slug" element={<CoursePage />} />
          <Route path="/university/:slug" element={<UniversityPage />} />
          <Route path="/Comparisonpage" element={<Comparisonpage />} />
          <Route path="/recommendations" element={<RecommendationResults />} />
          <Route path="/SuggestedUniversity" element={<SuggestedUniversity />} />
          <Route path="/blogs" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<Blogdetail />} />
          <Route path="/Aboutjainuniversity" element={<AboutJainUniversity />} />
          <Route path="/CollegeSearchPage" element={<CollegeSearchPage />} />
          <Route path="/MentorSlider" element={<MentorSlider />} />
          <Route path="/AboutCourses" element={<AboutCourses />} />
          <Route path="/university/:id/about" element={<AboutPage />} />
          <Route path="/compare" element={<CompareFee />} />
          <Route path="/ContactUs" element={<ContactUs />} />
          <Route path="/SuggestMentor" element={<SuggestMentor />} />
          <Route path="/specialization/:slug" element={<SpecializationDetails />} />

          {/* Footer links ONLY — wrapped with Layout */}
          <Route element={<Layout />}>
            <Route path="/refund" element={<Refund />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<Terms />} />
          </Route>

          {/* 🔥 404 – hamesha last */}
          <Route path="*" element={<NotFound />} />
          <Route path="/thank-you" element={<ThankYou />} />

        </Routes>
      </Suspense>
    </>
  );
};

export default App;
