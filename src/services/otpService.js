// // src/services/otpService.js
// import axiosInstance from '../api/axios';

// const sendOtp = async (mobile) => {
//   try {
//     const response = await axiosInstance.post('/send-otp', {
//       mobile,
//     });
//     console.log(response.data);
//   } catch (error) {
//     console.error(error.response?.data || error.message);
//   }
// };

// import axios from "axios";

// export const verifyOtp = (mobile, otp) => {
//   return axios.post("/verify-otp", {
//     mobile: mobile,
//     otp: otp,
//   });
// };

