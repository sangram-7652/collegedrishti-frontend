// src/App.jsx
import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ScrollToTop from "./ScrollToTop"
import MetaPixel from "./components/MetaPixel";
import Chatbot from "./components/Chatbot";
import WhatsappButton from "./components/WhatsappButton";
import FloatingActions from "./components/FloatingActions";
import Dashboard from "./components/Dashboard";
import ThankYou from "./pages/ThankYou";
import GlobalPopup from "./components/GlobalPopup";
import UniversitySearchPage from "./pages/UniversitySearchPage";


/* ===== LAZY IMPORTS (VERY IMPORTANT) ===== */
import Login from "./components/Login";
const Signup = lazy(() => import("./components/Signup"));
// const Dashboard = lazy(() => import("./components/Dashboard"));
const UserDashboard = lazy(() => import("./pages/UserDashboard"));
const CourseFilter = lazy(() => import("./components/CourseFilter"));
const CoursePage = lazy(() => import("./components/CoursePage"));
const UniversityPage = lazy(() => import("./components/UniversityPage"));
const Comparisonpage = lazy(() => import("./components/Comparisonpage"));
const RecommendationResults = lazy(() => import("./pages/RecommendationResults"));
const SuggestedUniversity = lazy(() => import("./components/SuggestedUniversity"));
const BlogPage = lazy(() => import("./pages/Blogpage"));
// const Blogdetail = lazy(() => import("./pages/Blogdetail"));
const BlogDetailWrapper = lazy(() => import("./pages/BlogDetailWrapper"));
const AboutJainUniversity = lazy(() => import("./pages/AboutJainUniversity"));
const CollegeSearchPage = lazy(() => import("./pages/CollegeSearchPage"));
const MentorSlider = lazy(() => import("./pages/MentorSlider"));
const AboutCourses = lazy(() => import("./components/AboutCourses"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const CompareFee = lazy(() => import("./pages/CompareFee"));
const ContactUs = lazy(() => import("./components/ContactUs"));
const SuggestMentor = lazy(() => import("./pages/SuggestMentor"));
const SpecializationDetails = lazy(() => import("./pages/SpecializationDetails"));
const WebStoriesSection = lazy(() => import("./pages/WebStoriesSection"));
const WebStoryDetail = lazy(() => import("./pages/WebStoryDetail"));



const Layout = lazy(() => import("./components/Layout"));
const Refund = lazy(() => import("./pages/Refund"));
const Disclaimer = lazy(() => import("./pages/Disclaimer"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const Terms = lazy(() => import("./pages/Terms"));
const NotFound = lazy(() => import("./pages/NotFound"));






const App = () => {
  return (
    <>
      <MetaPixel />
      <Chatbot />
      <WhatsappButton />
      <FloatingActions />

      {/* ✅ GLOBAL POPUP */}
      {/* <GlobalPopup /> */}


      <Suspense fallback={null}>
        <ScrollToTop />
        <Routes>

          <Route
            path="/courses/btech"
            element={<Navigate to="/course/B.Tech" replace />}
          />

          <Route
            path="/search"
            element={<Navigate to="/CollegeSearchPage" replace />}
          />

          <Route
            path="/blog/Best High-Paying Degrees After 12th in India"
            element={
              <Navigate
                to="/blog/best-high-paying-degrees-after-12th-in-india"
                replace
              />
            }
          />

          <Route
            path="/Aboutjainuniversity"
            element={
              <Navigate
                to="/ugc-approved-online-universities"
                replace
              />
            }
          />

          <Route
            path="/Aboutjainuniversity"
            element={
              <Navigate
                to="/ugc-approved-online-universities"
                replace
              />
            }
          />

          <Route path="/webstories" element={<Navigate to="/" replace />} />
          <Route path="/course" element={<Navigate to="/" replace />} />
          <Route path="/courses/1" element={<Navigate to="/" replace />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/CourseFilter" element={<CourseFilter />} />
          <Route path="/course/:slug" element={<CoursePage />} />
          <Route path="/university/:slug" element={<UniversityPage />} />
          <Route path="/Comparisonpage" element={<Comparisonpage />} />
          <Route path="/recommendations" element={<RecommendationResults />} />
          <Route path="/SuggestedUniversity" element={<SuggestedUniversity />} />
          <Route path="/blogs" element={<BlogPage />} />
          {/* <Route path="/blog/:slug" element={<Blogdetail />} /> */}
          <Route path="/web-stories" element={<WebStoriesSection />} />
          <Route path="/web-stories/:slug" element={<WebStoryDetail />} />
          <Route path="/blog/:slug" element={<BlogDetailWrapper />} />
          <Route path="/Aboutjainuniversity" element={<AboutJainUniversity />} />
          <Route path="/ugc-approved-online-universities" element={<AboutJainUniversity />} />
          <Route path="/CollegeSearchPage" element={<CollegeSearchPage />} />
          <Route path="/MentorSlider" element={<MentorSlider />} />
          <Route path="/AboutCourses" element={<AboutCourses />} />
          <Route path="/university/:id/about" element={<AboutPage />} />
          <Route path="/compare" element={<CompareFee />} />
          <Route path="/ContactUs" element={<ContactUs />} />
          <Route path="/SuggestMentor" element={<SuggestMentor />} />
          <Route path="/specialization/:slug" element={<SpecializationDetails />} />
          <Route path="/universities" element={<UniversitySearchPage />} />

          {/* Footer links ONLY — wrapped with Layout */}
          <Route element={<Layout />}>
            <Route path="/about-us" element={<AboutPage />} />
            <Route path="/refund" element={<Refund />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<Terms />} />
          </Route>

          {/*  404 – hamesha last */}
          <Route path="*" element={<NotFound />} />
          <Route path="/thank-you" element={<ThankYou />} />

        </Routes>
      </Suspense>
    </>
  );
};

export default App;
