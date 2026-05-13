import React from "react";
import { useEffect, useState } from "react";
import { GraduationCap, CheckCircle2, X } from "lucide-react";

const GlobalPopup = () => {
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    try {
      setTimeout(() => {
        setOpen(true);
      }, 15000);
    } catch (e) {
      console.error("Popup error:", e);
      setOpen(true);
    }
  }, []);

  const handleClose = () => {
    setOpen(false);

    // ✅ production ke liye enable karna
    localStorage.setItem("popupShown", "true");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // show success popup
    setSuccess(true);

    // auto close
    setTimeout(() => {
      setSuccess(false);
      handleClose();
    }, 2500);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/70 backdrop-blur-md px-4">
      <div className="relative bg-white w-full max-w-5xl rounded-[30px] shadow-[0_20px_80px_rgba(0,0,0,0.35)] overflow-hidden flex flex-col md:flex-row animate-in fade-in zoom-in duration-300">
        {success && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
            <div className="w-[90%] max-w-sm rounded-3xl bg-white p-8 shadow-[0_20px_60px_rgba(0,0,0,0.25)] border border-gray-100 text-center animate-in zoom-in duration-300">
              <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white text-3xl">
                  ✓
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-800">
                Submitted Successfully!
              </h2>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                🎉 Thank you for your interest. Our counselor will contact you
                shortly.
              </p>

              <div className="mt-6 h-2 w-full overflow-hidden rounded-full bg-gray-100">
                <div className="h-full w-full animate-pulse rounded-full bg-gradient-to-r from-green-400 to-emerald-500"></div>
              </div>
            </div>
          </div>
        )}

        {/* LEFT SIDE */}
        <div className="hidden md:flex md:w-1/2 relative overflow-hidden bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-700 text-white p-10 flex-col justify-between">
          {/* glow effects */}
          <div className="absolute -top-16 -left-16 w-56 h-56 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-52 h-52 bg-pink-400/20 rounded-full blur-3xl"></div>

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-md px-4 py-2 rounded-full text-sm mb-6">
              <GraduationCap size={18} />
              Career Experts Available
            </div>

            <h2 className="text-4xl font-extrabold leading-tight mb-5">
              Free Career <br />
              Guidance 🎓
            </h2>

            <p className="text-blue-100 text-sm leading-6 mb-8">
              Get expert advice and discover the best university, online degree
              & career opportunities for your future.
            </p>

            <div className="space-y-4">
              {[
                "Top Universities",
                "Online Degrees",
                "Placement Support",
                "Free Counseling",
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center">
                    <CheckCircle2 size={18} className="text-green-300" />
                  </div>

                  <span className="text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-10 mt-10 bg-white/10 border border-white/10 rounded-2xl p-4 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white text-indigo-700 flex items-center justify-center">
                <GraduationCap />
              </div>

              <div>
                <h4 className="font-semibold">25,000+ Students Guided</h4>
                <p className="text-xs text-blue-100">
                  Trusted by students across India
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE FORM */}
        <div className="w-full md:w-1/2 p-7 md:p-8 relative bg-white">
          {/* Close */}
          <button
            onClick={handleClose}
            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-gray-100 hover:bg-red-50 hover:text-red-500 flex items-center justify-center transition"
          >
            <X size={18} />
          </button>

          <div className="mb-6">
            <h3 className="text-3xl font-bold text-gray-800">
              Book Free Counseling
            </h3>

            <p className="text-sm text-gray-500 mt-2">
              Fill in your details and our expert counselor will contact you
              shortly.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              required
              className="w-full border border-gray-200 bg-gray-50 px-4 py-3 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition"
            />

            <input
              type="tel"
              placeholder="Phone Number"
              required
              className="w-full border border-gray-200 bg-gray-50 px-4 py-3 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition"
            />

            <input
              type="email"
              placeholder="Email Address"
              className="w-full border border-gray-200 bg-gray-50 px-4 py-3 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition"
            />

            <select className="w-full border border-gray-200 bg-gray-50 px-4 py-3 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition">
              <option>Select Course</option>
              <option>MBA</option>
              <option>BCA</option>
              <option>MCA</option>
              <option>BBA</option>
            </select>

            <select className="w-full border border-gray-200 bg-gray-50 px-4 py-3 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition">
              <option>Select State</option>
              <option>Uttar Pradesh</option>
              <option>Delhi</option>
              <option>Maharashtra</option>
            </select>

            <select className="w-full border border-gray-200 bg-gray-50 px-4 py-3 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition">
              <option>Preferred Mode</option>
              <option>Online</option>
              <option>Distance</option>
            </select>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:scale-[1.01] hover:shadow-xl hover:shadow-blue-200 text-white py-3 rounded-xl font-semibold transition-all duration-300"
            >
              Get Free Callback
            </button>

            <p className="text-xs text-center text-gray-400 pt-1">
              🔒 Your information is secure and confidential
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GlobalPopup;
