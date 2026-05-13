
// fetchdata.js
// src/api/fetchdata.js
import axios from "./axios";

export const sendOtp = async (mobile) => {
  return await axios.post("/send-otp", { mobile });
};

export const verifyOtp = async (mobile, otp) => {
  return await axios.post("/verify-otp", { mobile, otp });
};
