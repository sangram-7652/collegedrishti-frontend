// import { FaStar } from "react-icons/fa";
// import { PiSealCheckFill } from "react-icons/pi";
// import courseImage from '../uni-image/framecourse.png'; // replace with your actual image path

// const UniversityDetailsSection = () => {
//   return (
//     <section className="bg-white py-10">
//       <div className="max-w-[1200px] mx-auto px-4 flex flex-col lg:flex-row gap-15">

//         {/* Left Section */}
//         <div className="flex-1">
//           {/* About Section */}
//           <div className="mb-6">
//             <h2 className="text-xl font-semibold text-black mb-2">About</h2>
//             <p className="text-sm text-gray-700 leading-relaxed">
//               Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
//               industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
//               scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into
//               electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of
//               Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like
//               Aldus PageMaker including versions of Lorem Ipsum.
//             </p>
//           </div>

//           {/* Courses Section */}
//           <h2 className="text-xl font-semibold text-black mb-3">Courses</h2>
//           <div className="flex items-center gap-4 overflow-x-auto">
//             <button className="bg-blue-600 text-white rounded-full p-2 text-sm shrink-0">
//               &#x276E;
//             </button>
//             {[1, 2, 3].map((_, idx) => (
//               <div key={idx} className="min-w-[250px] bg-white rounded-xl border shadow-sm p-2">
//                 <img src={courseImage} alt="Course Thumbnail" className="rounded-lg mb-3 w-full h-[150px] object-cover" />
//                 <div className="px-2 pb-3">
//                   <h3 className="font-semibold text-base text-black mb-1">Online MBA</h3>
//                   <p className="text-sm text-gray-600 mb-2">Jain University</p>
//                   <div className="flex items-center text-yellow-500 text-sm gap-1 mb-3">
//                     <FaStar size={14} />
//                     <span className="text-black">4.9</span>
//                   </div>
//                   <button className="bg-[#004AAD] text-white text-sm w-full rounded-full py-2">
//                     Know More
//                   </button>
//                 </div>
//               </div>
//             ))}
//             <button className="bg-blue-600 text-white rounded-full p-2 text-sm shrink-0">
//               &#x276F;
//             </button>
//           </div>
//         </div>

//         {/* Right Sidebar */}
//         <div className="w-full lg:w-[320px] bg-[#F4F8FF] rounded-2xl p-6 shadow-md shrink-0">
//           <h3 className="text-lg font-semibold mb-4">University Features</h3>
//           <ul className="space-y-3 text-sm text-gray-800">
//             {[
//               "Beginner to Advanced",
//               "80+ hours of video content",
//               "15 modules with over 150 lessons",
//               "5 real-world projects",
//               "Professional Certificate upon completion",
//               "English",
//               "Lifetime access with free updates",
//               "No prior programming experience required",
//               "No prior programming experience required",
//               "No prior programming experience required"
//             ].map((item, idx) => (
//               <li key={idx} className="flex items-start gap-2">
//                 <PiSealCheckFill className="text-blue-600 mt-1" />
//                 <span>{item}</span>
//               </li>
//             ))}
//           </ul>

//           <button className="mt-6 bg-[#004AAD] text-white w-full py-2.5 rounded-full text-sm font-semibold">
//             Enroll Now
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// };





// {university?.image && (
//           <img
//              src={
//                   university.image
//                     ? `https://api.collegedrishti.com/${university.image
//                         .replace(/^\/+/, '')       
//                         .replace(/^api\/*/, '')}`   
//                     : '/default-university.png'
//                 }
//             alt={university.name}
//             className="w-64 h-64 object-contain border rounded-lg shadow-md"
//           />
//         )}

// export default UniversityDetailsSection;



import React from "react";

