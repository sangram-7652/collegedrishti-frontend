import { useEffect, useState } from "react";

import user33 from "../assets/user33.webp";
import WERWER from "../assets/WERWER.webp";

export default function Section7() {
  const testimonials = [
    {
      name: "Zeeshan Ahmad",
      designation: "Software Developer",
      image: user33,
      text: "I compared multiple universities in one place and saved a lot of time.",
    },
    {
      name: "Anant Mishra",
      designation: "Software Engineer",
      image: WERWER,
      text:
        "The whole process was smooth. From shortlisting to enrollment, everything was handled properly.",
    },
    {
      name: "Ananya Sethi",
      designation: "Product Manager",
      image: "https://randomuser.me/api/portraits/women/46.jpg",
      text:
        "The counselors were very supportive and helped me choose the right online course for my career goals.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  // Auto Slide
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section className="relative py-14 bg-gradient-to-b from-white to-[#f8fbff] overflow-hidden">

      {/* Premium Blur Background */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[350px] h-[350px] bg-blue-100 rounded-full blur-3xl opacity-40"></div>

      {/* Heading */}
      <div className="relative z-10 text-center mb-8 px-4">

        <span className="inline-block px-5 py-2 rounded-full bg-blue-50 text-[#0056D2] text-sm font-semibold border border-blue-100">
          Student Testimonials
        </span>

        <h2 className="mt-5 text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
          Trusted by Thousands <br />
          of Students Across India
        </h2>

        <p className="mt-4 text-gray-500 max-w-2xl mx-auto text-sm md:text-lg leading-relaxed">
          Real experiences from students and working professionals who transformed their careers with the right guidance.
        </p>
      </div>

      {/* Slider */}
      <div className="relative z-10 max-w-7xl mx-auto overflow-hidden">

        <div className="relative h-[260px] md:h-[300px] flex items-center justify-center">

          {testimonials.map((item, index) => {
            let position =
              (index - activeIndex + testimonials.length) %
              testimonials.length;

            if (position === testimonials.length - 1) {
              position = -1;
            }

            return (
              <div
                key={index}
                className="absolute transition-all duration-700 ease-in-out px-4"
                style={{
                  transform: `
                    translateX(${position * 78}%)
                    scale(${position === 0 ? 1 : 0.84})
                  `,
                  opacity: position === 0 ? 1 : 0.45,
                  zIndex: position === 0 ? 20 : 10,
                }}
              >

                {/* Card */}
                <div
                  className="
                  relative
                  bg-white/80
                  backdrop-blur-xl
                  border border-gray-100
                  shadow-[0_20px_60px_rgba(0,0,0,0.08)]
                  rounded-[32px]
                  px-7 py-8 md:p-10
                  w-[320px]
                  sm:w-[450px]
                  md:w-[620px]
                  "
                >

                  {/* Quote Icon */}
                  <div className="absolute top-4 right-6 text-5xl text-blue-100 font-serif">
                    ”
                  </div>

                  <div className="flex items-start gap-4 md:gap-5">

                    {/* User Image */}
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-14 md:w-20 md:h-20 rounded-2xl object-cover shadow-md flex-shrink-0"
                    />

                    {/* Content */}
                    <div>
                      <h3 className="text-lg md:text-2xl font-bold text-gray-900">
                        {item.name}
                      </h3>

                      <p className="text-[#0056D2] text-sm md:text-base font-medium mt-1">
                        {item.designation}
                      </p>

                      <p className="text-gray-600 mt-4 leading-relaxed text-sm md:text-lg max-w-xl">
                        {item.text}
                      </p>
                    </div>

                  </div>
                </div>
              </div>
            );
          })}

        </div>

        {/* Dots */}
        <div className="flex justify-center gap-3 mt-6">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`transition-all duration-300 rounded-full ${
                activeIndex === index
                  ? "w-8 h-3 bg-[#0056D2]"
                  : "w-3 h-3 bg-gray-300"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}