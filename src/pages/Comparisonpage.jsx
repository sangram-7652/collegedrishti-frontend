
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
  const [allUniversities, setAllUniversities] = useState([]);     // FULL LIST
  const [selected, setSelected] = useState([]);                   // 3+ dynamic
  const [comparisonData, setComparisonData] = useState(null);

  // ----------------------------------------------------
  // 1️⃣ GET FULL LIST (for Add University Dropdown)
  // ----------------------------------------------------
  const fetchAllUniversities = async () => {
    try {
      const res = await api.get("/universities");
      if (res.data.success) {
        setAllUniversities(res.data.data);
      }
    } catch (err) {
      console.error("Full list error:", err);
    }
  };

  // ----------------------------------------------------
  // 2️⃣ GET 3 Suggested Universities (auto selection)
  // ----------------------------------------------------
  const fetchSuggested = async () => {
    try {
      const name = Cookies.get("name");
      const mobile = Cookies.get("mobile");

      const res = await api.post("/findsuggests", { name, mobile });

      if (res.data.success) {
        const suggested = res.data.data.universities;

        setSelected(suggested.slice(0, 3));
      }
    } catch (err) {
      console.error("Suggested load error:", err);
    }
  };

  // ----------------------------------------------------
  // 3️⃣ LOAD BOTH ON PAGE OPEN
  // ----------------------------------------------------
  useEffect(() => {
    fetchAllUniversities();   // Add dropdown ke liye full
    fetchSuggested();         // Auto 3 ke liye
  }, []);

  // Add new university
  const onAdd = (u) => {
    if (selected.find((x) => x.id === u.id)) return;
    if (selected.length >= 4) return;
    setSelected([...selected, u]);
  };

  // Remove existing university
  const onRemove = (u) => {
    setSelected(selected.filter((x) => x.id !== u.id));
  };

  // Compare → table show
  const onCompare = () => {
    setComparisonData(selected);
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
      />

      {comparisonData && (
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
