import React from "react";
import ugc from "../course-image/ugc.png";
import aicte from "../course-image/aicte.png";
import aiu from "../course-image/aiu.png";
import rankIcon from "../course-image/rank.png";
import nirf from "../course-image/nirf.png";
import wes from "../course-image/wes.png";
import naac from "../course-image/naac.png";
import qs from "../course-image/qs.png";


const ApprovalsTop = ({ data }) => {
  const university = data?.university || {};
  const logosTop = [
    { src: ugc, alt: "UGC", label: "UGC" },
    { src: aicte, alt: "AICTE", label: "AICTE" },
    { src: aiu, alt: "AIU", label: "AIU" },
  ];

  const logosBottom = [
    { src: nirf, alt: "NIRF", label: "NIRF" },
    { src: wes, alt: "WES", label: "WES" },
    { src: naac, alt: "NAAC A++", label: "NAAC A++" },
    { src: qs, alt: "QS", label: "QS" },
  ];

  // Mobile ke liye exact 5 logos screenshot jaisa
  const mobileLogosTop = [
    { src: aicte, alt: "AICTE" },
    { src: ugc, alt: "UGC" },
  ];
  const mobileLogosBottom = [
    { src: wes, alt: "WES" },
    { src: naac, alt: "NAAC" },
    { src: qs, alt: "QS" },
  ];



  return (
    <div className="bg-white py-10 px-4 md:px-16">
      <div className="max-w-7xl mx-auto">


        {/* === Mobile Layout (FIXED spacing & alignment – matches Figma) === */}
        <div className="block md:hidden">
          <div className="bg-white">

            {/* ROW 1 */}
            <div className="flex justify-between items-start gap-3">

              {/* LEFT TEXT */}
              <div className="w-[48%]">
                <h3 className="text-[14px] font-semibold leading-[1.3]">
                  This University <br /> is approved by
                </h3>

                <div className="mt-2 flex items-start gap-2">
                  <img src={rankIcon} className="w-4 h-4 mt-[2px]" />
                  <p className="text-[11px] leading-[1.3]">
                    Rank <b>{university?.nirf_ranking}</b> in the University Category
                  </p>
                </div>
              </div>

              {/* RIGHT LOGOS */}
              <div className="w-[52%] grid grid-cols-2 gap-3 justify-items-center">
                {[aicte, ugc].map((src, i) => (
                  <div
                    key={i}
                    className="w-[90px] h-[90px] rounded-[16px] border border-black flex flex-col items-center justify-center"
                  >
                    <img src={src} className="w-10 h-10 object-contain" />
                    <p className="text-[10px] mt-1 font-medium">AICTE</p>
                  </div>
                ))}
              </div>

            </div>

            {/* ROW 2 */}
            <div className="mt-6 grid grid-cols-3 gap-4 justify-items-center">
              {[wes, naac, qs].map((src, i) => (
                <div
                  key={i}
                  className="w-[90px] h-[90px] rounded-[16px] border border-black flex flex-col items-center justify-center"
                >
                  <img src={src} className="w-10 h-10 object-contain" />
                  <p className="text-[10px] mt-1 font-medium">AICTE</p>
                </div>
              ))}
            </div>

          </div>
        </div>





        {/* === Desktop Layout (unchanged) === */}
        <div className="hidden md:flex flex-col">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* Left Text Section */}
            <div className="md:w-1/4 w-full text-center md:text-left">
              <h3 className="text-xl font-semibold text-black leading-snug">
                This University <br /> is approved <br /> by{" "}
                <span className="inline-block w-12 h-0.5 bg-black align-middle ml-1"></span>
              </h3>
              <div className="mt-4 flex justify-center md:justify-start items-start gap-2">
                <img src={rankIcon} alt="Rank" className="w-5 h-5 mt-1" />
                {/* <p className="text-xs text-black text-left">
                  Rank 65 in the <br /> University Category
                </p> */}

                {university?.nirf_ranking && (
                  <p className="text-sm font-medium text-gray-800 text-left">
                    Rank{" "}
                    <span className="text-indigo-600 font-bold text-lg">
                      {university.nirf_ranking}
                    </span>{" "}
                    in the <br /> University Category
                  </p>
                )}

              </div>
            </div>

            {/* Top Logos Section */}
            <div className="md:w-3/4 w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4 justify-items-center">
              {logosTop.map((logo, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center border border-black rounded-xl p-4 w-[120px] h-[120px]"
                >
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="w-12 h-12 object-contain mb-2"
                  />
                  <p className="text-sm font-medium text-center">{logo.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Logos Section */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 justify-items-center mt-10">
            {logosBottom.map((logo, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center border border-black rounded-xl p-4 w-[120px] h-[120px]"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="w-12 h-12 object-contain mb-2"
                />
                <p className="text-sm font-medium text-center">{logo.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApprovalsTop;
