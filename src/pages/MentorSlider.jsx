

// import { useEffect, useState } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination, Autoplay } from "swiper/modules";
// import { Link } from "react-router-dom";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import { Star, StarOff, StarIcon } from "lucide-react"; // agar ye available ho
// // import { Star } from "lucide-react";
// import api from "../api/axios";

// const MentorSlider = () => {
//   const [expertData, setExpertData] = useState([]);
//   const [flippedIndex, setFlippedIndex] = useState(null); // 👈 track flipped card


//   useEffect(() => {
//     api
//       .get("/experts")
//       .then((response) => {
//         if (response.data.success) {
//           setExpertData(response.data.data);
//         }
//       })
//       .catch((error) => {
//         console.error("Failed to fetch mentors:", error);
//       });
//   }, []);

//   // Repeat data to make slider loop smooth
//   const repeatedData = [...expertData, ...expertData];

//   return (
//     <div className="relative py-12 px-4 max-w-7xl mx-auto bg-white md:bg-transparent">
//       {/* ✅ Grey Background for mobile only */}
//       <div className="absolute inset-0 bg-gray-100 md:hidden"></div>

//       {/* ✅ Oval side backgrounds for slider (mobile only) */}
//       <div className="absolute left-0 top-1/2 -translate-y-1/2 w-16 h-32 bg-gray-200 rounded-full blur-xl opacity-70 md:hidden"></div>
//       <div className="absolute right-0 top-1/2 -translate-y-1/2 w-16 h-32 bg-gray-200 rounded-full blur-xl opacity-70 md:hidden"></div>

//       {/* Heading */}
//       <h2 className="relative text-2xl md:text-3xl font-semibold text-center mb-2 z-10">
//         Pick your Mentor
//       </h2>
//       <p className="relative text-center text-gray-500 mb-6 max-w-xl mx-auto z-10">
//         College Drishti has a team of expert counsellors ready to guide you
//         through their experience of guiding 100s of students
//       </p>

//       {/* ✅ Swiper Slider (Fixed + Auto Slide + Loop) */}
//       <div className="relative z-10">
//         <Swiper
//           modules={[Navigation, Autoplay]}
//             navigation={false}
//           // pagination={{ clickable: true }}
//           autoplay={{ delay: 3000, disableOnInteraction: false }}
//           loop={true}
//           grabCursor={true}
//           spaceBetween={20}
//           slidesPerView={1.2}
//           breakpoints={{
//             640: { slidesPerView: 1.5 },
//             768: { slidesPerView: 2 },
//             1024: { slidesPerView: 4 },
//           }}
//           className="!overflow-visible"
//         >
//           {repeatedData.map((mentor, index) => (
//            <SwiperSlide key={`${mentor.id}-${index}`} className="!overflow-visible">
//   {/* ✅ Flip Card (Hover + Tap Flip Support) */}
//   <div
//     className="group relative w-full max-w-xs md:max-w-sm mx-auto [perspective:1000px]"
//     onClick={() => setFlippedIndex(flippedIndex === index ? null : index)} // 👈 handle tap on mobile
//   >
//     <div
//       className={`relative h-[380px] w-full rounded-2xl transition-transform duration-700 [transform-style:preserve-3d] 
//         ${flippedIndex === index ? "[transform:rotateY(180deg)]" : ""}
//         group-hover:[transform:rotateY(180deg)]`} // 👈 hover works for desktop
//     >
//       {/* FRONT SIDE */}
//       <div className="absolute inset-0 [backface-visibility:hidden] rounded-2xl shadow-lg bg-white">
//         <div className="relative">
//           <img
//             src={`https://api.collegedrishti.com/${mentor.image}`}
//             alt={mentor.name}
//             className="w-full h-96 md:h-80 object-cover rounded-2xl"
//           />
//           <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-2xl"></div>

//           {/* Rating */}
//           <div className="absolute -top-2 right-0 bg-white px-3 py-1 rounded-full flex items-center shadow border border-black">
//             <Star fill="#FFD700" stroke="#FFD700" className="w-4 h-4 mr-1" />
//             <span className="text-sm font-medium text-black">{mentor.rating}</span>
//           </div>

//           {mentor.counselling && (
//             <div className="absolute bottom-28 -left-2 bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
//               {mentor.counselling}+ Consulting
//             </div>
//           )}

//           <div className="absolute bottom-10 left-4 text-white">
//             <h3 className="text-lg font-bold">{mentor.name}</h3>
//             <p className="text-gray-200 text-sm">{mentor.post}</p>
//             <p className="text-gray-200 text-sm">
//               Experience: {mentor.experience} Years
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* BACK SIDE */}
//       <MentorBack mentor={mentor} />
//     </div>

//     {/* ✅ Button below card */}
//     <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
//       <Link to="/suggesteduniversity">
//         <button className="px-6 py-2 border border-blue-600 text-blue-600 font-medium rounded-full bg-white hover:bg-blue-50 transition duration-200">
//           Consult Now
//         </button>
//       </Link>
//     </div>
//   </div>
// </SwiperSlide>

//           ))}
//         </Swiper>
//       </div>

//       {/* Bottom CTA */}
//       <div className="text-center mt-12 relative z-10">
//         <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition">
//           Suggest me a Mentor
//         </button>
//       </div>
//     </div>
//   );
// };

// /* ✅ Mentor Back Side Component (White + Blue + Clean Description) */
// const MentorBack = ({ mentor }) => {
//   const [expanded, setExpanded] = useState(false);

//   // Clean HTML description to remove inline styles & unwanted tags
//   const cleanDescription = (html) => {
//     if (!html) return "";
//     return html
//       .replace(/<style[^>]*>.*?<\/style>/gi, "") // remove style tags
//       .replace(/ style="[^"]*"/gi, "") // remove inline styles
//       .replace(/<\/?[^>]+(>|$)/g, (tag) => {
//         // allow only <p>, <br>, <b>, <i>, <strong>
//         return /<\/?(p|br|b|i|strong)>/i.test(tag) ? tag : "";
//       });
//   };

//   const rawDescription = cleanDescription(mentor.descr || "");
//   const shortDescription =
//     rawDescription.length > 120
//       ? rawDescription.slice(0, 120) + "..."
//       : rawDescription;

//   const showDescription = expanded ? rawDescription : shortDescription;

//   return (
// <div className="absolute inset-0 bg-gradient-to-r from-[#2A72F8] via-[#3B82F6] to-[#60A5FA] text-white rounded-2xl p-6 text-center [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col justify-center items-center shadow-lg transition-all duration-500 overflow-y-auto">
//   {/* <h3 className="text-2xl text-white font-semibold mb-1">{mentor.name}</h3> */}

//   {/* ✅ Full description without limit */}
//   <div
//     className="text-sm leading-relaxed max-w-xs mx-auto text-white [&_*]:text-white [&_*]:!font-normal [&_*]:!m-0 [&_*]:!p-0"
//     dangerouslySetInnerHTML={{ __html: mentor.descr }}
//   ></div>

//   <div className="w-16 h-[1px] bg-blue-300 my-4"></div>
// </div>

//   );
// };

// export default MentorSlider;



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
                        src={`https://api.collegedrishti.com/${mentor.image}`}
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
