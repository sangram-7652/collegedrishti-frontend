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
  } catch  {
    localStorage.removeItem("user");
    return null;
  }
};

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);

  if (parts.length === 2) {
    return decodeURIComponent(parts.pop().split(";").shift());
  }

  return null;
};

export default function Header({ showOnlySearch }) {
  const navigate = useNavigate();
  const location = useLocation();

  const headerRef = useRef(null);
  const searchRef = useRef(null);

  const debounceRef = useRef(null);
  const lastQueryRef = useRef("");
  const lastScrollYRef = useRef(0);

  const [courseData, setCourseData] = useState([]);

  const [userName, setUserName] = useState(null);

  const [showHeader, setShowHeader] = useState(true);

  const [headerHeight, setHeaderHeight] = useState(110);

  const [search, setSearch] = useState("");

  const [results, setResults] = useState([]);

  const [showResults, setShowResults] = useState(false);

  const [loading, setLoading] = useState(false);

  const [activeIndex, setActiveIndex] = useState(-1);

  /* ================= FETCH COURSES ================= */

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getCoursesWithSubCourses();

        setCourseData(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCourses();
  }, []);

  /* ================= USER ================= */

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

  /* ================= HEADER SCROLL ================= */

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

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [showOnlySearch]);

  /* ================= HEADER HEIGHT ================= */

  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }
  }, [showOnlySearch]);

  /* ================= CLICK OUTSIDE ================= */

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target)
      ) {
        setShowResults(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  /* ================= LOGOUT ================= */

  const handleLogout = () => {
    localStorage.removeItem("user");

    window.location.href = "/";
  };

  /* ================= SEARCH ================= */

  const handleSearch = async (value) => {
    const query = value.trim();

    setSearch(query);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    if (query.length < 2) {
      setResults([]);
      setShowResults(false);
      setLoading(false);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      try {
        setLoading(true);

        lastQueryRef.current = query;

        const res = await api.get(
          `/search?q=${encodeURIComponent(query)}`
        );

        if (lastQueryRef.current !== query) return;

        const data = Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data?.data)
          ? res.data.data
          : [];

        setResults(data);

        setShowResults(true);

        setActiveIndex(-1);
      } catch (error) {
        console.log("Search error:", error);

        setResults([]);

        setShowResults(true);
      } finally {
        setLoading(false);
      }
    }, 400);
  };

  return (
    <>
      <header
        ref={headerRef}
        className={`
          fixed top-0 left-0 w-full
          bg-white z-[9999]
          transition-transform duration-300
          transform-gpu
          will-change-transform
          border-b border-gray-100
          shadow-sm
          ${showHeader ? "translate-y-0" : "-translate-y-full"}
        `}
      >
        {!showOnlySearch && (
          <>
            {/* ================= TOP BAR ================= */}

            <div className="px-4 py-2 bg-[#F8FAFC] border-b border-gray-100 flex items-center justify-between text-sm">
              <span className="text-[#004aad] font-semibold">
                #Chuno Vahi Jo Hai Sahi !
              </span>

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
                    link: "https://www.linkedin.com/company/college-drishti-yv/",
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
                    className="hover:scale-110 transition"
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

            {/* ================= MIDDLE ================= */}

            <div className="px-10 py-4 flex items-center justify-between gap-6">
              {/* Logo */}
              <Link to="/">
                <img
                  src={College}
                  alt="College Drishti"
                  className="h-16 object-contain"
                />
              </Link>

              {/* ================= SEARCH ================= */}

              <div
                ref={searchRef}
                className="relative w-[560px]"
              >
                <div
                  className="
                    relative
                    w-full h-[52px]
                    bg-white
                    border border-gray-300
                    rounded-full
                    shadow-sm
                    overflow-hidden
                    focus-within:ring-2
                    focus-within:ring-blue-500
                    transition
                  "
                >
                  <input
                    type="text"
                    value={search}
                    onChange={(e) =>
                      handleSearch(e.target.value)
                    }
                    onFocus={() => {
                      if (results.length > 0) {
                        setShowResults(true);
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "ArrowDown") {
                        e.preventDefault();

                        setActiveIndex((prev) =>
                          prev < results.length - 1
                            ? prev + 1
                            : 0
                        );
                      }

                      if (e.key === "ArrowUp") {
                        e.preventDefault();

                        setActiveIndex((prev) =>
                          prev > 0
                            ? prev - 1
                            : results.length - 1
                        );
                      }

                      if (e.key === "Escape") {
                        setShowResults(false);
                      }

                      if (e.key === "Enter") {
                        e.preventDefault();

                        if (
                          activeIndex >= 0 &&
                          results[activeIndex]
                        ) {
                          const item =
                            results[activeIndex];

                          setShowResults(false);

                          setSearch("");

                          if (
                            item.type === "university"
                          ) {
                            navigate(
                              `/university/${item.slug}`
                            );
                          }

                          if (
                            item.type === "course"
                          ) {
                            navigate(
                              `/coursepage/${item.slug}`
                            );
                          }

                          return;
                        }

                        if (search.trim()) {
                          navigate(
                            `/coursefilter?search=${search}`
                          );
                        }
                      }
                    }}
                    placeholder="Search courses, universities..."
                    className="
                      w-full h-full
                      bg-transparent
                      pl-5 pr-14
                      text-sm
                      text-gray-800
                      placeholder:text-gray-400
                      outline-none
                    "
                  />

                  {/* Clear */}
                  {search && (
                    <button
                      onClick={() => {
                        setSearch("");
                        setResults([]);
                        setShowResults(false);
                      }}
                      className="
                        absolute
                        right-12
                        top-1/2
                        -translate-y-1/2
                        text-gray-400
                        hover:text-black
                      "
                    >
                      ✕
                    </button>
                  )}

                  {/* Search Button */}
                  <button
                    onClick={() => {
                      if (
                        search.trim().length >= 2
                      ) {
                        handleSearch(search);
                      }
                    }}
                    className="
                      absolute right-2 top-1/2
                      -translate-y-1/2
                      w-9 h-9
                      rounded-full
                      bg-[#0b5cff]
                      text-white
                      flex items-center justify-center
                      hover:bg-[#094ee0]
                      transition
                    "
                  >
                    <AiOutlineSearch size={17} />
                  </button>
                </div>

                {/* ================= RESULTS ================= */}

                {showResults && (
                  <div
                    className="
                      absolute top-[60px] left-0 w-full
                      bg-white
                      border border-gray-200
                      rounded-2xl
                      shadow-xl
                      overflow-hidden
                      z-50
                      max-h-[380px]
                      overflow-y-auto
                    "
                  >
                    {loading && (
                      <div className="px-5 py-4 text-sm text-gray-500">
                        Searching...
                      </div>
                    )}

                    {!loading &&
                      results.length === 0 && (
                        <div className="px-4 py-8 text-center">
                          <div className="text-3xl mb-2">
                            🔍
                          </div>

                          <p className="text-sm text-gray-500">
                            No results found for
                          </p>

                          <p className="font-semibold text-gray-700 mt-1">
                            "{search}"
                          </p>
                        </div>
                      )}

                    {!loading &&
                      results.map((item, index) => {
                        const label =
                          item.name ||
                          item.title ||
                          item.sub_name ||
                          "";

                        return (
                          <div
                            key={index}
                            onMouseEnter={() =>
                              setActiveIndex(index)
                            }
                            onClick={() => {
                              setShowResults(false);

                              setSearch("");

                              if (
                                item.type ===
                                "university"
                              ) {
                                navigate(
                                  `/university/${item.slug}`
                                );
                              }

                              if (
                                item.type === "course"
                              ) {
                                navigate(
                                  `/coursepage/${item.slug}`
                                );
                              }
                            }}
                            className={`
                              px-5 py-3
                              flex items-center justify-between
                              cursor-pointer
                              transition
                              ${
                                activeIndex === index
                                  ? "bg-blue-50"
                                  : "hover:bg-gray-50"
                              }
                            `}
                          >
                            <span className="text-sm text-gray-700">
                              {label}
                            </span>

                            <span
                              className={`
                                text-[10px]
                                px-2 py-1
                                rounded-full
                                font-medium
                                ${
                                  item.type ===
                                  "university"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-blue-100 text-blue-700"
                                }
                              `}
                            >
                              {item.type}
                            </span>
                          </div>
                        );
                      })}
                  </div>
                )}
              </div>

              {/* ================= RIGHT ================= */}

              <div className="flex items-center gap-6">
                {/* Learn & Earn */}
                <div
                  className="flex flex-col items-center text-xs text-blue-700 cursor-pointer"
                  onClick={() => {
                    if (location.pathname === "/") {
                      const section =
                        document.getElementById(
                          "learn-earn-section"
                        );

                      if (section) {
                        const headerOffset = 220;

                        const elementPosition =
                          section.getBoundingClientRect()
                            .top + window.scrollY;

                        window.scrollTo({
                          top:
                            elementPosition -
                            headerOffset,
                          behavior: "smooth",
                        });
                      }
                    } else {
                      navigate("/", {
                        state: {
                          scrollTo:
                            "learn-earn-section",
                        },
                      });
                    }
                  }}
                >
                  <span>Learn & Earn</span>

                  <img
                    src={Earn}
                    alt="Learn & Earn"
                    className="h-8"
                  />
                </div>

                {/* Find University */}
                <Link to="/suggesteduniversity">
                  <div className="flex flex-col items-center text-xs text-blue-700">
                    <span>Find my University</span>

                    <img
                      src={FindUni}
                      alt="Find My University"
                      className="h-8"
                    />
                  </div>
                </Link>

                {/* Login/Profile */}
                {userName ? (
                  <div className="flex items-center gap-3">
                    <Link
                      to="/user-dashboard"
                      className="
                        flex items-center gap-2
                        px-4 py-2
                        rounded-full
                        border border-blue-600
                        text-blue-700
                        hover:bg-blue-50
                        transition
                        text-sm
                        font-medium
                      "
                    >
                      <UserCircle2 size={18} />

                      Profile
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="
                        flex items-center gap-2
                        px-4 py-2
                        rounded-full
                        border border-red-500
                        text-red-600
                        hover:bg-red-50
                        transition
                        text-sm
                        font-medium
                      "
                    >
                      <LogOut size={16} />

                      Logout
                    </button>
                  </div>
                ) : (
                  <Link to="/login">
                    <button
                      className="
                        flex items-center gap-2
                        bg-blue-600
                        text-white
                        px-5 py-2
                        rounded-full
                        hover:bg-blue-700
                        transition
                        text-sm
                        font-medium
                      "
                    >
                      <UserCircle2 size={18} />

                      Login
                    </button>
                  </Link>
                )}
              </div>
            </div>

            {/* ================= NAV ================= */}

            <div className="bg-[#F8FAFC] border-t border-gray-200">
              <nav
                className="
                  flex justify-center items-center
                  gap-10 py-3
                  text-[15px]
                  font-medium
                  text-gray-700
                "
              >
                <CourseDropdown courseData={courseData} />

                <div
                  className="cursor-pointer hover:text-black transition"
                  onClick={() => {
                    if (location.pathname === "/") {
                      const section =
                        document.getElementById(
                          "explore-university"
                        );

                      if (section) {
                        const headerOffset = 150;

                        const elementPosition =
                          section.getBoundingClientRect()
                            .top + window.scrollY;

                        window.scrollTo({
                          top:
                            elementPosition -
                            headerOffset,
                          behavior: "smooth",
                        });
                      }
                    } else {
                      navigate("/", {
                        state: {
                          scrollTo:
                            "explore-university",
                        },
                      });
                    }
                  }}
                >
                  Best University
                </div>

                <Link
                  to="/blogs"
                  className="hover:text-black transition"
                >
                  Blogs
                </Link>

                <Link
                  to="/ContactUs"
                  className="hover:text-black transition"
                >
                  Contact Us
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