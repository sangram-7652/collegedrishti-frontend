
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Jain from "../assets/jain.png";
import { useLocation } from "react-router-dom";
import api from "../api/axios";
import ShadeWaveLoader from "../components/ShadeWaveLoader";

const ExploreSection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [exploreItems, setExploreItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  // ✅ Fetch API (with cleanup)
  useEffect(() => {
    let isMounted = true;

    const fetchUniversities = async () => {
      try {
        const res = await api.get("/universities");
        if (isMounted) {
          setExploreItems(res.data?.data || []);
        }
      } catch (error) {
        console.error("Error fetching universities:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchUniversities();

    return () => {
      isMounted = false;
    };
  }, []);


  //  scroll fucntion
 useEffect(() => {
  if (location.state?.scrollTo) {
    const scrollToSection = () => {
      const section = document.getElementById(location.state.scrollTo);

      if (section) {
        const headerOffset = 150;

        const elementPosition =
          section.getBoundingClientRect().top + window.scrollY;

        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });

        // ✅ clear state after scroll
        window.history.replaceState({}, document.title);
      }
    };

    // ✅ wait until render complete
    const timer = setTimeout(scrollToSection, 500);

    return () => clearTimeout(timer);
  }
}, [location]);


  // ✅ Memoized visible items
  const visibleItems = useMemo(() => {
    return showAll ? exploreItems : exploreItems.slice(0, 12);
  }, [showAll, exploreItems]);


  // ✅ Memoized image handler
  const getImage = useCallback((item) => {
    if (item?.image?.startsWith("http")) return item.image;
    if (item?.image) return `https://api.collegedrishti.com/${item.image}`;
    return Jain;
  }, []);

  // ✅ Skeleton Loader (same layout)
  if (loading) {
    return (
      <section className="bg-white px-4 md:px-12 py-10">
        <h2 className="text-xl md:text-2xl font-semibold mb-6 text-center">
          Explore Universities
        </h2>
        <ShadeWaveLoader label="Loading universities..." cards={3} compact />
      </section>
    );
  }

  return (
    <section
      id="explore-university"
      className="bg-white px-4 md:px-12 py-10 text-center"
    >
      <h2 className="text-xl md:text-2xl font-semibold mb-6">
        Explore Universities
      </h2>

      <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 justify-center">
        {visibleItems.map((item) => (
          <div
            key={item.id}
            onClick={() => navigate(`/university/${item.slug}`)}
            className="bg-white rounded-lg shadow-md flex items-center justify-center p-4 h-24 cursor-pointer hover:shadow-lg transition"
          >
            <img
              src={getImage(item)}
              alt={item.name}
              loading="lazy"
              className="object-contain max-h-full w-full"
              onError={(e) => (e.currentTarget.src = Jain)}
            />
          </div>
        ))}
      </div>

      {exploreItems.length > 12 && (
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => setShowAll((prev) => !prev)}
            className="bg-[#004aad] text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
          >
            {showAll ? "View Less" : "View All"}
          </button>
        </div>
      )}
    </section>
  );
};

export default ExploreSection;






// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Jain from "../assets/jain.png";
// import api from "../api/axios";

// const ExploreSection = () => {
//   const navigate = useNavigate();
//   const [exploreItems, setExploreItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showAll, setShowAll] = useState(false);

//   useEffect(() => {
//     const fetchUniversities = async () => {
//       try {
//         const res = await api.get("/explore-universities");
//         setExploreItems(res.data.data || []);
//       } catch (err) {
//         console.error("Error fetching universities:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchUniversities();
//   }, []);

//   if (loading) return <div className="text-center py-8">Loading...</div>;

//   const getImage = (item) => {
//     if (item.image && item.image.startsWith("http")) return item.image;
//     if (item.image) return `https://api.collegedrishti.com/${item.image}`;
//     return Jain;
//   };

//   // 👇 Initially ek row (max 6 items) hi show honge
//   const visibleItems = showAll ? exploreItems : exploreItems.slice(0, 6);

//   return (
//     <section id="explore-university" className="bg-white px-4 md:px-12 py-10 text-center">
//       <h2 className="text-xl md:text-2xl font-semibold mb-6">
//         Explore Universities
//       </h2>

//       {/* 👇 Grid me sirf ek row show hogi initially */}
//       {/* <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 justify-center"> */}
// <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 justify-center">
//         {visibleItems.map((item) => (
//           <div
//             key={item.id}
//             onClick={() => navigate(`/university/${item.slug}`)}
//             className="bg-white rounded-lg shadow-md flex items-center justify-center p-4 h-24 cursor-pointer hover:shadow-lg transition"
//           >
//             <img
//               src={getImage(item)}
//               alt={item.name}
//               className="object-contain max-h-full w-full"
//               onError={(e) => (e.target.src = Jain)}
//             />
//           </div>
//         ))}
//       </div>

//       {/* 👇 View All / View Less Button (center me) */}
//       {exploreItems.length > 6 && (
//         <div className="mt-6 flex justify-center">
//           <button
//             onClick={() => setShowAll(!showAll)}
//             className="bg-[#004aad] text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
//           >
//             {showAll ? "View Less" : "View All"}
//           </button>
//         </div>
//       )}
//     </section>
//   );
// };

// export default ExploreSection;




