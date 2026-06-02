import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import banner1 from "../course-image/banner1.webp";
import banner5 from "../course-image/banner5.webp";
import banner6 from "../course-image/banner6.webp";
import banner7 from "../course-image/banner7.webp";

import banner1Mobile from "../course-image/Banner-Mobile1.webp";
import banner5Mobile from "../course-image/banner5mobile.webp";
import banner6Mobile from "../course-image/banner6mobile.webp";
import banner7Mobile from "../course-image/banner7mobile.webp";



const HeroSection = () => {
  const banners = [
    { desktop: banner1, mobile: banner1Mobile },
    { desktop: banner5, mobile: banner5Mobile },
    { desktop: banner6, mobile: banner6Mobile },
    { desktop: banner7, mobile: banner7Mobile },
  ];

  return (
    <div className="w-full py-6 relative z-0">
      <div className="mx-auto max-w-[1240px] px-4">
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop
          slidesPerView={1}
          spaceBetween={0}
          observer={true}
          observeParents={true}
          className="overflow-hidden rounded-2xl transform-gpu"
        >
          {banners.map((banner, index) => (
            <SwiperSlide
              key={index}
              className="rounded-2xl overflow-hidden"
            >
              {/* DESKTOP */}
              <img
                src={banner.desktop}
                alt={`Hero ${index + 1}`}
                className="hidden md:block w-full h-auto object-cover will-change-transform" />

              {/* MOBILE */}
              <img
                src={banner.mobile}
                alt={`Hero Mobile ${index + 1}`}
                className="block md:hidden w-full h-[170px] object-cover will-change-transform" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* SAME FILE CSS */}
      <style>{`
        .swiper-pagination {
          bottom: 10px !important;
        }
      `}</style>
    </div>
  );
};

export default HeroSection;
