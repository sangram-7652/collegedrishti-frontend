import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import Header from "./Header";
import MobileMenu from "./MobileMenu";
import Footer from "../components/Footer";
import MobileFooterNav from "../components/MobileFooterNav";
import CTASection from "./CTASection";
import FAQSection from "./FAQSection";

const emptyCriteria = () => ({
  course_id: "",
  degree_label: "",
  sub_course_label: "",
  specialization: "",
  career_goal: "",
  budget_range: "",
  learning_mode: "",
  university_type: "",
  location_preference: "",
  step1name: "",
  step2name: "",
  step3name: "",
  step4name: "",
  step5name: "",
  step6name: "",
  step7name: "",
  step8name: "",
  step9name: "",
});

const RecommendationResults = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [criteriaEcho, setCriteriaEcho] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      setLoading(true);
      setError("");
      let payload = emptyCriteria();
      try {
        const raw = localStorage.getItem("suggestWizardCriteria");
        if (raw) {
          payload = { ...emptyCriteria(), ...JSON.parse(raw) };
        }
      } catch {
        payload = emptyCriteria();
      }

      try {
        const res = await api.post("/recommendations", payload);
        const data = res.data?.data;
        const list = data?.recommendations ?? [];
        if (cancelled) return;
        setRecommendations(Array.isArray(list) ? list : []);
        setCriteriaEcho(data?.criteria ?? null);
        const ids = (Array.isArray(list) ? list : [])
          .map((r) => r?.university?.id)
          .filter(Boolean);
        if (ids.length) {
          localStorage.setItem("recommendationTopIds", JSON.stringify(ids));
        }
      } catch (e) {
        if (!cancelled) {
          setError(
            e?.response?.data?.message ||
              "We could not load recommendations. You can still use the comparison page."
          );
          setRecommendations([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, []);

  const applyToComparison = () => {
    const ids = recommendations
      .map((r) => r?.university?.id)
      .filter(Boolean);
    if (ids.length) {
      localStorage.setItem("recommendationTopIds", JSON.stringify(ids));
    }
    navigate("/Comparisonpage");
  };

  const summaryLine = () => {
    if (!criteriaEcho) return null;
    const parts = [
      criteriaEcho.step1name,
      criteriaEcho.step2name,
      criteriaEcho.step3name,
      criteriaEcho.step5name,
      criteriaEcho.step7name,
    ].filter((p) => p && String(p).toLowerCase() !== "none");
    return parts.length ? parts.join(" · ") : "Your preferences";
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="hidden md:block">
        <Header />
      </div>
      <div className="block md:hidden">
        <MobileMenu />
      </div>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="text-center mb-8 sm:mb-10">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-wide text-blue-600 mb-2">
            Personalized for you
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Top university matches
          </h1>
          {summaryLine() && (
            <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
              Based on: {summaryLine()}
            </p>
          )}
        </div>

        {loading && (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="h-10 w-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
            <p className="text-slate-600 text-sm">Scoring universities for your profile…</p>
          </div>
        )}

        {!loading && error && (
          <div className="rounded-xl border border-amber-200 bg-amber-50 text-amber-900 px-4 py-3 text-sm text-center mb-8">
            {error}
          </div>
        )}

        {!loading && !error && recommendations.length === 0 && (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <p className="text-slate-700 mb-4">
              No ranked matches were returned. Try completing the questionnaire again, or browse
              all universities on the comparison page.
            </p>
            <Link
              to="/Comparisonpage"
              className="inline-flex items-center justify-center rounded-full bg-blue-600 text-white px-6 py-2.5 text-sm font-semibold hover:bg-blue-700"
            >
              Go to comparison
            </Link>
          </div>
        )}

        {!loading && recommendations.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {recommendations.map((row, idx) => {
              const u = row.university || {};
              const score = row.match_score ?? 0;
              const breakdown = row.score_breakdown || {};
              return (
                <article
                  key={u.id || idx}
                  className="flex flex-col rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden"
                >
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 flex justify-between items-center text-sm">
                    <span className="font-semibold">#{idx + 1} Match</span>
                    <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs font-bold">
                      {score}% fit
                    </span>
                  </div>
                  <div className="p-5 flex flex-col flex-1 gap-3">
                    <div className="flex items-start gap-3">
                      <div className="h-14 w-14 shrink-0 rounded-lg bg-slate-100 border border-slate-100 flex items-center justify-center overflow-hidden">
                        {u.image ? (
                          <img
                            src={u.image}
                            alt=""
                            className="max-h-full max-w-full object-contain"
                            onError={(e) => {
                              e.target.style.display = "none";
                            }}
                          />
                        ) : (
                          <span className="text-xs text-slate-400">Logo</span>
                        )}
                      </div>
                      <div className="min-w-0">
                        <h2 className="font-bold text-slate-900 text-base leading-snug">{u.name}</h2>
                        {u.nirf_ranking && (
                          <p className="text-xs text-slate-500 mt-1">NIRF: {u.nirf_ranking}</p>
                        )}
                      </div>
                    </div>

                    {u.stu_rating && (
                      <p className="text-sm text-slate-700">
                        <span className="font-semibold text-amber-600">★</span>{" "}
                        {u.stu_rating} student rating
                      </p>
                    )}

                    <div className="text-sm text-slate-600 space-y-1">
                      <p>
                        <span className="font-medium text-slate-800">Fees: </span>
                        {u.fees_range || "See details"}
                      </p>
                      {u.matched_course_name && (
                        <p className="truncate">
                          <span className="font-medium text-slate-800">Course row: </span>
                          {u.matched_course_name}
                        </p>
                      )}
                      {u.edu_mode && (
                        <p>
                          <span className="font-medium text-slate-800">Mode: </span>
                          {u.edu_mode}
                        </p>
                      )}
                    </div>

                    {u.approvals && (
                      <p className="text-xs text-slate-600 line-clamp-4 border-t border-slate-100 pt-3">
                        {u.approvals.replace(/\r\n/g, " · ")}
                      </p>
                    )}

                    <details className="text-xs text-slate-500 border-t border-slate-100 pt-2">
                      <summary className="cursor-pointer font-medium text-slate-700">
                        Score breakdown
                      </summary>
                      <ul className="mt-2 space-y-1 list-disc pl-4">
                        {Object.entries(breakdown).map(([k, v]) => (
                          <li key={k}>
                            {k}: {v}
                          </li>
                        ))}
                      </ul>
                    </details>

                    <div className="mt-auto flex flex-col sm:flex-row gap-2 pt-2">
                      {u.slug && (
                        <Link
                          to={`/university/${u.slug}`}
                          className="flex-1 text-center rounded-full border border-slate-300 text-slate-800 py-2 text-sm font-semibold hover:bg-slate-50"
                        >
                          View university
                        </Link>
                      )}
                      <button
                        type="button"
                        onClick={applyToComparison}
                        className="flex-1 rounded-full bg-blue-600 text-white py-2 text-sm font-semibold hover:bg-blue-700"
                      >
                        Compare these
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {!loading && recommendations.length > 0 && (
          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center items-center">
            <button
              type="button"
              onClick={applyToComparison}
              className="w-full sm:w-auto rounded-full bg-slate-900 text-white px-8 py-3 text-sm font-semibold hover:bg-slate-800"
            >
              Open comparison workspace
            </button>
            <Link
              to="/SuggestedUniversity"
              className="text-sm font-medium text-blue-600 hover:underline"
            >
              Retake questionnaire
            </Link>
          </div>
        )}
      </main>

      <CTASection />
      <FAQSection />
      <Footer />
      <MobileFooterNav />
    </div>
  );
};

export default RecommendationResults;
