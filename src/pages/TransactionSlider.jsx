import React from 'react';
// import paytmLogo from '../assets/paytm.png';
// import faceLogo from '../assets/face.png';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';


// import user33 from '../assets/user33.webp';
// import WERWER from '../assets/WERWER.webp';
// import face3 from '../assets/face 3.png';
// import face4 from '../assets/face 4.png';
// import face5 from '../assets/face 5.png';

// Company logo
import sd from "../assets/sd.jpeg";
import crm from "../assets/crm.jpeg";
import hdb_logo from "../assets/hdb_logo.webp";
import sd_logo from "../assets/sd_logo.jpeg";


const TransactionSlider = () => {
    const users = [
        { face: sd, logo: sd_logo },
        { face: crm, logo: hdb_logo },
        // { face: face3, logo: paytmLogo },
        // { face: face4, logo: paytmLogo },
        // { face: face5, logo: paytmLogo },
    ];
    



    return (
        <section className="bg-gray-900 py-10 text-white text-center px-4">
            <h2 className="text-2xl md:text-3xl font-semibold mb-2">
                1 Lakh+ Career Transformations
            </h2>
            <p className="text-sm md:text-base mb-8">
                People can secure jobs at leading brands and truly transform anywhere.
            </p>

            <div className="space-y-8">
                {/* Top Row Slider */}
                <Swiper
                    modules={[Autoplay]}
                    spaceBetween={15}  // reduced gap
                    loop={true}
                    speed={4000}
                    autoplay={{
                        delay: 0,
                        disableOnInteraction: false,
                    }}
                    breakpoints={{
                        320: { slidesPerView: 3 },
                        480: { slidesPerView: 4 },
                        640: { slidesPerView: 5 },
                        768: { slidesPerView: 7 },
                        1024: { slidesPerView: 10 },
                    }}
                >
                    {[...Array(20)].map((_, index) => {
                        const user = users[index % users.length]; // repeat users
                        return (
                            <SwiperSlide key={`row1-${index}`}>
                                <div className="relative flex flex-col items-center">
                                    <img
                                        src={user.face}
                                        alt={`User ${index + 1}`}
                                        className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-blue-500 object-cover"
                                    />
                                     <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 w-18 h-6 rounded-md shadow-md flex items-center justify-center">
                                        <img
                                            src={user.logo}
                                            alt="Company Logo"
                                            className="w-full h-auto object-contain"
                                        />
                                    </div>
                                </div>
                            </SwiperSlide>
                        );
                    })}

                </Swiper>

                {/* Bottom Row Slider */}
                <Swiper
                    modules={[Autoplay]}
                    spaceBetween={15}  // reduced gap
                    loop={true}
                    speed={4000}
                    autoplay={{
                        delay: 0,
                        disableOnInteraction: false,
                        // reverseDirection: true,
                    }}
                    breakpoints={{
                        320: { slidesPerView: 3 },
                        480: { slidesPerView: 4 },
                        640: { slidesPerView: 5 },
                        768: { slidesPerView: 7 },
                        1024: { slidesPerView: 10 },
                    }}
                >
                    {[...Array(20)].map((_, index) => {
                        const user = users[index % users.length];
                        return (
                            <SwiperSlide key={`row2-${index}`}>
                                <div className="relative flex flex-col items-center">
                                    <img
                                        src={user.face}
                                        alt={`User ${index + 1}`}
                                        className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-blue-500 object-cover"
                                    />
                                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 w-18 h-6 rounded-md shadow-md flex items-center justify-center">
                                        <img
                                            src={user.logo}
                                            alt="Company Logo"
                                            className="w-full h-auto object-contain"
                                        />
                                    </div>
                                </div>
                            </SwiperSlide>
                        );
                    })}

                </Swiper>
            </div>
        </section>
    );
};

export default TransactionSlider;
