
import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../pages/Header";
import MobileMenu from "../pages/MobileMenu";
import Footer from "../components/Footer";
import MobileFooterNav from "../components/MobileFooterNav";

const Compare = () => {
  const location = useLocation();
  const courses = location.state?.courses || [];

  console.log("Compare Data:", courses);

  if (courses.length < 2) {
    return (
      <div className="p-10 text-center">
        <p className="text-gray-600">
          Please select at least 2 courses to compare.
        </p>
      </div>
    );
  }

  const rows = [
    { label: "University", key: "university_name" },
    { label: "Course Fee", key: "total_fees", isCurrency: true },
    { label: "Tenure", key: "tenure_months" },
    { label: "Monthly EMI", key: "monthly_emi", isCurrency: true },
    { label: "Interest", key: "total_interest" },
  ];

  return (
    <div className="w-full min-h-screen flex flex-col">
      <div className="hidden md:block">
        <Header />
      </div>

      <div className="block md:hidden">
        <MobileMenu />
      </div>

      <div className="flex-1 w-full px-4 py-10">
        <h2 className="text-2xl font-semibold mb-6">Compare Courses</h2>

        <div className="w-full overflow-x-auto rounded-lg shadow-md">
          <table className="w-full border border-gray-200 text-sm text-left text-gray-700">
            <thead className="bg-gradient-to-r from-blue-600 to-blue-500 text-white">
              <tr>
                <th className="px-4 py-3 sticky left-0 bg-blue-700">
                  Field
                </th>
                {courses.map((c, i) => (
                  <th key={i} className="px-4 py-3 text-center">
                    {c.course_name}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {rows.map((row, idx) => (
                <tr key={idx} className={idx % 2 ? "bg-white" : "bg-gray-50"}>
                  <td className="px-4 py-3 sticky left-0 bg-inherit font-medium">
                    {row.label}
                  </td>

                  {courses.map((c, i) => {
                    let value = c?.[row.key];

                    if (value === null || value === undefined || value === "") {
                      value = "N/A";
                    }

                    if (row.isCurrency && value !== "N/A") {
                      value = `₹${value}`;
                    }

                    return (
                      <td key={i} className="px-4 py-3 text-center">
                        {value}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-10">
        <Footer />
        <MobileFooterNav />
      </div>
    </div>
  );
};

export default Compare;