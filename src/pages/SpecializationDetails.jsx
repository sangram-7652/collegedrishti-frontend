// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import Header from "../pages/Header";
// import MobileMenu from "../pages/MobileMenu";
// import Footer from "../components/Footer";
// import MobileFooterNav from "../components/MobileFooterNav";
// import api from "../api/axios";

// const SpecializationDetails = () => {
//   const { slug } = useParams();
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     if (!slug) return;

//     api.get(`specialization/${slug}`)
//       .then((res) => setData(res.data))
//       .catch((err) => console.error(err));
//   }, [slug]);

//   if (!data) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white min-h-screen flex flex-col">

//       {/* Header */}
//       <div className="hidden md:block">
//         <Header />
//       </div>
//       <div className="block md:hidden">
//         <MobileMenu />
//       </div>

//       {/* Main */}
//       <main className="flex-grow w-full">
//         <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-8">

//           {/* Title */}
//           <div className="text-center mb-8">
//             <h1 className="course-content
//     text-2xl sm:text-4xl md:text-5xl
//     font-extrabold
//     leading-tight
//     bg-gradient-to-r
//     from-blue-600
//     via-indigo-600
//     to-purple-600
//     bg-clip-text
//     text-transparent
//   ">
//               {data.specialize_name}
//             </h1>

//             <div className="w-20 h-1 bg-blue-600 mx-auto mt-4 rounded-full"></div>
//           </div>
//           {/* Image */}
//           {/* {data.image && (
//             <div className="w-full mb-6">
//               <img
//                 src={data.image}
//                 alt={data.specialize_name}
//                 className="w-full h-auto rounded-lg shadow-sm object-cover"
//               />
//             </div>
//           )} */}

//           {/* Description */}
//           {data.disc && (
//             <div
//               className="course-content
//                 text-gray-700
//                 text-sm sm:text-base
//                 leading-relaxed
//                 space-y-4
//                 [&_h1]:text-xl
//                 [&_h2]:text-lg
//                 [&_p]:mb-4
//                 [&_img]:w-full
//                 [&_img]:rounded-lg
//               "
//               dangerouslySetInnerHTML={{
//                 __html: data.disc?.replace(
//                   /src="(?!https?:\/\/)/g,
//                   'src="https://api.collegedrishti.com/'
//                 )
//               }}


//             />
//           )}

//         </div>
//       </main>

//       {/* Footer */}
//       <Footer />
//       <MobileFooterNav />
//     </div>
//   );
// };

// export default SpecializationDetails;


import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../pages/Header";
import MobileMenu from "../pages/MobileMenu";
import Footer from "../components/Footer";
import MobileFooterNav from "../components/MobileFooterNav";
import api from "../api/axios";

const SpecializationDetails = () => {
  const { slug } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!slug) return;

    api.get(`specialization/${slug}`)
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, [slug]);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen flex flex-col">

      {/* Header */}
      <div className="hidden md:block">
        <Header />
      </div>
      <div className="block md:hidden">
        <MobileMenu />
      </div>

      {/* Main */}
      <main className="flex-grow w-full">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="course-content text-2xl sm:text-4xl md:text-5xl font-extrabold leading-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {data.specialize_name}
            </h1>

            <div className="w-20 h-1 bg-blue-600 mx-auto mt-4 rounded-full"></div>
          </div>
          {/* Image */}
          {/* {data.image && (
            <div className="w-full mb-6">
              <img
                src={data.image}
                alt={data.specialize_name}
                className="w-full h-auto rounded-lg shadow-sm object-cover"
              />
            </div>
          )} */}

          {/* Description */}
          {data.disc && (
            <div
              className="
                  course-content
                  w-full
                  max-w-full
                  overflow-hidden

                  text-gray-700
                  text-sm sm:text-base md:text-lg
                  leading-relaxed
                  space-y-4

                  [&_*]:max-w-full
                  [&_*]:break-words

                  [&_img]:w-full
                  [&_img]:h-auto
                  [&_img]:object-cover
                  [&_img]:rounded-lg

                  [&_p]:mb-4
                  [&_h1]:text-xl
                  [&_h2]:text-lg
                  [&_h3]:text-base
                "


              dangerouslySetInnerHTML={{
                __html: data.disc
                  ?.replace(/src="(?!https?:\/\/)/g, 'src="https://api.collegedrishti.com/')

                  // ❗ REMOVE INLINE WIDTHS
                  .replace(/width="[^"]*"/g, '')
                  .replace(/height="[^"]*"/g, '')
                  .replace(/style="[^"]*"/g, '')

                  // TABLE FIX
                  .replace(/<table/g, '<div class="table-wrapper"><table')
                  .replace(/<\/table>/g, '</table></div>')
              }}


            />
          )}

        </div>
      </main>

      {/* Footer */}
      <Footer />
      <MobileFooterNav />
    </div>
  );
};

export default SpecializationDetails;