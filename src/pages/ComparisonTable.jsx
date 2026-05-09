// import React from "react";

// const ComparisonTable = ({ universities, comparisonData }) => {
//   // If no comparison data, show a message
//   if (!comparisonData || !comparisonData.universitys) {
//     return <div className="text-center py-4">No comparison data available</div>;
//   }

//   // Create a map of university data by ID for quick lookup
//   const universityMap = {};
//   comparisonData.universitys.forEach(uni => {
//     universityMap[uni.id] = uni;
//   });

//   // Get all possible comparison fields from the first university
//   // (assuming all universities have similar fields)
//   const firstUniversity = comparisonData.universitys[0];
//   const allFields = Object.keys(firstUniversity);

//   // Define which fields should be compared and how
//   // These are the fields we want to show in the comparison table
//   const comparableFields = [
//     'approvals',        // UGC/DEB Approval
//     'nirf_ranking',     // NIRF Ranking
//     'naac_score',       // NAAC Score
//     'e_learn_f',        // LMS Portal
//     'onln_class',       // Online Classes
//     'place_assit',      // Placement Assistance
//     'wes_app',          // WES Approval
//     'edu_mode',         // Education Mode
//     'exam_mode',        // Exam Mode
//     'stu_rating',       // Student Rating
//     'statisfied_stu',   // Student Satisfaction
//     'emi'               // EMI Option
//   ];

//   // Filter to only include fields that exist in the university data
//   const availableFields = allFields.filter(field => 
//     comparableFields.includes(field) && 
//     firstUniversity[field] !== undefined
//   );

//   // Function to generate a human-readable label from field name
//   const getLabel = (field) => {
//     const labels = {
//       'approvals': 'UGC/DEB Approved',
//       'nirf_ranking': 'NIRF Ranked',
//       'naac_score': 'NAAC Accredited',
//       'e_learn_f': 'LMS Portal',
//       'onln_class': 'Online Classes',
//       'place_assit': 'Placement Assistance',
//       'wes_app': 'WES Approved',
//       'edu_mode': 'Education Mode',
//       'exam_mode': 'Exam Mode',
//       'stu_rating': 'Student Rating',
//       'statisfied_stu': 'Student Satisfaction',
//       'emi': 'EMI Option'
//     };
//     return labels[field] || field.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
//   };

//   // Function to determine how to display each field's value
//   const formatValue = (field, value) => {
//     if (value === undefined || value === null) return 'N/A';

//     // Special formatting for certain fields
//     switch(field) {
//       case 'approvals':
//         return value.includes('UGC') ? '✅' : '❌';
//       case 'nirf_ranking':
//       case 'naac_score':
//         return value !== 'NA' && value !== '0' ? value : '❌';
//       case 'e_learn_f':
//       case 'onln_class':
//       case 'wes_app':
//       case 'emi':
//         return value === 'Yes' ? '✅' : '❌';
//       case 'place_assit':
//         return value.includes('Online') || value.includes('Offline') ? '✅' : '❌';
//       case 'stu_rating':
//       case 'statisfied_stu':
//         return value; // Display as-is
//       default:
//         return value || 'N/A';
//     }
//   };

//   return (
//     <div className="overflow-auto rounded-lg shadow border bg-white">
//       <table className="min-w-full text-center text-sm font-medium">
//         <thead className="bg-gray-100">
//           <tr>
//             <th className="py-3 px-4 text-left">Criteria</th>
//             {universities.map((uni) => (
//               <th key={uni.id} className="py-3 px-4">
//                 {universityMap[uni.id]?.name || uni.name}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {availableFields.map((field) => (
//             <tr key={field} className="border-t">
//               <td className="py-3 px-4 text-left font-medium">{getLabel(field)}</td>
//               {universities.map((uni) => {
//                 const uniData = universityMap[uni.id] || {};
//                 const value = uniData[field];

//                 return (
//                   <td key={`${uni.id}-${field}`} className="py-3 px-4">
//                     {formatValue(field, value)}
//                   </td>
//                 );
//               })}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ComparisonTable;



import React from "react";

