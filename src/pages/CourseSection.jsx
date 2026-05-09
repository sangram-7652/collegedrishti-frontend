
import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";

const CourseSection = ({ courseData = [] }) => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("All");
  const [showAll, setShowAll] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  /* ===================== RESPONSIVE ===================== */
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  /* ===================== TABS ===================== */
  const tabs = useMemo(() => {
    return [
      "All",
      ...courseData.map(course => course.course_name),
    ];
  }, [courseData]);

  /* ===================== SUB COURSES (OPTIMIZED) ===================== */
  const allSubCourses = useMemo(() => {
    return courseData.flatMap(course =>
      (course.sub_courses || []).map(sub => ({
        id: sub.sub_co_id,
        name: sub.sub_name,
        slug: sub.slug,
        image: sub.image,
        duration: sub.duration,
        category: course.course_name,
      }))
    );
  }, [courseData]);

  /* ===================== FILTER ===================== */
  const filteredCourses = useMemo(() => {
    if (activeTab === "All") return allSubCourses;
    return allSubCourses.filter(c => c.category === activeTab);
  }, [activeTab, allSubCourses]);

  /* ===================== LIMIT ===================== */
  const LIMIT = isMobile ? 6 : 12;
  const displayedCourses = showAll
    ? filteredCourses
    : filteredCourses.slice(0, LIMIT);

  /* ===================== UI ===================== */
  return (
    <section className="py-14 bg-white px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
        Courses
      </h2>
      <p className="text-center text-gray-500 mb-8">
        In-demand courses across multiple domains.
      </p>

      {/* ===================== Tabs ===================== */}
      <div className="flex gap-6 mb-8 text-sm font-medium text-gray-600 max-w-6xl mx-auto overflow-auto whitespace-nowrap">
        {tabs.map((tab, index) => (
          <span
            key={index}
            onClick={() => {
              setActiveTab(tab);
              setShowAll(false);
            }}
            className={`cursor-pointer pb-2 border-b-2 ${
              activeTab === tab
                ? "text-blue-600 border-blue-600 font-bold"
                : "border-transparent hover:text-blue-600"
            }`}
          >
            {tab}
          </span>
        ))}
      </div>

      {/* ===================== Course Grid ===================== */}
      <div
        className={`grid ${
          isMobile
            ? "grid-cols-3 gap-3"
            : "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-5 max-w-6xl"
        } mx-auto`}
      >
        {displayedCourses.map(course => (
          <div
            key={course.id}
         className="relative bg-white border rounded-2xl shadow-sm hover:shadow-md transition flex flex-col items-center p-2 sm:p-4 aspect-square"
          >
            {/* Duration */}
            <span className="absolute top-0 right-0 bg-orange-500 text-white text-[10px] px-2 py-0.5 rounded-tr-xl rounded-bl-xl">
              {course.duration}
            </span>

            {/* Image */}
            <img
              loading="lazy"
              decoding="async"
              src={
                course.image
                  ? `https://api.collegedrishti.com/${course.image.replace(/^\/+/, "")}`
                  : "/default-course.png"
              }
              alt={course.name}
                 className="h-8 w-8 mb-2 sm:h-10 sm:w-10 sm:mb-3 object-contain"
            />

            {/* Name */}
            <h4 className="text-xs font-semibold text-center mb-3">
              {course.name}
            </h4>

            {/* Button */}
            <button
              onClick={() => navigate(`/coursepage/${course.slug}`)}
                className="bg-blue-600 text-white text-[10px] px-3 py-1 sm:text-xs sm:px-4 sm:py-1.5 rounded-full hover:bg-blue-700 transition"
            >
              View
            </button>
          </div>
        ))}
      </div>

      {/* ===================== View All ===================== */}
      {filteredCourses.length > LIMIT && (
        <div className="flex justify-center mt-8">
          <button
            onClick={() => navigate("/coursefilter")}
            className="bg-blue-600 text-white text-sm px-6 py-2 rounded-full hover:bg-blue-700 transition"
          >
            View All →
          </button>
        </div>
      )}
    </section>
  );
};

export default CourseSection;
