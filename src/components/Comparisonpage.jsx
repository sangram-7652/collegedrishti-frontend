
// import React, { useEffect, useState } from 'react';
// import api from '../api/axios';
// import Cookies from 'js-cookie';
// import Header from "../pages/Header";
// import MobileMenu from "../pages/MobileMenu";


// import ComparisonSection from '../pages/ComparisonSection'; // Your UI for cards/buttons
// import ComparisonTable from '../pages/ComparisonTable'; // The table component

// import CTASection from "../pages/CTASection";
// import FAQSection from "../pages/FAQSection";
// import Footer from "./Footer";
// import MobileFooterNav from './MobileFooterNav';


// const getCookie = (name) => {
//   return Cookies.get(name);
// };

// const ComparisonPage = () => {
//   const [allUniversities, setAllUniversities] = useState([]);
//   const [selectedUniversities, setSelectedUniversities] = useState([]);
//   const [comparisonData, setComparisonData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const fetchUniversities = async () => {
//   try {
//     setLoading(true);
//     const name = getCookie('name');   // ✅ yahi sahi hai
//     const mobile = getCookie('mobile');

//     console.log("🍪 Cookies name/mobile:", name, mobile);

//     if (!name || !mobile) {
//       setError("Missing name or mobile cookies");
//       return;
//     }

//     const res = await api.post('/findsuggests', {
//       name,
//       mobile
//     });

//     console.log("📌 findsuggests response:", res.data);

//     if (res.data?.success !== true) {
//       setError(res.data?.message || "No suggested universities found!");
//       return;
//     }

//     // yahi se 3 universities uthani hain
// const suggested = res.data?.data?.universities || [];

//     console.log("🎓 Suggested universities:", suggested);

//     setAllUniversities(suggested);
//     setSelectedUniversities(suggested.slice(0, 3));

//   } catch (err) {
//     console.error("Error while fetching suggested universities:", err);
//     setError("Failed to load universities.");
//   } finally {
//     setLoading(false);
//   }
// };


//   useEffect(() => {
//     fetchUniversities();
//   }, []);

//   const onAddUniversity = (university) => {
//     if (selectedUniversities.find(u => u.id === university.id)) return;
//     if (selectedUniversities.length >= 4) return;
//     setSelectedUniversities([...selectedUniversities, university]);
//   };

//   const onRemoveUniversity = (university) => {
//     setSelectedUniversities(selectedUniversities.filter(u => u.id !== university.id));
//   };

// const onCompare = async () => {
//   if (selectedUniversities.length < 2) {
//     alert("Please select at least 2 universities to compare.");
//     return;
//   }

//   try {
//     setLoading(true);
//     const response = await api.post('/compare', {
//       universityIds: selectedUniversities.map(u => u.id),
//     });

//     console.log("API Response:", response.data);
//     setComparisonData(response.data);
//   } catch (err) {
//     console.error("Comparison fetch failed:", err);
//     setError("Failed to compare universities.");
//   } finally {
//     setLoading(false);
//   }
// };




//   return (


//     <div className="min-h-screen bg-gray-50 px-4 py-8">
//       {error && (
//         <div className="text-red-500 font-semibold mb-4">{error}</div>
//       )}

//                    {/* ✅ Desktop Header */}
//                    <div className="hidden md:block">
//                      <Header />
//                    </div>

//                    {/* ✅ Mobile Header */}
//                    <div className="block md:hidden">
//                      <MobileMenu />
//                    </div>

//       <ComparisonSection
//         allUniversities={allUniversities}
//         selectedUniversities={selectedUniversities}
//         onAddUniversity={onAddUniversity}
//         onRemoveUniversity={onRemoveUniversity}
//         onCompare={onCompare}
//         loading={loading}
//         error={error}
//       />

//     {comparisonData && (
//   <div className="mt-10">
//     <h2 className="text-2xl font-bold mb-4 text-center">
//       University Comparison Table
//     </h2>
//     <ComparisonTable
//       universities={selectedUniversities}
//       comparisonData={comparisonData}
//     />
//   </div>
// )}

//             <CTASection />
//             <FAQSection />
//              <Footer />
//           <MobileFooterNav />

//     </div>
//   );
// };

// export default ComparisonPage;







// import React, { useEffect, useState } from "react";
// import api from "../api/axios";
// import Cookies from "js-cookie";

// import Header from "../pages/Header";
// import MobileMenu from "../pages/MobileMenu";

// import ComparisonSection from "../pages/ComparisonSection";
// import ComparisonTable from "../pages/ComparisonTable";

// import CTASection from "../pages/CTASection";
// import FAQSection from "../pages/FAQSection";
// import Footer from "./Footer";
// import MobileFooterNav from "./MobileFooterNav";

// const ComparisonPage = () => {
//   const [allUniversities, setAllUniversities] = useState([]);     // FULL LIST
//   const [selected, setSelected] = useState([]);                   // 3+ dynamic
//   const [comparisonData, setComparisonData] = useState(null);
//   const [courseData, setCourseData] = useState([]);

