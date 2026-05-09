import React from "react";
import robotImg from "../uni-image/robot.png"; // Replace with actual path


const QuestionSection = ({ step, totalSteps, progress, question, options, selected, onSelect }) => {
  return (
    <div className="relative w-full border-[10px] border-[#d2e5fd] rounded-2xl bg-white shadow-md my-8 px-6 py-10 md:px-10 md:py-12">
      {/* Top Label */}
      <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-white px-6 py-2 border border-[#d2e5fd] text-[#1e60d5]  font-semibold text-base shadow z-10">
        Your perfect match with just few questions
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 h-1 rounded-full relative mb-8">
        <div className="bg-[#1e60d5] h-1 rounded-full" style={{ width: `${progress}%` }}></div>
        <div
          className="absolute -top-3"
          style={{ left: `${progress}%`, transform: "translateX(-50%)" }}
        >
          <div className="bg-[#1e60d5] text-white text-xs font-semibold px-2 py-[2px] rounded-full shadow">
            {progress}%
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Side */}
        <div className="md:w-1/3 border-r pr-6 flex flex-col justify-between">
          <div className="text-[#ff7e00] text-sm font-semibold mb-4">
            ⚡ Grab it Now!{" "}
            <span className="text-black font-bold text-sm leading-tight">
              Get Upto INR <br /> 10,000 Cashback to enroll Now.
            </span>
          </div>
          <div className="flex justify-center py-6">
            <img src={robotImg} alt="robot" className="h-28 w-28 object-contain" />
          </div>
          <div className="flex justify-center">
            <div className="bg-[#1e60d5] text-white text-sm font-semibold px-4 py-1 rounded-md">
              {step}/{totalSteps}
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="md:w-3/3">
          <h2 className="text-lg md:text-xl font-semibold mb-6">{question}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {options.map((opt, index) => (
              <div
                key={index}
                onClick={() => onSelect(step, opt.label)}
                className={`cursor-pointer border rounded-xl p-4 flex flex-col items-center text-center transition duration-200 ${
                  selected === opt.label
                    ? "border-[#845fff] bg-[#f3f6ff] shadow"
                    : "border-gray-300 hover:border-blue-400"
                }`}
              >
                <img src={opt.icon} alt={opt.label} className="h-8 mb-2" />
                <span className="font-medium text-sm">{opt.label}</span>
              </div>
            ))}
          </div>
<div className="flex justify-center mt-25">
  <button className="bg-green-600 hover:bg-green-700 text-white px-14 py-2 rounded-full font-semibold">
     Next
   </button>
 </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionSection;

