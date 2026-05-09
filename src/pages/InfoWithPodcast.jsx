import React, { useState } from "react";
import PodcastMic from "../course-image/podcast-copy.webp";

const TABS = [
    { key: "about", label: "About" },
    { key: "courses", label: "Courses" },
    { key: "placements", label: "Placements" },
    { key: "reviews", label: "Reviews" },
    { key: "admissions", label: "Admissions Process" },
    { key: "approvals", label: "Approvals" },
];

export default function InfoWithPodcast({ data }) {

    // ✅ FIX: hook component ke andar
    const [activeTab, setActiveTab] = useState("about");

    // ✅ SCROLL FUNCTION
    const handleScroll = (id) => {
        setActiveTab(id);

        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    };

    return (
        <div className="w-full px-4 md:px-10 py-6">

            {/* 🔹 TOP TABS */}
            <div className="sticky top-0 z-50 bg-white overflow-x-auto border-b mb-6">
                <div className="flex gap-10 text-sm font-medium text-gray-600 whitespace-nowrap">

                    {TABS.map((item) => (
                        <button
                            key={item.key}
                            onClick={() => handleScroll(item.key)}
                            className={`pb-2 transition ${activeTab === item.key
                                ? "text-blue-600 border-b-2 border-blue-600"
                                : "text-gray-600 hover:text-blue-600"
                                }`}
                        >
                            {item.label}
                        </button>
                    ))}

                </div>
            </div>

            {/* 🔹 TABLE OF CONTENT */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* LEFT */}
                <div className="border rounded-xl p-4">
                    <h3 className="font-semibold text-lg text-center mb-4">
                        Table of Content
                    </h3>

                    <ol className="text-sm text-blue-600">

                        {TABS.map((item, i) => (
                            <li
                                key={item.key}
                                onClick={() => handleScroll(item.key)}
                                className={`border-t first:border-t-0 py-2 px-2 cursor-pointer transition ${activeTab === item.key
                                    ? "text-blue-600 font-semibold"
                                    : "hover:underline"
                                    }`}
                            >
                                <span className="mr-2">{i + 1}.</span>
                                {`${data?.sub_name || ""} ${item.label}`}
                            </li>
                        ))}

                    </ol>
                </div>

                {/* RIGHT (Podcast Image) */}
                <div>
                    <img
                        src={PodcastMic}
                        loading="lazy"
                        alt="Podcast"
                        className="w-full rounded-xl"
                    />
                </div>

            </div>

        </div>
    );
}