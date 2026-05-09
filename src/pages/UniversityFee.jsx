import React, { useEffect, useState } from "react";
import api from "../api/axios";
import FeeIcon from "../assets/fee icon.png";
import { PhoneCall } from "lucide-react";

const UniversityFee = ({ universityId }) => {

  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showCallPopup, setShowCallPopup] = useState(false);

  const [formData, setFormData] = useState({
    date: "",
    time: "",
    mobile: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Form Data:", formData);

    alert("Callback scheduled successfully ✅");

    // reset form
    setFormData({
      date: "",
      time: "",
      mobile: "",
    });

    setShowCallPopup(false);
  };

  useEffect(() => {
    if (!universityId) {
      setLoading(false); // ADD THIS
      return;
    }

    api
      .get(`/university-fees/${universityId}`)
      .then((res) => {
        setFees(res.data || []);
      })
      .catch((err) => console.log("Fee API Error:", err))
      .finally(() => setLoading(false));
  }, [universityId]);


  return (
    <section className="w-full px-3 md:px-10 lg:px-20 py-10 font-sans">
      <div className="bg-[#f7f7f7] rounded-xl p-6 md:p-10 shadow-md">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
          Fee Structure
        </h2>

        <p className="text-sm text-gray-600 mt-2 max-w-5xl">
          The fee structure mentioned below is indicative and may vary depending on the course, tenure, and financing options selected. Universities offer flexible payment plans and education loan facilities to make learning more accessible. Please review the details carefully and compare options to choose the plan that best suits your academic and financial needs.
        </p>

        <p className="text-sm mt-3 text-gray-800">Compare by Clicking checkbox</p>


        <div className="mt-6 space-y-6">
          {fees.map((fee, idx) => (
            <div key={idx} className="flex flex-col md:flex-row gap-4 md:gap-6">

              {/* LEFT CARD */}
              <div className="w-full md:w-[260px] bg-white border border-gray-200 rounded-xl px-5 py-4 flex items-center gap-3 shadow-sm">
                <img src={FeeIcon} alt="icon" className="w-9 h-9" />
                <p className="font-semibold text-gray-800">
                  {fee.course_name}
                </p>
              </div>

              {/* RIGHT TABLE */}
              <div className="flex-1 bg-white border border-gray-200 rounded-xl shadow-sm overflow-x-auto md:overflow-x-hidden">
                <div className="min-w-[680px] md:min-w-0 grid grid-cols-7">

                  {[
                    { label: "Fee Type", value: fee.fee_type },
                    { label: "Course Fee", value: fee.total_fees },
                    { label: "Loan Amount", value: fee.loan_amount },
                    { label: "Tenure (Monthly)", value: fee.tenure_months + " mo." },
                    { label: "Advance EMI", value: fee.advance_emi },
                    { label: "Monthly EMI", value: fee.monthly_emi },
                    { label: "Total Interest", value: fee.total_interest },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="border-r border-gray-200 last:border-r-0 border-b border-gray-200 p-4 text-center"
                    >
                      <p className="text-xs text-gray-500 font-medium mb-1">
                        {item.label}
                      </p>
                      <p className="text-sm font-semibold text-gray-900">
                        {item.value || "-"}
                      </p>
                    </div>
                  ))}

                </div>
              </div>
            </div>
          ))}
        </div>



        <div className="text-center mt-6">
          <button className="text-blue-600 font-semibold underline">
            View More
          </button>
        </div>



        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            For more information Please schedule a call with us
          </p>
          {/* <button className="mt-3 px-6 py-2 bg-blue-600 text-white rounded-full flex items-center gap-2 mx-auto">
            <PhoneCall /> Schedule A Call
          </button> */}

          <button
            onClick={() => setShowCallPopup(true)}
            className="mt-3 px-6 py-2 bg-blue-600 text-white rounded-full flex items-center gap-2 mx-auto"
          >
            <PhoneCall /> Schedule A Call
          </button>
        </div>
      </div>


      {showCallPopup && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[99999] p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl relative">

            {/* Close Button */}
            <button
              onClick={() => setShowCallPopup(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
            >
              ×
            </button>

            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="text-blue-500 text-4xl">
                📞
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">
                  GET A CALL BACK FROM US
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Just Pick your available time & Our best team will call you back
                </p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">

              <div className="flex gap-3">
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />

                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <input
                type="tel"
                name="mobile"
                placeholder="Enter your mobile number"
                value={formData.mobile}
                onChange={handleInputChange}
                pattern="[0-9]{10}"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium"
              >
                GET A CALL
              </button>
            </form>
          </div>
        </div>
      )}
    </section>


  );
};

