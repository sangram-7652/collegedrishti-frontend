import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import FeeIcon from "../assets/fee icon.png";
import { PhoneCall } from "lucide-react";

const UniversityFee = ({ slug: slugProp }) => {
  const { slug: slugFromRoute } = useParams();
  const slug = (slugProp || slugFromRoute || "").trim();

  const navigate = useNavigate();

  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(true);

  // Compare State
  const [compareList, setCompareList] = useState([]);

  // Popup State
  const [showCallPopup, setShowCallPopup] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    mobile: "",
  });

  // Handle Input
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.mobile || !formData.date || !formData.time) {
      alert("Please fill all fields!");
      return;
    }

    try {
      await api.post("/schedule-call", formData);

      alert("Call scheduled successfully! Our team will contact you soon!");

      setFormData({
        date: "",
        time: "",
        mobile: "",
      });

      setShowCallPopup(false);
    } catch (error) {
      if (error.response?.status === 422) {
        alert("Please enter valid details.");
      } else {
        alert("Failed to schedule call. Please try again.");
      }
    }
  };

  // Compare Function
  const handleCompare = (course) => {
    setCompareList((prev) => {
      // remove if already selected
      if (prev.find((c) => c.id === course.id)) {
        return prev.filter((c) => c.id !== course.id);
      }

      // max 3 compare
      if (prev.length >= 3) {
        alert("You can compare up to 3 courses only.");
        return prev;
      }

      return [...prev, course];
    });
  };

  // Fetch Fees
  useEffect(() => {
    if (!slug) {
      setFees([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    api
      .get(`/university/${encodeURIComponent(slug)}/fees`)
      .then((res) => {
        const list = res?.data?.success
          ? res.data?.data?.fees
          : [];

        setFees(Array.isArray(list) ? list : []);
      })
      .catch((err) => {
        console.error("Fee fetch error:", err);
        setFees([]);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  return (
    <section className="w-full px-3 md:px-10 lg:px-20 py-10 font-sans">
      <div className="bg-[#f7f7f7] rounded-xl p-6 md:p-10 shadow-md">
        {/* Heading */}
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
          Fee Structure
        </h2>

        <p className="text-sm text-gray-600 mt-2 max-w-5xl">
          The fee structure mentioned below is indicative and may vary
          depending on the course, tenure, and financing options selected.
          Universities offer flexible payment plans and education loan
          facilities to make learning more accessible.
        </p>

        <p className="text-sm mt-3 text-gray-800">
          Compare by Clicking checkbox
        </p>

        {/* Fee Cards */}
        <div className="mt-6 space-y-6">
          {loading && (
            <p className="text-sm text-gray-500">
              Loading fee structure…
            </p>
          )}

          {!loading && fees.length === 0 && (
            <p className="text-sm text-gray-500">
              Fee details are not available for this university yet.
            </p>
          )}

          {fees.map((fee, idx) => {
            const isSelected = compareList.find(
              (c) => c.id === fee.id
            );

            return (
              <div
                key={idx}
                className="flex flex-col md:flex-row gap-4 md:gap-6"
              >
                {/* LEFT CARD */}
                <div
                  className={`w-full md:w-[280px] bg-white border rounded-xl px-5 py-4 shadow-sm ${
                    isSelected
                      ? "border-emerald-500"
                      : "border-gray-200"
                  }`}
                >
                  {/* Compare Button */}
                  <button
                    onClick={() => handleCompare(fee)}
                    className={`flex items-center gap-2 px-3 py-1 rounded text-sm font-medium mb-4 ${
                      isSelected
                        ? "bg-emerald-500 text-white"
                        : "bg-orange-500 text-white"
                    }`}
                  >
                    <span
                      className={`w-4 h-4 flex items-center justify-center border rounded ${
                        isSelected
                          ? "bg-emerald-500 border-white"
                          : "border-white"
                      }`}
                    >
                      {isSelected && "✓"}
                    </span>

                    {isSelected
                      ? "Compared"
                      : "Compare Now"}
                  </button>

                  <div className="flex items-center gap-3">
                    <img
                      src={FeeIcon}
                      alt="icon"
                      className="w-9 h-9"
                    />

                    <div>
                      <p className="font-semibold text-gray-800">
                        {fee.course_name}
                      </p>

                      <p className="text-sm text-gray-500">
                        {fee.university_name || "University"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* RIGHT TABLE */}
                <div className="flex-1 bg-white border border-gray-200 rounded-xl shadow-sm overflow-x-auto md:overflow-x-hidden">
                  <div className="min-w-[680px] md:min-w-0 grid grid-cols-7">
                    {[
                      {
                        label: "Fee Type",
                        value: fee.fee_type,
                      },
                      {
                        label: "Course Fee",
                        value: `₹${fee.total_fees || "-"}`,
                      },
                      {
                        label: "Loan Amount",
                        value: `₹${fee.loan_amount || "-"}`,
                      },
                      {
                        label: "Tenure (Monthly)",
                        value:
                          fee.tenure_months != null &&
                          fee.tenure_months !== ""
                            ? `${fee.tenure_months} mo.`
                            : "-",
                      },
                      {
                        label: "Advance EMI",
                        value: `₹${fee.advance_emi || "-"}`,
                      },
                      {
                        label: "Monthly EMI",
                        value: `₹${fee.monthly_emi || "-"}`,
                      },
                      {
                        label: "Total Interest",
                        value: fee.total_interest || "-",
                      },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className=" last:border-r-0 border-b border-gray-200 p-4 text-center"
                      >
                        <p className="text-xs text-gray-500 font-medium mb-1">
                          {item.label}
                        </p>

                        <p className="text-sm font-semibold text-gray-900">
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View More */}
        <div className="text-center mt-6">
          <button className="text-blue-600 font-semibold underline">
            View More
          </button>
        </div>

        {/* CTA */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            For more information Please schedule a call with us
          </p>

          <button
            onClick={() => setShowCallPopup(true)}
            className="mt-3 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center gap-2 mx-auto"
          >
            <PhoneCall />
            Schedule A Call
          </button>
        </div>
      </div>

      {/* Compare Bottom Bar */}
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

      {/* Popup Modal */}
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
                  Just Pick your available time &
                  Our best team will call you back
                </p>
              </div>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >
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