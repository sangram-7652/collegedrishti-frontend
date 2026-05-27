import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppChat = () => {
  return (
    <div
      className="fixed z-[9999] 
                right-5 sm:right-4
                bottom-[184px] sm:bottom-[154px]"
    >
      <a
        href="https://wa.me/919958823205"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 hover:bg-green-600 
               w-10 h-10 sm:w-11 sm:h-11
               rounded-full 
               flex items-center justify-center 
               text-white text-lg 
               shadow-lg 
               transition-all duration-300"
      >
        <FaWhatsapp />
      </a>
    </div>
  );
};

export default WhatsAppChat;

