import React, { useState, useEffect } from "react";
import { FaHome, FaSignOutAlt } from "react-icons/fa";

import { IoClose } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";

import { Link, useNavigate, useLocation } from "react-router-dom";

import College from "../assets/logo.png";
import Earn from "../course-image/earn.png";
import FindUni from "../course-image/uni.png";

import api from "../api/axios";
import { getCoursesWithSubCourses } from "../api/courseCache";

import fb from "../assets/facebook.svg";
import yt from "../assets/youtube.svg";
import ig from "../assets/instagram.svg";
import li from "../assets/linkedin.svg";

const MobileMenu = () => {
  const [open, setOpen] = useState(false);

  const [courseData, setCourseData] = useState([]);

  const [expandedCourse, setExpandedCourse] = useState(null);

  const [loading, setLoading] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [loaded, setLoaded] = useState(false);

  const navigate = useNavigate();

  const location = useLocation();

  // =========================
  // LOGIN CHECK
  // =========================

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  // =========================
  // LOAD COURSES ONLY WHEN MENU OPENS
  // =========================

  useEffect(() => {
    if (!open || loaded) return;

    const cached = localStorage.getItem("coursesCache");

    if (cached) {
      try {
        const parsed = JSON.parse(cached);

        setCourseData(parsed);

        setLoading(false);

        setLoaded(true);

        return;
      } catch (err) {
        console.error("Cache parse error:", err);
      }
    }

    fetchCourses();
  }, [open]);

  // =========================
  // FETCH COURSES
  // =========================

  const fetchCourses = async () => {
    try {
      setLoading(true);

      const normalized = await getCoursesWithSubCourses();

      setCourseData(normalized);

      localStorage.setItem("coursesCache", JSON.stringify(normalized));

      setLoaded(true);

      setLoading(false);

      // Fetch subcourses in background ONLY if needed
      if (
        normalized.some((course) => (course.sub_courses || []).length === 0)
      ) {
        fetchSubCourses(normalized);
      }
    } catch (err) {
      console.error("Course Fetch Error:", err);

      setLoading(false);
    }
  };

  // =========================
  // FETCH SUBCOURSES IN PARALLEL
  // =========================

  const fetchSubCourses = async (courses) => {
    try {
      const responses = await Promise.all(
        courses.map((course) => api.get(`/courses/${course.course_id}`)),
      );

      const updated = courses.map((course, index) => {
        const subsRes = responses[index];

        const rawSubs = Array.isArray(subsRes.data)
          ? subsRes.data
          : Array.isArray(subsRes.data?.data)
            ? subsRes.data.data
            : [];

        return {
          ...course,

          sub_courses: rawSubs.map((sub, idx) => ({
            ...sub,

            id: sub.id || sub.sub_co_id || idx,

            sub_name: sub.sub_name || sub.name || `Sub ${idx + 1}`,

            slug:
              sub.slug ||
              (sub?.sub_name || sub?.name || "")
                .toLowerCase()
                .replace(/\s+/g, "-")
                .replace(/[^a-z0-9-]/g, ""),
          })),
        };
      });

      setCourseData(updated);

      localStorage.setItem("coursesCache", JSON.stringify(updated));
    } catch (e) {
      console.warn("Subcourse error:", e);
    }
  };

  // =========================
  // TOGGLE COURSE
  // =========================

  const toggleCourse = (id) => {
    setExpandedCourse((prev) => (prev === id ? null : id));
  };

  // =========================
  // CLOSE MENU
  // =========================

  const closeMenu = () => setOpen(false);

  // =========================
  // LOGOUT
  // =========================

  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/login");
  };

  return (
    <div className="md:hidden flex items-center justify-between px-3 py-2 bg-white shadow-sm">
      {/* HAMBURGER */}

      <button
        className="border border-gray-300 p-2 rounded-full"
        onClick={() => setOpen(true)}
      >
        <RxHamburgerMenu className="text-2xl text-gray-700" />
      </button>

      {/* LOGO */}

      <Link to="/">
        <img src={College} alt="College Drishti" className="h-14 md:h-12" />
      </Link>

      {/* LEARN & EARN */}

      <div
        className="flex flex-col items-center justify-center w-[70px] text-[10px] text-blue-700 cursor-pointer"
        onClick={() => {
          if (location.pathname === "/") {
            const section = document.getElementById("learn-earn-section");

            if (section) {
              const headerOffset = 220;

              const elementPosition =
                section.getBoundingClientRect().top + window.scrollY;

              const offsetPosition = elementPosition - headerOffset;

              window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
              });
            }
          } else {
            navigate("/", {
              state: {
                scrollTo: "learn-earn-section",
              },
              key: Date.now(),
            });
          }
        }}
      >
        <img src={Earn} alt="Learn & Earn" className="w-6 h-6 mb-[2px]" />

        <span className="leading-tight">Learn & Earn</span>
      </div>

      {/* FIND MY UNI */}

      <Link
        to="/suggesteduniversity"
        className="flex flex-col items-center justify-center w-[70px] text-[10px] text-blue-700"
      >
        <img
          src="/images/cap.png"
          alt="Find My Uni"
          className="w-6 h-6 mb-[2px]"
        />

        <span className="leading-tight">Find my Uni</span>
      </Link>

      {/* SIDEBAR */}

      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white shadow-xl transform transition-transform duration-300 z-[2000]
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* HEADER */}

        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={closeMenu}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
          >
            <IoClose className="text-gray-600" />
          </button>

          <img src={College} className="h-12" />

          <Link to="/suggesteduniversity">
            <img src={FindUni} alt="Find My Uni" className="h-6 mb-1 float" />
          </Link>
        </div>

        {/* MENU CONTENT */}

        <nav className="flex flex-col px-4 pt-2 space-y-2 overflow-y-auto h-[calc(100%-140px)]">
          {/* HOME */}

          <Link
            to="/"
            onClick={closeMenu}
            className="flex items-center gap-3 py-2"
          >
            <span className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
              <FaHome />
            </span>

            <span className="text-sm font-medium text-gray-800">Home</span>
          </Link>

          {/* COURSES */}

          <div className="mt-1">
            {loading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="animate-pulse bg-gray-200 h-6 w-40 rounded-md my-2"
                  ></div>
                ))
              : courseData.map((course) => (
                  <div
                    key={course.course_id}
                    className="border-b border-gray-100 pb-2"
                  >
                    <button
                      onClick={() => toggleCourse(course.course_id)}
                      className="flex items-center justify-between w-full py-2"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center">
                          🎓
                        </span>

                        <div className="text-left">
                          <p className="text-sm font-medium text-gray-800">
                            {course.course_name}
                          </p>

                          <p className="text-xs text-gray-400">
                            After Graduation
                          </p>
                        </div>
                      </div>

                      <span className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                        →
                      </span>
                    </button>

                    {/* SUBCOURSES */}

                    <div
                      className={`transition-all duration-300 overflow-hidden
                    ${
                      expandedCourse === course.course_id
                        ? "max-h-80 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                    >
                      <div className="pl-12 pb-2 space-y-1">
                        {course.sub_courses?.length > 0 ? (
                          course.sub_courses.slice(0, 10).map((sub) => (
                            <Link
                              key={sub.id}
                              to={`/course/${sub.slug || sub.id}`}
                              onClick={closeMenu}
                              className="block text-sm text-gray-600 hover:text-blue-600"
                            >
                              {sub.sub_name}
                            </Link>
                          ))
                        ) : (
                          <p className="text-xs text-gray-400">Loading...</p>
                        )}

                        <button
                          onClick={() => {
                            navigate(`/courses/${course.course_id}`);

                            closeMenu();
                          }}
                          className="text-[12px] text-blue-600 mt-2 font-medium hover:underline"
                        >
                          Explore more →
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
          </div>


          {/* SOCIAL HANDLES */}

          <div className="mt-4 border-t pt-4">
            <h3 className="text-xs text-right font-semibold text-gray-400 uppercase mb-3">
              Follow Us
            </h3>

            <div className="flex justify-end items-center gap-2 ">
              {/* Facebook */}
              <a
                href="https://www.facebook.com/share/19fJ4pK5HA/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-gray-700 hover:text-blue-600"
              >
                <img src={fb} alt="facebook" className="w-5 h-5" />
              </a>

              {/* Youtube */}
              <a
                href="https://youtube.com/@collegedrishti"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-gray-700 hover:text-red-600"
              >
                <img src={yt} alt="youtube" className="w-5 h-5" />
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/college_drishti"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-gray-700 hover:text-pink-600"
              >
                <img src={ig} alt="instagram" className="w-5 h-5" />
              </a>

              {/* Linkedin */}
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-gray-700 hover:text-blue-700"
              >
                <img src={li} alt="linkedin" className="w-5 h-5" />
              </a>
            </div>
          </div>
        </nav>

   
      </div>

      {/* LOGOUT */}

      {isLoggedIn && (
        <button
          className="flex items-center gap-3 text-gray-700 hover:text-red-600 mt-4 font-medium"
          onClick={handleLogout}
        >
          <FaSignOutAlt />

          <span>Logout</span>
        </button>
      )}

      {/* BACKDROP */}

      {open && (
        <div
          onClick={closeMenu}
          className="fixed inset-0 bg-black/20 z-[1999]"
        />
      )}
    </div>
  );
};

export default MobileMenu;
