

import { useEffect, useState } from "react";
import api from "../api/axios";

const ComparisonSection = ({
  allUniversities,
  selectedUniversities,
  onAddUniversity,
  onRemoveUniversity,
  onCompare,
  compareLoading = false,
}) => {



  const [subCourses, setSubCourses] = useState([]);

  useEffect(() => {
    const fetchSubCourses = async () => {
      try {
        const courseId = localStorage.getItem("selectedCourseId");

        if (!courseId) return;

        const res = await api.get(`/courses/${courseId}`);

        setSubCourses(res.data.data || []);

      } catch (err) {
        console.log("Subcourse error:", err);
      }
    };

    fetchSubCourses();
  }, []);

  const available = allUniversities.filter(
    (u) => !selectedUniversities.some((x) => x.id === u.id)
  );

const API_BASE = import.meta.env.VITE_API_BASE_URL.replace("/api", "");

const getImageUrl = (img) => {
  if (!img) return "";

  if (img.startsWith("http")) {
    return img;
  }

  return `${API_BASE}/${img}`;
};
  console.log(selectedUniversities);
  return (
    <section className="px-4 md:px-16 py-10 text-center">

      <h2 className="text-xl md:text-2xl font-semibold bg-blue-600 text-white px-8 py-3 rounded-full inline-block shadow-md">
        Comparison Between
      </h2>

      <div className="flex justify-center gap-3 mt-5 flex-wrap text-[18px] font-medium">
        {selectedUniversities.map((u, i) => (
          <div key={u.id}>
            {u.name} {i < selectedUniversities.length - 1 && "VS"}
          </div>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-6 mt-8">

        {selectedUniversities.map((u) => (
          <div
            key={u.id}
            className="relative bg-white rounded-xl shadow-lg border border-gray-200 p-5 w-full max-w-[240px] flex flex-col items-center transition hover:shadow-xl"
          >
            {/* ❌ Remove Button */}
            <button
              onClick={() => onRemoveUniversity(u)}
              className="absolute top-2 right-2 text-gray-400 hover:text-red-500 text-lg"
            >
              ✕
            </button>

            {/* ✅ Logo */}
            {u.image && (
              <img
                 src={getImageUrl(u.image)}
                alt={u.name}
                className="h-14 object-contain mb-2"
              />
            )}

            {/* ✅ University Name */}
            <h3 className="font-semibold text-sm text-center">
              {u.name}
            </h3>

            {/* ✅ Subcourse Dropdown */}
            <select
              className="w-full border rounded p-2 mt-2 text-sm bg-gray-50"
            >
              <option value="">Select Specialization</option>

              {subCourses.map((s) => (
                <option key={s.sub_co_id} value={s.sub_co_id}>
                  {s.sub_name}
                </option>
              ))}
            </select>
            {/* <select className="w-full border rounded p-2 mt-2 text-sm bg-gray-50">
              <option>Select Specialization</option>

              {subCourses.map((s) => (
                <option key={s.sub_co_id} value={s.sub_co_id}>
                  {s.sub_name}
                </option>
              ))}
            </select> */}

            {/* ✅ Fees */}
            <p className="text-green-600 font-semibold mt-2 text-sm">
              {u.fees ? u.fees : "N/A"}
            </p>
            {/* <p className="text-green-600 font-semibold mt-2 text-sm">
              {u.fees || u.total_fees || u.course_fees || u.price
                ? `INR ${u.fees || u.total_fees || u.course_fees || u.price}`
                : "N/A"}
            </p> */}

          </div>
        ))}

        {/* {available.length > 0 && (
          <select
            onChange={(e) => {
              const uni = available.find(x => x.id == e.target.value);
              if (uni) onAddUniversity(uni);
            }}
          >
            <option>Add University</option>
            {available.map(u => (
              <option key={u.id} value={u.id}>{u.name}</option>
            ))}
          </select>
        )} */}
        <div className="w-full max-w-[240px] border-2 border-dashed border-gray-300 rounded-xl p-5 flex flex-col items-center justify-center bg-white shadow-sm">

          <div className="text-3xl text-gray-400 mb-2">＋</div>

          <p className="text-sm text-gray-500 mb-2">Add University</p>

          <select
            className="border rounded p-2 w-full text-sm"
            onChange={(e) => {
              const uni = available.find((x) => x.id == e.target.value);
              if (uni) onAddUniversity(uni);
            }}
          >
            <option>Select University</option>
            {available.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {selectedUniversities.length >= 2 && (
        <button
          type="button"
          onClick={() => onCompare()}
          disabled={compareLoading}
          className="mt-10 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white px-10 py-3 rounded-full text-lg font-semibold shadow-md"
        >
          {compareLoading ? "Preparing comparison…" : "Compare Universities"}
        </button>
      )}
    </section>
  );
};

export default ComparisonSection;



































// import React, { useState } from "react";

// const ComparisonSection = ({
//   allUniversities = [],
//   selectedUniversities = [],
//   onAddUniversity,
//   onRemoveUniversity,
//   onCompare,
//   loading,
// }) => {
//   const [selectedCourse, setSelectedCourse] = useState("Online MBA");

//   // Filter universities NOT already selected
//   const availableUniversities = allUniversities.filter(
//     (u) => !selectedUniversities.some((sel) => sel.id === u.id)
//   );

//   return (
//     <section className="px-4 md:px-16 py-8">
//       {/* Title */}
//       <div className="text-center mb-6">
//         <h2 className="text-lg md:text-xl font-semibold bg-blue-600 text-white px-6 py-2 rounded-full inline-block">
//           Comparison Between
//         </h2>

//         {/* Names with VS */}
//         <div className="flex justify-center gap-2 mt-4 text-gray-700 font-medium flex-wrap">
//           {selectedUniversities.map((u, index) => (
//             <span key={u.id} className="flex items-center gap-2">
//               {u.name}
//               {index < selectedUniversities.length - 1 && (
//                 <span className="text-gray-500">VS</span>
//               )}
//             </span>
//           ))}
//         </div>
//       </div>

//       {/* Cards */}
//       <div className="flex flex-wrap justify-center gap-6">
//         {selectedUniversities.map((u) => (
//           <div
//             key={u.id}
//             className="relative border rounded-2xl shadow bg-white p-4 w-[230px] text-center"
//           >
//             {/* Remove Button */}
//             <button
//               className="absolute right-2 top-2 text-gray-400 hover:text-red-500"
//               onClick={() => onRemoveUniversity(u)}
//             >
//               ✕
//             </button>

//             {/* Logo */}
//             {u.image && (
//               <img
//                 src={`${import.meta.env.VITE_API_BASE_URL}${u.image}`}
//                 className="h-14 mx-auto mb-2 object-contain"
//                 alt={u.name}
//               />
//             )}

//             {/* University Name */}
//             <p className="font-semibold text-sm mb-2">{u.name}</p>

//             {/* Course Dropdown */}
//             <select
//   className="border p-2 mt-2 w-full rounded"
//   value={u.selectedCourse || ""}
//   onChange={(e) => {
//     const course = u.courses.find(c => c.coruse_name === e.target.value);
//     u.selectedCourse = course;
//     u.fees = course?.fees;
//   }}
// >
//   <option value="">Select Course</option>

//   {u.courses?.map((course) => (
//     <option key={course.id} value={course.coruse_name}>
//       {course.coruse_name}
//     </option>
//   ))}
//             </select>


//             {/* Fees */}
//             <p className="text-green-600 font-bold mt-2 text-sm">
//               {u.fees ? `INR ${u.fees}` : "INR 0"}
//             </p>
//           </div>
//         ))}

//         {/* Add University Card */}
//         {availableUniversities.length > 0 && selectedUniversities.length < 4 && (
//           <div className="border-2 border-dashed rounded-2xl p-4 w-[230px] text-center flex flex-col justify-center">
//             <div className="bg-gray-100 p-3 rounded-full w-14 h-14 mx-auto flex items-center justify-center mb-3">
//               <span className="text-xl font-bold">+</span>
//             </div>

//             <p className="text-gray-500 text-sm">Add University</p>

//             <select
//               className="mt-3 border p-2 rounded-lg w-full text-sm"
//               onChange={(e) => {
//                 const selectedId = parseInt(e.target.value);
//                 const uni = availableUniversities.find(
//                   (u) => u.id === selectedId
//                 );
//                 if (uni) onAddUniversity(uni);
//               }}
//             >
//               <option value="">Select Course</option>
//               {availableUniversities.map((u) => (
//                 <option key={u.id} value={u.id}>
//                   {u.name}
//                 </option>
//               ))}
//             </select>
//           </div>
//         )}
//       </div>

//       {/* Compare Button */}
//       {selectedUniversities.length >= 2 && (
//         <div className="text-center mt-8">
//           <button
//             onClick={onCompare}
//             className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg"
//           >
//             {loading ? "Comparing..." : "Compare Universities"}
//           </button>
//         </div>
//       )}
//     </section>
//   );
// };

// export default ComparisonSection;
