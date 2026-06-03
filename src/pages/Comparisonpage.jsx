

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



