import React, { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const LeadForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    student_name: "",
    email: "",
    mobile: "",
    step2name: "",
    dob: "",
    gender: "",
    state: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/userregister", formData);

      if (res.data.success === 1) {
        navigate("/thank-you");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-white border rounded-2xl shadow-xl p-5 sticky top-[120px]">
      <h2 className="text-xl font-bold text-center mb-1">
        Get Free Counselling 🎓
      </h2>

      <p className="text-center text-gray-500 text-sm mb-4">
        Fill details & get expert guidance
      </p>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          name="student_name"
          placeholder="Full Name"
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2"
        />

        <input
          type="tel"
          name="mobile"
          placeholder="Mobile"
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2"
        />

        <input
          type="date"
          name="dob"
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2"
        />

        <select
          name="gender"
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2"
        >
          <option value="">Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <div className="grid grid-cols-2 gap-2">
          <select
            name="step2name"
            onChange={handleChange}
            className="border rounded-lg px-2 py-2"
          >
            <option>Course</option>
            <option>Online MCA</option>
            <option>MA</option>
            <option>M.Com</option>
            <option>M.Sc</option>
            <option>M.Des</option>
            <option>MBA</option>
            <option>One Year MBA</option>
            <option>Dual MBA</option>
            <option>One Year MBA</option>
            <option>B.A</option>
            <option>BCA</option>
            <option>B.Sc</option>
            <option>B.Tech</option>
            <option>B.Com</option>
            <option>M.B.A in Finance</option>
          </select>

          <select
            name="state"
            onChange={handleChange}
            className="border rounded-lg px-2 py-2"
          >
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
        </div>

        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold">
          Get Free Call
        </button>
      </form>
    </div>
  );
};

export default LeadForm;
