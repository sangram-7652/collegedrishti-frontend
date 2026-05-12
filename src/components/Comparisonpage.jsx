// UPDATED ComparisonPage.jsx

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

  const [allUniversities, setAllUniversities] = useState([]);
  const [selected, setSelected] = useState([]);
  const [comparisonData, setComparisonData] = useState(null);
  const [courseData, setCourseData] = useState([]);

  const [initLoading, setInitLoading] = useState(true);
  const [initError, setInitError] = useState("");

  const [compareLoading, setCompareLoading] = useState(false);
  const [compareError, setCompareError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const applyRecommendationOrSuggested = async (uniList) => {

      // ✅ recommendation ids
      const raw = localStorage.getItem("recommendationTopIds");

      if (raw) {
        try {
          const ids = JSON.parse(raw);

          if (Array.isArray(ids) && ids.length) {

            const picked = ids
              .map((id) =>
                uniList.find((u) => Number(u.id) === Number(id))
              )
              .filter(Boolean);

            if (picked.length) {

              // ✅ auto select top 3 only
              setSelected(picked.slice(0, 3));

              return;
            }
          }
        } catch {
          console.log("recommendationTopIds parse error");
        }
      }

      // ✅ fallback
      const name = Cookies.get("name");
      const mobile = Cookies.get("mobile");

      if (!name || !mobile) {
        return;
      }

      try {

        const res = await api.post("/findsuggests", {
          name,
          mobile,
          course_id: selectedCourseId,
        });

        const suggested =
          res.data?.data?.universities || [];

        const filtered = suggested
          .filter((s) =>
            uniList.some((u) => u.id === s.id)
          )
          .filter(
            (v, i, arr) =>
              arr.findIndex((x) => x.id === v.id) === i
          );

        // ✅ auto select top 3
        setSelected(filtered.slice(0, 3));

      } catch (err) {
        console.log("findsuggests error", err);
      }
    };

    (async () => {

      setInitLoading(true);
      setInitError("");

      try {

        const [uRes, cRes] = await Promise.all([
          api.get("/universities"),
          api.get("/courses"),
        ]);

        if (cancelled) return;

        const uniList = uRes.data?.data || [];

        setAllUniversities(uniList);

        setCourseData(cRes.data?.data || []);

        await applyRecommendationOrSuggested(uniList);

      } catch (e) {

        if (!cancelled) {
          setInitError(
            "We could not load universities. Check your connection and try again."
          );
        }

      } finally {

        if (!cancelled) {
          setInitLoading(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };

  }, []);

  // ✅ add university
  const onAdd = (u) => {

    if (selected.find((x) => x.id === u.id)) return;

    if (selected.length >= 4) return;

    setSelected([...selected, u]);
  };

  // ✅ remove university
  const onRemove = (u) => {

    setSelected(
      selected.filter((x) => x.id !== u.id)
    );
  };

  // ✅ compare api
  const onCompare = async () => {

    setCompareLoading(true);
    setCompareError("");

    try {

      const ids = selected.map((u) => Number(u.id));

      const res = await api.post("/compare", {
        universityIds: ids,
      });

      const filtered = (
        res.data.universitys || []
      ).filter((u) =>
        ids.includes(Number(u.id))
      );

      const courseName =
        localStorage.getItem("selectedCourseName");

      const merged = await Promise.all(
        filtered.map(async (u) => {

          try {

            const feeRes = await api.get(
              `/university/${u.slug}/fees`
            );

            const feesArray =
              feeRes.data?.data?.fees || [];

            const matchedCourse = feesArray.find((f) =>
              f.course_name
                ?.toLowerCase()
                .includes(courseName?.toLowerCase())
            );

            return {
              ...u,
              fees:
                matchedCourse?.total_fees || "N/A",
            };

          } catch {

            return {
              ...u,
              fees: "N/A",
            };
          }
        })
      );

      setComparisonData(merged);

    } catch (err) {

      setCompareError(
        "Comparison request failed. Please try again."
      );

    } finally {

      setCompareLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">

      {/* Desktop Header */}
      <div className="hidden md:block">
        <Header />
      </div>

      {/* Mobile Header */}
      <div className="block md:hidden">
        <MobileMenu />
      </div>

      {/* Loading */}
      {initLoading && (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <div className="h-10 w-10 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin" />

          <p className="text-slate-600 text-sm">
            Loading universities…
          </p>
        </div>
      )}

      {/* Init Error */}
      {initError && !initLoading && (
        <div className="max-w-xl mx-auto text-center text-red-600 text-sm mb-6 px-2">
          {initError}
        </div>
      )}

      {/* Compare Error */}
      {compareError && !initLoading && (
        <div className="max-w-xl mx-auto text-center text-red-600 text-sm mb-4 px-2">
          {compareError}
        </div>
      )}

      {/* Comparison Workspace */}
      {!initLoading && (
        <ComparisonSection
          allUniversities={allUniversities}
          selectedUniversities={selected}
          onAddUniversity={onAdd}
          onRemoveUniversity={onRemove}
          onCompare={onCompare}
          courseData={courseData}
          compareLoading={compareLoading}
        />
      )}

      {/* Comparison Result */}
      {comparisonData &&
        comparisonData.length > 0 && (
          <ComparisonTable
            universities={comparisonData}
          />
        )}

      <CTASection />
      <FAQSection />
      <Footer />
      <MobileFooterNav />
    </div>
  );
};

export default ComparisonPage;