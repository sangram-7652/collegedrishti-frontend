// import React, { useState } from "react";

// const ComparisonSection = ({
//   allUniversities = [],
//   selectedUniversities = [],
//   onAddUniversity,
//   onRemoveUniversity,
//   onCompare,
//   loading,
//   error
// }) => {
//   const [selectedCourse, setSelectedCourse] = useState("Online MBA");

//   // Filter out universities that are already selected to avoid duplicates
//   const availableUniversities = allUniversities.filter(
//     (u) => !selectedUniversities.some((sel) => sel.id === u.id)
//   );

//   return (
//     <section className="px-4 md:px-16 py-10">
//       <div className="text-center mb-6">
//         <h2 className="text-lg md:text-xl font-semibold bg-blue-500 text-white inline-block px-4 py-2 rounded-full">
//           Select Universities
//         </h2>
//         {selectedUniversities.length > 0 && (
//           <div className="mt-3 text-base md:text-lg font-medium text-gray-800 flex flex-wrap justify-center gap-2">
//             {selectedUniversities.map((u, index) => (
//               <span key={u.id}>
//                 {u.name}
//                 {index < selectedUniversities.length - 1 && (
//                   <span className="mx-1">VS</span>
//                 )}
//               </span>
//             ))}
//           </div>
//         )}
//       </div>

//       {error && (
//         <div className="text-red-500 text-center mb-4">{error}</div>
//       )}

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 justify-items-center">
//         {selectedUniversities.map((u) => (
//           <div
//             key={u.id}
//             className="relative bg-white rounded-xl shadow border p-4 w-full max-w-xs"
//           >
//             <button
//               className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
//               onClick={() => onRemoveUniversity(u)}
//             >
//               ✕
//             </button>
//             {u.image && (
//               <img
//                 src={`/${u.image}`}
//                 alt={u.name}
//                 className="h-12 mx-auto mb-2 object-contain"
//               />
//             )}
//             <h3 className="text-center font-semibold text-sm">{u.name}</h3>
//             <select
//               className="w-full mt-3 border rounded p-2 text-sm"
//               value={selectedCourse}
//               onChange={(e) => setSelectedCourse(e.target.value)}
//             >
//               <option>Online MBA</option>
//               <option>Online BCA</option>
//               <option>Online MCA</option>
//             </select>
//             <p className="text-green-600 text-center mt-2 font-semibold text-sm">
//               {u.fees ? `₹${u.fees}` : "Price not available"}
//             </p>
//           </div>
//         ))}

//         {/* Add University Dropdown Card */}
//         {availableUniversities.length > 0 && selectedUniversities.length < 4 && (
//           <div className="border-2 border-dashed rounded-xl p-4 flex flex-col items-center justify-center text-center w-full max-w-xs min-h-[220px]">
//             <div className="bg-gray-100 p-3 rounded-full mb-2">
//               <span className="text-xl">➕</span>
//             </div>
//             <p className="text-sm font-medium text-gray-600">Add University</p>
//             <select
//               className="mt-3 border rounded p-2 w-full text-sm"
//               onChange={(e) => {
//                 const selectedId = parseInt(e.target.value);
//                 const uni = allUniversities.find((u) => u.id === selectedId);
//                 if (uni) onAddUniversity(uni);
//               }}
//               value=""
//             >
//               <option value="">Select University</option>
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
//             disabled={loading}
//             className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors disabled:opacity-50"
//           >
//             {loading ? "Comparing..." : "Compare Universities"}
//           </button>
//         </div>
//       )}
//     </section>
//   );
// };

// export default ComparisonSection;]

// correct code

// import React from "react";

// const ComparisonSection = ({
//   allUniversities,
//   selectedUniversities,
//   onAddUniversity,
//   onRemoveUniversity,
//   onCompare,
//   loading
// }) => {

//   // Only unselected universities available for adding
//   const available = allUniversities.filter(
//     (u) => !selectedUniversities.some((x) => x.id === u.id)
//   );

//   return (
//     <section className="px-4 md:px-16 py-10 text-center">

