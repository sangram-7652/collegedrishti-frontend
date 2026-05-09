


import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import mbaImage from '../course-image/mba-future.png';
import { Link } from "react-router-dom";


const Section6 = ({ course, specializations = [] }) => {
  if (!course) return null;

  const courseName = course?.sub_name || "Course";

  return (
    <section className="bg-white px-4 md:px-12 py-14">
      <div className="max-w-7xl mx-auto">
        {/* Future of Course */}
        {/* ✅ Future of Dynamic Course */}
        <div>
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">
              Future of {courseName}
            </h2>

            {course?.future_scope ? (
              <div
                className="course-content text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: course.future_scope
                }}
              />
            ) : (
              <p className="text-gray-500">
                Future information not available.
              </p>
            )}
          </div>








        {/* Specializations */}
        <div className="mt-14">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-[#0F172A] mb-2">
            {courseName} Specializations
          </h2>

          <p className="text-gray-600 mb-8 max-w-3xl">
            Completion of 10+2 (or equivalent) from a recognized board.
          </p>

          {specializations.length === 0 ? (
            <p className="text-red-500">No specializations found for this course.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 md:gap-6">

      

             {specializations.map((sp) => {
                   console.log("SP:", sp);
                if (!sp.slug) {
                  console.error("Slug missing for:", sp);
                }

                return (
                  <Link
                    key={sp.specialize_id}
                    to={`/specialization/${sp.slug}`}
                  className="bg-white border border-gray-200 shadow px-4 py-2.5 text-center rounded-lg text-sm text-blue-600 cursor-pointer hover:shadow-lg transition-all">
                    {sp.specialize_name}
                  </Link>
                );
              })}


           


            </div>
          )}

          {specializations.length > 0 && (
            <div className="text-center mt-6">
              <button className="bg-blue-600 text-white px-6 py-2 rounded-full text-sm shadow-md hover:shadow-lg hover:bg-blue-700 transition">
                View All
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Section6;


// import React from 'react';
// import { CheckCircle2 } from 'lucide-react';
// import mbaImage from '../course-image/mba-future.png';

// const Section6 = ({ course, specializations = [] }) => {
//   if (!course) return null;

//   const courseName = course?.sub_name || "Course";

//   return (
//     <section className="bg-white px-4 md:px-12 py-14">
//       <div className="max-w-7xl mx-auto">
//         {/* Future of Course */}
//         {/* ✅ Future of Dynamic Course */}
//         <div className="grid md:grid-cols-2 gap-10 items-center">
//           <div>
//             <h2 className="text-2xl md:text-3xl font-semibold mb-4">
//               Future of {courseName}
//             </h2>
//             <p className="text-gray-600 mb-6">
//               Discover a world of learning at your fingertips with our comprehensive educational platform.
//               Whether you’re a student, educator, or lifelong learner, our site offers an extensive collection of resources.
//             </p>
//             <ul className="space-y-4">
//               {[...Array(4)].map((_, i) => (
//                 <li key={i} className="flex gap-2 text-sm md:text-base text-gray-700">
//                   <CheckCircle2 className="text-green-500 mt-1" size={18} />
//                   UGC-DEB Approved. The management and technical programs are also sanctioned by the All India Council for Technical Education. WES Accredited. This is the first step that certifies technical and professional programs offered to learners by academic institutions in India in relation to the standard of performance set in education and industry.
//                 </li>
//               ))}
//             </ul>
//           </div>
//           <div className="flex justify-center">
//             <img
//               src={mbaImage}
//               alt={`Future of ${courseName}`}
//               className="w-full max-w-md"
//             />
//           </div>
//         </div>
//         {/* Specializations */}
//         <div className="mt-14">
//           <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-[#0F172A] mb-2">
//             {courseName} Specializations
//           </h2>

//           <p className="text-gray-600 mb-8 max-w-3xl">
//             Completion of 10+2 (or equivalent) from a recognized board.
//           </p>

//           {specializations.length === 0 ? (
//             <p className="text-red-500">No specializations found for this course.</p>
//           ) : (
//             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 md:gap-6">
//               {specializations.map((sp) => (
//                 <div
//                   key={sp.specialize_id}
//                   className="bg-white border border-gray-200 shadow-[0_8px_20px_rgba(0,0,0,0.06)] px-4 py-2.5 text-center rounded-lg text-[12px] md:text-sm text-blue-600 cursor-pointer hover:shadow-[0_12px_28px_rgba(37,99,235,0.15)] hover:-translate-y-[1px] transition-all"
//                 >
//                   {sp.specialize_name}
//                 </div>
//               ))}
//             </div>
//           )}

//           {specializations.length > 0 && (
//             <div className="text-center mt-6">
//               <button className="bg-blue-600 text-white px-6 py-2 rounded-full text-sm shadow-md hover:shadow-lg hover:bg-blue-700 transition">
//                 View All
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Section6;