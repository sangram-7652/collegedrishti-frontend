

import { useState, useMemo, useEffect } from "react";
import api from "../api/axios";
import Header from "../pages/Header";
import MobileMenu from "../pages/MobileMenu";
import Footer from "../components/Footer";
import MobileFooterNav from "../components/MobileFooterNav";
import { Search, MapPin, Star, X, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";



const CollegeSearchPage = () => {
  const navigate = useNavigate();

  const [universities, setUniversities] = useState([]);
  const [courseData, setCourseData] = useState([]); // 🎯 Added
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    location: "",
    rating: "",
  });


  const allSubCourses = useMemo(() => {
  return courseData.flatMap(course => {
    const subs =
      course.sub_courses ||
      course.subCourses ||
      course.sub_course ||
      course.sub_course_list ||
      [];

    return subs.map(sub => ({
      id: sub.sub_co_id || sub.id,
      name: sub.sub_name || sub.name,
      slug: sub.slug,
      image: sub.image,
      duration: sub.duration,
      university_id: course.university_id || course.universityId,
      university_name: course.course_name || course.name,
      is_delete: sub.is_delete ?? 0,
    }));
  });
}, [courseData]);

  useEffect(() => {
  console.log("COURSE DATA:", courseData);
  console.log("SUB COURSES:", allSubCourses);
}, [courseData, allSubCourses]);




  // 🔹 Fetch Universities & Courses from Backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [uniRes, courseRes] = await Promise.all([
          api.get("/universities"),
          api.get("/dashboard"),
        ]);

        if (uniRes.data.success) setUniversities(uniRes.data.data);
        if (courseRes.data.success)
        setCourseData(courseRes.data.data);
      } catch (err) {
        console.error("API Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  


  const uniqueLocations = useMemo(
    () => [...new Set(universities.map((u) => u.address))],
    [universities]
  );

  const searchLower = searchQuery.toLowerCase();

  // 🎯 Course Filter (like CourseSection)
 const filteredCourseResults = useMemo(() => {
  if (!searchQuery)
    return allSubCourses.filter(c => String(c.is_delete) !== "1");

  return allSubCourses.filter(
    c =>
      String(c.is_delete) !== "1" &&
      c.name?.toLowerCase().includes(searchLower)
  );
}, [searchLower, searchQuery, allSubCourses]);



  // 🎯 University Filter (search + filter logic updated)
  const filteredUniversities = universities.filter((uni) => {
    const courseList = allSubCourses.filter(
      (c) => c.university_id === uni.id
    );

    const hasMatchingCourse =
      !searchQuery ||
      courseList.some((c) =>
        c.name?.toLowerCase().includes(searchLower)
      );

    const searchMatch =
      !searchQuery ||
      uni.name.toLowerCase().includes(searchLower) ||
      uni.address.toLowerCase().includes(searchLower) ||
      hasMatchingCourse;

    const locationMatch =
      !filters.location || uni.address === filters.location;

    const ratingMatch =
      !filters.rating ||
      (uni.rating ? uni.rating : 4.0) >= Number(filters.rating);

    return searchMatch && locationMatch && ratingMatch;
  });




  const clearFilters = () => {
    setSearchQuery("");
    setFilters({ location: "", rating: "" });
  };

  const getShortLocation = (address) =>
    address ? address.split(",")[0].split("-")[0].trim() : "";

  const handleViewCourse = (course) => {
    if (!course.slug) return;
    navigate(`/coursepage/${course.slug}`);
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">

      {/* HEADER */}
      <div className="hidden md:block sticky top-0 bg-white shadow-sm z-50">
        <Header />
      </div>
      <div className="block md:hidden sticky top-0 bg-white shadow-sm z-50">
        <MobileMenu />
      </div>

      {/* MAIN */}
      <main className="flex-1 pb-20 md:pb-0">

        {/* Search Section */}
        <section className="max-w-6xl mx-auto px-4 pt-5 pb-4">
          <h1 className="text-xl md:text-2xl font-bold text-center text-[#0A0D14]">
            University & Course Search
          </h1>

          {/* Search + Filters */}
          <div className="bg-white rounded-xl shadow-sm border p-3 space-y-3 mt-4">

            {/* Search Bar */}
            <div className="flex items-center gap-2 border rounded-full px-3 py-2 bg-gray-50">
              <Search className="w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search universities, courses or locations..."
                className="flex-1 bg-transparent text-sm outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")}>
                  <X className="w-4 h-4 text-gray-500" />
                </button>
              )}
            </div>

            {/* Filters */}
            <div className="flex items-center flex-wrap gap-2 text-xs md:text-sm">
              <Filter className="w-4 h-4 text-gray-500" />

              {/* Location Filter */}
              <select
                className="w-[110px] border rounded-full px-2 py-1 bg-white text-[11px]"
                value={filters.location}
                onChange={(e) =>
                  setFilters({ ...filters, location: e.target.value })
                }
              >
                <option value="">City</option>
                {uniqueLocations.map((loc) => (
                  <option key={loc} value={loc}>
                    {getShortLocation(loc)}
                  </option>
                ))}
              </select>

              {/* Rating Filter */}
              <select
                className="border rounded-full px-3 py-1 bg-white"
                value={filters.rating}
                onChange={(e) =>
                  setFilters({ ...filters, rating: e.target.value })
                }
              >
                <option value="">Any Rating</option>
                <option value="4.5">4.5+ Stars</option>
                <option value="4.0">4.0+ Stars</option>
              </select>

              <button
                onClick={clearFilters}
                className="ml-auto text-blue-600 hover:text-blue-800 font-medium"
              >
                Clear
              </button>
            </div>
          </div>
        </section>

        {/* ================= Universities Results ================= */}
        <section className="max-w-6xl mx-auto px-4 pb-6">
          <h2 className="text-lg font-bold mb-3">
            Universities ({filteredUniversities.length})
          </h2>

          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : filteredUniversities.length === 0 ? (
            <p className="text-center text-gray-500 mt-10">
              No universities found 😕
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredUniversities.map((college) => (
                <div key={college.id}
                  onClick={() => navigate(`/university/${college.id}`)}
                  className="bg-white p-4 rounded-xl shadow-sm border">

                  <img
                    src={college.image}
                    alt=""
                    className="w-full h-28 object-cover rounded-lg"
                  />

                  <h3 className="font-bold text-sm mt-2">{college.name}</h3>

                  <p className="text-[11px] text-gray-600 flex items-center mt-1">
                    <MapPin className="w-3 h-3 mr-1" />
                    {college.address}
                  </p>

                  <p className="text-[11px] text-gray-800 flex items-center gap-1 mt-1">
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                    {college.rating || "4.0"}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ================= Courses Results ================= */}
        <section className="max-w-6xl mx-auto px-4 pb-24 mt-8">
          <h2 className="text-lg font-bold mb-3">
            Courses ({filteredCourseResults.length})
          </h2>

          {filteredCourseResults.length === 0 ? (
            <p className="text-gray-500 text-sm">No matching courses found</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredCourseResults.map((course) => (
                <div
                  key={course.id}
                  onClick={() => handleViewCourse(course)}
                  className="bg-white border rounded-xl shadow-sm p-4 hover:shadow-md transition cursor-pointer"
                >

                  <img
                    src={
                      course.image?.startsWith("http")
                        ? course.image
                        : `https://api.collegedrishti.com/${course.image || ""}`
                    }
                    alt={course.name}
                    className="object-contain h-10 w-10 mx-auto mb-2"
                  />



                  <p className="text-[13px] font-semibold text-center text-gray-800 leading-tight">
                    {course.name}
                  </p>

                  <p className="text-[11px] text-gray-500 text-center mt-1">
                    {course.university_name}
                  </p>

                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* FOOTER */}
      <div className="hidden md:block mt-auto">
        <Footer />
      </div>
      <div className="block md:hidden fixed bottom-0 w-full">
        <MobileFooterNav />
      </div>
    </div>
  );
};

export default CollegeSearchPage;

