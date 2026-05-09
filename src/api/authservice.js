import axios from './axios';

// Send OTP API
export const sendOtp = async (mobile) => {
  return axios.post('/send-otp', { mobile }, { withCredentials: true });
};

// Verify OTP API
export const verifyOtp = async (phone, otp) => {
  return axios.post('/verify-otp', { phone, otp }, { withCredentials: true });
};
