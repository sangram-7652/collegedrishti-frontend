
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { useParams } from "react-router-dom";
import user1 from "../course-image/ellipse.png";
import defaultBanner from "../uni-image/unihome.png";
import { Link } from "react-router-dom";
import { PlusIcon, CheckIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";




// ✅ All banners imported
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
import user33 from '../assets/user33.webp';
import WERWER from '../assets/WERWER.webp';



const UniversityHighlight = () => {
  const { slug } = useParams();
  const [isFollowing, setIsFollowing] = useState(false);
  const navigate = useNavigate();


  // ✅ University Data
  const universityData = {
    "jain-university": {
      name: "Jain University",
      description:
        "Where flexibility meets excellence—Jain University Online delivers QS #1 ranked programs in Asia with the credibility of UGC-DEB approval and NIRF recognition. Transform your career through industry-led mentorship, real-world projects, and access to 100,000+ job opportunities.",
      rating: 4.6,
      enrolled: "25,000+",
      // logo: jainBanner,
      banner: jainBanner,
      offer: "Get Cashback up to ₹6000 by enrolling now!",
    },
    "amity-university": {
      name: "Amity University",
      description:
        "Where flexibility meets excellence—Amity University Online delivers QS #1 ranked programs in Asia with the credibility of UGC-DEB approval and NIRF recognition. Transform your career through industry-led mentorship, real-world projects, and access to 100,000+ job opportunities, all from a digital campus designed to turn ambition into achievement.",
      rating: 4.5,
      enrolled: "30,000+",
      // logo: amityBanner,
      banner: amityBanner,
      offer: "Get Cashback up to ₹5000 by enrolling now!",
    },
    "lovely-professional-university": {
      name: "Lovely Professional University (LPU)",
      description:
        "LPU is among the largest private universities in India, known for its modern campus and international collaborations.",
      rating: 4.4,
      enrolled: "35,000+",
      // logo: lovelyBanner,
      banner: lovelyBanner,
      offer: "Get Cashback up to ₹4500 by enrolling now!",
    },
    "nmims-university": {
      name: "NMIMS University",
      description:
        "NMIMS is a premier institution renowned for excellence in management, engineering, and commerce education.",
      rating: 4.8,
      enrolled: "5,000+",
      // logo: NmimsBanner,
      banner: NmimsBanner,
      offer: "Get Cashback up to ₹8000 by enrolling now!",
    },

    "sharda-university": {
      name: "Sharda University",
      description:
        "Sharda University provides global learning with excellent academic and research facilities.",
      rating: 4.6,
      enrolled: "15,000+",
      // logo: ShardaBanner,
      banner: ShardaBanner,
      offer: "Get Cashback up to ₹7000 by enrolling now!",
    },
    "chandigarh-university": {
      name: "Chandigarh University",
      description:
        "Chandigarh University is one of India’s top private universities with strong placement and innovation programs.",
      rating: 4.5,
      enrolled: "20,000+",
      // logo: ChandigarhBanner,
      banner: ChandigarhBanner,
      offer: "Get Cashback up to ₹5500 by enrolling now!",
    },
    "lpu-university": {
      name: "Lovely Professional University",
      description:
        "LPU is a leader in higher education with excellent campus life and career outcomes.",
      rating: 4.3,
      enrolled: "40,000+",
      // logo: LPUBanner,
      banner: LPUBanner,
      offer: "Get Cashback up to ₹4500 by enrolling now!",
    },
    "upes-university": {
      name: "University of Petroleum and Energy Studies (UPES)",
      description:
        "Industry-aligned programmes especially for energy / petroleum / engineering domains.Global collaborations & student exchange (Internationals admissions page) UPES.",
      rating: 4.7,
      enrolled: "10,000+",
      // logo: UPESBanner,
      banner: UPESBanner,
      offer: "Get Cashback up to ₹9000 by enrolling now!",
    },
    "symbiosis-university": {
      name: "Symbiosis International (Deemed University)",
      description:
        "Recognized reputation in management / business programs (e.g. flagship MBA / business school under its umbrella).As per one source, NIRF rank for Symbiosis is among top universities.",
      rating: 4.8,
      enrolled: "10,000+",
      // logo: UPESBanner,
      banner: SymboisisBanner,
      offer: "Get Cashback up to ₹9000 by enrolling now!",
    },
    "vgu-university": {
      name: "Vivekananda Global University (VGU)",
      description:
        "VGU is a fast-growing university focused on innovation, research, and skill-based education.",
      rating: 4.7,
      enrolled: "10,000+",
      // logo: VGUBanner,
      banner: VGUBanner,
      offer: "Get Cashback up to ₹9000 by enrolling now!",
    },
    "manipal-university": {
      name: "Manipal University",
      description:
        "Manipal University is a fast-growing university focused on innovation, research, and skill-based education.A large alumni network working across top global companies and institutions.",
      rating: 4.7,
      enrolled: "10,000+",
      // logo: VGUBanner,
      banner: ManipalBanner,
      offer: "Get Cashback up to ₹15000 by enrolling now!",
    },

  };

  const university =
    universityData[slug?.toLowerCase()] || universityData["jain-university"];

  return (
    <section className="py-10 bg-white">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="bg-[#F8FAFF] rounded-3xl shadow-md flex flex-col lg:flex-row items-center justify-between overflow-hidden">


          {/* Right Banner Section */}
          <div className="w-full lg:w-1/2 h-[230px] sm:h-[260px] lg:h-full overflow-hidden flex items-center justify-center bg-white rounded-2xl">
            <img
              src={university.banner || defaultBanner}
              alt={`${university.name} Banner`}
              className="w-full h-full object-contain rounded-t-2xl lg:rounded-tr-2xl lg:rounded-bl-none"
            />
          </div>

          {/* Left Info Section */}
          <div className="w-full lg:w-1/2 p-6 sm:p-8 flex flex-col justify-center">
            {/* Small Banner Thumbnail + Follow Button */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-0">
                {/* <img
                  src={university.logo}
                  alt={`${university.name} logo`}
                  className="w-10 h-10 rounded-md object-cover"
                /> */}
                <h2 className="text-xl font-semibold text-gray-900">
                  {university.name}
                </h2>
              </div>
              <button
                onClick={() => setIsFollowing(!isFollowing)}
                className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300
        ${isFollowing
                    ? "bg-[#0B5ED7] text-white shadow-md hover:bg-[#0a4fc0]"
                    : "bg-white text-[#0B5ED7] border border-[#0B5ED7] hover:bg-[#0B5ED7] hover:text-white shadow-sm"
                  }
      `}
              >
                <span
                  className={`flex items-center justify-center w-5 h-5 rounded-full border transition-all
          ${isFollowing
                      ? "border-white bg-white/20"
                      : "border-[#0B5ED7] bg-[#0B5ED7]"
                    }
        `}
                >
                  {isFollowing ? (
                    <CheckIcon className="w-3.5 h-3.5 text-white" />
                  ) : (
                    <PlusIcon className="w-3.5 h-3.5 text-white" />
                  )}
                </span>

                {isFollowing ? "Following" : "Follow"}
              </button>
            </div>

            <p className="course-content text-gray-700 text-sm leading-relaxed">
              {university.description}
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-4">
              <div className="flex items-center text-yellow-500 text-sm font-medium">
                {[...Array(5)].map((_, idx) => (
                  <FaStar
                    key={idx}
                    size={14}
                    className={
                      idx < Math.floor(university.rating)
                        ? "text-yellow-500"
                        : "text-gray-300"
                    }
                  />
                ))}
                <span className="ml-1 text-black">
                  {university.rating.toFixed(1)}
                </span>
              </div>

              <p className="text-sm text-gray-500">
                • {university.enrolled} students enrolled
              </p>

              <div className="flex items-center">
                {[WERWER, user33].map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt="user"
                    className={`w-6 h-6 rounded-full border-2 border-white ${idx !== 0 ? "-ml-2" : ""
                      }`}
                  />
                ))}
              </div>
            </div>

            <p className="text-[#004AAD] text-sm mt-3 font-medium">
              {university.offer}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                onClick={() => navigate("/ContactUs")}
                className="bg-[#004aad] text-white px-6 py-2 rounded-lg font-medium shadow hover:opacity-90 transition"
              >
                Enroll
              </button>

              <button
                onClick={() => {
                  const section = document.getElementById("courses");
                  if (section) {
                    section.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="border border-[#004aad] text-[#004aad] px-6 py-2 rounded-lg font-medium hover:bg-[#004aad] hover:text-white transition"
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
