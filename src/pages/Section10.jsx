import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import VideoImg from "../uni-image/video-img.png";

const Section10 = () => {
  const scrollRef1 = useRef(null);

  const videos = [
    {
      id: 1,
      image: VideoImg,
      title: "Ready made components for advanced AI tasks",
      description:
        "Easily access powerful AI tools for tasks like data extraction, scoring and more.",
    },
    {
      id: 2,
      image: VideoImg,
      title: "Ready made components for advanced AI tasks",
      description:
        "Easily access powerful AI tools for tasks like data extraction, scoring and more.",
    },
    {
      id: 3,
      image: VideoImg,
      title: "Ready made components for advanced AI tasks",
      description:
        "Easily access powerful AI tools for tasks like data extraction, scoring and more.",
    },
  ];

  // Scroll Function
  const scroll = (ref, direction) => {
    if (ref.current) {
      ref.current.scrollBy({
        left: direction === "left" ? -320 : 320,
        behavior: "smooth",
      });
    }
  };

  // Video Card
  const VideoCard = ({ video }) => (
    <div
      className="
        w-[260px]
        md:w-[280px]
        bg-white
        rounded-3xl
        shadow-md
        overflow-hidden
        flex-shrink-0
        hover:shadow-2xl
        transition-all duration-300
      "
    >
      {/* Image */}
      <div className="relative">
        <img
          src={video.image}
          alt="video"
          className="w-full h-[180px] object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/20"></div>

        {/* Play Button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            className="
              w-14 h-14
              rounded-full
              bg-gradient-to-r
              from-[#407BFF]
              to-[#8A1EFF]
              flex items-center justify-center
              shadow-xl
              hover:scale-110
              transition
            "
          >
            <svg
              className="w-5 h-5 text-white ml-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-[#640D99] font-semibold text-base leading-snug">
          {video.title}
        </h3>

        <p className="text-gray-500 text-sm mt-3 leading-relaxed">
          {video.description}
        </p>
      </div>
    </div>
  );

  // Side Content
  const SideContent = ({ reverse = false }) => (
    <div
      className={`
        hidden lg:flex
        items-center
        gap-6
        min-w-[250px]
        flex-shrink-0
        ${reverse ? "flex-row-reverse" : ""}
      `}
    >
      <div className="h-[180px] border-l-4 border-white"></div>

      <div className="text-white font-bold text-3xl leading-[3.2rem]">
        <p>Videos By</p>
        <p>This</p>
        <p>University</p>
        <p className="text-blue-400">× College</p>
        <p>Drishti</p>
      </div>
    </div>
  );

  return (
  <section className="bg-[#0E132A] py-14 md:py-20 overflow-hidden">
    <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-10">

      <div className="flex flex-col lg:flex-row items-center gap-10">

        {/* LEFT CONTENT */}
        <div className="hidden lg:flex items-center gap-6 min-w-[260px]">
          <div className="h-[180px] border-l-4 border-white"></div>

          <div className="text-white font-bold text-3xl leading-[3.2rem]">
            <p>Videos By</p>
            <p>This</p>
            <p>University</p>
            <p className="text-blue-400">× College</p>
            <p>Drishti</p>
          </div>
        </div>

        {/* SLIDER */}
        <div className="relative flex-1 w-full min-w-0">

          {/* LEFT ARROW */}
          <button
            onClick={() => scroll(scrollRef1, "left")}
            className="
              hidden md:flex
              absolute left-0 top-1/2 -translate-y-1/2 z-10
              bg-white/10 backdrop-blur-md
              p-3 rounded-full
              border border-white/10
            "
          >
            <FaChevronLeft className="text-white" size={14} />
          </button>

          {/* CARDS */}
          <div
            ref={scrollRef1}
            className="
              flex
              gap-5
              overflow-x-auto
              no-scrollbar
              scroll-smooth
              px-2 md:px-12
              pb-4
            "
          >
            {videos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>

          {/* RIGHT ARROW */}
          <button
            onClick={() => scroll(scrollRef1, "right")}
            className="
              hidden md:flex
              absolute right-0 top-1/2 -translate-y-1/2 z-10
              bg-white/10 backdrop-blur-md
              p-3 rounded-full
              border border-white/10
            "
          >
            <FaChevronRight className="text-white" size={14} />
          </button>

          {/* MOBILE TITLE */}
          <div className="lg:hidden text-center text-white mt-8">
            <h2 className="text-2xl font-bold leading-relaxed">
              Videos By This University
            </h2>

            <p className="text-blue-400 text-xl font-bold mt-2">
              × College Drishti
            </p>
          </div>

          {/* MOBILE BUTTONS */}
          <div className="flex md:hidden justify-center gap-4 mt-5">
            <button
              onClick={() => scroll(scrollRef1, "left")}
              className="bg-white/10 p-3 rounded-full"
            >
              <FaChevronLeft className="text-white" />
            </button>

            <button
              onClick={() => scroll(scrollRef1, "right")}
              className="bg-white/10 p-3 rounded-full"
            >
              <FaChevronRight className="text-white" />
            </button>
          </div>

        </div>
      </div>
    </div>
  </section>

  );
};

export default Section10;