//   // ----------------------------------------------------
//   // 1️⃣ GET FULL LIST (for Add University Dropdown)
//   // ----------------------------------------------------
//   const fetchAllUniversities = async () => {
//     try {
//       const res = await api.get("/explore-universities");
//       if (res.data.success) {
//         // setAllUniversities(res.data.data);
//         const uniqueList = res.data.data.filter(
//           (u, index, self) =>
//             u.id &&
//             self.findIndex((x) => x.id === u.id) === index
//         );

//         setAllUniversities(uniqueList);
//       }
//     } catch (err) {
//       console.error("Full list error:", err);
//     }
//   };

//   const fetchCourses = async () => {
//     try {
//       const res = await api.get("/allcourse"); // same as your step1
//       setCourseData(res.data.data || []);
//     } catch (err) {
//       console.log("Course load error:", err);
//     }
//   };

//   useEffect(() => {
//     fetchCourses();
//   }, []);
//   // ----------------------------------------------------
//   // 2️⃣ GET 3 Suggested Universities (auto selection)
//   // ----------------------------------------------------
//   const fetchSuggested = async () => {
//     try {
//       const name = Cookies.get("name");
//       const mobile = Cookies.get("mobile");

//       const res = await api.post("/findsuggests", { name, mobile });

//       if (res.data.success) {
//         const suggested = res.data?.data?.universities || [];

//         // ✅ Clean + valid data only
//         const validUniversities = suggested.filter((sug) =>
//           allUniversities.some((u) => u.id === sug.id)
//         );

//         console.log("✅ Suggested (clean):", validUniversities);

//         setSelected(validUniversities.slice(0, 3));
//       }
//     } catch (err) {
//       console.error("Suggested load error:", err);
//     }
//   };

//   // ----------------------------------------------------
//   // 3️⃣ LOAD BOTH ON PAGE OPEN
//   // ----------------------------------------------------
//   useEffect(() => {
//     fetchAllUniversities();
//   }, []);

//   useEffect(() => {
//     if (allUniversities.length > 0) {
//       fetchSuggested();
//     }
//   }, [allUniversities]);


//   // Add new university
//   const onAdd = (u) => {
//     if (selected.find((x) => x.id === u.id)) return;
//     if (selected.length >= 4) return;
//     setSelected([...selected, u]);
//   };

//   // Remove existing university
//   const onRemove = (u) => {
//     setSelected(selected.filter((x) => x.id !== u.id));
//   };

//   // Compare → table show
//   const onCompare = async () => {
//     try {
//       const ids = selected.map((u) => u.id).join(",");

//       const res = await api.post("/Comparisonpage", {
//         university_ids: ids,
//       });

//       if (res.data.success) {
//         setComparisonData(res.data.data);
//       }
//     } catch (err) {
//       console.log("Compare error:", err);
//     }
//   };

//   console.log("ALL UNIVERSITIES:", allUniversities);
//   console.log("SELECTED:", selected);

//   return (
//     <div className="min-h-screen bg-gray-50 px-4 py-8">

//       <div className="hidden md:block"><Header /></div>
//       <div className="block md:hidden"><MobileMenu /></div>

//       <ComparisonSection
//         allUniversities={allUniversities}
//         selectedUniversities={selected}
//         onAddUniversity={onAdd}
//         onRemoveUniversity={onRemove}
//         onCompare={onCompare}
//         courseData={courseData}
//       />

//       {comparisonData && (
//         <ComparisonTable universities={comparisonData} />
//       )}

//       <CTASection />
//       <FAQSection />
//       <Footer />
//       <MobileFooterNav />
//     </div>
//   );
// };

// export default ComparisonPage;












import React, { useEffect, useState } from "react";
import api from "../api/axios";
import Cookies from "js-cookie";

import Header from "../pages/Header";
import MobileMenu from "../pages/MobileMenu";

import ComparisonSection from "../pages/ComparisonSection";
import ComparisonTable from "../pages/ComparisonTable";

import CTASection from "../pages/CTASection";
import FAQSection from "../pages/FAQSection";
import Footer from "./Footer";
import MobileFooterNav from "./MobileFooterNav";

