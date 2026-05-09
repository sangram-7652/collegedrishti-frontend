
import React, { useState, useEffect, useMemo } from "react";
import api from "../api/axios";
import MobileFooterNav from "../components/MobileFooterNav";
import MobileMenu from "../pages/MobileMenu";
import Header from "../pages/Header";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

const INITIAL_LIMIT = 100;


// ========== SMALL UI HELPERS ==========

const Section = ({ title, children }) => (
  <div className="mb-5 border-b border-gray-100 pb-4 last:border-none">
    <h4 className="font-semibold mb-3 text-sm text-gray-800">{title}</h4>
    {children}
  </div>
);

const Checkbox = ({ label, checked, onChange }) => (
  <label className="flex items-center justify-between text-[13px] mb-2">
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        className="accent-blue-600 w-4 h-4 rounded"
        checked={checked}
        onChange={onChange}
      />
      <span className="text-gray-700">{label}</span>
    </div>
    <span className="text-[11px] text-gray-400">--</span>
  </label>
);



// ========== COURSE CARD ==========

const CourseCard = ({ course, onView }) => {
  return (
    <div
      className="h-full flex justify-center">
      <div className="relative bg-white
          border border-[#D9D9D9]
          rounded-[14px]
          shadow-[0_0_2px_rgba(0,0,0,0.12)]
          transition-all
          flex flex-col items-center justify-between
          pt-4 pb-3 
          w-[166px] h-[135px]">

        {course.duration && (
          <span className="absolute top-0 right-0
      bg-[#FF6E00]
      text-white
      text-[10px] font-semibold
      h-[22px] 
      px-[10px]
      flex items-center
      rounded-tr-[16px]
      rounded-bl-[16px]
    " style={{ borderTopLeftRadius: "0px", borderBottomRightRadius: "0px" }}>
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
          decoding="async"
          width="40"
          height="40"
          className="object-contain h-8 w-8 mb-2"
        />

        {/* Title — center small gap */}
        <h3 className="text-[12px] font-semibold text-[#1E1E1E] text-center leading-[14px]">
          {course.sub_name || "N/A"}
        </h3>

        {/* Button — EXACT DESIGN */}
        <button
          onClick={() => onView(course)}
          className="
            mt-[6px]
            bg-[#0057FF]
            text-white
            text-[11px]
            px-5 py-[3px]
            rounded-full
            shadow-[0_2px_4px_rgba(0,0,0,0.08)]
            hover:bg-[#0046c2]
          "
        >
          View
        </button>
      </div>
    </div>
  );
};



// ========== SIDEBAR FILTERS ==========

const SidebarFilters = ({
  filters,
  onFilterChange,
  onDurationChange,
  onResetFilters,
  onApplyFilters,
  filterOptions
}) => (
  <div className="text-sm">

    {/* FILTER TOP TAB */}
    <div className="w-full flex items-center justify-between gap-2 mb-6">
      {/* FILTER HEADER EXACT LIKE SCREENSHOT */}
      <div className="
  w-full bg-[#E7ECFF] 
  rounded-full 
  text-[#4A5CF0] 
  font-semibold 
  flex items-center justify-between 
  px-5 py-3 
  mb-6
">
        <span className="text-[14px]">Filter</span>
        {/* Same icon as screenshot */}
        <svg xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 text-[#4A5CF0]" fill="none"
          viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M10 6h10M6 6h.01M10 12h10M6 12h.01M6 18h10" />
          <circle cx="4" cy="6" r="2" fill="currentColor" />
          <circle cx="8" cy="12" r="2" fill="currentColor" />
          <circle cx="14" cy="18" r="2" fill="currentColor" />
        </svg>

        {/* <span className="text-[16px] rotate-90">⚙️</span> */}
      </div>

    </div>

    {/* ========== Mode of Education ========== */}
    <p className="font-bold text-[14px] text-[#2A2B2E] mb-3">Mode of Education</p>

    {/* {["Distance Learning", "Online", "Vocational Learning"].map((label) => ( */}
    {filterOptions?.modeOfEducation?.map(label => (
      <label key={label} className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            className="w-4 h-4 border-[2px] border-[#1B1B1B] rounded-[4px] accent-[#0057FF]"
            checked={filters.modeOfEducation.includes(label)}
            onChange={() => onFilterChange("modeOfEducation", label)}
          />
          <span className="text-[#1B1B1B] text-[13px]">{label}</span>
        </div>
      </label>
    ))}


    {[
      {
        title: "Programme",
        type: "programmes",
        values: filterOptions?.programmes
      },
      {
        title: "Courses",
        type: "courses",
        values: filterOptions?.courses || []
      },
      // {
      //   title: "University",
      //   type: "university",
      //   values: filterOptions?.university || []
      // }
    ].map((section) => (

      <div key={section.title} className="mb-5">
        <p className="font-bold text-[14px] text-[#2A2B2E] mb-3">{section.title}</p>

        {section.values.map((label) => (
          <label key={label} className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                className="w-4 h-4 border-[2px] border-[#1B1B1B] rounded-[4px] accent-[#0057FF]"
                checked={filters[section.type].includes(label)}
                onChange={() => onFilterChange(section.type, label)}
              />
              <span className="text-[#1B1B1B] text-[13px]">{label}</span>
            </div>
            {/* <span className="bg-[#E5E7EB] text-[#111827] text-[11px] px-[7px] py-[1px] rounded-full font-bold">{section.values.length}</span> */}
            <span>•</span>
          </label>
        ))}

        <button className="text-[#0057FF] text-[12px] font-medium">Show More ▼</button>
      </div>
    ))}

    {/* ========== Duration Filter (as screenshot) ========== */}
    <p className="font-bold text-[14px] text-[#2A2B2E] mb-4">Duration</p>

    <div className="flex items-center justify-between gap-3 mb-5">
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

    </div>

    <div className="flex items-center gap-3 mb-8">
      <input
        type="number"
        placeholder="Min Years"
        value={filters.duration.min || ""}
        className="w-[95px] border px-2 py-2 rounded-lg"
        onChange={(e) => onDurationChange("min", e.target.value)}
      />

      <span>Years -</span>

      <input
        type="number"
        placeholder="Max Years"
        value={filters.duration.max || ""}
        className="w-[95px] border px-2 py-2 rounded-lg"
        onChange={(e) => onDurationChange("max", e.target.value)}
      />
    </div>

  </div>
);


// ========== MAIN PAGE ==========

const CoursePage = () => {


  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();





  const [filterOptions, setFilterOptions] = useState({
    programmes: [],
    courses: [],
    university: [],
    modeOfEducation: []
  });



  useEffect(() => {
    if (!courses.length) return;

    const programmes = new Set();
    const coursesSet = new Set();
    const universities = new Set();
    const modes = new Set();

    courses.forEach(course => {
      if (course.course_name) programmes.add(course.course_name);

      course.sub_courses.forEach(sub => {
        if (sub.sub_name) coursesSet.add(sub.sub_name);
        if (sub.university) universities.add(sub.university);
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


  const [filters, setFilters] = useState({
    programmes: [],
    courses: [],
    duration: { min: null, max: null },
    modeOfEducation: [],
    university: [],
  });

  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);



  const handleViewClick = (course) => {
    if (!course.slug) return;
    navigate(`/coursepage/${course.slug}`);
  };


  // -------- API CALL (unchanged) --------
  useEffect(() => {
    setLoading(true);

    api.get("/course-filter?page=1")
      .then((response) => {
        const rawData = response.data.data.data; // 👈 pagination fix

        const cleanData = rawData
          .filter(course => Array.isArray(course.sub_courses) && course.sub_courses.length > 0)
          .map(course => ({
            ...course,
            sub_courses: course.sub_courses.filter(
              sub => sub.slug && sub.sub_name
            )
          }))
          .filter(course => course.sub_courses.length > 0);

        setCourses(cleanData);
        // setFilteredCourses(cleanData);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      })
      .finally(() => setLoading(false));
  }, []);


  // 👇 put this ABOVE useMemo
  const getDurationInYears = (duration) => {
    if (!duration) return 0;
    return parseInt(duration); // direct years
  };

  const filteredSubCourses = useMemo(() => {
    let result = [];

    courses.forEach(course => {
      // Programme filter
      if (
        filters.programmes.length > 0 &&
        !filters.programmes.includes(course.course_name)
      ) return;

      course.sub_courses.forEach(sub => {
        // Course filter
        if (
          filters.courses.length > 0 &&
          !filters.courses.includes(sub.sub_name)
        ) return;

        // Mode filter
        if (
          filters.modeOfEducation.length > 0 &&
          (!sub.mode || !filters.modeOfEducation.includes(sub.mode))
        ) return;

        // University filter
        if (
          filters.university.length > 0 &&
          (!sub.university || !filters.university.includes(sub.university))
        ) return;

        // Duration filter
        if (filters.duration.min || filters.duration.max) {
          const num = getDurationInYears(sub.duration);
          if (filters.duration.min && num < filters.duration.min) return;
          if (filters.duration.max && num > filters.duration.max) return;
        }

        result.push(sub);
      });
    });

    return result.slice(0, INITIAL_LIMIT);
  }, [courses, filters]);




  // -------- FILTER LOGIC (unchanged) --------


  const handleFilterChange = (type, value) => {
    setFilters(prev => {
      const arr = prev[type];
      return {
        ...prev,
        [type]: arr.includes(value)
          ? arr.filter(v => v !== value)
          : [...arr, value]
      };
    });
  };


  const handleDurationChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      duration: {
        ...prev.duration,
        [key]: value ? parseInt(value) : null,
      },
    }));
  };

  const resetFilters = () => {
    const reset = {
      programmes: [],
      courses: [],
      duration: { min: null, max: null },
      modeOfEducation: [],
      university: [],
    };
    setFilters(reset);
  };

  const resetDurationChip = () => {
    setFilters(prev => ({
      ...prev,
      duration: { min: null, max: null }
    }));
  };


  const removeFilterChip = (type, value) => {
    setFilters(prev => {
      // duration special case
      if (type === "duration") {
        return {
          ...prev,
          duration: { min: null, max: null },
        };
      }

      // normal array filters
      return {
        ...prev,
        [type]: prev[type].filter(v => v !== value),
      };
    });
  };


  return (
    <div className="w-full min-h-screen bg-white">
      <div className="hidden xl:block">
        <Header />
      </div>

      {/* MOBILE MENU - Mobile + Tablet Only */}
      <div className="block xl:hidden">
        <MobileMenu />
      </div>


      <div className="max-w-[1440px] mx-auto px-8 pt-10 pb-16">
        {/* Page title */}
        <h1 className="text-[28px] font-bold text-center text-gray-900 mb-6">
          Courses
        </h1>

        {/* Search Bar WITH Dynamic Chips Inside */}
        <div className="hidden sm:flex w-full bg-white border border-[#AFC6FF] rounded-full px-4 py-[6px] items-center gap-2 shadow-[0_0_4px_rgba(0,0,0,0.10)] overflow-x-auto no-scrollbar mb-8">

          {/* Input */}
          <input
            type="text"
            placeholder="What would you like to learn?"
            className="flex-1 min-w-[180px] text-[13px] font-medium bg-transparent
    placeholder:text-[#9EA3B0] outline-none border-none"
          />

          {/* DYNAMIC FILTER CHIPS Inside Searchbar */}
          <div className="flex gap-2 items-center">
            {Object.entries(filters).flatMap(([key, values]) =>
              Array.isArray(values)
                ? values.map((val) => (
                  <div
                    key={val}
                    className="px-3 py-[5px] bg-[#E7EEFF] border border-[#AFC6FF]
              text-[#0056D2] text-[12px] font-medium rounded-full flex items-center gap-1"
                  >
                    {val}
                    <button
                      onClick={() => removeFilterChip(key, val)}
                      className="ml-1 text-[#0056D2] font-bold text-[13px]"
                    >
                      ✕
                    </button>
                  </div>
                ))
                : []
            )}

            {/* Duration chip */}
            {(filters.duration.min !== null || filters.duration.max !== null) && (
              <div className="px-3 py-[5px] bg-[#E7EEFF] border border-[#AFC6FF] text-[#0056D2] text-[12px] font-medium rounded-full flex items-center gap-1">
                {filters.duration.min || "0"} - {filters.duration.max || "5"} Years
                <button
                  onClick={resetDurationChip}
                  className="ml-1 text-[#0056D2] font-bold text-[13px]"
                >
                  ✕
                </button>
              </div>
            )}
          </div>

          {/* Search ICON in same container */}
          <button className="min-w-[32px] min-h-[32px] rounded-full bg-[#0056D2]
    flex items-center justify-center text-white text-[13px]">
            🔍
          </button>
        </div>


        {/* Main content: sidebar + cards */}
        <div className="flex gap-10 items-start">
          {/* Desktop sidebar (now flat, no card) */}
          <div className="hidden lg:block w-[280px] shrink-0">
            <aside className="sticky top-24 pr-4">
              <SidebarFilters
                filters={filters}
                onFilterChange={handleFilterChange}
                onDurationChange={handleDurationChange}
                onResetFilters={resetFilters}
                filterOptions={filterOptions}   // ✅ ADD THIS
              />

            </aside>
          </div>

          {/* Right side cards */}
          <div className="flex-1">
            {/* Mobile Filters button (unchanged logic) */}
            <div className="lg:hidden mb-4">
              <button
                onClick={() => setIsMobileFiltersOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-300 text-sm text-gray-700 shadow-sm"
              >
                <span>Filters</span>
                <span className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center text-xs">
                  ☰
                </span>
              </button>
            </div>

            {/* ===== COURSES GRID ===== */}
            {loading ? (
              <div className="grid gap-x-6 gap-y-7 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5">
                {Array.from({ length: INITIAL_LIMIT }).map((_, i) => (
                  <div
                    key={i}
                    className="w-[166px] h-[135px] rounded-[14px] bg-gray-200 animate-pulse"
                  />
                ))}
              </div>
            ) : filteredSubCourses.length === 0 ? (
              <p className="text-center text-gray-500 mt-10">
                No courses available.
              </p>
            ) : (
              <div className="grid gap-x-6 gap-y-7 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5">
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

      {/* Mobile bottom-sheet filters (unchanged) */}
      {isMobileFiltersOpen && (
        <div
          className="fixed inset-0 z-[999] bg-black/40 flex items-end justify-center lg:hidden"
          onClick={() => setIsMobileFiltersOpen(false)}
        >
          <div
            className="
        w-full relative
        bg-white
        rounded-t-[18px]
        pt-5 pb-[80px] px-5
        max-h-[60vh]   /* 👈 HEIGHT FIX */
        overflow-y-auto
      "
            style={{
              boxShadow:
                "0px -4.52px 10.16px 0px #8787870F, 0px -19.19px 19.19px 0px #8787870F, 0px -41.78px 24.84px 0px #87878708, 0px -74.52px 30.49px 0px #87878703, 0px -117.43px 32.74px 0px #87878700",
              borderTopLeftRadius: "18.07px",
              borderTopRightRadius: "18.07px",
              borderTop: "1.13px solid #E5E5E5",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* TOP DRAG HANDLE */}
            <div className="w-[44px] h-[5px] bg-[#CFCFCF] rounded-full mx-auto mb-4" />

            {/* HEADER */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-[15px] font-semibold text-gray-900">All Filters</p>
              <button className="text-[13px]" onClick={() => setIsMobileFiltersOpen(false)}>
                ✕
              </button>
            </div>

            {/* FILTER SIDEBAR CONTENT */}
            <SidebarFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              onDurationChange={handleDurationChange}
              onResetFilters={resetFilters}
            />

          </div>

        </div>
      )}

      <Footer />

      {/* MOBILE BOTTOM NAV */}
      <div className="lg:hidden fixed bottom-0 w-full z-50">
        <MobileFooterNav />
      </div>
    </div>
  );
};

export default CoursePage;






