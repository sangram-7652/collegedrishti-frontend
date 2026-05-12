

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import counsellingImg from "../assets/counselling.png";
import universityImg from "../uni-image/struggling.webp";

const CounsellingSlider = () => {
  const [popupOpen, setPopupOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
  });

  const cards = [
    {
      title: "We also Give Video Counselling",
      buttonText: "Get It Now",
      image: counsellingImg,
    },
    {
      title: "Struggling for your University?",
      buttonText: "Get It Now",
      image: universityImg,
    },
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitForm = () => {
    console.log("Saved Data : ", formData);
    alert("Form submitted!");
    setPopupOpen(false);
  };

  return (
    <div className="w-full px-4 py-8 bg-white">
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        breakpoints={{ 768: { slidesPerView: 2 } }}
      >
        {cards.map((card, index) => (
          <SwiperSlide key={index}>
            <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-6 rounded-xl flex justify-between items-center h-full shadow-lg">
              <div className="w-[60%]">
                <h2 className="text-base sm:text-lg md:text-2xl font-semibold mb-4">
                  {card.title}
                </h2>
                <button
                  onClick={() => setPopupOpen(true)}
                  className="bg-white text-blue-600 font-semibold px-4 py-2 rounded-full hover:bg-blue-100 transition flex items-center gap-2"
                >
                  {card.buttonText} <span className="text-xl">→</span>
                </button>
              </div>

              <div className="w-[40%] flex justify-end">
                <img
                  src={card.image}
                  alt="slide-img"
                  className="h-[130px] sm:h-[160px] md:h-[200px] object-contain"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Popup Form */}
    {popupOpen && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] px-3"
          onClick={() => setPopupOpen(false)}
        >
          <div
            className="bg-white w-full 
                 max-w-[95%] md:max-w-[650px]
                 rounded-xl border-[8px] border-[#d2e5fd] 
                 shadow-xl p-4 md:p-8 relative 
                 max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* ❌ Close */}
            <button
              className="absolute top-2 right-2 
                   bg-gray-200 hover:bg-gray-300 text-gray-700 
                   rounded-full w-7 h-7 flex items-center justify-center 
                   text-sm"
              onClick={() => setPopupOpen(false)}
            >
              ✕
            </button>

            <div className="grid md:grid-cols-2 gap-6">

              {/* Left */}
              <div>
                <div className="bg-[#2c4246] text-white font-semibold 
                          text-sm md:text-lg px-3 py-2 rounded-lg mb-4">
                  Compare India’s biggest universities on one platform
                </div>

                <ul className="space-y-1.5 text-[11px] md:text-base">
                  <li>⭐ 150+ Universities</li>
                  <li>⭐ 30X comparison factors</li>
                  <li>⭐ Expert consultation</li>
                  <li>⭐ Easy Loan facility</li>
                  <li>⭐ 1 Lac+ Admissions</li>
                  <li>⭐ Post Admission Support</li>
                </ul>
              </div>

              {/* Right */}
              <div>
                <h2 className="text-sm md:text-lg font-bold text-center mb-3">
                  Get Personalized Counselling
                </h2>

                {/* Gender */}
                <div className="grid grid-cols-2 gap-2 mb-3">
                  {["Male", "Female"].map((g) => (
                    <button
                      key={g}
                      onClick={() => setFormData({ ...formData, gender: g })}
                      className={`p-2 text-xs border rounded 
                  ${formData.gender === g
                          ? "bg-blue-100 border-blue-600"
                          : ""}`}
                    >
                      {g}
                    </button>
                  ))}
                </div>

                {/* Inputs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <input
                    type="text"
                    name="name"
                    placeholder="Name*"
                    value={formData.name}
                    onChange={handleChange}
                    className="border px-3 py-2 rounded w-full"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email*"
                    value={formData.email}
                    onChange={handleChange}
                    className="border px-3 py-2 rounded w-full"
                  />

                  <div>
                    <div className="flex border rounded overflow-hidden">
                      <span className="bg-gray-100 px-2 py-2 text-[11px]">🇮🇳 +91</span>
                      <input
                        type="text"
                        name="phone"
                        placeholder="Mobile Number*"
                        value={formData.phone}
                        onChange={handleChange}
                        className="px-2 py-2 text-xs w-full"
                      />
                    </div>
                  </div>

                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    className="border px-3 py-2 rounded w-full"
                  />
                </div>

                {/* Buttons */}
                <div className="flex justify-center gap-4 mt-4">
                  <button
                    onClick={() => setPopupOpen(false)}
                    className="px-4 py-2 text-xs bg-gray-200 rounded"
                  >
                    Back
                  </button>
                  <button
                    onClick={submitForm}
                    className="px-4 py-2 text-xs bg-[#00bcd4] text-white rounded"
                  >
                    Submit
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CounsellingSlider;


