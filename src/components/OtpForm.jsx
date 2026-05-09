import React, { useState } from "react";
import { sendOtp } from "../services/otpService";

const OtpForm = () => {
  const [mobile, setMobile] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendOtp(mobile);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-sm mx-auto">
      <input
        type="text"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
        placeholder="Enter mobile number"
        className="border p-2 w-full mb-4"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded">
        Send OTP
      </button>
    </form>
  );
};

export default OtpForm;
