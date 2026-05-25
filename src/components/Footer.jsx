import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCoursesWithSubCourses } from "../api/courseCache";

import fb from "../assets/facebook.svg";
import yt from "../assets/youtube.svg";
import ig from "../assets/instagram.svg";
import li from "../assets/linkedin.svg";

const Footer = () => {
  const navigate = useNavigate();

  const [courseData, setCourseData] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH ================= */

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setCourseData(await getCoursesWithSubCourses());
      } catch (err) {
        console.error("Footer courses fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  /* ================= COURSES ================= */

  const popularSubCourses = useMemo(() => {
    return courseData
      .flatMap((course) =>
        (course.sub_courses || []).map((sub) => ({
          id: sub.id,
          name: sub.sub_name,
          slug: sub.slug,
        }))
      )
      .slice(0, 8);
  }, [courseData]);

  /* ================= UI ================= */

  return (
    <footer className="relative overflow-hidden bg-[#050816] text-white">
      
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-[350px] h-[350px] bg-blue-600/10 blur-3xl rounded-full" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pt-16 pb-10">

        {/* ================= TOP SECTION ================= */}

        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-4
            gap-10
            pb-12
            border-b border-white/10
          "
        >
          {/* ================= POPULAR COURSES ================= */}

          <div>
            <h5 className="text-lg font-bold mb-5 text-white">
              Popular Courses
            </h5>

            <ul className="space-y-3">
              {loading && (
                <li className="text-gray-500 text-sm">
                  Loading...
                </li>
              )}

              {!loading &&
                popularSubCourses.map((sub) => (
                  <li
                    key={sub.id}
                    onClick={() =>
                      navigate(`/course/${sub.slug}`)
                    }
                    className="
                      text-gray-400
                      text-sm
                      cursor-pointer
                      hover:text-white
                      transition-all
                      duration-300
                      hover:translate-x-1
                    "
                  >
                    {sub.name}
                  </li>
                ))}
            </ul>
          </div>

          {/* ================= CATEGORIES ================= */}

          <div>
            <h5 className="text-lg font-bold mb-5 text-white">
              Popular Categories
            </h5>

            <ul className="space-y-3">
              {[
                "Technology",
                "IT & Software",
                "Art & Design",
                "Marketing",
                "Finance",
                "PG Courses",
                "Diploma",
                "Business Analyst",
              ].map((item, index) => (
                <li
                  key={index}
                  className="
                    text-gray-400
                    text-sm
                    cursor-pointer
                    hover:text-white
                    transition-all
                    duration-300
                    hover:translate-x-1
                  "
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* ================= COMPANY ================= */}

          <div>
            <h5 className="text-lg font-bold mb-5 text-white">
              Company
            </h5>

            <ul className="space-y-3">
              {[
                {
                  label: "About Us",
                  link: "/about-us",
                },
                {
                  label: "Refund Policy",
                  link: "/refund",
                },
                {
                  label: "Terms & Conditions",
                  link: "/terms",
                },
                {
                  label: "Privacy Policy",
                  link: "/privacy-policy",
                },
                {
                  label: "Disclaimer",
                  link: "/disclaimer",
                },
                {
                  label: "Blogs",
                  link: "/blogs",
                },
              ].map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.link}
                    className="
                      text-gray-400
                      text-sm
                      hover:text-white
                      transition-all
                      duration-300
                    "
                  >
                    {item.label}
                  </Link>
                </li>
              ))}

              <li className="text-gray-400 text-sm hover:text-white transition cursor-pointer">
                Careers
              </li>

              <li className="text-gray-400 text-sm hover:text-white transition cursor-pointer">
                Customer Support
              </li>
            </ul>
          </div>

          {/* ================= COMMUNITY ================= */}

          <div>
            <h5 className="text-lg font-bold mb-5 text-white">
              Community
            </h5>

            <ul className="space-y-3 mb-6">
              <li className="text-gray-400 text-sm hover:text-white transition cursor-pointer">
                Placements
              </li>

              <li className="text-gray-400 text-sm hover:text-white transition cursor-pointer">
                Student Success
              </li>

              <li className="text-gray-400 text-sm hover:text-white transition cursor-pointer">
                Alumni Network
              </li>
            </ul>

            {/* ================= SOCIALS ================= */}

            <div className="flex items-center gap-3">
              {[
                {
                  icon: fb,
                  link: "https://www.facebook.com/share/19fJ4pK5HA/",
                  alt: "facebook",
                },
                {
                  icon: yt,
                  link: "https://youtube.com/@collegedrishti",
                  alt: "youtube",
                },
                {
                  icon: li,
                  link: "https://www.linkedin.com/",
                  alt: "linkedin",
                },
                {
                  icon: ig,
                  link: "https://www.instagram.com/college_drishti",
                  alt: "instagram",
                },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    w-11 h-11
                    rounded-full
                    bg-white/5
                    border border-white/10
                    flex items-center justify-center
                    hover:bg-blue-600
                    hover:border-blue-600
                    transition-all
                    duration-300
                    hover:-translate-y-1
                  "
                >
                  <img
                    src={social.icon}
                    alt={social.alt}
                    className="w-5 h-5"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ================= BOTTOM ================= */}

        <div
          className="
            pt-8
            flex
            flex-col
            md:flex-row
            items-center
            justify-between
            gap-4
          "
        >
          {/* Logo + Text */}
          <div>
            <h3 className="text-xl font-bold mb-1">
              College Drishti
            </h3>

            <p className="text-gray-500 text-sm">
              Empowering learners with future-ready education.
            </p>
          </div>

          {/* Bottom Links */}
          <div
            className="
              flex
              flex-wrap
              items-center
              justify-center
              gap-5
              text-sm
              text-gray-400
            "
          >
            <Link
              to="/privacy-policy"
              className="hover:text-white transition"
            >
              Privacy
            </Link>

            <Link
              to="/terms"
              className="hover:text-white transition"
            >
              Terms
            </Link>

            <Link
              to="/refund"
              className="hover:text-white transition"
            >
              Refund
            </Link>

            <Link
              to="/disclaimer"
              className="hover:text-white transition"
            >
              Disclaimer
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-white/10 text-center">
          <p className="text-gray-500 text-sm">
            © 2026 College Drishti. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;