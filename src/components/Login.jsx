import React, { useState, useEffect } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import loginImage from "../assets/explaining.png"; // Adjust path if needed
import { CheckCircle2 } from "lucide-react"; // ✅ for green tick icons
import MobileMenu from "../pages/MobileMenu";
import { Link } from "react-router-dom";

const Login = () => {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [timer, setTimer] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (!mobile.match(/^\d{10}$/)) {
      setError("Please enter a valid 10-digit mobile number");
      setLoading(false);
      return;
    }

    try {
      const response = await api.get("/send-mobile", {
        params: { otpphone: mobile },
        withCredentials: true,
      });

      if (
        response.data === 1 ||
        response.data?.data === 1 ||
        response.data?.success === true ||
        response.status === 200
      ) {
        setOtpSent(true);
        setSuccess("OTP sent successfully!");
        setTimer(60);
      } else {
        setError("Mobile number not registered or failed to send OTP.");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (otp.length !== 4) {
      setError("Please enter a valid 4-digit OTP");
      setLoading(false);
      return;
    }

    try {
      const response = await api.post(
        "/send-verify",
        {
          otp: otp,
          mobile: mobile,
        },
        {
          withCredentials: true,
        },
      );

      if (response.data?.success) {
        localStorage.setItem(
          "user",
          JSON.stringify({
            name: "User",
            mobile: mobile,
          }),
        );

        navigate("/user-dashboard");
      } else {
        setError(response.data?.message || "Incorrect OTP. Try again.");
      }
    } catch (err) {
      console.error(err);
      setError("OTP verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP
  const handleResendOtp = () => {
    if (timer === 0) {
      handleSendOtp({ preventDefault: () => {} });
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#f3f6fb]">
      <div className="sticky top-0 z-50 bg-white md:hidden shadow-sm">
        <MobileMenu />
      </div>

      <div className="flex items-start justify-center px-3 py-6 md:px-4 md:py-10">
        <div className="w-full max-w-5xl relative lg:flex lg:rounded-3xl shadow-2xl overflow-hidden bg-white">
          <div className="hidden lg:flex lg:w-[45%] bg-gradient-to-b from-blue-700 to-purple-700 items-end justify-center px-8 py-16">
            <img
              src={loginImage}
              alt="Illustration"
              className="w-[90%] max-w-[500px] object-contain drop-shadow-2xl"
            />
          </div>

          <div
            className="
                w-full
                bg-white
                px-4 py-6
                sm:px-6 sm:py-8
                md:px-10 md:py-12
                lg:w-[60%] lg:px-14 lg:py-14
                lg:rounded-l-[40px]
                flex flex-col justify-center
            ">
            <button
              onClick={() => navigate("/")}
              className="hidden lg:flex w-9 h-9 rounded-full border border-gray-400 items-center justify-center absolute top-6 right-6 hover:bg-gray-100 transition">
              ✕
            </button>

            <p className="hidden lg:block text-center text-[15px] text-blue-700 font-semibold mb-6">
              Top Online MBA universities comparison to placement support
              everything at one place
            </p>

            <p className="lg:hidden text-center text-[13px] text-blue-700 font-semibold mb-6">
              Top Online MBA universities comparison to <br />
              placement support everything at one place
            </p>

            <div className="max-w-4xl mx-auto flex flex-col lg:flex-row lg:items-start lg:gap-16">
              {/* LEFT — FORM */}
              <div className="w-full lg:w-8/12">
                <h2 className="text-2xl md:text-3xl font-bold text-center lg:text-left mb-6 md:mb-10 text-black">
                  Login
                </h2>

                <form onSubmit={otpSent ? handleVerifyOtp : handleSendOtp}>
                  <div className="relative">
                    <span className="absolute -top-2 left-3 bg-white text-[11px] text-gray-700 px-1">
                      Mobile Number*
                    </span>
                    <input
                      type="tel"
                      value={mobile}
                      onChange={(e) =>
                        setMobile(
                          e.target.value.replace(/\D/g, "").slice(0, 10),
                        )
                      }
                      placeholder="Enter Your Mobile Number"
                      className="w-full px-5 py-3 border rounded-lg text-sm focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  {/* Get OTP */}
                  <button
                    disabled={loading}
                    type="button"
                    onClick={handleSendOtp}
                    className="bg-blue-600 text-white mt-5 py-3 rounded-full font-semibold text-sm w-full sm:w-40 block mx-auto">
                    {loading ? "Sending..." : "Get OTP"}
                  </button>

                  {/* OTP Input */}
                  <div className="relative mt-8 flex justify-center">
                    <span className="absolute -top-2 bg-white text-[11px] text-gray-700 px-1 left-1/2 -translate-x-1/2">
                      Enter OTP*
                    </span>
                    <input
                      type="text"
                      maxLength={4}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.slice(0, 4))}
                      placeholder="Enter OTP"
                      className="w-full sm:w-40 px-4 py-3 border rounded-lg text-center text-sm focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  {/* Login */}
                  <button
                    disabled={loading}
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded-full mt-6 font-semibold text-sm">
                    {loading ? "Verifying..." : "Log In"}
                  </button>
                </form>
                {/* FORM END */}

                {/* Already Login */}
                <p className="text-center lg:text-left text-[13px] mt-5 text-gray-700">
                  New here?{" "}
                  <Link to="/signup" className="text-blue-600 font-semibold">
                    Create an account
                  </Link>
                </p>
              </div>

              <div className="hidden lg:block w-full lg:w-8/12 mt-10 space-y-3 text-[#111827] text-sm">
                {[
                  "100+ Universities",
                  "Quick Loan facility",
                  "Job + Internship Portal",
                  "30X comparison factors",
                  "Post Admission Support",
                  "Free expert consultation",
                  "CV Exclusive Community",
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full border border-green-500 text-green-500 flex items-center justify-center text-xs font-bold">
                      ✓
                    </span>
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
