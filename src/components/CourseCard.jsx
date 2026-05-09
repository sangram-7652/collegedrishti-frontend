import React from "react";

import CourseIcon1 from "../assets/course1.png";
import CourseIcon2 from "../assets/course2.png";
import CourseIcon3 from "../assets/course3.png";
import CourseIcon4 from "../assets/course4.png";
import CourseIcon5 from "../assets/course5.png";
import CourseIcon6 from "../assets/course5.png";
import CourseIcon7 from "../assets/course7.png";

const CourseCard = ({ course }) => {
  return (
    <div className="relative bg-white border rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col justify-center items-center px-4 py-5">
      {/* Badge */}
      <span className="absolute top-0 right-0 bg-[#FF6E00] text-white text-[10px] px-2 py-0.5 rounded-tr-xl rounded-bl-md font-semibold">
        {course?.duration || "6 Months"}
      </span>

      {/* Icon */}
      <img
        src={CourseIcon1}
        alt="Course Icon"
        className="h-8 w-8 mb-2 object-contain"
      />

      {/* Title */}
      <h4 className="text-[13px] font-semibold text-gray-800 text-center leading-tight mb-2">
        {course?.title || "MBA Online"}
      </h4>

      {/* View Button */}
      <button className="bg-blue-600 text-white text-[11px] px-4 py-1 rounded-full hover:bg-blue-700 transition">
        View
      </button>
    </div>
  );
};

export default CourseCard;
