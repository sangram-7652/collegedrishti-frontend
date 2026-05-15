import React, { useState, useEffect, useMemo } from "react";
import api from "../api/axios";
import MobileFooterNav from "../components/MobileFooterNav";
import MobileMenu from "../pages/MobileMenu";
import Header from "../pages/Header";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

const INITIAL_LIMIT = 50;

// ================= COURSE CARD =================

const CourseCard = ({ course, onView }) => {
  return (
    <div className="flex justify-center">
      <div
        className="
          relative bg-white
          border border-[#D9D9D9]
          rounded-[14px]
          shadow-sm
          transition-all duration-300
          hover:shadow-md hover:-translate-y-1
          flex flex-col items-center justify-between
          pt-4 pb-3
          w-full max-w-[166px]
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
              ? `https://api.collegedrishti.com/${course.image
                  .replace(/^\/+/, "")
                  .replace(/^api\/*/, "")}`
              : "/default-course.png"
          }
          alt={course.sub_name}
          loading="lazy"
          className="object-contain h-8 w-8"
        />

        <h3 className="text-[12px] font-semibold text-[#1E1E1E] text-center leading-[14px] px-2">
          {course.sub_name || "N/A"}
        </h3>

        <button
          onClick={() => onView(course)}
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
  );
};

// ================= SIDEBAR =================