const AboutUniversity = ({ data }) => {

  const university = data?.university || {};
  const university_details = data?.university_details || {};
  return (
    <div className="max-w-6xl mx-auto px-4 py-10 font-sans">
      {/* ✅ Basic University Header */}

      <div className="mt-10">
        <div className="bg-gray-100 rounded-[20px] p-8 border-l-8 border-r-8 border-blue-600">

          <div className="flex flex-col md:flex-row gap-6">

            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-black mb-4">
                {university?.name}
              </h1>

              {university?.address && (
                <p className="text-gray-700 mb-2">
                  <span className="font-semibold text-black">Address:</span>{" "}
                  <span className="text-gray-600">{university.address}</span>
                </p>
              )}

              {university?.est_year && (
                <p className="text-gray-700 mb-2">
                  <span className="font-semibold text-black">Established:</span>{" "}
                  <span className="text-gray-600">{university.est_year}</span>
                </p>
              )}

              {university?.approvals && (
                <p className="text-gray-700 mb-2">
                  <span className="font-semibold text-black">Approvals:</span>{" "}
                  <span className="text-gray-600">{university.approvals}</span>
                </p>
              )}

              {university?.naac_score && (
                <p className="text-gray-700 mb-2">
                  <span className="font-semibold text-black">NAAC Score:</span>{" "}
                  <span className="text-gray-600">{university.naac_score}</span>
                </p>
              )}

              {university?.nirf_ranking && (
                <p className="text-gray-700 mb-2">
                  <span className="font-semibold text-black">NIRF Ranking:</span>{" "}
                  <span className="text-gray-600">{university.nirf_ranking}</span>
                </p>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* ✅ About Section (HTML from `details` field) */}
      {university?.details && (
        // <div className="mt-10">
        //   <div className="overflow-x-auto w-full">
        //     <div
        //       className="prose max-w-none min-w-max"
        //       dangerouslySetInnerHTML={{ __html: university.details }}
        //     />
        //   </div>
        // </div>

        <div className="mt-10">
          <div
            className="course-content max-w-none w-full break-words"
            dangerouslySetInnerHTML={{
              __html: university.details
                ?.replace(/<table/g, '<div class="table-wrapper"><table')
                ?.replace(/<\/table>/g, '</table></div>')
            }} />
        </div>
      )}


      {/* ✅ Quick Facts Section */}
      <div className="mt-10">
        <div className="relative bg-gray-100 rounded-[20px] p-8 border-l-8 border-r-8 border-blue-600">

          {/* Content Grid */}
          <div className="grid md:grid-cols-2 gap-y-4 gap-x-16 text-sm md:text-base">

            {[
              { label: "Education Mode", value: university?.edu_mode },
              { label: "Exam Mode", value: university?.exam_mode },
              { label: "E-Learning Facility", value: university?.e_learn_f },
              { label: "Online Classes", value: university?.onln_class },
              { label: "Placement Assistance", value: university?.place_assit },
              { label: "Industry Relevant Curriculum", value: university?.insd_r_curriculum },
              { label: "Student Rating", value: university?.stu_rating },
              { label: "Satisfied Students", value: university?.statisfied_stu },
              { label: "Students Choice", value: university?.stu_choice },
              { label: "WES Approved", value: university?.wes_app },
              { label: "EMI Option", value: university?.emi },
            ].map(
              (item, index) =>
                item.value && (
                  <p key={index} className="text-gray-700 leading-relaxed">
                    <span className="font-semibold text-black">
                      {item.label}:
                    </span>{" "}
                    <span className="text-gray-600">{item.value}</span>
                  </p>
                )
            )}
          </div>

        </div>
      </div>

      {/* ✅ Additional Details Table */}
      {university_details && (
        <div className="mt-10">
          <h2 className="course-content text-2xl font-semibold mb-4">Additional Details</h2>
          {Object.keys(university_details).map(
            (key) =>
              !["id", "university_id", "is_delete", "created_by"].includes(key) && (
                <p key={key} className="text-gray-700 mb-1">
                  <strong>{key.replace(/_/g, " ")}:</strong>{" "}
                  {university_details[key]}
                </p>
              )
          )}
        </div>
      )}
    </div>
  );
};

export default AboutUniversity;