const ComparisonTable = ({ universities }) => {
  if (!universities || universities.length < 1) return null;

  const fields = [
    { key: "approvals", label: "UGC-DEB Approval" },
    { key: "nirf_ranking", label: "NIRF Ranking" },
    { key: "naac_score", label: "NAAC Accreditation" },
    { key: "e_learn_f", label: "LMS Portal" },
    { key: "onln_class", label: "Online Classes" },
    { key: "place_assit", label: "Placement Assistance" },
    { key: "insd_r_curriculum", label: "Industry Relevant Curriculum" },
    { key: "emi", label: "No Cost EMI" },
    { key: "stu_rating", label: "Student Ratings" },
    { key: "statisfied_stu", label: "Satisfied Students" },
    { key: "wes_app", label: "WES Approved" },
  ];

  const formatValue = (value) => {
    if (!value) return <span className="text-red-500 text-lg">✗</span>;

    const v = value.toString().toLowerCase();

    // POSITIVE MATCHES
    if (
      v.includes("yes") ||
      v.includes("approved") ||
      v.includes("available") ||
      v.includes("strong") ||
      v.includes("ugc")
    ) {
      return <span className="text-green-600 text-lg">✓</span>;
    }

    // NEGATIVE
    if (v.includes("no") || v.includes("not") || v.includes("x")) {
      return <span className="text-red-500 text-lg">✗</span>;
    }

    // WORD VALUES (Strong / Weak)
    return <span className="text-gray-700">{value}</span>;
  };

  return (
    <div className="overflow-auto mt-10 bg-white shadow-lg rounded-2xl p-4">
      <table className="w-full text-sm text-center">

        {/* HEADER */}
        <thead className="bg-gray-100 font-semibold text-gray-700">
          <tr>
            <th className="text-left py-3 px-4">Categories</th>
            {universities.map((u) => (
              <th key={u.id} className="py-3 px-4">{u.name}</th>
            ))}
          </tr>
        </thead>

        {/* BODY */}
        <tbody>
          {fields.map((row) => (
            <tr key={row.key} className="border-t">
              <td className="text-left py-3 px-4 font-medium text-gray-700">
                {row.label}
              </td>

              {universities.map((u) => (
                <td key={u.id + row.key} className="py-3 px-4">
                  {formatValue(u?.[row.key])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
};

export default ComparisonTable;





// import React from "react";

// const ComparisonTable = ({ universities }) => {
//   if (!universities || universities.length < 2) return null;

//   const fields = [
//     { key: "approvals", label: "UGC-DEB" },
//     { key: "nirf_ranking", label: "NIRF" },
//     { key: "naac_score", label: "NAAC" },
//     { key: "e_learn_f", label: "LMS Portal" },

//     { key: "alumni", label: "Alumni Network" },          // Strong / Weak
//     { key: "place_assit", label: "Placement Assistance" },
//     { key: "insd_r_curriculum", label: "Curriculum" },
//     { key: "visit", label: "University Visit" },
//     { key: "global_accreditation", label: "Global Accreditations" },

//     { key: "emi", label: "No Cost EMI" },
//     { key: "scholarship", label: "Scholarship" },
//     { key: "webinar", label: "Webinars" },
//     { key: "industry_exp", label: "Industry Exposure" },
//   ];

//   const getSymbol = (value) => {
//     if (!value) return "✗";

//     const v = value.toString().toLowerCase();

//     if (v.includes("yes") || v.includes("available") || v.includes("✓"))
//       return "✓";

//     if (v.includes("no") || v.includes("not") || v.includes("✗"))
//       return "✗";

//     // If value is Strong / Weak → return as text
//     if (v.includes("strong") || v.includes("weak")) return value;

//     return value;
//   };

//   return (
//     <div className="overflow-auto bg-white rounded-lg shadow mt-10 p-4">
//       <table className="w-full text-center text-sm">
//         <thead className="bg-gray-100 font-semibold">
//           <tr>
//             <th className="py-3 px-5 text-left">Categories</th>

//             {universities.map((u) => (
//               <th key={u.id} className="py-3 px-5">
//                 {u.name}
//               </th>
//             ))}

//           </tr>
//         </thead>

//         <tbody>
//           {fields.map((item) => (
//             <tr className="border-t" key={item.key}>
//               <td className="text-left px-5 py-3 font-medium">
//                 {item.label}
//               </td>

//               {universities.map((u) => (
//                 <td className="px-5 py-3" key={u.id + item.key}>
//                   {getSymbol(u[item.key])}
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ComparisonTable;
