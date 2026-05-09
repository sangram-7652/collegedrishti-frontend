// src/components/CoursesDropdown.jsx
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

import pgIcon from "../assets/pg.png";
import ugIcon from "../assets/ug.png";
import diplomaIcon from "../assets/diploma.png";
import certIcon from "../assets/cert.png";

const CoursesDropdown = ({ courseData = [] }) => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [open, setOpen] = useState(false);

  const containerRef = useRef(null);



  const getIconFor = (name = "") => {
    const n = name?.toLowerCase?.() || "";
    if (n.includes("pg")) return pgIcon;
    if (n.includes("ug")) return ugIcon;
    if (n.includes("diploma")) return diplomaIcon;
    if (n.includes("cert")) return certIcon;
    return pgIcon;
  };

  const activeCourse =
    courseData.find((c) => c.course_id === activeCategory) || courseData[0];

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* Trigger */}
      <button
        type="button"
        className="px-4 font-poppins text-[16px] font-medium leading-none tracking-normal text-gray-800 hover:text-blue-600 transition"
      >
        Courses ▾
      </button>

      {/* Dropdown */}
      <div
        className={`absolute left-0 top-full mt-1 z-[10000] w-[650px] bg-white shadow-lg rounded-lg p-3 transition-all duration-200
        ${open ? "opacity-100 visible" : "opacity-0 invisible"}`}
      >

        <div className="flex gap-3">
          {/* Left column */}
          <div className="w-[200px] border-r pr-3">
            <p className="flex items-center gap-1 cursor-pointer hover:text-black transition">
              Courses
            </p>
            {courseData.length === 0 && (
              <p className="text-xs text-gray-400">No courses</p>
            )}
            {courseData.map((cat) => (
              <div
                key={cat.course_id}
                onMouseEnter={() => setActiveCategory(cat.course_id)}
                className={`flex items-center gap-2 p-2 rounded-md cursor-pointer transition mb-1
                  ${activeCategory === cat.course_id
                    ? "bg-blue-50 border border-blue-200"
                    : "hover:bg-gray-50"
                  }`}
              >
                <img
                  src={getIconFor(cat.course_name)}
                  alt=""
                  className="w-6 h-6"
                />
                <div>
                  <div className="text-[12px] font-semibold text-gray-800 leading-tight">
                    {cat.course_name}
                  </div>
                  <div className="text-[10px] text-gray-500">
                    After{" "}
                    {cat.course_name?.toLowerCase()?.includes("ug")
                      ? "12th"
                      : "Graduation"}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right column */}
          <div className="flex-1 grid grid-cols-3 gap-2">
            {activeCourse?.sub_courses?.length === 0 && (
              <p className="text-xs text-gray-400 col-span-3">
                No subcourses available
              </p>
            )}

            {activeCourse?.sub_courses?.slice(0, 9).map((sub, idx) => (



              <Link
                key={sub.id || `sub-${idx}`}
                to={`/coursepage/${sub.slug}`}
                className="p-2 rounded-md hover:bg-blue-50 transition flex flex-col cursor-pointer"
                onClick={() => setOpen(false)}
              >
                <div className="flex items-center gap-2">
                  <img src={pgIcon} alt="" className="w-5 h-5" />
                  <span className="text-[12px] font-medium text-gray-800">
                    {sub.sub_name}
                  </span>
                </div>
                <div className="text-[10px] text-gray-500">{sub.duration}</div>
              </Link>
            ))}

            {/* Explore more button */}
            {activeCourse && (
              <div className="col-span-3 flex justify-end items-end mt-1">
                <Link
                  to={`/courses/${activeCourse.course_id}`}
                  className="inline-flex items-center gap-1 px-3 py-1 border border-blue-600 text-blue-600 text-[12px] rounded-md hover:bg-blue-600 hover:text-white transition"
                  onClick={() => setOpen(false)}
                >
                  Explore more →
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursesDropdown;

