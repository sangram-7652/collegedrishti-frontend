

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



