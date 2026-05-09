import api from "../api/axios";
import { getCoursesWithSubCourses } from "../api/courseCache";
import { useEffect, useRef, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Earn from "../course-image/earn.png";
import FindUni from "../course-image/uni.png";
import College from "../assets/college.png";
import CourseDropdown from "../pages/CourseDropdown";
import { UserCircle2, LogOut } from "lucide-react";
import fb from "../assets/facebook.svg";
import yt from "../assets/youtube.svg";
import ig from "../assets/instagram.svg";
import li from "../assets/linkedin.svg";

const getUserFromStorage = () => {
  try {
    const user = localStorage.getItem("user");
    if (!user || user === "undefined") return null;
    return JSON.parse(user);
  } catch (e) {
    localStorage.removeItem("user");
    return null;
  }
};

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2)
    return decodeURIComponent(parts.pop().split(";").shift());
  return null;
};

export default function Header({ showOnlySearch }) {
  const headerRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [userName, setUserName] = useState(null);
  const [courseData, setCourseData] = useState([]);
  const [headerHeight, setHeaderHeight] = useState(110);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const debounceRef = useRef(null);
  const lastQueryRef = useRef("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setCourseData(await getCoursesWithSubCourses());
      } catch (err) {
        console.error(err);
      }
    };

    fetchCourses();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  useEffect(() => {
    const user = getUserFromStorage();
    if (user?.name) {
      setUserName(user.name);
      return;
    }

    const nameFromCookie = getCookie("sname");
    if (nameFromCookie) {
      setUserName(nameFromCookie);
    }
  }, []);

  const [showHeader, setShowHeader] = useState(true);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const lastScrollYRef = useRef(0);
  useEffect(() => {
    if (showOnlySearch) {
      setShowHeader(false);
      return;
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const diff = currentScrollY - lastScrollYRef.current;

      if (Math.abs(diff) < 10) return;

      if (currentScrollY < 100) {
        setShowHeader(true);
      } else if (diff > 0 && currentScrollY > 150) {
        setShowHeader(false);
      } else if (diff < 0) {
        setShowHeader(true);
      }

      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showOnlySearch]);

  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }
  }, [showOnlySearch]);

  const handleSearch = (value) => {
    setSearch(value);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (value.length < 2) {
      setResults([]);
      setShowResults(false);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      try {
        setLoading(true);

        lastQueryRef.current = value;

        const res = await api.get(`/search?q=${value}`);

        if (lastQueryRef.current !== value) return;

        setResults(res.data || []);
        setShowResults(true);
        setActiveIndex(-1);
      } catch (error) {
        console.log("Search error:", error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 300);
  };

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 w-full bg-white z-[9999] transition-transform duration-300 transform-gpu [backface-visibility:hidden] will-change-transform ${showHeader ? "translate-y-0" : "-translate-y-full"}`}
      >
        {!showOnlySearch && (
          <>
            <div className="px-4 py-2 flex justify-between items-center text-sm bg-[#f6f6f6]">
              <span className="text-[#004aad] font-medium">
                #Chuno Vahi Jo Hai Sahi !
              </span>
              <div className="flex gap-2">
                <a
                  href="https://www.facebook.com/share/19fJ4pK5HA/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={fb}
                    alt="facebook"
                    className="w-4 h-4 sm:w-5 sm:h-5 hover:scale-110 transition duration-200"
                  />
                </a>

                {/* YouTube */}
                <a
                  href="https://youtube.com/@collegedrishti"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={yt}
                    alt="youtube"
                    className="w-4 h-4 sm:w-5 sm:h-5 hover:scale-110 transition duration-200"
                  />
                </a>

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/company/college-drishti-yv/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={li}
                    alt="linkedin"
                    className="w-4 h-4 sm:w-5 sm:h-5 hover:scale-110 transition duration-200"
                  />
                </a>

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/college_drishti"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={ig}
                    alt="instagram"
                    className="w-4 h-4 sm:w-5 sm:h-5 hover:scale-110 transition duration-200"
                  />
                </a>
              </div>
            </div>

            {/* Middle Header */}
            <div className="px-10 py-3 flex items-center justify-between gap-4">
              <Link to="/">
                <img src={College} alt="College Drishti" className="h-18" />
              </Link>

              <div className="relative w-[544px] h-[48px]">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => handleSearch(e.target.value)}
                  onKeyDown={(e) => {
                    if (!showResults || results.length === 0) return;

                    if (e.key === "ArrowDown") {
                      setActiveIndex((prev) => (prev + 1) % results.length);
                    }

                    if (e.key === "ArrowUp") {
                      setActiveIndex(
                        (prev) => (prev - 1 + results.length) % results.length,
                      );
                    }

                    if (e.key === "Enter" && activeIndex >= 0) {
                      const item = results[activeIndex];
                      if (item.type === "university") {
                        window.location.href = `/university/${item.slug}`;
                      }
                      if (item.type === "course") {
                        window.location.href = `/coursepage/${item.slug}`;
                      }
                    }
                  }}
                  placeholder="What would you like to learn?"
                  className="w-full h-full bg-white text-gray-800 placeholder:text-gray-400 rounded-[50px] border border-[#1f2937] pl-4 pr-14 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0b5cff]"
                />

                <button
                  className="
                        absolute right-2 top-1/2 -translate-y-1/2
                        w-8 h-8
                        bg-[#0b5cff] text-white
                        rounded-full
                        flex items-center justify-center
                        hover:bg-[#0a4fe0] transition
                      "
                  onClick={() => handleSearch(search)}
                >
                  <AiOutlineSearch size={16} />
                </button>

                {showResults && (
                  <div className="absolute top-[56px] left-0 w-full bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden max-h-[320px] overflow-y-auto">
                    {loading && (
                      <div className="px-4 py-3 text-sm text-gray-500">
                        Searching...
                      </div>
                    )}

                    {!loading && results.length === 0 && (
                      <div className="px-4 py-3 text-sm text-gray-500">
                        No results found for "<b>{search}</b>"
                      </div>
                    )}

                    {!loading &&
                      results.map((item, index) => {
                        const label =
                          item.name || item.title || item.sub_name || "";

                        return (
                          <div
                            key={index}
                            className={`px-4 py-2 cursor-pointer flex justify-between text-sm
              ${activeIndex === index ? "bg-blue-100" : "hover:bg-blue-50"}`}
                            onMouseEnter={() => setActiveIndex(index)}
                            onClick={() => {
                              setShowResults(false);
                              setSearch("");

                              if (item.type === "university") {
                                window.location.href = `/university/${item.slug}`;
                              }

                              if (item.type === "course") {
                                window.location.href = `/coursepage/${item.slug}`;
                              }
                            }}
                          >
                            <span>
                              {label
                                .split(new RegExp(`(${search})`, "gi"))
                                .map((part, i) =>
                                  part.toLowerCase() ===
                                  search.toLowerCase() ? (
                                    <b key={i} className="text-blue-600">
                                      {part}
                                    </b>
                                  ) : (
                                    part
                                  ),
                                )}
                            </span>

                            <span
                              className={`text-[10px] px-2 py-0.5 rounded-full
              ${
                item.type === "university"
                  ? "bg-green-100 text-green-700"
                  : "bg-blue-100 text-blue-700"
              }`}
                            >
                              {item.type}
                            </span>
                          </div>
                        );
                      })}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-6">
                <div
                  className="flex flex-col items-center text-xs text-blue-700 cursor-pointer"
                  onClick={() => {
                    if (location.pathname === "/") {
                      const section =
                        document.getElementById("learn-earn-section");
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
                        state: { scrollTo: "learn-earn-section" },
                        key: Date.now(),
                      });
                    }
                  }}
                >
                  <span>Learn & Earn</span>
                  <img
                    src={Earn}
                    alt="Learn & Earn"
                    className="h-8 mb-1 float"
                  />
                </div>

                <Link to="/suggesteduniversity">
                  <div className="flex flex-col items-center text-xs text-blue-700">
                    <span>Find my University</span>
                    <img
                      src={FindUni}
                      alt="Find My University"
                      className="h-8 mb-1 float"
                    />
                  </div>
                </Link>

                {userName ? (
                  <div className="flex items-center gap-3">
                    <Link
                      to="/user-dashboard"
                      className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-600 text-blue-700 hover:bg-blue-50 transition text-sm font-medium"
                    >
                      <UserCircle2 size={18} />
                      <span className="hidden md:inline">Profile</span>
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-red-500 text-red-600 hover:bg-red-50 transition text-sm font-medium"
                    >
                      <LogOut size={16} />
                      <span className="hidden md:inline">Logout</span>
                    </button>
                  </div>
                ) : (
                  <Link to="/signup">
                    <button className="flex items-center gap-2 bg-blue-600 text-white px-5 py-1.5 rounded-full hover:bg-blue-700 transition text-sm font-medium">
                      <UserCircle2 size={18} />
                      Login
                    </button>
                  </Link>
                )}
              </div>
            </div>

            <div className="bg-[#efefef] border-t border-gray-200">
              <nav className="flex justify-center items-center gap-10 py-3 text-[15px] font-medium text-gray-700">
                <div className="flex items-center">
                  <CourseDropdown courseData={courseData} />
                </div>

                <div
                  className="flex items-center gap-1 cursor-pointer hover:text-black transition"
                  onClick={() => {
                    if (location.pathname === "/") {
                      const section =
                        document.getElementById("explore-university");
                      if (section) {
                        const headerOffset = 150;
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
                        state: { scrollTo: "explore-university" },
                      });
                    }
                  }}
                >
                  <span>Best University</span>
                </div>

                <Link to="/blogs">
                  <div className="flex items-center gap-1 cursor-pointer hover:text-black transition">
                    <span>Blogs</span>
                  </div>
                </Link>

                <Link to="/ContactUs">
                  <div className="flex items-center gap-1 cursor-pointer hover:text-black transition">
                    <span>Contact Us</span>
                  </div>
                </Link>
              </nav>
            </div>
          </>
        )}
      </header>
      <div style={{ height: headerHeight }} />
    </>
  );
}
