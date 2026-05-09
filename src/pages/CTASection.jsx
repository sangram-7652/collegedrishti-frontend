import React from 'react';
import bgImage from '../assets/cta-bg.png'; // Make sure this path is correct

const CTASection = () => {
  return (


<div className="w-full flex justify-center px-4 sm:px-6 md:px-0">
  <section
    className="
      w-full md:w-[1200px]
      rounded-2xl overflow-hidden
      py-7 sm:py-10 md:py-14
      px-6 sm:px-10 
      mt-10 md:mt-16
      text-center
    "
    style={{
      backgroundImage: `url(${bgImage})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
    }}
  >
    <div className="max-w-xl mx-auto">
      <h2 className="text-base sm:text-3xl md:text-4xl text-[#1a1a1a] font-semibold mb-2 sm:mb-3">
        Ready to upgrade your career?
      </h2>

    <p
  className="
    text-[8px] sm:text-sm md:text-base
    text-[#1a1a1a]
    leading-tight
    mb-3 sm:mb-4
    line-clamp-2
    overflow-hidden
  "
  style={{
    display: '-webkit-box',
    WebkitLineClamp: '2',
    WebkitBoxOrient: 'vertical',
  }}
>
  Master new skills, advance your career, and achieve your goals through
  our expertly crafted online learning experiences.
</p>



      <button className="
        bg-blue-600 hover:bg-blue-700 transition
        px-5 py-2 
        sm:px-6 sm:py-2 
        rounded-full 
        text-white 
        text-xs sm:text-sm md:text-base
      ">
        Connect to Alumni →
      </button>
    </div>
  </section>
</div>



  );
};

export default CTASection;

