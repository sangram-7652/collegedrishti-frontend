import {
  useState,
  useMemo,
  useEffect,
} from "react";

import api from "../api/axios";

import Header from "../pages/Header";
import MobileMenu from "../pages/MobileMenu";

import Footer from "../components/Footer";
import MobileFooterNav from "../components/MobileFooterNav";

import {
  Search,
  MapPin,
  Star,
  X,
  Filter,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

const UniversitySearchPage = () => {
  const navigate = useNavigate();

  const [universities, setUniversities] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [searchQuery, setSearchQuery] =
    useState("");

  const [filters, setFilters] =
    useState({
      location: "",
      rating: "",
    });

  // ==============================
  // FETCH UNIVERSITIES
  // ==============================
  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const res = await api.get(
          "/universities"
        );

        if (res.data.success) {
          setUniversities(
            res.data.data || []
          );
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUniversities();
  }, []);

  // ==============================
  // UNIQUE LOCATIONS
  // ==============================
  const uniqueLocations = useMemo(() => {
    return [
      ...new Set(
        universities
          .map((u) => u.address)
          .filter(Boolean)
      ),
    ];
  }, [universities]);

  // ==============================
  // SEARCH LOWER
  // ==============================
  const searchLower = searchQuery
    .trim()
    .toLowerCase();

  // ==============================
  // FILTERED UNIVERSITIES
  // ==============================
  const filteredUniversities =
    useMemo(() => {
      return universities.filter(
        (uni) => {
          // SEARCH
          const matchesSearch =
            !searchLower ||
            uni.name
              ?.toLowerCase()
              .includes(
                searchLower
              ) ||
            uni.address
              ?.toLowerCase()
              .includes(
                searchLower
              );

          // LOCATION
          const matchesLocation =
            !filters.location ||
            uni.address ===
              filters.location;

          // RATING
          const matchesRating =
            !filters.rating ||
            Number(
              uni.rating || 4
            ) >=
              Number(
                filters.rating
              );

          return (
            matchesSearch &&
            matchesLocation &&
            matchesRating
          );
        }
      );
    }, [
      universities,
      searchLower,
      filters,
    ]);

  // ==============================
  // CLEAR FILTERS
  // ==============================
  const clearFilters = () => {
    setSearchQuery("");

    setFilters({
      location: "",
      rating: "",
    });
  };

  // ==============================
  // SHORT LOCATION
  // ==============================
  const getShortLocation = (
    address
  ) => {
    if (!address) return "";

    return address
      .split(",")[0]
      .split("-")[0]
      .trim();
  };

  return (
    <div className="bg-[#F7F9FC] min-h-screen flex flex-col">
      {/* ================= HEADER ================= */}

      <div className="hidden md:block sticky top-0 z-50 bg-white shadow-sm">
        <Header />
      </div>

      <div className="block md:hidden sticky top-0 z-50 bg-white shadow-sm">
        <MobileMenu />
      </div>

      {/* ================= MAIN ================= */}

      <main className="flex-1 pb-24 md:pb-0">
        {/* ================= HERO ================= */}

        <section className="bg-gradient-to-r from-[#0A66C2] to-[#004182] text-white py-10">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h1 className="text-2xl md:text-4xl font-bold">
              Find Your Perfect
              University
            </h1>

            <p className="text-sm md:text-base text-blue-100 mt-3 max-w-2xl mx-auto">
              Search top universities,
              compare ratings, and
              explore colleges across
              India.
            </p>

            {/* SEARCH BOX */}

            <div className="bg-white rounded-2xl shadow-xl p-4 mt-8 max-w-4xl mx-auto">
              {/* SEARCH */}

              <div className="flex items-center gap-2 border rounded-2xl px-4 py-3 bg-gray-50">
                <Search className="w-5 h-5 text-gray-400" />

                <input
                  type="text"
                  placeholder="Search university or city..."
                  className="flex-1 bg-transparent outline-none text-gray-800 text-sm"
                  value={searchQuery}
                  onChange={(e) =>
                    setSearchQuery(
                      e.target.value
                    )
                  }
                />

                {searchQuery && (
                  <button
                    onClick={() =>
                      setSearchQuery(
                        ""
                      )
                    }
                  >
                    <X className="w-4 h-4 text-gray-500" />
                  </button>
                )}
              </div>

              {/* FILTERS */}

              <div className="flex flex-wrap items-center gap-3 mt-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <Filter className="w-4 h-4" />

                  <span className="text-sm font-medium">
                    Filters
                  </span>
                </div>

                {/* LOCATION */}

                <select
                  className="
                    border
                    rounded-xl
                    px-3
                    py-2
                    text-sm
                    bg-white
                    outline-none
                  "
                  value={
                    filters.location
                  }
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      location:
                        e.target.value,
                    })
                  }
                >
                  <option value="">
                    Select City
                  </option>

                  {uniqueLocations.map(
                    (loc) => (
                      <option
                        key={loc}
                        value={loc}
                      >
                        {getShortLocation(
                          loc
                        )}
                      </option>
                    )
                  )}
                </select>

                {/* RATING */}

                <select
                  className="
                    border
                    rounded-xl
                    px-3
                    py-2
                    text-sm
                    bg-white
                    outline-none
                  "
                  value={
                    filters.rating
                  }
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      rating:
                        e.target.value,
                    })
                  }
                >
                  <option value="">
                    Any Rating
                  </option>

                  <option value="4.5">
                    4.5+ Stars
                  </option>

                  <option value="4.0">
                    4.0+ Stars
                  </option>
                </select>

                {/* CLEAR */}

                <button
                  onClick={
                    clearFilters
                  }
                  className="
                    ml-auto
                    text-sm
                    font-semibold
                    text-blue-600
                    hover:text-blue-800
                  "
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ================= RESULTS ================= */}

        <section className="max-w-6xl mx-auto px-4 py-8">
          {/* HEADER */}

          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Universities
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                {
                  filteredUniversities.length
                }{" "}
                universities found
              </p>
            </div>
          </div>

          {/* LOADING */}

          {loading ? (
            <div className="text-center py-20">
              <p className="text-gray-500">
                Loading
                universities...
              </p>
            </div>
          ) : filteredUniversities.length ===
            0 ? (
            <div className="bg-white rounded-2xl border shadow-sm p-10 text-center">
              <h3 className="text-lg font-semibold text-gray-800">
                No Universities
                Found
              </h3>

              <p className="text-sm text-gray-500 mt-2">
                Try changing your
                search or filters
              </p>
            </div>
          ) : (
            <div
              className="
                grid
                grid-cols-1
                sm:grid-cols-2
                lg:grid-cols-3
                gap-6
              "
            >
              {filteredUniversities.map(
                (college) => (
                  <div
                    key={college.id}
                    onClick={() =>
                      navigate(
                        `/university/${college.slug}`
                      )
                    }
                    className="
                      bg-white
                      rounded-2xl
                      overflow-hidden
                      border
                      shadow-sm
                      hover:shadow-xl
                      transition-all
                      duration-300
                      cursor-pointer
                      group
                    "
                  >
                    {/* IMAGE */}

                    <div className="relative overflow-hidden">
                      <img
                        src={
                          college.image
                        }
                        alt={
                          college.name
                        }
                        className="
                          w-full
                          h-52
                          object-cover
                          group-hover:scale-105
                          transition-transform
                          duration-500
                        "
                      />

                      {/* RATING */}

                      <div
                        className="
                          absolute
                          top-3
                          right-3
                          bg-white/95
                          px-3
                          py-1
                          rounded-full
                          flex
                          items-center
                          gap-1
                          shadow
                        "
                      >
                        <Star className="w-3 h-3 text-yellow-500 fill-current" />

                        <span className="text-xs font-semibold">
                          {college.rating ||
                            "4.0"}
                        </span>
                      </div>
                    </div>

                    {/* CONTENT */}

                    <div className="p-5">
                      <h3 className="font-bold text-lg text-gray-900 line-clamp-2">
                        {college.name}
                      </h3>

                      <div className="flex items-start gap-2 mt-3 text-gray-500">
                        <MapPin className="w-4 h-4 mt-[2px] shrink-0" />

                        <p className="text-sm line-clamp-2">
                          {
                            college.address
                          }
                        </p>
                      </div>

                      {/* BUTTON */}

                      <button
                        className="
                          mt-5
                          w-full
                          bg-[#0A66C2]
                          hover:bg-[#004182]
                          text-white
                          font-medium
                          py-3
                          rounded-xl
                          transition
                        "
                      >
                        View University
                      </button>
                    </div>
                  </div>
                )
              )}
            </div>
          )}
        </section>
      </main>

      {/* ================= FOOTER ================= */}

      <div className="hidden md:block">
        <Footer />
      </div>

      <div className="block md:hidden fixed bottom-0 w-full z-50">
        <MobileFooterNav />
      </div>
    </div>
  );
};

export default UniversitySearchPage;