//       {/* Title */}
//       <h2 className="text-xl font-semibold bg-blue-600 text-white px-6 py-2 rounded-full inline-block">
//         Comparison Between
//       </h2>

//       {/* University Names with VS */}
//       <div className="flex justify-center gap-2 mt-4 flex-wrap text-lg font-medium">
//         {selectedUniversities.map((u, i) => (
//           <span key={u.id} className="flex items-center">
//             {u.name}
//             {i < selectedUniversities.length - 1 && (
//               <span className="mx-2 text-gray-600">VS</span>
//             )}
//           </span>
//         ))}
//       </div>

//       {/* Selected University Cards */}
//       <div className="flex flex-wrap justify-center gap-6 mt-6">
//         {selectedUniversities.map((u) => (
//           <div
//             key={u.id}
//             className="relative bg-white rounded-xl shadow border p-4 w-[230px]"
//           >
//             {/* Remove Button */}
//             <button
//               onClick={() => onRemoveUniversity(u)}
//               className="absolute right-2 top-2 text-gray-500 hover:text-red-600"
//             >
//               ✕
//             </button>

//             {/* Logo */}
//             {u.image && (
//               <img
//                 src={`https://api.collegedrishti.com/${u.image}`}
//                 className="h-12 mx-auto mb-2 object-contain"
//                 alt={u.name}
//               />
//             )}

//             {/* Name */}
//             <h3 className="font-semibold text-sm mt-1">{u.name}</h3>

//             {/* Course Dropdown (Dynamic) */}
//             <select className="mt-3 w-full border rounded p-2 text-sm">
//               <option>{u.coruse_name}</option>
//             </select>

//             {/* Fees Range FIELD (CORRECT FIELD) */}
//             <p className="text-green-600 font-bold mt-2 text-sm">
//               {u.fees_range ? u.fees_range : "N/A"}
//             </p>
//           </div>
//         ))}

//         {/* Add Card */}
//         {available.length > 0 && selectedUniversities.length < 4 && (
//           <div className="border-2 border-dashed rounded-xl p-4 w-[230px] flex flex-col items-center">
//             <span className="text-xl mb-2">➕</span>
//             <p className="text-sm">Add University</p>

//             <select
//               className="mt-2 border p-2 rounded w-full"
//               onChange={(e) => {
//                 const uni = available.find((x) => x.id == e.target.value);
//                 if (uni) onAddUniversity(uni);
//               }}
//             >
//               <option value="">Select</option>
//               {available.map((u) => (
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
//         <button
//           onClick={onCompare}
//           className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold"
//         >
//           {loading ? "Comparing…" : "Compare Universities"}
//         </button>
//       )}
//     </section>
//   );
// };

// export default ComparisonSection;









// import React, { useEffect, useState } from "react";
// import api from "../api/axios";

// const ComparisonSection = ({

//   allUniversities,
//   selectedUniversities,
//   onAddUniversity,
//   onRemoveUniversity,
//   onCompare,
//   loading,
//   courseData
// }) => {

//   const allCourses = courseData.flatMap(course =>
//     (course.sub_courses || []).map(sub => ({
//       id: sub.sub_co_id,
//       name: sub.sub_name,
//     }))
//   );


//   // Dropdown me sirf wahi universities jo selected me nahi
//   const available = allUniversities.filter(
//     (u) => !selectedUniversities.some((x) => x.id === u.id)
//   );

//   return (
//     <section className="px-4 md:px-16 py-10 text-center">

//       {/* Title */}
//       <h2 className="text-xl md:text-2xl font-semibold bg-blue-600 text-white px-8 py-3 rounded-full inline-block shadow-md">
//         Comparison Between
//       </h2>

//       {/* University Names with VS */}
//       <div className="flex justify-center gap-3 mt-5 flex-wrap text-[18px] font-medium tracking-wide">
//         {selectedUniversities.map((u, i) => (
//           <div key={u.id} className="flex items-center gap-2">
//             <span>{u.name}</span>
//             {i < selectedUniversities.length - 1 && (
//               <span className="text-gray-400 font-semibold">VS</span>
//             )}
//           </div>
//         ))}
//       </div>

