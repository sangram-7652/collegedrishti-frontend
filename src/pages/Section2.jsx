import React, { useEffect, useState } from "react";
import api from "../api/axios";

const tabs = [
  { key: "about", label: "About" },
  { key: "courses", label: "Courses" },
  { key: "fees", label: "Fee Structure" },
  { key: "placements", label: "Placements" },
  { key: "reviews", label: "Reviews" },
  { key: "admissions", label: "Admissions Process" },
  { key: "approvals", label: "Approvals" },
  { key: "blogs", label: "Blogs/Videos" },
];

export default function Section2({ slug }) {
  const [activeTab, setActiveTab] = useState("about");
  const [uniData, setUniData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // 1) Course -> University slug
        const courseRes = await api.get(`/course/${slug}`);
        const uniSlug = courseRes?.data?.data?.universities?.[0]?.slug;

        if (!uniSlug) throw new Error("University slug not found");

        // 2) University page data
        const uniRes = await api.get(`/university/${uniSlug}`);

        if (!uniRes.data?.success) {
          throw new Error(uniRes.data?.message || "University API failed");
        }

        setUniData(uniRes.data.data);
      } catch (err) {
        console.error(err);
        setError("API route galat hai ya backend JSON nahi de raha.");
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchData();
  }, [slug]);

  if (loading) return <p className="text-gray-500">Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!uniData) return null;

  return (
    <div className="grid md:grid-cols-3 gap-6 mt-6">
      {/* Left: Table of Content */}
      <div className="border rounded-xl p-4">
        <h3 className="font-semibold text-lg text-center mb-4">
          Table of Content
        </h3>
        <ol className="text-sm text-blue-600">
          {tabs.map((tab, i) => (
            <li
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className="border-t first:border-t-0 py-2 px-2 hover:underline cursor-pointer"
            >
              {i + 1}. {tab.label}
            </li>
          ))}
        </ol>
      </div>

      {/* Right: Content */}
      <div className="md:col-span-2 border rounded-xl p-4">
        {/* Top Tabs */}
        <div className="flex gap-6 border-b mb-4 text-sm">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`pb-2 ${
                activeTab === tab.key
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-500"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Dynamic Data */}
        {activeTab === "about" && <p>{uniData.about || "N/A"}</p>}

        {activeTab === "courses" &&
          (uniData.courses?.length
            ? uniData.courses.map((c) => (
                <p key={c.id}>{c.coruse_name}</p>
              ))
            : "No courses")}

        {activeTab === "fees" &&
          (uniData.fees?.length
            ? uniData.fees.map((f) => (
                <p key={f.id}>
                  {f.course_name} – ₹{f.total_fees}
                </p>
              ))
            : "No fee data")}

        {activeTab === "placements" && (
          <p>{uniData.placements || "N/A"}</p>
        )}

        {activeTab === "reviews" && (
          <>
            <p>Rating: {uniData.reviews?.rating || "N/A"}</p>
            <p>Satisfaction: {uniData.reviews?.satisfaction || "N/A"}</p>
          </>
        )}

        {activeTab === "admissions" && (
          <>
            <p>Eligibility: {uniData.admissions?.eligibility || "N/A"}</p>
            <p>Details: {uniData.admissions?.details || "N/A"}</p>
          </>
        )}

        {activeTab === "approvals" && (
          <p>{uniData.approvals || "N/A"}</p>
        )}
      </div>
    </div>
  );
}



