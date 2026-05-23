import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
import "swiper/css";
import { Star } from "lucide-react";
import api from "../api/axios";
import ShadeWaveLoader from "../components/ShadeWaveLoader";



const MentorSlider = () => {
  const [expertData, setExpertData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [flippedIndex, setFlippedIndex] = useState(null);
  const swiperRef = useRef(null);

  const [showForm, setShowForm] = useState(false);
  const [mobile, setMobile] = useState("");
  const [submitted, setSubmitted] = useState(false);


  useEffect(() => {
    api
      .get("/experts")
      .then((response) => {
        if (response.data.success) setExpertData(response.data.data);
      })
      .catch((error) => console.error("Failed to fetch mentors:", error))
      .finally(() => setLoading(false));
  }, []);

  const repeatedData =
    expertData.length > 0
      ? Array.from(
          { length: Math.max(1, Math.ceil(6 / expertData.length)) },
          () => expertData
        ).flat()
      : [];
  const canLoop = repeatedData.length > 4;


  const handleFlip = (index) => {
    setFlippedIndex(flippedIndex === index ? null : index);
  };

  return (
    <div className="relative py-16 px-4 w-full overflow-hidden bg-[#F4F7FB]">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-3 text-gray-900">
          Pick your Mentor
        </h2>
        <p className="text-center text-gray-500 mb-10 max-w-2xl mx-auto">
          College Drishti has a team of expert counsellors ready to guide you
          through their experience of guiding 100s of students
        </p>

        {loading ? (
          <ShadeWaveLoader label="Loading mentors..." cards={3} compact />
        ) : (
          <div className="relative z-10">
          <Swiper
            modules={[Autoplay]}
            onSwiper={(s) => (swiperRef.current = s)}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            loop={canLoop}
            grabCursor={true}
            spaceBetween={14}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1.4 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
            }}
            className="!overflow-visible"
          >
            {repeatedData.map((mentor, index) => (
              <SwiperSlide key={`${mentor.id}-${index}`} className="!overflow-visible">
                <div className="group relative w-full max-w-[270px] mx-auto [perspective:1200px] overflow-visible"
                  onClick={() => handleFlip(index)}>

                  <div className={`relative h-[340px] md:h-[360px] w-full rounded-3xl shadow-xl transition-transform duration-700 [transform-style:preserve-3d]
                     group-hover:[transform:rotateY(180deg)]`}
                    style={{
                      transform: flippedIndex === index ? "rotateY(180deg)" : "none"
                    }}
                  >



                    {/* FRONT SIDE */}
                    <div className="absolute inset-0 [backface-visibility:hidden] rounded-2xl overflow-hidden">
                      <img
                        src={`${import.meta.env.VITE_API_BASE_URL}/${mentor.image}`}
                        alt={mentor.name}
                        className="w-full h-full object-cover rounded-2xl"
                      />



                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent rounded-3xl"></div>

                      {/* 🔹 Rating Badge — stays on top always */}
                      <div className="absolute top-3 right-3 z-[9999] bg-white px-3 py-1 rounded-full flex items-center gap-1 shadow border border-gray-200 pointer-events-none">
                        <Star fill="#FFD700" stroke="#FFD700" className="w-4 h-4 mr-1" />
                        <span className="text-sm font-semibold text-black leading-none">
                          {mentor.rating || "4.0"}
                        </span>
                      </div>


                      {/* Consulting Tag */}
                      {mentor.counselling && (
                        <div className="absolute bottom-32 left-3 bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                          {mentor.counselling}+ Consulting
                        </div>
                      )}

                      {/* Mentor Info */}
                      <div className="absolute bottom-12 left-5 right-5 text-white">
                        <h3 className="text-lg font-bold">{mentor.name}</h3>
                        <p className="text-gray-200 text-sm">{mentor.post}</p>
                        <p className="text-gray-200 text-sm">
                          Experience: {mentor.experience} Years
                        </p>
                      </div>
                    </div>

                    {/* BACK SIDE */}
                    <MentorBack mentor={mentor} />
                  </div>

                  {/* Consult Now Button */}
                  {/* Consult Now Button */}
                  <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 z-10">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowForm(true);
                      }}
                      className="px-4 py-1.5 border border-blue-600 text-blue-600 text-sm font-medium rounded-full bg-white hover:bg-blue-50 hover:shadow transition whitespace-nowrap">
                      Consult Now
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          </div>
        )}

        {/* Bottom CTA */}
        {/* <div className="text-center mt-12 relative z-10">
        <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition">
          Suggest me a Mentor
        </button>
      </div> */}



        {showForm && (
          <ConsultFormModal
            onClose={() => {
              setShowForm(false);
              setSubmitted(false);
              setMobile("");
            }}
            mobile={mobile}
            setMobile={setMobile}
            submitted={submitted}
            setSubmitted={setSubmitted}
          />
        )}

      </div>
    </div>
  );
};

const MentorBack = ({ mentor }) => {
  const cleanDescription = (html) => {
    if (!html) return "";
    return html
      .replace(/<style[^>]*>.*?<\/style>/gi, "")
      .replace(/ style="[^"]*"/gi, "")
      .replace(/<\/?[^>]+(>|$)/g, (tag) =>
        /<\/?(p|br|b|i|strong)>/i.test(tag) ? tag : ""
      );
  };

  return (
    <div className="absolute inset-0 bg-gradient-to-br from-[#2A72F8] via-[#3B82F6] to-[#60A5FA] text-white rounded-3xl p-6 text-center [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col justify-center items-center shadow-xl transition-all duration-500 overflow-y-auto">
      <div
        className="text-sm leading-relaxed max-w-xs mx-auto text-white [&_*]:text-white [&_*]:!font-normal [&_*]:!m-0 [&_*]:!p-0"
        dangerouslySetInnerHTML={{ __html: cleanDescription(mentor.descr) }}
      ></div>
    </div>
  );
};



const ConsultFormModal = ({ onClose, mobile, setMobile, submitted, setSubmitted }) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    if (mobile.length !== 10) {
      alert("Please enter a valid 10 digit mobile number");
      return;
    }

    setSubmitted(true);

    // Yahan API call bhi laga sakti ho baad me
    // api.post("/consult", { mobile })
  };

  return (
    <div className="fixed inset-0 z-[99999] bg-black/50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 relative animate-[fadeIn_0.3s_ease-in-out]">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
        >
          ✕
        </button>

        {!submitted ? (
          <>
            <h3 className="text-xl font-semibold text-center mb-2">
              Get Free Counselling 📞
            </h3>
            <p className="text-sm text-gray-500 text-center mb-6">
              Enter your mobile number & our expert will call you back
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="tel"
                maxLength={10}
                value={mobile}
                onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
                placeholder="Enter your mobile number"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Request Callback
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-8">
            <div className="text-4xl mb-3">✅</div>
            <h4 className="text-lg font-semibold mb-1">
              Thank you!
            </h4>
            <p className="text-sm text-gray-500">
              We’ll call you shortly on <br />
              <span className="font-semibold text-black">+91 {mobile}</span>
            </p>

            <button
              onClick={onClose}
              className="mt-5 px-5 py-2 rounded-full bg-blue-600 text-white text-sm hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};


export default MentorSlider;
