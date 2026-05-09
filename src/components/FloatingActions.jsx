import React from "react";
import { FaPhoneAlt } from "react-icons/fa";

const FloatingCallActions = () => {
  return (
    <div className="fixed z-[9999] right-5 sm:right-4 bottom-[248px] sm:bottom-[218px]">
      <a
        href="tel:+919958823205"
        aria-label="Call us"
        className="
          flex h-10 w-10 items-center justify-center rounded-full
          bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500
          text-white shadow-md transition-all duration-300 hover:scale-105
          sm:h-11 sm:w-11
        "
      >
        <FaPhoneAlt className="text-sm" />
      </a>
    </div>
  );
};

export default FloatingCallActions;