//       {/* University Cards */}
//       <div className="flex flex-wrap justify-center gap-6 mt-8">

//         {selectedUniversities.map((u) => (
//           <div
//             key={u.id}
//             className="relative bg-white rounded-xl shadow-lg border border-gray-200 p-5 w-[240px] flex flex-col items-center"
//           >
//             {/* Remove Button */}
//             <button
//               onClick={() => onRemoveUniversity(u)}
//               className="absolute right-2 top-2 text-gray-400 hover:text-red-500 text-xl"
//             >
//               ✕
//             </button>

//             {/* Logo */}
//             {u.image && (
//               <img
//                 src={`https://api.collegedrishti.com/${u.image}`}
//                 className="h-14 mx-auto mb-3 object-contain"
//               />
//             )}

//             {/* University Name */}
//             <h3 className="font-semibold text-base mb-2">{u.name}</h3>

//             {/* Course Dropdown (UI only) */}
//             <select className="w-full border rounded p-2 text-sm bg-gray-50">
//               <option value="">Select Course</option>

//               {allCourses.map((c) => (
//                 <option key={c.id} value={c.id}>
//                   {c.name}
//                 </option>
//               ))}
//             </select>

//             {/* Fees */}
//             <p className="text-green-600 font-bold mt-3 text-sm">
//               {u.fees ? `INR ${u.fees}` : "N/A"}
//             </p>
//           </div>
//         ))}

//         {/* Add University Card */}
//         {available.length > 0 && selectedUniversities.length < 4 && (
//           <div className="w-[240px] border-2 border-dashed border-gray-400 rounded-xl p-5 flex flex-col justify-center items-center bg-white shadow-sm">

//             <button className="text-3xl text-gray-700 mb-2">＋</button>

//             <p className="text-sm text-gray-600 mb-3">Add University</p>

//             <select
//               className="border p-2 rounded w-full bg-gray-50 text-sm"
//               onChange={(e) => {
//                 const uni = available.find((x) => x.id == e.target.value);
//                 if (uni) onAddUniversity(uni);
//               }}
//             >
//               <option value="">Select University</option>
//               {available.map((u) => (
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
//         <button
//           onClick={onCompare}
//           className="mt-10 bg-blue-600 hover:bg-blue-700 text-white px-10 py-3 rounded-lg text-lg font-semibold shadow-md"
//         >
//           {loading ? "Comparing…" : "Compare Universities"}
//         </button>
//       )}
//     </section>
//   );
// };

// export default ComparisonSection;











import { useEffect, useState } from "react";
import api from "../api/axios";

const ComparisonSection = ({
  allUniversities,
  selectedUniversities,
  onAddUniversity,
  onRemoveUniversity,
  onCompare,
  courseData
}) => {

  // ✅ All courses extract
  // const allCourses = courseData.flatMap(course =>
  //   (course.sub_courses || []).map(sub => ({
  //     id: sub.sub_co_id,
  //     name: sub.sub_name
  //   }))
  // );

  const [subCourses, setSubCourses] = useState([]);
  const [selectedSubCourse, setSelectedSubCourse] = useState("");

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
            className="relative bg-white rounded-xl shadow-lg border border-gray-200 p-5 w-[240px] flex flex-col items-center transition hover:shadow-xl"
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
                src={`https://api.collegedrishti.com/${u.image}`}
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
              onChange={(e) => setSelectedSubCourse(e.target.value)}
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
        <div className="w-[240px] border-2 border-dashed border-gray-300 rounded-xl p-5 flex flex-col items-center justify-center bg-white shadow-sm">

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
          onClick={() => onCompare(selectedSubCourse)}
          className="mt-10 bg-blue-600 hover:bg-blue-700 text-white px-10 py-3 rounded-full text-lg font-semibold shadow-md"
        >
          Compare Universities
        </button>
        // <button
        //   onClick={onCompare}
        //   className="mt-10 bg-blue-600 hover:bg-blue-700 text-white px-10 py-3 rounded-full text-lg font-semibold shadow-md"
        // >
        //   Compare Universities
        // </button>
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
//                 src={`https://api.collegedrishti.com/${u.image}`}
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
