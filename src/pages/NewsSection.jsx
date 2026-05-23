
import { useEffect, useState } from "react";
import { CalendarIcon } from "@heroicons/react/24/outline";
import api from '../api/axios';
import ShadeWaveLoader from "../components/ShadeWaveLoader";


 const IMAGE_BASE_URL = import.meta.env.VITE_API_BASE_URL; 

const NewsSection = () => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      api
      .get('/news')
      .then((res) => {
        const data = res.data;
        if (data.success && Array.isArray(data.data)) {
          setNewsData(data.data);
        }
      })
      .catch((err) => console.error("Failed to fetch news:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <ShadeWaveLoader label="Loading latest news..." cards={3} />;
  if (!newsData.length) return <p className="text-center py-10">No news available.</p>;

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h3 className="text-lg font-semibold mb-2">We have been On News</h3>
        <p className="text-sm text-gray-700 mb-10">Find us in the News</p>

        <div className="news-scroll md:grid md:grid-cols-3 md:gap-6 flex gap-4 overflow-x-auto md:overflow-visible snap-x snap-mandatory scroll-smooth hide-scrollbar">
          {newsData.map((news, index) => {
          
          const imageUrl =
           news.image?.startsWith('http')
             ? news.image
                 : `${import.meta.env.VITE_API_BASE_URL}/${news.image.replace(/^\/+/, '').replace(/^api\/*/, '')}`;
             
            return (
             <a
                    key={news.id || index}
                    href={news.link || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                   className={`flex-shrink-0 w-[85%] md:w-auto bg-white rounded-xl overflow-hidden border border-gray-200 
                      transition-all duration-300 ease-in-out text-left block
                      ${index === 1 ? "shadow-2xl scale-[1.02]" : "shadow-md"}
                      hover:-translate-y-2 hover:shadow-2xl hover:scale-[1.02]`}
                  >
                    {/* Image */}
                    <img
                      src={imageUrl}
                      alt={news.title || `News ${index + 1}`}
                      className="w-full h-[180px] object-cover transition-transform duration-300 group-hover:scale-105"                    />

                    {/* Content */}
                    <div className="p-4">
                      <h3 className="text-[15px] font-semibold text-[#1a73e8] leading-snug mb-2">
                        {news.title}
                      </h3>

                      <div className="flex items-center text-[12px] text-gray-500 mb-2">
                        <CalendarIcon className="w-4 h-4 mr-1" />
                        <span>
                          {news.created_at
                            ? new Date(news.created_at).toLocaleDateString()
                            : ""}
                        </span>
                      </div>

                      <p className="text-[13px] text-gray-500 leading-snug">
                        {news.link?.includes("outlook")
                          ? "Featured on Outlook India"
                          : "Looking for an amazing & well-functional LearnPress WordPress Theme?..."}
                      </p>
                    </div>
                  </a>
            );
          })}
        </div>
      </div>

      {/* 👇 MOBILE-ONLY STYLING */}
      <style>{`

      .news-scroll {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .news-scroll::-webkit-scrollbar {
          display: none;
        }
        @media (max-width: 767px) {
          section {
            padding-top: 1rem !important;
            padding-bottom: 2rem !important;
          }
          .news-scroll {
            overflow-x: auto !important;
            display: flex !important;
            gap: 16px !important;
            scroll-padding: 20px;
            scroll-snap-type: x mandatory;
            padding-left: 1rem;
            padding-right: 1rem;
          }
          .news-card {
            scroll-snap-align: center;
            width: 80% !important; /* 👈 Center card visible + sides partially */
            margin: 0 auto;
            border-radius: 1.25rem !important;
            box-shadow: 0 6px 18px rgba(0, 0, 0, 0.12); /* 👈 thoda zyada soft shadow */
            box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease;
          }
          .news-card:active {
            transform: scale(0.98);
          }
          .news-image {
            height: 130px !important;
            border-radius: 1rem !important;
          }
          h3 {
            font-size: 0.95rem !important;
          }
          p {
            font-size: 0.8rem !important;
          }
        }
      `}</style>
    </section>
  );
};

export default NewsSection;





// import { useEffect, useState } from 'react';
// import { CalendarIcon } from '@heroicons/react/24/outline';
// import api from '../api/axios';


// const IMAGE_BASE_URL = import.meta.env.VITE_API_BASE_URL; 


// const NewsSection = () => {
//   const [newsData, setNewsData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     api
//       .get('/news')
//       .then((res) => {
//         const data = res.data;
//         if (data.success && Array.isArray(data.data)) {
//           setNewsData(data.data);
//         } else {
//           console.warn('Unexpected API data format:', data);
//         }
//       })
//       .catch((err) => {
//         console.error('Failed to fetch news:', err);
//       })
//       .finally(() => setLoading(false));
//   }, []);

//   if (loading) {
//     return <p className="text-center py-10">Loading news...</p>;
//   }

//   if (!newsData.length) {
//     return <p className="text-center py-10">No news available.</p>;
//   }

//   return (
//     <section className="py-16 bg-white">
//       <div className="max-w-6xl mx-auto px-4 text-center">
//         <h3 className="text-lg font-semibold mb-2">We have been On News</h3>
//         <p className="text-sm text-gray-700 mb-10">Find us in the News</p>

//         <div className="md:grid md:grid-cols-3 md:gap-6 flex gap-4 overflow-x-auto md:overflow-visible snap-x snap-mandatory scroll-smooth hide-scrollbar">
//           {newsData.map((news, index) => {
          
//           const imageUrl =
//             news.image?.startsWith('http')
//               ? news.image
//                  : `${import.meta.env.VITE_API_BASE_URL}${news.image.replace(/^\/+/, '').replace(/^api\/*/, '')}`;
             




//             return (
//               <a
//                 key={news.id || index}
//                 href={news.link || '#'}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="flex-shrink-0 w-72 md:w-auto transform transition-all duration-300 hover:scale-105 hover:opacity-90 block shadow-lg rounded-xl p-6 text-left snap-start"
//               >
//                 <img
//                   src={imageUrl}
//                   alt={news.title || `News ${index + 1}`}
//                   className="mb-4 w-full h-52 object-cover rounded-lg"
//                   loading="lazy"
//                 />
//                 <h3 className="text-lg font-semibold mb-1">{news.title}</h3>
//                 <div className="flex items-center text-xs text-gray-400 mb-2">
//                   <CalendarIcon className="w-4 h-4 mr-2 text-gray-500" />
//                   <span>{news.created_at ? new Date(news.created_at).toLocaleDateString() : ''}</span>
//                 </div>
//                 <p className="text-sm text-gray-600">
//                   {news.link?.includes('outlook') ? 'Featured on Outlook India' : 'Featured in the media'}
//                 </p>
//               </a>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default NewsSection;
