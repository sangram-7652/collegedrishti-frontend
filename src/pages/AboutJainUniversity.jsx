import React, { useEffect, useState } from "react";
import api from "../api/axios";
import Header from "../pages/Header";
import MobileMenu from "../pages/MobileMenu";
import Footer from "../components/Footer";
import MobileFooterNav from "../components/MobileFooterNav";
import defaultBanner from "../uni-image/unihome.png";
import { useNavigate } from "react-router-dom";


// ✅ Import university banners
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
  "nmims-online-university": NmimsBanner,
  "chandigarh-university": ChandigarhBanner,
  "sharda-university": ShardaBanner,
  "lpu-university": LPUBanner,
  "upes-university": UPESBanner,
  "vgu-university": VGUBanner,
  "symbiosis-university": SymboisisBanner,
  "manipal-university": ManipalBanner

};

const AboutJainUniversity = () => {
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


  useEffect(() => {
    api
      .get("/universities")
      .then((res) => {
        if (res.data.success) {
          setUniversities(res.data.data);
        }
      })
      .catch((err) => console.error("Error fetching universities:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return <div className="text-center py-12 text-gray-600">Loading...</div>;

  return (
    <>
      {/* ✅ Desktop Header */}
      <div className="hidden md:block">
        <Header />
      </div>

      {/* ✅ Mobile Header */}
      <div className="block md:hidden">
        <MobileMenu />
      </div>

      {/* ✅ Page Section */}
      <section className="max-w-6xl mx-auto px-4 py-10 md:py-16 pb-28 md:pb-16">
        <h1 className="text-3xl font-bold text-center text-[#004AAD] mb-10">
          About Universities
        </h1>

        {/* ✅ Modern Card Layout */}
        <div className="flex flex-col gap-8">
          {universities.map((uni) => {
            const slug = uni.slug?.toLowerCase();
            const banner = bannerMap[slug] || defaultBanner;

            return (
              <div
                key={uni.id}
                onClick={() => navigate(`/university/${uni.slug}`)}
                className="bg-[#F8FAFF] rounded-3xl shadow-md flex flex-col md:flex-row items-center justify-between overflow-hidden hover:shadow-lg transition duration-300"
              >


               {/* ✅ Right Banner */}
                <div className="w-full md:w-1/2 h-[200px] sm:h-[250px] md:h-[280px] flex items-center justify-center bg-white">
                  <img
                    src={banner}
                    alt={`${uni.name} Banner`}
                    className="w-full h-full object-contain md:object-cover rounded-t-3xl md:rounded-tr-3xl md:rounded-bl-none"
                  />
                </div>


                {/* ✅ Left Content */}
                <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-center">
                  <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2">
                    {uni.name}
                  </h2>
                  <p className="text-gray-600 text-sm mb-3">
                    <strong>Address:</strong> {uni.address || "N/A"}
                  </p>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {uni.details?.length > 250
                      ? uni.details.substring(0, 250) + "..."
                      : uni.details}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3 mt-5">
                    <button
                      onClick={() => navigate("/ContactUs")}
                      className="bg-[#004AAD] text-white text-sm font-medium px-6 py-2 rounded-full hover:bg-[#003882] transition"
                    >
                      Enroll
                    </button>
                    <button className="border border-[#004AAD] text-[#004AAD] text-sm font-medium px-6 py-2 rounded-full hover:bg-[#004AAD] hover:text-white transition">
                      Know more
                    </button>
                  </div>
                </div>

               
              </div>
            );
          })}
        </div>
      </section>

      {/* ✅ Desktop Footer */}
      <div className="hidden md:block">
        <Footer />
      </div>

      {/* ✅ Mobile Footer */}
      <div className="block md:hidden fixed bottom-0 left-0 w-full z-50">
        <MobileFooterNav />
      </div>
    </>
  );
};

export default AboutJainUniversity;
