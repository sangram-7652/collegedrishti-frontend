

import React, { useState } from "react";
import loginImage from "../assets/explaining.png";
import { CheckCircle2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    student_name: "",
    email: "",
    mobile: "",
    dob: "",
    gender: "",
    specialization: "" // UI ke liye (DB me nahi jayega)
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    // ✅ VALIDATION
    if (!form.student_name || !form.mobile) {
      alert("Name and Mobile required");
      return;
    }

    if (!/^\d{10}$/.test(form.mobile)) {
      alert("Enter valid mobile number");
      return;
    }

    try {
      setLoading(true);

      // ✅ ONLY send required backend fields
      const payload = {
        student_name: form.student_name,
        email: form.email,
        mobile: form.mobile,
        dob: form.dob,
        gender: form.gender,

        // ✅ REQUIRED BY BACKEND (VERY IMPORTANT)
        step1name: "none",
        step2name: "none",
        step3name: "none",
        step4name: "none",
        step5name: "none",
        step6name: "none",
        step7name: "none",
        step8name: "none",
        step9name: "none"
      };

      const res = await api.post("/signup", payload);

      const data = res?.data ?? {};
      const successFlag = data.success;
      const ok =
        successFlag === true ||
        successFlag === 1 ||
        successFlag === "1" ||
        (typeof data.message === "string" &&
          data.message.toLowerCase().includes("lead saved"));

      if (ok) {
        navigate("/login", { replace: true });
      } else {
        alert(data.message || "Signup failed");
      }

    } catch (err) {
      console.log(err);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <div className="bg-white rounded-2xl shadow-lg flex w-full max-w-5xl overflow-hidden flex-col md:flex-row">

        {/* LEFT IMAGE */}
        <div className="hidden md:flex w-1/2 min-h-[600px] bg-gradient-to-br from-indigo-500 to-purple-500 items-center justify-center p-6">
          <img src={loginImage} alt="Signup" className="w-[95%] max-w-[380px] object-contain" />
        </div>

        {/* RIGHT FORM */}
        <div className="w-full md:w-1/2 p-8 md:p-12">
          <p className="text-sm text-center text-blue-600 font-medium mb-4">
            Top Online MBA universities comparison to placement support everything at one place
          </p>

          <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>

          {/* ✅ FORM */}
          <form onSubmit={handleSignup} className="space-y-4">

            <input
              type="text"
              name="student_name"
              placeholder="Enter Your Name"
              className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm"
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              placeholder="Enter Your Email Address"
              className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm"
              onChange={handleChange}
            />

            <input
              type="text"
              name="mobile"
              placeholder="Enter Your Mobile Number"
              className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm"
              value={form.mobile}
              onChange={(e) =>
                setForm({
                  ...form,
                  mobile: e.target.value.replace(/\D/g, "").slice(0, 10)
                })
              }
            />

            {/* ✅ DATE PICKER (CALENDAR SAME UI) */}
            <input
              type="date"
              name="dob"
              className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm"
              onChange={handleChange}
            />

            {/* GENDER */}
            <select
              name="gender"
              className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm"
              onChange={handleChange}
            >
              <option value="">Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>

            {/* SPECIALIZATION (UI only) */}
            <select
              name="specialization"
              className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm"
              onChange={handleChange}
            >
              <option value="">Specialization</option>
              <option>Finance</option>
              <option>Marketing</option>
              <option>HR</option>
              <option>IT</option>
            </select>

            <button
              type="submit"
              className="bg-blue-600 text-white font-medium py-2 px-6 rounded-md w-full hover:bg-blue-700 transition"
            >
              {loading ? "Submitting..." : "Sign Up"}
            </button>
          </form>

          <p className="text-xs text-center mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 font-medium">
              Log in
            </Link>
          </p>

          {/* BENEFITS */}
          <div className="mt-6 space-y-2 text-sm text-gray-700">
            {[
              "100+ Universities",
              "Quick Loan Facility",
              "Job + Internship Portal",
              "30X comparison factors",
              "Post Admission Support",
              "Free expert consultation",
              "CV Exclusive Community",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-green-500" />
                <span>{item}</span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Signup;











// import React from "react";
// import loginImage from "../assets/explaining.png"; // Adjust path if needed
// import { CheckCircle2 } from "lucide-react"; // or use emoji ✔️
// import { Link } from 'react-router-dom';


// const Signup = () => {
//   return (
//     <div className="min-h-screen flex items-center justify-center px-4 py-10">
//       <div className="bg-white rounded-2xl shadow-lg flex w-full max-w-5xl overflow-hidden flex-col md:flex-row">

//         {/* Left Side Image */}
//         {/* Left Side Image */}
//         <div className="hidden md:flex w-1/2 min-h-[600px] bg-gradient-to-br from-indigo-500 to-purple-500 items-center justify-center p-6">
//           <img src={loginImage} alt="Signup" className="w-[95%] max-w-[380px] object-contain" />
//         </div>

//         {/* Right Side Form */}
//         <div className="w-full md:w-1/2 p-8 md:p-12">
//           <p className="text-sm text-center text-blue-600 font-medium mb-4">
//             Top Online MBA universities comparison to placement support everything at one place
//           </p>
//           <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>

//           <form className="space-y-4">
//             <input
//               type="text"
//               placeholder="Enter Your Name"
//               className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             <input
//               type="email"
//               placeholder="Enter Your Email Address"
//               className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             <input
//               type="text"
//               placeholder="Enter Your Mobile Number"
//               className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             <input
//               type="text"
//               placeholder="DD-MM-YYYY"
//               className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />

//             {/* Gender Dropdown */}
//             <select className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
//               <option disabled selected>Gender</option>
//               <option>Male</option>
//               <option>Female</option>
//               <option>Other</option>
//             </select>

//             {/* Specialization Dropdown */}
//             <select className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
//               <option disabled selected>Specialization</option>
//               <option>Finance</option>
//               <option>Marketing</option>
//               <option>HR</option>
//               <option>IT</option>
//             </select>

//             <button
//               type="submit"
//               className="bg-blue-600 text-white font-medium py-2 px-6 rounded-md w-full hover:bg-blue-700 transition"
//             >
//               Sign In
//             </button>
//           </form>


//           <p className="text-xs text-center mt-4">
//             Already have an account?{" "}
//             <Link to="/login" className="text-blue-600 font-medium">
//               Log in
//             </Link>
//           </p>
//           {/* <p className="text-xs text-center mt-4">
//             Not a user yet? Create an account
//             <a href="/login" className="text-blue-600 font-medium">
//               Log In
//             </a>
//           </p> */}

//           {/* Benefits Section */}
//           <div className="mt-6 space-y-2 text-sm text-gray-700">
//             {[
//               "100+ Universities",
//               "Quick Loan Facility",
//               "Job + Internship Portal",
//               "30X comparison factors",
//               "Post Admission Support",
//               "Free expert consultation",
//               "CV Exclusive Community",
//             ].map((item, i) => (
//               <div key={i} className="flex items-center gap-2">
//                 <CheckCircle2 size={16} className="text-green-500" />
//                 <span>{item}</span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signup;
