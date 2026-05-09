

// import { FaCheckCircle } from "react-icons/fa";


// export default function Section3({ course }) {
//   if (!course) return null;

//   return (
//     <section className="px-4 sm:px-8 lg:px-16 py-10 space-y-8 text-[#1a1a1a]">
//       {/* Title */}
//       <div>
//         <h2 className="text-xl sm:text-2xl font-semibold mb-4">
//           About {course.sub_name || "Course"} Course
//         </h2>

//         {/* 🔥 Admin panel ka poora Step2 content (long_desc) */}
//         <div
//           className="text-sm sm:text-base text-gray-700 mb-4 leading-7"
//           style={{ whiteSpace: "pre-line" }}  // line breaks safe
//           dangerouslySetInnerHTML={{
//             __html: course.long_desc || "<p>No content available</p>",
//           }}
//         />
//       </div>

//       {/* Optional: Highlights */}
//        <div>
//         <h3 className="text-lg sm:text-xl font-semibold mb-3">How does it Helps?</h3>
//         <ul className="space-y-3">
//           {Array(6)
//             .fill("Develop a global business perspective and critical problem-solving skills.")
//             .map((text, index) => (
//               <li key={index} className="flex items-start gap-2 text-sm font-semibold text-gray-800">
//                 <FaCheckCircle className="text-green-400 mt-0.5" />
//                 {text}
//               </li>
//             ))}
//         </ul>
//       </div>


//     </section>
//   );
// }




import { FaCheckCircle } from "react-icons/fa";

// ✅ HTML decode function
function decodeHtml(html) {
  if (!html) return "";
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

export default function Section3({ course }) {
  if (!course) return null;

  return (
    // <section className="px-4 sm:px-8 lg:px-16 py-10 space-y-8 text-[#1a1a1a]">
    <section className="w-full px-4 sm:px-8 lg:px-16 py-10">

      {/* Title */}
      <div>
        <h2 className="text-xl sm:text-2xl font-semibold mb-4">
          About {course.sub_name || "Course"} Course
        </h2>

        {/* Admin panel long description */}


        <div
          className="course-content text-sm sm:text-base text-gray-700 mb-4 leading-7"
          dangerouslySetInnerHTML={{
            __html: decodeHtml(course.long_desc)
              .replace(/<table/g, '<div class="table-wrapper"><table')
              .replace(/<\/table>/g, '</table></div>')
            // __html: decodeHtml(course.long_desc)
          }}



        />
      </div>
      {/* How does it Helps */}
      {course?.how_help && (
        <div>
          <h3 className=" text-lg sm:text-xl font-semibold mb-3">
            How does it Helps?
          </h3>

          <div
            className="course-content text-sm text-gray-800 leading-7"
            dangerouslySetInnerHTML={{
              __html: course.how_help,
            }}
          />
        </div>
      )}

    </section>
  );
}