const ComparisonPage = () => {
  const selectedCourseId = localStorage.getItem("selectedCourseId");
  const selectedCourseName = localStorage.getItem("selectedCourseName");
  const [allUniversities, setAllUniversities] = useState([]);
  const [selected, setSelected] = useState([]);
  const [comparisonData, setComparisonData] = useState(null);
  const [courseData, setCourseData] = useState([]);

  // ✅ Universities
  const fetchAllUniversities = async () => {
    const res = await api.get("/universities");
    setAllUniversities(res.data.data || []);
  };

  // ✅ Suggested
  const fetchSuggested = async () => {
    const name = Cookies.get("name");
    const mobile = Cookies.get("mobile");

    const res = await api.post("/findsuggests", { name, mobile, course_id: selectedCourseId });

    const suggested = res.data?.data?.universities || [];

    // ✅ filter only valid admin universities
    const filtered = suggested
      .filter((s) => allUniversities.some((u) => u.id === s.id))
      .filter((v, i, arr) => arr.findIndex(x => x.id === v.id) === i);

    setSelected(filtered.slice(0, 3));
  };

  // ✅ Courses
  const fetchCourses = async () => {
    const res = await api.get("/courses");
    setCourseData(res.data.data || []);
  };

  useEffect(() => {
    fetchAllUniversities();
    fetchCourses();
  }, []);

  useEffect(() => {
    if (allUniversities.length > 0) {
      fetchSuggested();
    }
  }, [allUniversities]);

  const onAdd = (u) => {
    if (selected.find((x) => x.id === u.id)) return;
    if (selected.length >= 4) return;
    setSelected([...selected, u]);
  };

  const onRemove = (u) => {
    setSelected(selected.filter((x) => x.id !== u.id));
  };

  // ✅ TEMP compare (no API)

  const ids = selected.map((u) => u.id);

  const onCompare = async () => {
    try {
      const ids = selected.map(u => Number(u.id));

      const res = await api.post("/compare", {
        universityIds: ids
      });

      const filtered = (res.data.universitys || []).filter(u =>
        ids.includes(Number(u.id))
      );

      const selectedCourseName = localStorage.getItem("selectedCourseName");

      const merged = await Promise.all(
        filtered.map(async (u) => {
          try {
            const feeRes = await api.get(`/university/${u.slug}/fees`);

            const feesArray = feeRes.data?.data?.fees || [];

            console.log("👉 Fees array:", feesArray);

            // ✅ match course properly
            const matchedCourse = feesArray.find(f =>
              f.course_name?.toLowerCase().includes(
                selectedCourseName?.toLowerCase()
              )
            );

            console.log("👉 Matched:", matchedCourse);

            return {
              ...u,
              fees: matchedCourse?.total_fees || "N/A"
            };

          } catch (err) {
            return { ...u, fees: "N/A" };
          }
        })
      );

      console.log("🔥 FINAL DATA:", merged);

      setComparisonData(merged);

    } catch (err) {
      console.log("ERROR:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">

      <div className="hidden md:block"><Header /></div>
      <div className="block md:hidden"><MobileMenu /></div>

      <ComparisonSection
        allUniversities={allUniversities}
        selectedUniversities={selected}
        onAddUniversity={onAdd}
        onRemoveUniversity={onRemove}
        onCompare={onCompare}
        courseData={courseData}
      />

      {comparisonData && comparisonData.length > 0 && (
        <ComparisonTable universities={comparisonData} />
      )}

      <CTASection />
      <FAQSection />
      <Footer />
      <MobileFooterNav />
    </div>
  );
};

export default ComparisonPage;





// import React, { useEffect, useState } from "react";
// import api from "../api/axios";
// import Cookies from "js-cookie";

// import Header from "../pages/Header";
// import MobileMenu from "../pages/MobileMenu";

// import ComparisonSection from "../pages/ComparisonSection";
// import ComparisonTable from "../pages/ComparisonTable";

// import CTASection from "../pages/CTASection";
// import FAQSection from "../pages/FAQSection";
// import Footer from "./Footer";
// import MobileFooterNav from "./MobileFooterNav";

// const ComparisonPage = () => {
//   const [allUniversities, setAllUniversities] = useState([]);
//   const [selected, setSelected] = useState([]);
//   const [comparisonData, setComparisonData] = useState(null);

//   const fetchUniversities = async () => {
//     try {
//       const name = Cookies.get("name");
//       const mobile = Cookies.get("mobile");

//       const res = await api.post("/findsuggests", { name, mobile });

//       if (!res.data.success) return;

//       const list = res.data.data.universities;

//       // Fetch full details for each university
//       const fullData = await Promise.all(
//         list.map(async (u) => {
//           try {
//             const detail = await api.get(`/api-university/${u.slug}`);
//             return { ...u, ...detail.data.data };
//           } catch {
//             return u;
//           }
//         })
//       );

//       setAllUniversities(fullData);
//       setSelected(fullData.slice(0, 3));
//     } catch (err) {
//       console.error("Error loading universities:", err);
//     }
//   };

//   useEffect(() => {
//     fetchUniversities();
//   }, []);

//   const onAdd = (u) => {
//     if (selected.find((x) => x.id === u.id)) return;
//     setSelected([...selected, u]);
//   };

//   const onRemove = (u) => {
//     setSelected(selected.filter((x) => x.id !== u.id));
//   };

//   const onCompare = () => {
//     setComparisonData(selected);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 px-4 py-8">

//       <div className="hidden md:block"><Header /></div>
//       <div className="block md:hidden"><MobileMenu /></div>

//       <ComparisonSection
//         allUniversities={allUniversities}
//         selectedUniversities={selected}
//         onAddUniversity={onAdd}
//         onRemoveUniversity={onRemove}
//         onCompare={onCompare}
//       />

//       {comparisonData && (
//         <ComparisonTable universities={comparisonData} />
//       )}

//       <CTASection />
//       <FAQSection />
//       <Footer />
//       <MobileFooterNav />
//     </div>
//   );
// };

// export default ComparisonPage;
