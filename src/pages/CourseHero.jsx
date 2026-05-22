import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import { useState } from "react";
import { PlusIcon, CheckIcon } from "@heroicons/react/24/solid";
import user33 from '../assets/user33.webp';
import WERWER from '../assets/WERWER.webp';




export default function CourseHero({ course }) {
  const navigate = useNavigate();
  const [isFollowing, setIsFollowing] = useState(false);

  if (!course) return null;

  console.log("Course Data in Hero:", course);

  const handleDownloadBrochure = () => {
    const doc = new jsPDF();

    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(0, 51, 153);
    doc.text(course.sub_name || "Course", 20, 20);

    doc.setFontSize(12);
    doc.setTextColor(50, 50, 50);
    doc.text(
      doc.splitTextToSize(
        course.short_desc || "Course description not available",
        170
      ),
      20,
      40
    );

    doc.setFontSize(12);
    doc.setTextColor(0, 102, 0);
    doc.text(
      course.cashback_text || "Get Cashback by enrolling now!",
      20,
      70
    );

    doc.setTextColor(204, 0, 0);
    doc.text(
      `Hurry! Only ${course.seats_left ?? "limited"} seats left!`,
      20,
      80
    );

    doc.save(`${course.sub_name || "course"}_brochure.pdf`);
  };

  return (
    <section className="bg-white p-6 md:p-10 flex flex-col md:flex-row items-center md:items-start gap-10">
      {/* Left */}
      <div className="w-full md:w-1/2 space-y-4">
        <p className="text-sm text-orange-500 font-semibold">
          {course.study_mode || "Popular Course"}
        </p>

        <div className="flex justify-between items-center gap-4">
          <h1 className="text-2xl md:text-3xl font-bold leading-snug">
            {course.sub_name}
          </h1>

          <button
            onClick={() => setIsFollowing(!isFollowing)}
            className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all
              ${isFollowing
                ? "bg-[#0B5ED7] text-white"
                : "bg-white text-[#0B5ED7] border border-[#0B5ED7] hover:bg-[#0B5ED7] hover:text-white"
              }`}
          >
            {isFollowing ? <CheckIcon className="w-4 h-4" /> : <PlusIcon className="w-4 h-4" />}
            {isFollowing ? "Following" : "Follow"}
          </button>
        </div>

        {/* 🔥 Dynamic short_desc */}
        <div
          className="course-content text-gray-600 text-sm leading-relaxed"
          dangerouslySetInnerHTML={{
            __html: course.short_desc || "<p>No description available</p>",
          }}
        />
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-1">
            <FaStar className="text-yellow-500" />
            <span className="font-semibold text-sm">
              {course.avg_hike || "4.5"}
            </span>
          </div>

          <span className="text-gray-500 text-sm">
            • {course.enrolled || "2,500+"} enrolled
          </span>

          <div className="flex -space-x-2">
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

        {/* Cashback + seats */}
        <p className="text-xs text-[#004aad] font-medium">
          💸 {course.cashback_text || "Cashback available"}
        </p>
        <p className="text-xs text-red-500 font-semibold">
          Hurry Now! Only <b>{course.seats_left ?? "few"}</b> seats left
        </p>

        <div className="flex flex-col sm:flex-row gap-4 pt-2">
          <button
            onClick={() => navigate("/ContactUs")}
            className="bg-[#004aad] text-white px-6 py-2 rounded-lg font-medium shadow"
          >
            Enroll
          </button>

          <button
            onClick={handleDownloadBrochure}
            className="border border-[#004aad] text-[#004aad] px-6 py-2 rounded-lg font-medium hover:bg-[#004aad] hover:text-white transition"
          >
            Download brochure
          </button>
        </div>
      </div>

      {/* Right: Image */}
   {/* Right: Image */}
<div className="w-full md:w-1/2 relative h-[350px] md:h-[450px]">
  <img
    src={
      course.banner_image

        ? `${import.meta.env.VITE_API_BASE_URL}/${course.banner_image}`
        : "/no-image.webp"
    }
    alt={course.sub_name || "Course"}
    className="w-full h-full rounded-r-3xl "
    onError={(e) => {
      console.log("IMAGE FAILED:", e.target.src);
    }}
  />

  <div className="absolute top-3 right-3 bg-blue-600 text-white px-4 py-1 text-xs font-medium rounded-full shadow">
    {course.emi_available ? "EMI Available" : "Featured"}
  </div>
</div>
    </section>
  );
}