export default UniversityFee;











// import React from "react";
// import { FaGraduationCap } from "react-icons/fa";
// import { PhoneCall } from "lucide-react";
// import FeeIcon from '../assets/fee icon.png';


// const FeeStructure = () => {
//   const courses = [
//     { name: "Online MBA" },
//     { name: "Online MCA" },
//     { name: "Online Doctorate" },
//     { name: "Online BCA" },
//   ];

//   return (
//     <section className="w-full px-4 md:px-10 lg:px-20 py-10 font-sans">
//       <div className="bg-[#f7f7f7]  rounded-xl p-6 md:p-10 shadow-md">
//         {/* Heading */}
//         <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
//           Fee Structure
//         </h2>
//         <p className="text-sm md:text-base text-gray-600 mt-2 max-w-5xl leading-relaxed">
//           Lorem Ipsum is simply dummy text of the printing and typesetting
//           industry. Lorem Ipsum has been the industry's standard dummy text ever
//           since the 1500s, when an unknown printer took a galley of type and
//           scrambled it to make a type specimen book.
//         </p>

//         {/* Course Fee Rows */}
//         <div className="grid grid-cols-1 gap-6 mt-6">
//           {courses.map((course, idx) => (
//             <div
//               key={idx}
//               className="flex flex-col md:flex-row gap-4"
//             >
//               {/* Left Box */}
//               {/* Left Box */}
//               <div className="flex items-center justify-center w-full md:w-1/4 bg-white border rounded-lg py-6 px-2 shadow-sm">
//                 <div className="flex items-center gap-4 w-full px-6">
//                   <img
//                     src={FeeIcon}
//                     alt="icon"
//                     className="w-10 h-10 object-contain"
//                   />
//                   <p className="text-base font-semibold text-gray-800 truncate">
//                     {course.name}
//                   </p>
//                 </div>
//               </div>

//               {/* Right Box (Table style) */}
// {/* Right Box (Table style) */}
// <div className="flex-1 bg-white border rounded-lg shadow-sm md:w-2/3 overflow-x-auto">
//   <div className="min-w-[700px] grid grid-cols-7 text-center text-sm border border-gray-200">
//     {[
//       { label: "Fee Type", value: "Full time" },
//       { label: "Course Fee", value: "₹1,50,000" },
//       { label: "Loan Amount", value: "₹1,58,000" },
//       { label: "Tenure", value: "16 mo." },
//       { label: "Advance EMI", value: "₹9,000" },
//       { label: "Monthly EMI", value: "₹9,000" },
//       { label: "Total Interest", value: "0%" },
//     ].map((item, idx) => (
//       <div
//         key={idx}
//         className="p-3 border-r border-b border-gray-200 last:border-r-0"
//       >
//         <p className="text-gray-500 font-medium border-b border-gray-200 pb-1">
//           {item.label}
//         </p>
//         <p className="font-semibold pt-1">{item.value}</p>
//       </div>
//     ))}
//   </div>
// </div>

//             </div>
//           ))}
//         </div>

//         {/* View More */}
//         <div className="text-center mt-6">
//           <button className="text-blue-600 underline text-sm hover:text-blue-800">
//             View More
//           </button>
//         </div>

//         {/* Bottom CTA */}
//  <div className="mt-6 text-center">
//           <p className="text-sm text-gray-700">
//             For more information Please schedule a call with us
//            </p>
//            <button className="mt-3 px-6 py-2 bg-[#0050d5] hover:bg-blue-700 text-white rounded-full text-sm font-medium flex items-center gap-2 mx-auto">
//              <PhoneCall className="text-white" />
//             Schedule A call
//           </button>
//          </div>
//       </div>
//     </section>
//   );
// };

// export default FeeStructure;
