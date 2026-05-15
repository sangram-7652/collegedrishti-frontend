import React from "react";
import { useEffect, useState } from "react";
import api from "../api/axios";

const GlobalPopup = () => {
  const [open, setOpen] = useState(false);
  const [courses, setCourses] = useState([]);

    // ✅ Fetch Courses API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await api.get(
          "courses"
          // production:
          // "https://api.collegedrishti.com/api/courses"
        );
        // response ke according adjust karo
        setCourses(res.data.data || res.data);
      } catch (error) {
        console.error("Course fetch error:", error);
      }
    };

    fetchCourses();
  }, []);


  useEffect(() => {
    try {
      setTimeout(() => {
        setOpen(true);
      }, 15000);
    } catch (e) {
      console.error("Popup error:", e);
      setOpen(true); // fallback
    }
  }, []);

  const handleClose = () => {
    setOpen(false);

    // ✅ production ke liye enable karna
    localStorage.setItem("popupShown", "true");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("✅ Form Submitted Successfully!");
    handleClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
      <div className="relative bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        {/* LEFT SIDE */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-8 flex-col justify-center">
          <h2 className="text-3xl font-bold mb-4">Free Career Guidance 🎓</h2>
          <p className="text-sm opacity-90 mb-6">
            Get expert advice & choose the best university for your future.
          </p>

          <ul className="space-y-2 text-sm">
            <li>✔️ Top Universities</li>
            <li>✔️ Online Degrees</li>
            <li>✔️ Placement Support</li>
            <li>✔️ Free Counseling</li>
          </ul>
        </div>

        {/* RIGHT SIDE FORM */}
        <div className="w-full md:w-1/2 p-6 relative">
          {/* Close */}
          <button
            onClick={handleClose}
            className="absolute top-3 right-4 text-gray-400 hover:text-black text-xl"
          >
            ✕
          </button>

          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            Book Free Counseling
          </h3>

          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              placeholder="Full Name"
              required
              className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <input
              type="tel"
              placeholder="Phone Number"
              required
              className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <input
              type="email"
              placeholder="Email Address"
              className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />

             <select className="w-full border border-gray-300 p-2 rounded-lg">
              <option value="">Select Course</option>

               {courses.flatMap((course) =>
                  course.sub_courses?.map((sub) => (
                    <option key={sub.sub_co_id} value={sub.sub_co_id}>
                      {sub.sub_name}
                    </option>
                  ))
                )}
            </select>

            <select className="w-full border border-gray-300 p-2 rounded-lg">
              <option value="">Select State</option>

              <option value="Andhra Pradesh">Andhra Pradesh</option>
              <option value="Arunachal Pradesh">Arunachal Pradesh</option>
              <option value="Assam">Assam</option>
              <option value="Bihar">Bihar</option>
              <option value="Chhattisgarh">Chhattisgarh</option>
              <option value="Goa">Goa</option>
              <option value="Gujarat">Gujarat</option>
              <option value="Haryana">Haryana</option>
              <option value="Himachal Pradesh">Himachal Pradesh</option>
              <option value="Jharkhand">Jharkhand</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Kerala">Kerala</option>
              <option value="Madhya Pradesh">Madhya Pradesh</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Manipur">Manipur</option>
              <option value="Meghalaya">Meghalaya</option>
              <option value="Mizoram">Mizoram</option>
              <option value="Nagaland">Nagaland</option>
              <option value="Odisha">Odisha</option>
              <option value="Punjab">Punjab</option>
              <option value="Rajasthan">Rajasthan</option>
              <option value="Sikkim">Sikkim</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Telangana">Telangana</option>
              <option value="Tripura">Tripura</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
              <option value="Uttarakhand">Uttarakhand</option>
              <option value="West Bengal">West Bengal</option>

              {/* Union Territories */}
              <option value="Andaman and Nicobar Islands">
                Andaman and Nicobar Islands
              </option>
              <option value="Chandigarh">Chandigarh</option>
              <option value="Dadra and Nagar Haveli and Daman and Diu">
                Dadra and Nagar Haveli and Daman and Diu
              </option>
              <option value="Delhi">Delhi</option>
              <option value="Jammu and Kashmir">Jammu and Kashmir</option>
              <option value="Ladakh">Ladakh</option>
              <option value="Lakshadweep">Lakshadweep</option>
              <option value="Puducherry">Puducherry</option>
            </select>

            <select className="w-full border border-gray-300 p-2 rounded-lg">
              <option>Preferred Mode</option>
              <option>Online</option>
              <option>Distance</option>
            </select>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition"
            >
              Get Free Callback
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GlobalPopup;
