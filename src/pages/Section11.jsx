import { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import api from "../api/axios";
import courseImage from "../uni-image/framecourse.png";

// University banners
import jainBanner from "../uni-image/jain-banner.webp";
import lovelyBanner from "../uni-image/lovely-banner.webp";
import amityBanner from "../uni-image/amity-banner.webp";
import ChandigarhBanner from "../uni-image/Chandigarh-Banner.webp";
import ShardaBanner from "../uni-image/Sharda-Banner.webp";
import NmimsBanner from "../uni-image/Nmims-banner.webp";
import LPUBanner from "../uni-image/LPU-Banner.webp";
import UPESBanner from "../uni-image/UPES-University.webp";
import VGUBanner from "../uni-image/VGU-Banner.webp";
import SymboisisBanner from "../uni-image/Symboisis-University.webp";
import ManipalBanner from "../uni-image/Manipal-Banner.webp";

const bannerMap = {
  "jain-university": jainBanner,
  "amity-university": amityBanner,
  "lovely-professional-university": lovelyBanner,
  "nmims-university": NmimsBanner,
  "chandigarh-university": ChandigarhBanner,
  "sharda-university": ShardaBanner,
  "lpu-university": LPUBanner,
  "upes-university": UPESBanner,
  "vgu-university": VGUBanner,
  "symbiosis-university": SymboisisBanner,
  "manipal-university": ManipalBanner,
};

const Section11 = () => {
  const [universities, setUniversities] = useState([]);
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const res = await api.get("/universities");

        if (res.data.success) {
          setUniversities(res.data.data);
        }
      } catch (err) {
        console.error("Error fetching universities:", err);
      }
    };

    fetchUniversities();
  }, []);

  // Scroll Left
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -320,
        behavior: "smooth",
      });
    }
  };

  // Scroll Right
  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: 320,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="bg-white py-10 overflow-hidden">

      <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-20">

        {/* Heading */}
        <div className="flex items-center justify-between mb-6">

          <h2 className="text-2xl md:text-3xl font-bold text-black">
            Explore More Universities
          </h2>

          {/* Desktop Arrows */}
          <div className="hidden md:flex items-center gap-3">

            <button
              onClick={scrollLeft}
              className="bg-blue-600 hover:bg-blue-700 transition text-white p-3 rounded-full shadow-md"
            >
              <FaChevronLeft size={14} />
            </button>

            <button
              onClick={scrollRight}
              className="bg-blue-600 hover:bg-blue-700 transition text-white p-3 rounded-full shadow-md"
            >
              <FaChevronRight size={14} />
            </button>

          </div>
        </div>

        {/* Cards */}
        <div
          ref={scrollRef}
          className="
            flex
            gap-5 md:gap-8
            overflow-x-auto
            no-scrollbar
            scroll-smooth
            snap-x snap-mandatory
            pb-4
          "
        >

          {universities.map((uni, index) => {
            const slug = uni.slug?.toLowerCase();

            const banner =
              bannerMap[slug] ||
              uni.image_url ||
              courseImage;

            return (
              <div
                key={index}
                className="
                  w-[85vw]
                  sm:w-[320px]
                  md:w-[300px]
                  bg-white
                  border border-gray-100
                  rounded-3xl
                  shadow-sm
                  hover:shadow-xl
                  transition-all duration-300
                  overflow-hidden
                  snap-start
                  flex-shrink-0
                "
              >

                {/* Image */}
                <div className="relative">

                  <img
                    src={banner}
                    alt={uni.name}
                    className="
                      w-full
                      h-[220px]
                      sm:h-[190px]
                      md:h-[170px]
                      object-cover
                    "
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

                </div>

                {/* Content */}
                <div className="p-5">

                  <h3 className="font-bold text-lg text-black line-clamp-1">
                    {uni.name}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    {uni.courses_count} Online Courses
                  </p>

                  {/* Bottom */}
                  <div className="flex items-center justify-between mt-5">

                    {/* Rating */}
                    <div className="flex items-center gap-1 text-yellow-500 font-semibold">
                      <FaStar size={14} />
                      <span>{uni.rating || 4.9}</span>
                    </div>

                    {/* Button */}
                    <button
                      onClick={() => navigate("/ContactUs")}
                      className="
                        bg-blue-600
                        hover:bg-blue-700
                        text-white
                        text-sm
                        font-medium
                        px-4 py-2
                        rounded-full
                        transition
                      "
                    >
                      Enroll Now
                    </button>

                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile Arrows */}
        <div className="flex md:hidden items-center justify-center gap-4 mt-6">

          <button
            onClick={scrollLeft}
            className="bg-blue-600 text-white p-3 rounded-full shadow-md"
          >
            <FaChevronLeft size={14} />
          </button>

          <button
            onClick={scrollRight}
            className="bg-blue-600 text-white p-3 rounded-full shadow-md"
          >
            <FaChevronRight size={14} />
          </button>

        </div>
      </div>
    </section>
  );
};

export default Section11;