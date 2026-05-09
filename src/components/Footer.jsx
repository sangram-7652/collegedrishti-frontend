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

  const popularSubCourses = useMemo(() => {
    return courseData
      .flatMap((course) =>
        (course.sub_courses || []).map((sub) => ({
          id: sub.id,
          name: sub.sub_name,
          slug: sub.slug,
        })),
      )
      .slice(0, 8);
  }, [courseData]);

  return (
    <footer className="bg-black text-white pt-4 px-4 pb-32 md:pb-6 w-full relative z-0">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 sm:grid-cols-2 gap-8 text-sm">
        <div>
          <h5 className="font-semibold mb-4">Popular Courses</h5>
          <ul className="space-y-2 text-gray-300">
            {loading && <li className="text-gray-500">Loading...</li>}

            {!loading && popularSubCourses.length === 0 && (
              <li className="text-gray-500">No courses</li>
            )}

            {!loading &&
              popularSubCourses.map((sub) => (
                <li
                  key={sub.id}
                  onClick={() => navigate(`/coursepage/${sub.slug}`)}
                  className="cursor-pointer hover:text-white transition">
                  {sub.name}
                </li>
              ))}
          </ul>
        </div>

        <div>
          <h5 className="font-semibold mb-2">Popular Categories</h5>
          <ul className="space-y-2 text-gray-300">
            <li>Technology</li>
            <li>IT & Software</li>
            <li>Art & Design</li>
            <li>Marketing</li>
            <li>Finance</li>
            <li>PG Course</li>
            <li>Diploma</li>
            <li>Business Analyst</li>
            <li>All Categories</li>
          </ul>
        </div>

        <div>
          <h5 className="font-semibold mb-2">About Company</h5>
          <ul className="space-y-2 text-gray-300">
            <li>
              <Link to="/AboutUs" className="hover:text-white">
                About us
              </Link>
            </li>
            <li>
              <Link to="/refund" className="hover:text-white">
                Refund Policy
              </Link>
            </li>
            <li>Careers</li>
            <li>
              <Link to="/terms" className="hover:text-white">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link to="/privacy-policy" className="hover:text-white">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/disclaimer" className="hover:text-white">
                Disclaimer
              </Link>
            </li>
            <li>
              <Link to="/blogs" className="hover:text-white">
                Blogs
              </Link>
            </li>
            <li>Help</li>
            <li>Customer Support</li>
          </ul>
        </div>

        <div>
          <h5 className="font-semibold mb-2">Community</h5>
          <ul className="space-y-2 text-gray-300">
            <li>Placements</li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 text-gray-400 text-xs">
        <div className="flex justify-start items-center gap-3 sm:gap-4 mb-6 pb-4 flex-wrap">
          {/* Facebook */}
          <a
            href="https://www.facebook.com/share/19fJ4pK5HA/"
            target="_blank"
            rel="noopener noreferrer">
            <img
              src={fb}
              alt="facebook"
              className="w-6 h-6 sm:w-7 sm:h-7 hover:scale-110 transition duration-200"
            />
          </a>

          {/* YouTube */}
          <a
            href="https://youtube.com/@collegedrishti"
            target="_blank"
            rel="noopener noreferrer">
            <img
              src={yt}
              alt="youtube"
              className="w-6 h-6 sm:w-7 sm:h-7 hover:scale-110 transition duration-200"
            />
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noopener noreferrer">
            <img
              src={li}
              alt="linkedin"
              className="w-6 h-6 sm:w-7 sm:h-7 hover:scale-110 transition duration-200"
            />
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/college_drishti"
            target="_blank"
            rel="noopener noreferrer">
            <img
              src={ig}
              alt="instagram"
              className="w-6 h-6 sm:w-7 sm:h-7 hover:scale-110 transition duration-200"
            />
          </a>
        </div>

        <p>©2026 College Dristhi. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
