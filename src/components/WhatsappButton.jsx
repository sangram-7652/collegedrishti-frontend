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

// import { useState } from "react";
// import { FaWhatsapp } from "react-icons/fa";

// const WhatsAppChat = () => {
//     const [showText, setShowText] = useState(false);

//     return (
//         <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2">

//             {/* Tooltip */}
//             <div
//                 className={`bg-white px-3 py-2 rounded-lg shadow-md text-sm transition-all duration-300 ${showText ? "opacity-100 translate-x-0" : "opacity-0 translate-x-5"
//                     }`}
//             >
//                 Chat with us 👋
//             </div>

//             {/* Button */}
//             <a
//                 href="https://wa.me/919717675232?text=Hello%20I%20want%20details"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 onMouseEnter={() => setShowText(true)}
//                 onMouseLeave={() => setShowText(false)}
//                 className="bg-green-500 hover:bg-green-600 w-14 h-14 rounded-full flex items-center justify-center text-white text-2xl shadow-xl transition-all duration-300 animate-bounce"
//             >
//                 <FaWhatsapp />
//             </a>
//         </div>
//     );
// };

// export default WhatsAppChat;
