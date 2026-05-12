// UniversityHighlight.jsx

import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";

import defaultBanner from "../uni-image/unihome.png";

import { PlusIcon, CheckIcon } from "@heroicons/react/24/solid";

// ✅ BANNERS
import jainBanner from "../uni-image/jain-banner.webp";
import lovelyBanner from "../uni-image/lovely-banner.webp";
import amityBanner from "../uni-image/amity-banner.webp";
import ChandigarhBanner from "../uni-image/Chandigarh-Banner.webp";
import ShardaBanner from "../uni-image/Sharda-Banner.webp";
import NmimsBanner from "../uni-image/Nmims-banner.webp";
import LPUBanner from "../uni-image/LPU-Banner.webp";
import UPESBanner from "../uni-image/UPES-University.webp";
import SymboisisBanner from "../uni-image/Symboisis-University.webp";
import VGUBanner from "../uni-image/VGU-Banner.webp";
import ManipalBanner from "../uni-image/Manipal-Banner.webp";

import user33 from "../assets/user33.webp";
import WERWER from "../assets/WERWER.webp";

const UniversityHighlight = ({ university: apiUniversity, slug: slugProp }) => {
  const { slug: slugFromRoute } = useParams();
  const slug = (slugProp || slugFromRoute || "").toLowerCase();

  const navigate = useNavigate();

  const [isFollowing, setIsFollowing] = useState(false);

  // Banners / offers keyed by slug (fallback when API has no hero asset)
  const universityData = {

    "jain-university": {
      name: "Jain University",
      description:
        "Where flexibility meets excellence—Jain University Online delivers QS #1 ranked programs in Asia with the credibility of UGC-DEB approval and NIRF recognition.",
      rating: 4.6,
      enrolled: "25,000+",
      banner: jainBanner,
      offer: "Get Cashback up to ₹6000 by enrolling now!",
    },

    "amity-university": {
      name: "Amity University",
      description:
        "Where flexibility meets excellence—Amity University Online delivers QS #1 ranked programs in Asia.",
      rating: 4.5,
      enrolled: "30,000+",
      banner: amityBanner,
      offer: "Get Cashback up to ₹5000 by enrolling now!",
    },

    "nmims-university": {
      name: "NMIMS University",
      description:
        "NMIMS is a premier institution renowned for excellence in management, engineering, and commerce education.",
      rating: 4.8,
      enrolled: "5,000+",
      banner: NmimsBanner,
      offer: "Get Cashback up to ₹8000 by enrolling now!",
    },

    "lovely-professional-university": {
      name: "Lovely Professional University",
      description:
        "LPU is among the largest private universities in India.",
      rating: 4.4,
      enrolled: "35,000+",
      banner: lovelyBanner,
      offer: "Get Cashback up to ₹4500 by enrolling now!",
    },

    "sharda-university": {
      name: "Sharda University",
      description:
        "Sharda University provides global learning with excellent academic facilities.",
      rating: 4.6,
      enrolled: "15,000+",
      banner: ShardaBanner,
      offer: "Get Cashback up to ₹7000 by enrolling now!",
    },

    "chandigarh-university": {
      name: "Chandigarh University",
      description:
        "Chandigarh University is one of India’s top private universities.",
      rating: 4.5,
      enrolled: "20,000+",
      banner: ChandigarhBanner,
      offer: "Get Cashback up to ₹5500 by enrolling now!",
    },

    "lpu-university": {
      name: "Lovely Professional University",
      description:
        "LPU is a leader in higher education with excellent campus life.",
      rating: 4.3,
      enrolled: "40,000+",
      banner: LPUBanner,
      offer: "Get Cashback up to ₹4500 by enrolling now!",
    },

    "upes-university": {
      name: "UPES University",
      description:
        "Industry-aligned programmes especially for engineering domains.",
      rating: 4.7,
      enrolled: "10,000+",
      banner: UPESBanner,
      offer: "Get Cashback up to ₹9000 by enrolling now!",
    },

    "symbiosis-university": {
      name: "Symbiosis University",
      description:
        "Recognized reputation in management and business programs.",
      rating: 4.8,
      enrolled: "10,000+",
      banner: SymboisisBanner,
      offer: "Get Cashback up to ₹9000 by enrolling now!",
    },

    "vgu-university": {
      name: "VGU University",
      description:
        "VGU is a fast-growing university focused on innovation.",
      rating: 4.7,
      enrolled: "10,000+",
      banner: VGUBanner,
      offer: "Get Cashback up to ₹9000 by enrolling now!",
    },

    "manipal-university": {
      name: "Manipal University",
      description:
        "Manipal University is known for innovation and global alumni.",
      rating: 4.7,
      enrolled: "10,000+",
      banner: ManipalBanner,
      offer: "Get Cashback up to ₹15000 by enrolling now!",
    },

  };

  const staticEntry = universityData[slug] || null;
  const api = apiUniversity || {};

  const name = api.name || staticEntry?.name || "University";
  const description =
    (api.details_plain && String(api.details_plain).trim()) ||
    (api.details && String(api.details).replace(/<[^>]+>/g, "").trim().slice(0, 380)) ||
    staticEntry?.description ||
    "";
  const rating =
    Number.parseFloat(String(api.stu_rating ?? "").replace(/[^\d.]/g, "")) ||
    staticEntry?.rating ||
    4.5;
  const enrolled =
    (api.statisfied_stu && String(api.statisfied_stu).trim()) ||
    (api.stu_choice && String(api.stu_choice).trim()) ||
    staticEntry?.enrolled ||
    "10,000+ students";
  const offer = staticEntry?.offer || "Get Cashback by enrolling now!";
  const banner =
    (api.image && String(api.image).trim()) ||
    staticEntry?.banner ||
    defaultBanner;

  return (
    <section className="py-10 bg-white">

      <div className="max-w-[1200px] mx-auto px-4">

        <div className="bg-[#F8FAFF] rounded-3xl shadow-md flex flex-col lg:flex-row items-center justify-between overflow-hidden">

          {/* ================= IMAGE ================= */}

          <div className="w-full lg:w-1/2 h-[230px] sm:h-[260px] lg:h-full overflow-hidden flex items-center justify-center bg-white rounded-2xl">

            <img
              src={banner}
              alt=""
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = defaultBanner;
              }}
            />

          </div>

          {/* ================= CONTENT ================= */}

          <div className="w-full lg:w-1/2 p-6 sm:p-8 flex flex-col justify-center">

            <div className="flex items-center justify-between mb-3">

              <h2 className="text-xl font-semibold text-gray-900">
                {name}
              </h2>

              <button
                onClick={() => setIsFollowing(!isFollowing)}
                className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300
                ${
                  isFollowing
                    ? "bg-[#0B5ED7] text-white"
                    : "bg-white text-[#0B5ED7] border border-[#0B5ED7]"
                }`}
              >

                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#0B5ED7]">

                  {isFollowing ? (
                    <CheckIcon className="w-3 h-3 text-white" />
                  ) : (
                    <PlusIcon className="w-3 h-3 text-white" />
                  )}

                </span>

                {isFollowing ? "Following" : "Follow"}

              </button>
            </div>

            <p className="text-gray-700 text-sm leading-relaxed">
              {description}
            </p>

            {/* ================= RATING ================= */}

            <div className="flex flex-wrap items-center gap-4 mt-4">

              <div className="flex items-center text-yellow-500 text-sm font-medium">

                {[...Array(5)].map((_, idx) => (
                  <FaStar
                    key={idx}
                    size={14}
                    className={
                      idx < Math.floor(Number(rating) || 0)
                        ? "text-yellow-500"
                        : "text-gray-300"
                    }
                  />
                ))}

                <span className="ml-1 text-black">
                  {Number.isFinite(rating) ? rating.toFixed(1) : rating}
                </span>

              </div>

              <p className="text-sm text-gray-500">
                • {enrolled}
                {!String(enrolled).toLowerCase().includes("student") ? " students enrolled" : ""}
              </p>

              <div className="flex items-center">

                {[WERWER, user33].map((img, idx) => (

                  <img
                    key={idx}
                    src={img}
                    alt="user"
                    className={`w-6 h-6 rounded-full border-2 border-white ${
                      idx !== 0 ? "-ml-2" : ""
                    }`}
                  />

                ))}

              </div>
            </div>

            <p className="text-[#004AAD] text-sm mt-3 font-medium">
              {offer}
            </p>

            {/* ================= BUTTONS ================= */}

            <div className="flex flex-col sm:flex-row gap-4 pt-4">

              <button
                onClick={() => navigate("/login")}
                className="bg-[#004aad] text-white px-6 py-2 rounded-lg font-medium shadow"
              >
                Enroll
              </button>

              <button
                onClick={() => {
                  const section = document.getElementById("courses");

                  if (section) {
                    section.scrollIntoView({
                      behavior: "smooth",
                    });
                  }
                }}
                className="border border-[#004aad] text-[#004aad] px-6 py-2 rounded-lg font-medium"
              >
                Know More
              </button>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UniversityHighlight;