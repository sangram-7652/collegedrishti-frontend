
import React from 'react';
import infosys from '../uni-image/1.png';
import tcs from '../uni-image/2.png';
import wipro from '../uni-image/3.png';
import flipkart from '../uni-image/4.png';
import accenture from '../uni-image/5.png';
import deloitte from '../uni-image/6.png';
import amazon from '../uni-image/7.png';
import kpmg from '../uni-image/8.png';
import capegemini from '../uni-image/9.png';
import cognizant from '../uni-image/10.png';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

const HiringSection = () => {
  const logos = [
    infosys, tcs, wipro, flipkart, accenture,
    deloitte, amazon, kpmg, capegemini, cognizant,
  ];

  return (
    <section className="py-6 md:py-10 text-center bg-white mt-4 md:mt-6">
      <h2 className="text-4xl font-semibold mb-10">Hiring Partners</h2>
<p className="text-sm md:text-xl text-[#4F4F4F] mb-6 md:mb-8 px-4 md:px-0">
    Unlock the doors of success with the leading companies of the industry
  </p>
      <Swiper
        modules={[Autoplay]}
        spaceBetween={40}
        loop={true}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
        }}
        speed={2500} // faster and smoother
        breakpoints={{
          320: { slidesPerView: 2 },
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 6 },
        }}
        className="flex items-center"
      >
        {logos.map((logo, index) => (
          <SwiperSlide key={index} className="flex justify-center items-center">
            <img
              src={logo}
              alt="Partner Logo"
              className="h-28 w-auto object-contain transition-transform duration-300 hover:scale-110 brightness-125 contrast-125 saturate-125"
              style={{
                imageRendering: 'crisp-edges',
                WebkitImageRendering: 'crisp-edges',
                transform: 'translateZ(0)',
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HiringSection;

