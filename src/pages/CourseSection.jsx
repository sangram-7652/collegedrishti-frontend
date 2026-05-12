import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";

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
          <span
            className="
              inline-flex items-center
              px-4 py-1.5
              rounded-full
              bg-blue-50
              text-blue-600
              text-sm
              font-semibold
              mb-4
            "
          >
            Explore Programs
          </span>

          <h2
            className="
              text-3xl
              md:text-5xl
              font-extrabold
              text-[#111827]
              leading-tight
              mb-4
            "
          >
            Discover Trending Courses
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
            Learn industry-demanded skills with top universities and
            professional programs designed for your career growth.
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
                  <div
              key={course.id}
              className="
                group
                relative
                bg-white/90
                backdrop-blur
                border border-[#EEF2FF]
                rounded-[24px]
                overflow-hidden
                shadow-[0_4px_20px_rgba(0,0,0,0.04)]
                hover:shadow-[0_10px_35px_rgba(0,87,255,0.12)]
                transition-all
                duration-500
                hover:-translate-y-2
                flex flex-col
                items-center
                justify-between
                px-3
                py-5
                min-h-[190px]
              "
            >
              {/* Top Glow */}
              <div
                className="
                  absolute
                  inset-0
                  pointer-events-none
                  bg-gradient-to-br
                  from-blue-50/0
                  via-blue-50/0
                  to-blue-100/40
                  opacity-0
                  group-hover:opacity-100
                  transition
                "
              />

              {/* Duration */}
              {course.duration && (
                <span
                  className="
                    absolute
                    top-0
                    right-0
                    bg-gradient-to-r
                    from-[#FF7A00]
                    to-[#FF9500]
                    text-white
                    text-[10px]
                    font-bold
                    px-3
                    py-1
                    rounded-tr-[22px]
                    rounded-bl-[18px]
                    shadow-md
                  "
                >
                  {course.duration}
                </span>
              )}

              {/* Image Wrapper */}
              <div
                className="
                  relative
                  z-10
                  w-[68px]
                  h-[68px]
                  rounded-2xl
                  bg-gradient-to-br
                  from-[#F3F7FF]
                  to-[#EEF3FF]
                  flex
                  items-center
                  justify-center
                  mb-4
                  group-hover:scale-110
                  transition
                  duration-500
                "
              >
              <img
                  loading="lazy"
                  decoding="async"
                  src={`http://localhost:8000/${course.image}`}
                  alt={course.name}
                  className="
                    w-full
                    h-full
                    object-cover
                  "
                  onError={(e) => {
                    console.log("FAILED:", e.target.src);
                  }}
                />
              </div>

              {/* Course Name */}
              <h4
                className="
                  text-[13px]
                  font-semibold
                  text-center
                  text-[#111827]
                  leading-[18px]
                  line-clamp-2
                  min-h-[38px]
                  mb-4
                "
              >
                {course.name}
              </h4>

              {/* Button */}
              <button
                onClick={() => {
                  if (course.slug) {
                    navigate(`/coursepage/${course.slug}`);
                  }
                }}
                className="
                  relative
                  z-10
                  mt-auto
                  bg-[#0057FF]
                  text-white
                  text-[11px]
                  font-semibold
                  px-5
                  py-2
                  rounded-full
                  hover:bg-[#0047D6]
                  transition-all
                  duration-300
                  shadow-md
                  hover:shadow-blue-200
                "
              >
                View Course
              </button>
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
              className="
                group
                inline-flex
                items-center
                gap-2
                bg-[#0057FF]
                text-white
                px-7
                py-3
                rounded-full
                text-sm
                font-semibold
                shadow-lg shadow-blue-100
                hover:bg-[#0047D6]
                transition-all
                duration-300
              "
            >
              Explore All Courses

              <span className="group-hover:translate-x-1 transition">
                →
              </span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default CourseSection;