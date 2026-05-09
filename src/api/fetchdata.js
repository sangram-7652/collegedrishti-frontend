// // src/api/fetchapi.js

// import axios from 'axios';
// import { API_BASE_URL } from '../config'; // keep this as is

// export const sendOtp = async (mobile) => {
//   try {
//     const response = await axios.post(`${API_BASE_URL}/send-otp`, {
//       mobile: mobile
//     });
//     return response.data;
//   } catch (error) {
//     throw error.response?.data || error;
//   }
// };



// fetchdata.js
// src/api/fetchdata.js
import axios from "./axios";

export const sendOtp = async (mobile) => {
  return await axios.post("/send-otp", { mobile });
};

export const verifyOtp = async (mobile, otp) => {
  return await axios.post("/verify-otp", { mobile, otp });
};
