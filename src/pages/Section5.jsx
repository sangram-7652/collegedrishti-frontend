import React from "react";
import { CheckCircle2 } from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";


import Jain from '../assets/Jain Logo.webp';
import amity from '../assets/Amity Logo.webp';
import Chandiagarah from '../uni-image/Chandiagarah logo.webp';
import vk from '../assets/Vivakananda logo.webp';
import LPU from '../uni-image/lpu logo.webp';
import nmims from '../assets/Nmims logo.webp';
import Manipal from '../assets/Manipal logo.webp';
import Sharda from '../uni-image/Sharda logo.webp';
import Uttranchal from '../uni-image/Uttranchal logo.webp';

import paytmLogo from '../assets/paytm.png';
import logo1 from '../assets/logo-jain.png';

import earnImage from '../assets/earn.webp';
import amazonLogo from '../assets/amazon.png';
import googleLogo from '../assets/google.png';
import oracleLogo from '../assets/oracle.png';
import pwcLogo from '../assets/pwc.png';
import eyLogo from '../assets/ey.png';
import microsoftLogo from '../assets/microsoft.png';
import CourseIcon from '../assets/course-icon.png';





const placements = [
  "100+ Students Got Placements",
  "More than 30% Salary Hikes",
  "Guaranteed Stability",
];

const companyLogos = [
  amazonLogo,
  microsoftLogo,
  eyLogo,
  eyLogo,
  googleLogo,
  pwcLogo,
  oracleLogo,
  oracleLogo,
];

const universityLogos = [
  Jain,
  amity,
  vk,
  Manipal,
  nmims,
  Sharda,
  Uttranchal,
  Chandiagarah,
  LPU,
];

const Section5 = () => {
  return (
    <section className="bg-white py-10 px-4 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Placement Section */}
        <h2 className="text-2xl font-semibold mb-6">Placements</h2>
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <ul className="space-y-4">
            {placements.map((point, index) => (
              <li key={index} className="flex items-start gap-2 text-sm md:text-base">
                <CheckCircle2 className="text-green-500 mt-1" />
                {point}
              </li>
            ))}
          </ul>
          <div className="grid grid-cols-4 gap-4 items-center">
            {companyLogos.map((src, index) => (

              <img key={index} src={src} alt={`company-${index}`} className="h-8 object-contain" />

            ))}
          </div>
        </div>

        {/* Universities Section */}

        {/* <h2 className="text-2xl font-semibold mt-12 mb-6">Universities for Online MBA</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {universityLogos.map((src, index) => (
            <div key={index} className="bg-white shadow-md p-4 rounded-md flex items-center justify-center">
              <img src={src} alt={`university-${index}`} className="h-10 object-contain" />
            </div>
          ))}
        </div> */}

        {/* Universities Section (Slider) */}
        <h2 className="text-2xl md:text-3xl font-bold mt-12 mb-8 text-gray-800">
          Universities for Online MBA
        </h2>
        <Swiper
          modules={[Autoplay]}
          spaceBetween={16}
          slidesPerView={2.2}
          loop={true}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          className="py-4"
          breakpoints={{
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 6 },
          }}
        >
          {universityLogos.map((src, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white shadow-md rounded-xl flex items-center justify-center h-[90px] md:h-[100px] px-4 hover:shadow-lg transition-all duration-300">
                <img
                  src={src}
                  alt={`university-${index}`}
                  className="w-full h-full object-contain p-2"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
};

export default Section5;
