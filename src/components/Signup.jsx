import React, { useState } from "react";
import loginImage from "../assets/explaining.png";
import { CheckCircle2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import toast from "react-hot-toast";

const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    student_name: "",
    email: "",
    mobile: "",
    dob: "",
    gender: "",
    specialization: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    // VALIDATION
    if (!form.student_name || !form.mobile) {
      toast.error("Name and Mobile required");
      return;
    }

    if (!/^\d{10}$/.test(form.mobile)) {
      toast.error("Enter valid mobile number");
      return;
    }

    try {
      setLoading(true);

      // BACKEND PAYLOAD
      const payload = {
        student_name: form.student_name,
        email: form.email,
        mobile: form.mobile,
        dob: form.dob,
        gender: form.gender,

        // REQUIRED BY BACKEND
        step1name: "none",
        step2name: "none",
        step3name: "none",
        step4name: "none",
        step5name: "none",
        step6name: "none",
        step7name: "none",
        step8name: "none",
        step9name: "none",
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
        toast.success("Signup successful 🎉");

        setTimeout(() => {
          navigate("/login", { replace: true });
        }, 1800);
      } else {
        toast.error(data.message || "Signup failed");
      }
    } catch (err) {
      console.log(err);

      toast.error(
        err?.response?.data?.message || "Server error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-gray-50">
      <div className="bg-white rounded-2xl shadow-xl flex w-full max-w-5xl overflow-hidden flex-col md:flex-row">

        {/* LEFT IMAGE */}
        <div className="hidden md:flex w-1/2 min-h-[600px] bg-gradient-to-br from-indigo-500 to-purple-500 items-center justify-center p-6">
          <img
            src={loginImage}
            alt="Signup"
            className="w-[95%] max-w-[380px] object-contain"
          />
        </div>

        {/* RIGHT FORM */}
        <div className="w-full md:w-1/2 p-8 md:p-12">

          <p className="text-sm text-center text-blue-600 font-medium mb-4 leading-relaxed">
            Top Online MBA universities comparison to placement
            support everything at one place
          </p>

          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Sign Up
          </h2>

          {/* FORM */}
          <form onSubmit={handleSignup} className="space-y-4">

            {/* NAME */}
            <input
              type="text"
              name="student_name"
              placeholder="Enter Your Name"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.student_name}
              onChange={handleChange}
            />

            {/* EMAIL */}
            <input
              type="email"
              name="email"
              placeholder="Enter Your Email Address"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.email}
              onChange={handleChange}
            />

            {/* MOBILE */}
            <input
              type="text"
              name="mobile"
              placeholder="Enter Your Mobile Number"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.mobile}
              onChange={(e) =>
                setForm({
                  ...form,
                  mobile: e.target.value
                    .replace(/\D/g, "")
                    .slice(0, 10),
                })
              }
            />

            {/* DOB */}
            <input
              type="date"
              name="dob"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.dob}
              onChange={handleChange}
            />

            {/* GENDER */}
            <select
              name="gender"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.gender}
              onChange={handleChange}
            >
              <option value="">Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>

            {/* SPECIALIZATION */}
            <select
              name="specialization"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.specialization}
              onChange={handleChange}
            >
              <option value="">Specialization</option>
              <option>Finance</option>
              <option>Marketing</option>
              <option>HR</option>
              <option>IT</option>
            </select>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg text-white font-semibold transition duration-300 ${
                loading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "Submitting..." : "Sign Up"}
            </button>
          </form>

          {/* LOGIN LINK */}
          <p className="text-sm text-center mt-5 text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 font-semibold hover:underline"
            >
              Log in
            </Link>
          </p>

          {/* BENEFITS */}
          <div className="mt-8 space-y-3 text-sm text-gray-700">
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
                <CheckCircle2
                  size={18}
                  className="text-green-500"
                />
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