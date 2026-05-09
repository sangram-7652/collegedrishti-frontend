import React from "react";

const universities = [
  {
    name: "Jain University",
    logo: "/images/jain-logo.png", // Replace with actual path
    course: "Online MBA",
    fee: "₹1,00,000",
  },
  {
    name: "AM University",
    logo: "/images/am-logo.png",
    course: "Online MBA",
    fee: "₹1,00,000",
  },
  {
    name: "Amity University",
    logo: "/images/amity-logo.png",
    course: "Online MBA",
    fee: "₹1,00,000",
  },
  {
    name: "Jamia University",
    logo: "/images/jamia-logo.png",
    course: "Online MBA",
    fee: "₹1,00,000",
  },
];

const ComparisonIndicator = () => {
  return (
    <div className="flex justify-center gap-6 md:gap-10 py-8 overflow-x-auto px-4">
      {universities.map((uni, idx) => (
        <div key={idx} className="flex flex-col items-center relative">
          <img src={uni.logo} alt={uni.name} className="w-16 h-16 object-contain mb-2" />
          <p className="text-sm font-semibold text-center">{uni.name}</p>
          <select className="mt-1 border border-gray-300 rounded-md px-2 py-1 text-sm">
            <option>{uni.course}</option>
            {/* Add more options if needed */}
          </select>
          <p className="mt-1 text-green-600 font-semibold text-sm">{uni.fee}</p>

          {/* Add "vs" between cards, except after the last one */}
          {idx < universities.length - 1 && (
            <div className="absolute right-[-20px] top-8 text-gray-400 font-semibold text-sm">vs</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ComparisonIndicator;
