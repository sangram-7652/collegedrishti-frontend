import React, { useState, useEffect, useRef } from "react";
import api from '../api/axios';
import { Link } from 'react-router-dom';
import { CalendarIcon } from '@heroicons/react/24/outline';
import { FiSearch } from 'react-icons/fi';
import CounsellingSlider from "../pages/CounsellingSlider";
import MentorSlider from "../pages/MentorSlider";
import ExploreSection from "../pages/ExploreSection";
import NewsSection from "../pages/NewsSection";
import ExperienceSection from "../pages/ExperienceSection";
import FAQSection from "../pages/FAQSection";
import CTASection from "../pages/CTASection";
import HeroSection from "../pages/HeroSection";
import Header from "../pages/Header";
import MobileMenu from "../pages/MobileMenu";
import TransactionSlider from "../pages/TransactionSlider";
import HiringSection from "../pages/HiringSection";
import CourseSection from "../pages/CourseSection";
import earnImage from '../assets/earn.webp';
// import amazonLogo from '../assets/amazon.png';
import CourseIcon from '../assets/course-icon.png';
import Counsellor from '../uni-image/Expert_Counselor.png';
import Programs from '../uni-image/Programs.png';
import Students from '../uni-image/Enrolled_Students.webp';
import University from '../uni-image/Universities.webp';
import College from '../assets/college.png';
import Jain from '../uni-image/Jain Logo.webp';
import LPU from '../uni-image/lpu logo.webp';
import Amity from '../uni-image/Amity Logo.webp';
import Chandiagarah from '../uni-image/Chandiagarah logo.webp';
import Manipal from '../uni-image/Manipal logo.webp';
import Nmims from '../uni-image/Nmims logo.webp';
import Sharda from '../uni-image/Sharda logo.webp';
import Uttranchal from '../uni-image/Uttranchal logo.webp';
import Vivakananda from '../uni-image/Vivakananda logo.webp';
import { AiOutlineSearch } from "react-icons/ai";
import CourseDropdown from '../pages/CourseDropdown'; // path sahi rakhna
import Footer from "./Footer";
import MobileFooterNav from './MobileFooterNav';
import { FaFacebookF, FaYoutube, FaInstagram, FaTwitter } from 'react-icons/fa';
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";




