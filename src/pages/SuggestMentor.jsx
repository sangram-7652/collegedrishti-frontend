import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/autoplay";
import { Star } from "lucide-react";
import api from "../api/axios";
import MobileMenu from "../pages/MobileMenu";
import Footer from "../components/Footer";
import MobileFooterNav from "../components/MobileFooterNav";

const MentorSlider = () => {
  const [expertData, setExpertData] = useState([]);
  const [flippedIndex, setFlippedIndex] = useState(null);

  useEffect(() => {
    api.get("/experts")
      .then((res) => res.data.success && setExpertData(res.data.data))
      .catch((err) => console.log(err));
  }, []);

  const handleFlip = (i) => {
    setFlippedIndex(flippedIndex === i ? null : i);
  };

  return (
    <div className="bg-white min-h-screen flex flex-col">

      {/* Mobile Header */}
      <div className="sticky top-0 z-50 bg-white md:hidden shadow-sm">
        <MobileMenu />
      </div>

      {/* Main */}
      <div className="flex-1 pt-5 px-4 mt-2">
        <h2 className="text-[20px] text-[#0A0D14] font-semibold text-center">
          Pick your Mentor
        </h2>
        <p className="text-[11px] text-gray-500 text-center mt-2 max-w-[300px] mx-auto leading-tight">
          College Drishti has a team of expert counsellors ready to guide you
          through their experience of guiding 100s of students        </p>

        <div className="mt-6 flex justify-center pb-20 pt-2">
          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            loop={true}
            centeredSlides={true}
            slidesPerView={1.05}
            spaceBetween={12}
            grabCursor={true}
            className="max-w-[300px] w-full select-none"
          >
            {expertData.map((mentor, index) => (
              <SwiperSlide key={index} className="flex justify-center">
                <div className="group relative w-full max-w-[300px] mx-auto [perspective:1200px] overflow-visible"
                  onClick={() => handleFlip(index)}>


                  <div className={`relative h-[360px] md:h-[390px] w-full rounded-3xl shadow-xl transition-transform duration-700 [transform-style:preserve-3d]`}
                    style={{
                      transform: flippedIndex === index ? "rotateY(180deg)" : "none"
                    }}
                  >

                    {/* FRONT */}
                    <div className="absolute inset-0 [backface-visibility:hidden] rounded-2xl overflow-hidden">
                      <img
                        src={
                          mentor.image
                            ? `${import.meta.env.VITE_API_BASE_URL}${mentor.image.replace(/^\/+/, "")}`
                            : "/default-mentor.png"
                        }
                        className="w-full h-full object-cover rounded-2xl"
                        alt={mentor.name}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/65 to-transparent"></div>

                      {/* Rating */}
                      <div className="absolute top-2 right-2 bg-white rounded-full px-2 py-[2px] shadow flex items-center gap-1">
                        <Star fill="#FFD700" stroke="#FFD700" className="w-3 h-3" />
                        <span className="text-[10px] font-semibold">
                          {mentor.rating || "4.0"}
                        </span>
                      </div>

                      {/* Consulting */}
                      {mentor.counselling && (
                        <div className="absolute bottom-32 left-3 bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                          {mentor.counselling}+ Consulting
                        </div>
                      )}


                      {/* Info */}
                      <div className="absolute bottom-12 left-5 right-5 text-white">
                        <h3 className="text-lg font-bold">{mentor.name}</h3>
                        <p className="text-gray-200 text-sm">{mentor.post}</p>
                        <p className="text-gray-200 text-sm">
                          Experience: {mentor.experience} Years
                        </p>
                      </div>
                    </div>

                    {/* BACK */}
                    <MentorBack mentor={mentor} />
                  </div>

                  {/* BUTTON */}
                  <div className="flex justify-center mt-4">
                    <Link to="/suggesteduniversity">
                      <button
                        className="px-4 py-1.5 border border-blue-600 text-blue-600 text-sm font-medium rounded-full bg-white hover:bg-blue-50 hover:shadow transition whitespace-nowrap"
                      >
                        Consult Now
                      </button>
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* FOOTERS */}
      <div className="hidden md:block">
        <Footer />
      </div>
      <div className="block md:hidden">
        <MobileFooterNav />
      </div>

    </div>
  );
};

const MentorBack = ({ mentor }) => (
  <div className="
  absolute inset-0 bg-[#3073F8] 
  text-white text-[11px] px-4 py-6 
  rounded-[22px] shadow-lg 
  overflow-y-auto leading-relaxed
  scrollbar-thin scrollbar-thumb-white/30
  [transform:rotateY(180deg)]
  [backface-visibility:hidden]
">
    {mentor.descr?.replace(/<[^>]+>/g, "") || "No description available."}
  </div>
);

export default MentorSlider;
