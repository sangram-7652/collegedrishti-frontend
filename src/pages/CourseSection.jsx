import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const CourseSection = ({ courseData = [] }) => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("All");
  const [showAll, setShowAll] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  /* ================= RESPONSIVE ================= */

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 640);

    window.addEventListener("resize", onResize);

    return () => window.removeEventListener("resize", onResize);
  }, []);

  /* ================= DEBUG ================= */


  /* ================= TABS ================= */

  const tabs = useMemo(() => {
    return ["All", ...courseData.map((course) => course.course_name)];
  }, [courseData]);

  /* ================= COURSES ================= */

  const allSubCourses = useMemo(() => {
    return courseData.flatMap((course) =>
      (course.sub_courses || []).map((sub) => ({
        id: sub.sub_co_id,
        name: sub.sub_name,
        slug: sub.slug,
        image: sub.image,
        duration: sub.duration,
        category: course.course_name,
      }))
    );
  }, [courseData]);

  


  /* ================= FILTER ================= */

  const filteredCourses = useMemo(() => {
    if (activeTab === "All") return allSubCourses;

    return allSubCourses.filter((c) => c.category === activeTab);
  }, [activeTab, allSubCourses]);

  /* ================= LIMIT ================= */

  const LIMIT = isMobile ? 6 : 14;

  const displayedCourses = showAll
    ? filteredCourses
    : filteredCourses.slice(0, LIMIT);

  /* ================= UI ================= */

  return (
    <section className="relative py-16 lg:py-24 bg-gradient-to-b from-[#F8FAFF] to-white overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-blue-100 rounded-full blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2" />

      <div className="relative max-w-7xl mx-auto px-4">
        {/* ================= HEADER ================= */}

        <div className="text-center mb-10">
          <h2
            className="
             text-4xl font-semibold mb-6
            "
          >
             Courses
          </h2>

          <p
            className="
              text-gray-500
              text-sm
              md:text-base
              max-w-2xl
              mx-auto
              leading-relaxed
            "
          >
            In-demand Courses Across multiple Domains Top rated Courses in diverse areas 
          </p>
        </div>

        {/* ================= TABS ================= */}

        <div
          className="
            flex gap-3
            overflow-x-auto
            no-scrollbar
            pb-2
            mb-10
            justify-start lg:justify-center
          "
        >
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => {
                setActiveTab(tab);
                setShowAll(false);
              }}
              className={`
                whitespace-nowrap
                px-5 py-2.5
                rounded-full
                text-sm
                font-medium
                transition-all
                duration-300
                border

                ${
                  activeTab === tab
                    ? `
                      bg-[#0057FF]
                      text-white
                      border-[#0057FF]
                      shadow-lg shadow-blue-100
                    `
                    : `
                      bg-white
                      text-gray-600
                      border-gray-200
                      hover:border-blue-200
                      hover:text-blue-600
                      hover:bg-blue-50
                    `
                }
              `}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ================= GRID ================= */}

        <div
          className="
            grid
            grid-cols-2
            sm:grid-cols-3
            md:grid-cols-4
            lg:grid-cols-5
            xl:grid-cols-7
            gap-4
            lg:gap-6
          "
        >
          {displayedCourses.map((course) =>{        
            return(
                <div className="flex justify-center">
  <div
    key={course.id}
    className="
      relative bg-white
      border border-[#D9D9D9]
      rounded-[14px]
      shadow-sm
      transition-all duration-300
      hover:shadow-md hover:-translate-y-1
      flex flex-col items-center justify-between
      pt-4 pb-3
      w-full
      h-[135px]
    "
  >
    {course.duration && (
      <span
        className="
          absolute top-0 right-0
          bg-[#FF6E00]
          text-white
          text-[10px]
          font-semibold
          h-[22px]
          px-[10px]
          flex items-center
          rounded-tr-[14px]
          rounded-bl-[14px]
        "
      >
        {course.duration}
      </span>
    )}

    <img
  src={
    course.image
      ? `${import.meta.env.VITE_API_BASE_URL}/${course.image
          .replace(/^\/+/, "")
          .replace(/^api\/*/, "")}`
      : "/default-course.png"
  }
  alt={course.name}
  loading="lazy"
  className="object-contain h-8 w-8"
/>

    <h3 className="text-[12px] font-semibold text-[#1E1E1E] text-center leading-[14px] px-2">
      {course.name || "N/A"}
    </h3>

    <button
      onClick={() => {
        if (course.slug) {
          navigate(`/coursepage/${course.slug}`);
        }
      }}
      className="
        mt-[6px]
        bg-[#0057FF]
        text-white
        text-[11px]
        px-5 py-[4px]
        rounded-full
        hover:bg-[#0046c2]
        transition
      "
    >
      View
    </button>
  </div>
</div>
            )
          }
           
           )}
        </div>

        {/* ================= VIEW ALL ================= */}

        {filteredCourses.length > LIMIT && (
          <div className="flex justify-center mt-12">
           <button
            onClick={() => navigate("/coursefilter")}
            className="bg-blue-600 text-white text-sm px-6 py-2 rounded-full hover:bg-blue-700 transition"
          >
            View All →
          </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default CourseSection;