const Dashboard = () => {
  const location = useLocation();
  const courseRef = useRef(null);
  const [showCourses, setShowCourses] = useState(false);


  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    student_name: "",
    email: "",
    mobile: "",
    step2name: "",
    dob: "",
    gender: "",
    state: ""
  });



  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/userregister", formData);

      console.log(res.data);

      if (res.data.success === 1) {
        setShowForm(false);
        navigate("/thank-you"); // ✅ redirect
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };




  //  scroll learn-earn section function
  useEffect(() => {
    if (location.state?.scrollTo) {

      const scrollToSection = () => {
        const sectionId = location.state.scrollTo;
        const section = document.getElementById(sectionId);

        if (section) {
          const header = document.querySelector("header");

          // 🔥 different offset for sections
          let extraOffset = 20;

          if (sectionId === "explore-university") {
            extraOffset = -80; // 👈 isko adjust kar sakte ho
          }

          if (sectionId === "learn-earn-section") {
            extraOffset = -40;
          }

          const offset = header
            ? header.offsetHeight + extraOffset
            : 200;

          const position =
            section.getBoundingClientRect().top + window.scrollY;

          window.scrollTo({
            top: position - offset,
            behavior: "smooth",
          });

          window.history.replaceState({}, document.title);

        } else {
          setTimeout(scrollToSection, 100);
        }
      };

      scrollToSection();
    }
  }, [location.pathname, location.state]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowCourses(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    if (courseRef.current) observer.observe(courseRef.current);
    return () => observer.disconnect();
  }, []);
  const [courseData, setCourseData] = useState([]);


 useEffect(() => {

  const fetchDashboardData = async () => {

    try {
      const dashboardRes = await api.get('/dashboard');

      if (dashboardRes.data.success) {
        setCourseData(dashboardRes.data.data);
      }
      
    } catch (error) {
      console.error("Dashboard API Error:", error);
    }
  };

  fetchDashboardData();

}, []);

  return (
    <div className="w-full font-sans overflow-x-hidden">

      <div className="hidden md:block">
        <Header />
      </div>
      <div className="block md:hidden">
        <MobileMenu />
      </div>
      <HeroSection />

      {/* Stats Section */}
      <div className="bg-blue-50 py-8">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <img
              src={Counsellor}
              alt="Counsellor"
              className="mx-auto mb-2 h-10 md:h-20 mix-blend-multiply"
            />
            <p className="font-bold text-lg">300+</p>
            <p className="text-sm text-gray-600">Expert Counsellors</p>
          </div>
          <div>
            <img
              src={Programs}
              alt="Programs"
              className="mx-auto mb-2 h-10 md:h-20 mix-blend-multiply"
            />
            <p className="font-bold text-lg">500+</p>
            <p className="text-sm text-gray-600">Programs</p>
          </div>
          <div>
            <img
              src={Students}
              alt="Students"
              className="mx-auto mb-2 h-10 md:h-20 "
            />
            <p className="font-bold text-lg">10000+</p>
            <p className="text-sm text-gray-600">Enrolled Students</p>
          </div>
          <div>
            <img
              src={University}
              alt="Universities"
              className="mx-auto mb-2 h-10 md:h-20"
            />
            <p className="font-bold text-lg">100+</p>
            <p className="text-sm text-gray-600">Universities</p>
          </div>
        </div>
      </div>



      {/* section 3 */}
      <section className="py-8 md:py-12 px-4 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[30%_70%] gap-6 md:gap-8 items-center">

          {/* Left Title */}
          <div className="text-center md:text-left">
            <h2
              className="
            font-inter font-semibold text-gray-900

            text-[18px] leading-[59px] tracking-[-0.01em]   /* mobile UI */
            
            md:text-[52px] md:leading-[59px] md:tracking-[-0.01em]  /* desktop UI */
          "
            >
              100+ trusted <br className="hidden md:block" />
              Universities
            </h2>
          </div>


          {/* Right Logos */}
          <div className="space-y-4 md:space-y-6">

            {/* Top Row */}
            <div className="flex overflow-hidden">
              <div className="flex animate-slide gap-3 md:gap-4">
                {[Jain, Amity, Vivakananda, Uttranchal, Jain, Amity, Vivakananda, Uttranchal].map(
                  (logo, i) => (
                    <div
                      key={`top-${i}`}
                      className="
                  bg-white rounded-lg shadow 
                  flex items-center justify-center
                  h-16 w-28 
                  sm:h-20 sm:w-32 
                  md:h-24 md:w-40
                  hover:shadow-md transition
                "
                    >
                      <img
                        src={logo}
                        alt={`Top University ${i + 1}`}
                        className="object-contain max-h-[80%] max-w-[80%]"
                      />
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Bottom Row */}
            <div className="flex overflow-hidden">
              <div className="flex animate-slide gap-3 md:gap-4">
                {[Nmims, LPU, Sharda, Manipal, Nmims, LPU, Sharda, Manipal].map(
                  (logo, i) => (
                    <div
                      key={`bottom-${i}`}
                      className="
                  bg-white rounded-lg shadow 
                  flex items-center justify-center
                  h-16 w-28 
                  sm:h-20 sm:w-32 
                  md:h-24 md:w-40
                  hover:shadow-md transition
                "
                    >
                      <img
                        src={logo}
                        alt={`Bottom University ${i + 1}`}
                        className="object-contain w-full h-full p-2"
                      />
                    </div>
                  )
                )}
              </div>
            </div>

          </div>
        </div>

        {/* Animation */}
        <style>
          {`
          @keyframes slide {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-slide {
            animation: slide 22s linear infinite;
            will-change: transform;
            transform: translateZ(0);
          }
        `}
        </style>
      </section>

      {/* section 4 */}
      <div ref={courseRef}>
        {showCourses ? (
          <CourseSection courseData={courseData} />
        ) : (
          <div className="h-[400px]" />
        )}
      </div>


      {/* section 5 */}
      <section id="learn-earn-section" className="bg-[#0c1126] text-white py-6 md:py-8 px-4 md:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10">

          {/* Left Image */}
          <div className="flex-1 flex justify-center md:justify-center">
            <img
              src={earnImage}
              alt="Learn & Earn"
              loading="eager"
              fetchPriority="high"
              className="w-full max-w-[360px] md:max-w-[500px] object-contain"
            />
          </div>

          {/* Right Text */}
          <div className="flex-1 text-left md:text-left px-2 md:px-0">
            <h2 className="text-xl md:text-4xl font-bold mb-3 md:mb-6">
              Learn & Earn
            </h2>
            <p className="text-sm md:text-lg mb-1 md:mb-3">Curious About It?</p>
            <p className="text-sm md:text-lg mb-1 md:mb-3">Don’t worry! Fill out this form</p>
            <p className="text-sm md:text-lg mb-4 md:mb-6">
              And unlock all the answers you’ve been waiting for.
            </p>
         

            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1.5 md:py-2 px-5 md:px-6 rounded-full transition duration-300 text-sm md:text-base">
              View Form
            </button>



          </div>
        </div>
      </section>



      <HiringSection />

      <CounsellingSlider />

      <MentorSlider />

      <ExploreSection />

      <TransactionSlider />

      <NewsSection />

      <ExperienceSection />

      <CTASection />

      <FAQSection />

      {showForm && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">

          {/* Form Card */}
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl p-6 relative animate-scaleIn">

            {/* Close Button */}
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-3 right-4 text-gray-500 text-xl"
            >
              ✕
            </button>

            {/* Heading */}
            <h2 className="text-2xl font-bold text-center mb-1">
              Get Free Counselling 🎓
            </h2>
            <p className="text-center text-gray-500 text-sm mb-5">
              Fill details & get expert guidance instantly
            </p>

            {/* Progress */}
            <div className="w-full bg-gray-200 h-1 rounded mb-6">
              <div className="bg-blue-600 h-1 rounded w-[50%]" />
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="student_name"
                placeholder="Full Name"
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2"
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2"
              />

              <input
                type="tel"
                name="mobile"
                placeholder="Mobile Number"
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2"
              />

              <input
                type="date"
                name="dob"
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2"
              />

              <select name="gender" onChange={handleChange} className="w-full border rounded-lg px-4 py-2">
                <option value="">Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>

              <div className="grid grid-cols-2 gap-3">
                <select
                  name="step2name"
                  onChange={handleChange}
                  className="border rounded-lg px-3 py-2">
                  <option>Course</option>
                  <option>Online MCA</option>
                  <option>MA</option>
                  <option>M.Com</option>
                  <option>M.Sc</option>
                  <option>M.Des</option>
                  <option>MBA</option>
                  <option>One Year MBA</option>
                  <option>Dual MBA</option>
                  <option>One Year MBA</option>
                  <option>B.A</option>
                  <option>BCA</option>
                  <option>B.Sc</option>
                  <option>B.Tech</option>
                  <option>B.Com</option>
                  <option>M.B.A in Finance</option>

                </select>

                <select
                  name="state"
                  onChange={handleChange}
                  className="border rounded-lg px-3 py-2">
                  <option>State</option>
                  <option>Andhra Pradesh</option>
                  <option>Assam</option>
                  <option>Arunachal Pradesh</option>
                  <option>Bihar</option>
                  <option>Chhattisgarh</option>
                  <option>Delhi</option>
                  <option>UP</option>
                  <option>Uttar Pradesh</option>
                  <option>Uttarakhand</option>
                  <option>Karnatka</option>
                  <option>Madhya Pradesh</option>
                  <option>Maharastra</option>
                  <option>Rajasthan</option>
                  <option>Tamil Nadu</option>
                  <option>Telangana</option>
                  <option>Wet Bengal</option>




                </select>
              </div>

              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition">
                Get Free Call
              </button>

              <p className="text-xs text-gray-400 text-center">
                🔒 No spam. Your info is safe with us
              </p>

            </form>
          </div>
        </div>
      )}

      <Footer />

      <MobileFooterNav />
    </div>
  );
};

export default Dashboard;

