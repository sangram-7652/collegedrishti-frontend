import React, { useEffect, useState } from "react";
import { FaGraduationCap } from "react-icons/fa";
import { AiOutlineCheck } from "react-icons/ai";
import { BsTelephoneFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { FaChevronUp } from "react-icons/fa6";
import api from "../api/axios";




const Section4 = ({ courseSlug }) => {
  const [fees, setFees] = useState([]);
  const [compareList, setCompareList] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


  // 👇 New State for Popup
  const [showCallPopup, setShowCallPopup] = useState(false);
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    mobile: "",
  });

  // 👇 Handle Form Input Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 👇 Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.mobile || !formData.date || !formData.time) {
      alert("Please fill all fields!");
      return;
    }

    try {
      await api.post("/schedule-call", formData);
      // Show success toast or message
      alert("Call scheduled successfully! Our team will contact you soon!");
      setShowCallPopup(false);
      setFormData({ date: "", time: "", mobile: "" });
    } catch (error) {
      if (error.response?.status === 422) {
        alert("Please enter valid details (e.g., 10-digit mobile number).");
      } else {
        alert("Failed to schedule call. Please try again.");
      }
    }
  };



  useEffect(() => {
    const fetchFees = async () => {
      try {
        const res = await api.get(`/course/${courseSlug}/fees`);
        setFees(res.data.data || []);
      } catch (e) {
        console.error("Fee fetch error:", e);
      } finally {
        setLoading(false);
      }
    };
    
  
    if (courseSlug) fetchFees();
  }, [courseSlug]);



  const handleCompare = (course) => {
    setCompareList((prev) => {
      if (prev.find((c) => c.id === course.id)) {
        return prev.filter((c) => c.id !== course.id);
      }
      if (prev.length >= 3) {
        alert("You can compare up to 3 courses only.");
        return prev;
      }
      return [...prev, course];
    });
  };

  if (loading) {
    return (
      <section className="bg-white px-4 py-10">
        <div className="max-w-7xl mx-auto text-center">Loading...</div>
      </section>
    );
  }

  if (loading) return <div className="p-10 text-center">Loading fees...</div>;
  if (!fees.length) return <div className="p-10 text-center text-gray-500">No fees found.</div>;

  return (
    <section className="bg-[#f1f1f1] px-4 py-10 font-sans">
      <div className="max-w-7xl mx-auto border border-gray-200 rounded-2xl shadow-md p-6 sm:p-10 bg-white">

        {/* Heading */}
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Fee Structure</h2>
        <p className="text-gray-500 text-sm sm:text-base mb-8 max-w-5xl">
          Compare fees of different universities offering this course.
        </p>

        {/* Cards */}
        <div className="flex flex-col gap-6">
          {fees.map((course) => {
            const isSelected = compareList.find((c) => c.id === course.id);

            return (
              <div
                key={course.id}
                className={`bg-white rounded-xl border ${isSelected ? "border-emerald-500" : "border-gray-200"
                  } shadow-sm p-4 flex flex-col md:flex-row gap-6 items-start`}
              >
                {/* LEFT CARD */}
                <div
                  className={`flex flex-col gap-4 w-full md:w-1/3 p-4 rounded-lg border ${isSelected ? "border-emerald-500" : "border-gray-200"
                    } bg-[#f9fafb]`}
                >
                  <button
                    onClick={() => handleCompare(course)}
                    className={`flex items-center gap-2 px-3 py-1 rounded text-sm font-medium w-fit ${isSelected ? "bg-emerald-500 text-white" : "bg-orange-500 text-white"
                      }`}
                  >
                    <span
                      className={`w-4 h-4 flex items-center justify-center border rounded ${isSelected ? "bg-emerald-500 border-white" : "border-white"
                        }`}
                    >
                      {isSelected && <AiOutlineCheck className="text-white text-xs" />}
                    </span>
                    {isSelected ? "Compared" : "Compare Now"}
                  </button>

                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-full bg-gray-200 text-blue-600 text-2xl">
                      <FaGraduationCap />
                    </div>
                    <div>
                      <h4 className="font-semibold text-base">{course.course_name}</h4>
                      <p className="text-sm text-gray-500">By {course.university_name}</p>
                    </div>
                  </div>
                </div>

                {/* RIGHT TABLE */}
                <div className="w-full md:w-2/3 overflow-x-auto">
                  <table className="w-full text-sm text-gray-700 border-collapse border border-gray-200 rounded-lg overflow-hidden">
                    <thead>
                      <tr className="bg-[#e9f0f8] text-gray-600">
                        <th className="px-4 py-3 border text-center">Fee Type</th>
                        <th className="px-4 py-3 border text-center">Course Fee</th>
                        <th className="px-4 py-3 border text-center">Loan Amount</th>
                        <th className="px-4 py-3 border text-center">Tenure (Monthly)</th>
                        <th className="px-4 py-3 border text-center">Advance EMI</th>
                        <th className="px-4 py-3 border text-center">Monthly EMI</th>
                        <th className="px-4 py-3 border text-center">Total Interest</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="px-4 py-3 border text-center">{course.fee_type}</td>
                        <td className="px-4 py-3 border text-center">₹{course.total_fees}</td>
                        <td className="px-4 py-3 border text-center">₹{course.loan_amount || "N/A"}</td>
                        <td className="px-4 py-3 border text-center">{course.tenure_months || "N/A"}</td>
                        <td className="px-4 py-3 border text-center">₹{course.advance_emi || "N/A"}</td>
                        <td className="px-4 py-3 border text-center">₹{course.monthly_emi || "N/A"}</td>
                        <td className="px-4 py-3 border text-center">{course.total_interest || "0%"}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })}
        </div>

        {/* View More */}
        {/* <div className="text-center mt-6">
          <span className="text-blue-600 text-sm font-medium underline cursor-pointer">
            View More
          </span>
        </div> */}

        {/* CTA */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-700">
            For more information Please schedule a call with us
          </p>
          <button
            onClick={() => setShowCallPopup(true)} // 👈 Open Popup
            className="mt-3 px-6 py-2 bg-[#0050d5] hover:bg-blue-700 text-white rounded-full text-sm font-medium flex items-center gap-2 mx-auto"
          >
            <BsTelephoneFill className="text-white" />
            Schedule A call
          </button>
        </div>
      </div>

      {/* Compare Bar (bottom fixed) */}
      {compareList.length >= 2 && (
  <div className="fixed bottom-16 left-0 w-full bg-white shadow-lg border-t p-3 sm:p-4 flex flex-col sm:flex-row gap-3 sm:gap-0 justify-between items-center z-[9999]">
    
    <p className="text-sm font-medium text-center sm:text-left">
      {compareList.length} Courses selected for comparison
    </p>

    <button
      onClick={() =>
        navigate("/compare", {
          state: {
            courses: compareList.map((c) => ({
              id: c.id,
              course_name: c.course_name || "N/A",
              university_name: c.university_name || "N/A",
              total_fees: c.total_fees || 0,
              tenure_months: c.tenure_months || "N/A",
              monthly_emi: c.monthly_emi || 0,
              total_interest: c.total_interest || "0%",
            })),
          },
        })
      }
      className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded w-full sm:w-auto"
    >
      Compare Now
    </button>
  </div>
)}




      {/* 👇 POPUP MODAL */}
      {showCallPopup && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-[99999] p-4">
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
                <BsTelephoneFill />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">GET A CALL BACK FROM US</h3>
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
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <input
                type="tel"
                name="mobile"
                placeholder="Enter your mobile number"
                value={formData.mobile}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                pattern="[0-9]{10}"
                required
              />

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition"
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

export default Section4;



