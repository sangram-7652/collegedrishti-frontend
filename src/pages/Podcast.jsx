
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import api from "../api/axios";

// export default function Section2() {
//   const { slug } = useParams(); // course slug (e.g. mca)

//   const [uniSlug, setUniSlug] = useState(null);
//   const [uniName, setUniName] = useState("");
//   const [uniData, setUniData] = useState(null);

//   const [activeIndex, setActiveIndex] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const tocItems = [
//     { key: "about", label: "About" },
//     { key: "courses", label: "Courses" },
//     { key: "fees", label: "Fee Structure" },
//     { key: "placements", label: "Placements" },
//     { key: "reviews", label: "Reviews" },
//     { key: "admissions", label: "Admission Process" },
//     { key: "approvals", label: "Approvals" },
//     { key: "blogs", label: "Blogs/Videos" },
//   ];

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         setError(null);

//         console.log("🔵 Course slug:", slug);

//         // 1) Get course -> university slug
//         const courseRes = await api.get(`/coursepage/${slug}`);
//         console.log("🟢 Course API:", courseRes.data);

//         const universities = courseRes?.data?.data?.universities || [];
//         const firstUni = universities[0];

//         if (!firstUni?.slug) {
//           console.error("❌ University slug not found in course API");
//           setError("University slug not found from course API");
//           setLoading(false);
//           return;
//         }

//         setUniSlug(firstUni.slug);
//         setUniName(firstUni.university_name || firstUni.slug);
//         console.log("🟣 Selected University Slug:", firstUni.slug);

//         // 2) Get full university page (single API that works on prod)
//         const uniRes = await api.get(`/university-page/${firstUni.slug}`);
//         console.log("🟡 University Page API:", uniRes.data);

//         setUniData(uniRes?.data?.data || null);
//       } catch (err) {
//         console.error("🔥 Fetch error:", err?.response?.status, err?.response?.data || err.message);
//         setError("Backend returned non-JSON or route not found. Check console.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (slug) fetchData();
//   }, [slug]);

//   return (
//     <div className="border rounded-xl p-4">
//       <h3 className="font-semibold text-lg text-center mb-4">
//         Table of Content {uniName ? `(${uniName})` : ""}
//       </h3>

//       {loading && <p className="text-gray-500">Loading...</p>}
//       {error && <p className="text-red-500">Error: {error}</p>}

//       <ol className="text-sm text-blue-600">
//         {tocItems.map((item, index) => (
//           <li key={item.key} className="border-t py-2">
//             <div
//               className="cursor-pointer hover:underline"
//               onClick={() => setActiveIndex(activeIndex === index ? null : index)}
//             >
//               {index + 1}. {item.label}
//             </div>

//             {activeIndex === index && uniData && (
//               <div className="mt-2 pl-4 text-gray-700 text-sm space-y-1">
//                 {item.key === "about" && <p>{uniData.about || "N/A"}</p>}

//                 {item.key === "courses" &&
//                   (uniData.courses?.length
//                     ? uniData.courses.map((c) => <p key={c.id}>{c.coruse_name}</p>)
//                     : "No courses")}

//                 {item.key === "fees" &&
//                   (uniData.fees?.length
//                     ? uniData.fees.map((f) => (
//                         <p key={f.id}>
//                           {f.course_name} – ₹{f.total_fees}
//                         </p>
//                       ))
//                     : "No fee data")}

//                 {item.key === "placements" && <p>{uniData.placements || "N/A"}</p>}

//                 {item.key === "reviews" && (
//                   <>
//                     <p>Rating: {uniData.reviews?.rating || "N/A"}</p>
//                     <p>Satisfaction: {uniData.reviews?.satisfaction || "N/A"}</p>
//                     <p>Choice: {uniData.reviews?.choice || "N/A"}</p>
//                   </>
//                 )}

//                 {item.key === "admissions" && (
//                   <>
//                     <p>Eligibility: {uniData.admissions?.eligibility || "N/A"}</p>
//                     <p>Details: {uniData.admissions?.details || "N/A"}</p>
//                   </>
//                 )}

//                 {item.key === "approvals" && <p>{uniData.approvals || "N/A"}</p>}

//                 {item.key === "blogs" &&
//                   (uniData.blogs?.length
//                     ? uniData.blogs.map((b) => <p key={b.id}>{b.title || "Blog"}</p>)
//                     : "No blogs/videos")}
//               </div>
//             )}
//           </li>
//         ))}
//       </ol>
//     </div>
//   );
// }



import React, { useEffect, useState } from "react";
import api from "../api/axios";
import PodcastMic from "../course-image/podcast.png";
import { FaPlay, FaShareAlt } from "react-icons/fa";