const SidebarFilters = ({
  filters,
  onFilterChange,
  onDurationChange,
  filterOptions,
}) => (
  <div className="text-sm">
    {/* Filter Header */}
    <div
      className="
        w-full bg-[#E7ECFF]
        rounded-full
        text-[#4A5CF0]
        font-semibold
        flex items-center justify-between
        px-5 py-3 mb-6
      "
    >
      <span className="text-[14px]">Filter</span>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10 6h10M6 6h.01M10 12h10M6 12h.01M6 18h10"
        />
      </svg>
    </div>

    {/* Mode */}
    <div className="mb-6">
      <p className="font-bold text-[14px] mb-3">Mode of Education</p>

      {filterOptions?.modeOfEducation?.map((label) => (
        <label
          key={label}
          className="flex items-center gap-2 mb-2 cursor-pointer"
        >
          <input
            type="checkbox"
            className="accent-[#0057FF]"
            checked={filters.modeOfEducation.includes(label)}
            onChange={() => onFilterChange("modeOfEducation", label)}
          />

          <span className="text-[13px]">{label}</span>
        </label>
      ))}
    </div>

    {/* Dynamic Sections */}
    {[
      {
        title: "Programme",
        type: "programmes",
        values: filterOptions?.programmes || [],
      },
      {
        title: "Courses",
        type: "courses",
        values: filterOptions?.courses || [],
      },
    ].map((section) => (
      <div key={section.title} className="mb-6">
        <p className="font-bold text-[14px] mb-3">{section.title}</p>

        {section.values.map((label) => (
          <label
            key={label}
            className="flex items-center gap-2 mb-2 cursor-pointer"
          >
            <input
              type="checkbox"
              className="accent-[#0057FF]"
              checked={filters[section.type].includes(label)}
              onChange={() => onFilterChange(section.type, label)}
            />

            <span className="text-[13px]">{label}</span>
          </label>
        ))}
      </div>
    ))}

    {/* Duration */}
    <div className="mb-6">
      <p className="font-bold text-[14px] mb-4">Duration</p>

      <input
        type="range"
        min="1"
        max="5"
        value={filters.duration.max || 5}
        className="w-full accent-[#0057FF]"
        onChange={(e) => {
          const value = parseInt(e.target.value);

          onDurationChange("min", 0);
          onDurationChange("max", value);
        }}
      />

      <div className="flex items-center gap-3 mt-4">
        <input
          type="number"
          placeholder="Min"
          value={filters.duration.min || ""}
          className="w-[90px] border px-2 py-2 rounded-lg"
          onChange={(e) => onDurationChange("min", e.target.value)}
        />

        <span>-</span>

        <input
          type="number"
          placeholder="Max"
          value={filters.duration.max || ""}
          className="w-[90px] border px-2 py-2 rounded-lg"
          onChange={(e) => onDurationChange("max", e.target.value)}
        />
      </div>
    </div>
  </div>
);

// ================= MAIN PAGE =================

const CoursePage = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [filterOptions, setFilterOptions] = useState({
    programmes: [],
    courses: [],
    university: [],
    modeOfEducation: [],
  });

  const [filters, setFilters] = useState({
    programmes: [],
    courses: [],
    duration: { min: null, max: null },
    modeOfEducation: [],
    university: [],
  });

  const [isMobileFiltersOpen, setIsMobileFiltersOpen] =
    useState(false);

  // ================= FETCH =================

  useEffect(() => {
    setLoading(true);

    api
      .get("/course-filter?page=1")
      .then((response) => {
        const rawData = response.data.data.data;

        const cleanData = rawData
          .filter(
            (course) =>
              Array.isArray(course.sub_courses) &&
              course.sub_courses.length > 0
          )
          .map((course) => ({
            ...course,
            sub_courses: course.sub_courses.filter(
              (sub) => sub.slug && sub.sub_name
            ),
          }))
          .filter((course) => course.sub_courses.length > 0);

        setCourses(cleanData);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      })
      .finally(() => setLoading(false));
  }, []);

  // ================= FILTER OPTIONS =================

  useEffect(() => {
    if (!courses.length) return;

    const programmes = new Set();
    const coursesSet = new Set();
    const universities = new Set();
    const modes = new Set();

    courses.forEach((course) => {
      if (course.course_name)
        programmes.add(course.course_name);

      course.sub_courses.forEach((sub) => {
        if (sub.sub_name) coursesSet.add(sub.sub_name);
        if (sub.university)
          universities.add(sub.university);
        if (sub.mode) modes.add(sub.mode);
      });
    });

    setFilterOptions({
      programmes: [...programmes],
      courses: [...coursesSet],
      university: [...universities],
      modeOfEducation: [...modes],
    });
  }, [courses]);

  // ================= HELPERS =================

  const getDurationInYears = (duration) => {
    if (!duration) return 0;
    return parseInt(duration);
  };

  // ================= FILTERED COURSES =================

  const filteredSubCourses = useMemo(() => {
    let result = [];

    const query = searchTerm.toLowerCase().trim();

    courses.forEach((course) => {
      if (
        filters.programmes.length > 0 &&
        !filters.programmes.includes(course.course_name)
      ) {
        return;
      }

      course.sub_courses.forEach((sub) => {
        const matchesSearch =
          sub.sub_name?.toLowerCase().includes(query) ||
          course.course_name
            ?.toLowerCase()
            .includes(query) ||
          sub.university?.toLowerCase().includes(query) ||
          sub.mode?.toLowerCase().includes(query);

        if (query && !matchesSearch) return;

        if (
          filters.courses.length > 0 &&
          !filters.courses.includes(sub.sub_name)
        ) {
          return;
        }

        if (
          filters.modeOfEducation.length > 0 &&
          (!sub.mode ||
            !filters.modeOfEducation.includes(sub.mode))
        ) {
          return;
        }

        if (filters.duration.min || filters.duration.max) {
          const num = getDurationInYears(sub.duration);

          if (
            filters.duration.min &&
            num < filters.duration.min
          ) {
            return;
          }

          if (
            filters.duration.max &&
            num > filters.duration.max
          ) {
            return;
          }
        }

        result.push(sub);
      });
    });

    return result.slice(0, INITIAL_LIMIT);
  }, [courses, filters, searchTerm]);

  // ================= HANDLERS =================

  const handleViewClick = (course) => {    
    if (!course.slug) return;
    navigate(`/coursepage/${course.slug.toLowerCase()}`);
  };

  const handleFilterChange = (type, value) => {
    setFilters((prev) => {
      const arr = prev[type];

      return {
        ...prev,
        [type]: arr.includes(value)
          ? arr.filter((v) => v !== value)
          : [...arr, value],
      };
    });
  };

  const handleDurationChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      duration: {
        ...prev.duration,
        [key]: value ? parseInt(value) : null,
      },
    }));
  };

  // ================= UI =================

  return (
    <div className="w-full min-h-screen bg-white">
      <div className="hidden xl:block">
        <Header />
      </div>

      <div className="block xl:hidden">
        <MobileMenu />
      </div>

      <div className="max-w-[1440px] mx-auto px-5 lg:px-8 pt-10 pb-16">
        {/* Title */}
        <h1 className="text-[28px] font-bold text-center text-gray-900 mb-8">
          Courses
        </h1>

        {/* Search */}
        <div
          className="
            hidden sm:flex
            w-full
            bg-white
            border border-[#AFC6FF]
            rounded-2xl
            px-4 py-3
            items-center gap-3
            shadow-sm
            mb-8
            flex-wrap
          "
        >
          <input
            type="text"
            placeholder="What would you like to learn?"
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
            className="
              flex-1
              min-w-[200px]
              text-[14px]
              bg-transparent
              outline-none
            "
          />

          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="text-gray-400 hover:text-black"
            >
              ✕
            </button>
          )}

          <button
            className="
              min-w-[36px]
              min-h-[36px]
              rounded-full
              bg-[#0056D2]
              flex items-center justify-center
              text-white
            "
          >
            🔍
          </button>
        </div>

        {/* Content */}
        <div className="flex gap-10 items-start">
          {/* Sidebar */}
          <div className="hidden lg:block w-[280px] shrink-0">
            <aside className="sticky top-24">
              <SidebarFilters
                filters={filters}
                onFilterChange={handleFilterChange}
                onDurationChange={handleDurationChange}
                filterOptions={filterOptions}
              />
            </aside>
          </div>

          {/* Right */}
          <div className="flex-1">
            {/* Mobile Button */}
            <div className="lg:hidden mb-4">
              <button
                onClick={() =>
                  setIsMobileFiltersOpen(true)
                }
                className="
                  inline-flex items-center gap-2
                  px-4 py-2 rounded-full
                  bg-white border border-gray-300
                  text-sm shadow-sm
                "
              >
                Filters ☰
              </button>
            </div>

            {/* Grid */}
            {loading ? (
              <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {Array.from({
                  length: INITIAL_LIMIT,
                }).map((_, i) => (
                  <div
                    key={i}
                    className="
                      w-full max-w-[166px]
                      h-[135px]
                      rounded-[14px]
                      bg-gray-200
                      animate-pulse
                    "
                  />
                ))}
              </div>
            ) : filteredSubCourses.length === 0 ? (
              <div className="text-center py-20">
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  No Courses Found
                </h3>

                <p className="text-gray-500 text-sm">
                  Try changing filters or search
                  keywords.
                </p>
              </div>
            ) : (
              <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {filteredSubCourses.map((sub) => (
                  <CourseCard
                    key={sub.sub_co_id}
                    course={sub}
                    onView={handleViewClick}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters */}
      {isMobileFiltersOpen && (
        <div
          className="
            fixed inset-0 z-[999]
            bg-black/40
            flex items-end justify-center
            lg:hidden
          "
          onClick={() =>
            setIsMobileFiltersOpen(false)
          }
        >
          <div
            className="
              w-full bg-white
              rounded-t-[18px]
              pt-5 pb-[80px] px-5
              max-h-[60vh]
              overflow-y-auto
            "
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-[44px] h-[5px] bg-[#CFCFCF] rounded-full mx-auto mb-4" />

            <div className="flex items-center justify-between mb-4">
              <p className="text-[15px] font-semibold">
                All Filters
              </p>

              <button
                onClick={() =>
                  setIsMobileFiltersOpen(false)
                }
              >
                ✕
              </button>
            </div>

            <SidebarFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              onDurationChange={handleDurationChange}
              filterOptions={filterOptions}
            />
          </div>
        </div>
      )}

      <Footer />

      <div className="lg:hidden fixed bottom-0 w-full z-50">
        <MobileFooterNav />
      </div>
    </div>
  );
};

export default CoursePage;