export default function Podcast({ slug }) {
  const [podcast, setPodcast] = useState(null);
  const [showPodcastPopup, setShowPodcastPopup] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);

  useEffect(() => {
    if (!slug) return;

    api.get(`/course/${slug}/podcast`)
      .then((res) => {
        if (res.data.success) setPodcast(res.data.data);
      })
      .catch((err) => console.error("Podcast API Error:", err));
  }, [slug]);

  if (!podcast) return null;

  return (
    <>
      {/* Podcast Card */}
      <div className="w-full mt-6">
        <img
          src={PodcastMic}
          alt="Podcast Section"
          className="w-full h-auto rounded-xl cursor-pointer"
          onClick={() => setShowPodcastPopup(true)}
        />
      </div>

      {/* Podcast Popup */}
      {showPodcastPopup && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 w-11/12 max-w-md bg-white rounded-xl shadow-lg p-6 z-50">
          <button
            className="absolute top-2 right-2 text-red-500 text-lg"
            onClick={() => setShowPodcastPopup(false)}
          >
            ❌
          </button>

          <div className="flex flex-col items-center">
            <img src={PodcastMic} alt="Podcast Mic" className="w-10 h-10 mb-3" />
            <h2 className="font-bold text-xl text-center mb-3">
              {podcast.title}
            </h2>

            <audio controls className="w-full my-3">
              <source src={podcast.audio_url} />
            </audio>

            <div className="flex justify-between items-center w-full mb-4 px-2 text-gray-500 text-sm">
              <div className="flex items-center gap-2">
                <FaPlay />
                <span>00:00</span>
              </div>
              <div className="flex items-center gap-2">
                <FaShareAlt className="cursor-pointer" />
              </div>
            </div>

            <button
              className="w-full text-center text-gray-700 font-semibold py-2 border-t border-b mb-2"
              onClick={() => setShowTranscript(!showTranscript)}
            >
              View Transcript
            </button>

            {showTranscript && (
              <div className="text-gray-600 text-sm text-left mt-2 max-h-40 overflow-y-auto">
                <p>{podcast.transcript || "Transcript available nahi hai."}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}










// import React, { useState } from "react"; // ✅ Add useState
// import PodcastMic from "../course-image/podcast.png"; // Use your actual image path
// import Podcast from "../pages/Podcast"; // (if you are importing, otherwise ignore it for now)

// export default function Section2() {
//   const [showPodcastPopup, setShowPodcastPopup] = useState(false); // ✅ Add popup state

//   const contents = [
//     "About jain University",
//     "jain University Courses",
//     "jain University fee structure",
//     "jain University placement",
//     "jain University reviews",
//     "jain University Admission process",
//   ];

//   return (
//     <div className="w-full px-4 md:px-10 py-6">
//       {/* Tabs */}
//       <div className="flex flex-wrap gap-6 border-b pb-2 text-sm font-medium text-gray-500">
//         <div className="text-[#004aad] border-b-2 border-[#004aad] pb-1 cursor-pointer">About</div>
//         <div className="cursor-pointer">Courses</div>
//         <div className="cursor-pointer">Fee Structure</div>
//         <div className="cursor-pointer">Placements</div>
//         <div className="cursor-pointer">Reviews</div>
//         <div className="cursor-pointer">Admissions Process</div>
//         <div className="cursor-pointer">Approvals</div>
//         <div className="cursor-pointer">Blogs/Videos</div>
//       </div>

//       {/* Main Content */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
//         {/* Left: Table of Content */}
//         <div className="border rounded-xl p-4">
//           <h3 className="font-semibold text-lg text-center mb-4">Table of Content</h3>
//           <ol className="text-sm text-blue-600">
//             {contents.map((item, index) => (
//               <li
//                 key={index}
//                 className="border-t first:border-t-0 py-2 px-2 hover:underline cursor-pointer"
//               >
//                 <span className="font-semibold mr-2">{index + 1}.</span>
//                 {item}
//               </li>
//             ))}
//           </ol>
//           <div className="text-blue-600 text-sm mt-2 cursor-pointer hover:underline text-right pr-2">
//             See more
//           </div>
//         </div>

//         {/* Right: Podcast Image */}
//         <div className="w-full">
//           <img
//             src={PodcastMic}
//             alt="Podcast Section"
//             className="w-full h-auto rounded-xl cursor-pointer"
//             onClick={() => setShowPodcastPopup(true)} // ✅ Open popup on click
//           />
//         </div>

//       </div>

//       {/* Podcast Popup Modal */}
//       {showPodcastPopup && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white w-[90%] max-w-md rounded-xl shadow-lg relative p-6">
//             {/* Close Button */}
//             <button
//               className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-2xl"
//               onClick={() => setShowPodcastPopup(false)}
//             >
//               &times;
//             </button>

//             {/* Podcast Content */}
//             <div className="flex flex-col items-center text-center space-y-4">
//               {/* Mic Icon */}
//               <img
//                 src={PodcastMic}
//                 alt="Podcast"
//                 className="w-16 h-16"
//               />

//               {/* Title */}
//               <h2 className="text-xl font-bold">Podcast On JAIN UNIVERSITY</h2>

//               {/* Audio Waveform (Placeholder) */}
//               <div className="bg-gray-200 rounded-md w-full h-12 flex items-center justify-center">
//                 {/* Placeholder for waveform */}
//                 <span>Audio Waveform</span>
//               </div>

//               {/* Speed and Share */}
//               <div className="flex justify-between items-center w-full mt-2 text-sm text-gray-600">
//                 <button className="px-2 py-1 border rounded-md">x1.5</button>
//                 <button>Share</button>
//               </div>

//               {/* View Transcript */}
//               <div className="w-full mt-4">
//                 <button className="text-primary font-medium">View Transcript ▲</button>
//                 <p className="text-gray-700 text-sm mt-2">
//                   Jain University Podcast by College Drishti
//                 </p>
//                 <p className="text-gray-600 text-xs mt-1">
//                   Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent commodo cursus magna...
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//     </div>
//   );
// }

