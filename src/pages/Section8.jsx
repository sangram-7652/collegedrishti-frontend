// import React from 'react';
// import RegisterIcon from '../course-image/register.png';
// import CourseIcon from '../course-image/select-course.png';
// import ApplicationIcon from '../course-image/fill-application.png';
// import FeeIcon from '../course-image/pay-fee.png';
// import SetIcon from '../course-image/youre-set.png';

// const steps = [
//   { title: "Register", description: "Lorem Ipsum is simply dummy text of the printing", icon: RegisterIcon },
//   { title: "Select Course", description: "Lorem Ipsum is simply dummy text of the printing", icon: CourseIcon },
//   { title: "Fill Application", description: "Lorem Ipsum is simply dummy text of the printing", icon: ApplicationIcon },
//   { title: "Pay Fee", description: "Lorem Ipsum is simply dummy text of the printing", icon: FeeIcon },
//   { title: "You're All Set", description: "Lorem Ipsum is simply dummy text of the printing", icon: SetIcon },
// ];

// const Section8 = () => {
//   return (
//     <section className="bg-white py-12 px-4 md:px-16">
//       <h2 className="text-lg font-semibold text-gray-800 mb-10">Admission Process</h2>
//       <div className="flex flex-col md:flex-row justify-between items-center gap-10 relative">
//         {steps.map((step, index) => (
//           <div key={index} className="flex flex-col items-center text-center max-w-[140px]">
//             <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-purple-400 rounded-xl flex items-center justify-center mb-4">
//               <img src={step.icon} alt={step.title} className="w-6 h-6" />
//             </div>
//             <h3 className="font-semibold text-sm">{step.title}</h3>
//             <p className="text-xs text-gray-500 mt-1">{step.description}</p>
//           </div>
//         ))}

//         {/* Dashed Line between steps */}
//         <div className="hidden md:block absolute top-7 left-[7%] right-[7%] h-0 border-t-2 border-dashed border-blue-300 z-0" />
//       </div>
//     </section>
//   );
// };

// export default Section8;


// import React from "react";
// import registerIcon from "../course-image/register.png";
// import courseIcon from "../course-image/select-course.png";
// import applicationIcon from "../course-image/fill-application.png";
// import feeIcon from "../course-image/pay-fee.png";
// import doneIcon from "../course-image/youre-set.png";

// const steps = [
//   {
//     title: "Register",
//     desc: "Lorem Ipsum is simply dummy text of the printing",
//     icon: registerIcon,
//     bg: "from-purple-500 to-pink-500",
//   },
//   {
//     title: "Select Course",
//     desc: "Lorem Ipsum is simply dummy text of the printing",
//     icon: courseIcon,
//     bg: "from-cyan-400 to-blue-500",
//   },
//   {
//     title: "Fill Application",
//     desc: "Lorem Ipsum is simply dummy text of the printing",
//     icon: applicationIcon,
//     bg: "from-pink-400 to-purple-300",
//   },
//   {
//     title: "Pay Fee",
//     desc: "Lorem Ipsum is simply dummy text of the printing",
//     icon: feeIcon,
//     bg: "from-indigo-400 to-purple-500",
//   },
//   {
//     title: "You're All Set",
//     desc: "Lorem Ipsum is simply dummy text of the printing",
//     icon: doneIcon,
//     bg: "from-cyan-400 to-blue-400",
//   },
// ];

// const Section8 = () => {
//   return (
//     <section className="py-16 px-4 md:px-10">
//       <h2 className="text-xl font-semibold mb-10">Admission Process</h2>
//       <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative">
//         {steps.map((step, index) => (
//           <div key={index} className="flex flex-col items-center text-center max-w-[150px]">
//             <div
//               className={`bg-gradient-to-r ${step.bg} w-14 h-14 flex items-center justify-center rounded-xl mb-4`}
//             >
//               <img src={step.icon} alt={step.title} className="w-6 h-6" />
//             </div>
//             <h3 className="font-semibold">{step.title}</h3>
//             <p className="text-sm text-gray-500">{step.desc}</p>
//           </div>
//         ))}

//         {/* Dotted line connector */}
//         <div className="absolute top-7 left-7 right-7 hidden md:block">
//           <div className="border-t border-dotted border-blue-300 w-full h-0"></div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Section8;








import React from "react";
import registerIcon from "../course-image/register.png";
import courseIcon from "../course-image/select-course.png";
import applicationIcon from "../course-image/fill-application.png";
import feeIcon from "../course-image/pay-fee.png";
import doneIcon from "../course-image/youre-set.png";

const steps = [
  {
    title: "Register",
    desc: "Create your account with basic details to start the admission process.",
    icon: registerIcon,
    bg: "from-purple-500 to-pink-500",
  },
  {
    title: "Select Course",
    desc: "Choose the program that matches your career goals and interests.",
    icon: courseIcon,
    bg: "from-cyan-400 to-blue-500",
  },
  {
    title: "Fill Application",
    desc: "Complete the application form with accurate personal and academic details.",
    icon: applicationIcon,
    bg: "from-pink-400 to-purple-300",
  },
  {
    title: "You're All Set",
    desc: "Review your details and confirm your application submission.",
    icon: doneIcon,
    bg: "from-cyan-400 to-blue-400",
  },
  {
    title: "Pay Fee",
    desc: "Secure your admission by completing the fee payment online.",
    icon: feeIcon,
    bg: "from-indigo-400 to-purple-500",
  },
];

const Section8 = () => {
  return (
    <section className="py-16 px-4 md:px-10">
      <h2 className="text-xl font-semibold mb-10">Admission Process</h2>

      {/* Mobile layout */}
      <div className="grid grid-cols-3 gap-y-10 gap-x-4 md:hidden">
        {/* First row (3 items) */}
        {steps.slice(0, 3).map((step, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            <div
              className={`bg-gradient-to-r ${step.bg} w-14 h-14 flex items-center justify-center rounded-xl mb-4`}
            >
              <img src={step.icon} alt={step.title} className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-sm">{step.title}</h3>
            <p className="text-xs text-gray-500">{step.desc}</p>
          </div>
        ))}

        {/* Second row (2 items centered) */}
        <div className="col-span-1 col-start-2 flex flex-col items-center text-center">
          <div
            className={`bg-gradient-to-r ${steps[3].bg} w-14 h-14 flex items-center justify-center rounded-xl mb-4`}
          >
            <img src={steps[3].icon} alt={steps[3].title} className="w-6 h-6" />
          </div>
          <h3 className="font-semibold text-sm">{steps[3].title}</h3>
          <p className="text-xs text-gray-500">{steps[3].desc}</p>
        </div>

        <div className="col-span-1 flex flex-col items-center text-center">
          <div
            className={`bg-gradient-to-r ${steps[4].bg} w-14 h-14 flex items-center justify-center rounded-xl mb-4`}
          >
            <img src={steps[4].icon} alt={steps[4].title} className="w-6 h-6" />
          </div>
          <h3 className="font-semibold text-sm">{steps[4].title}</h3>
          <p className="text-xs text-gray-500">{steps[4].desc}</p>
        </div>
      </div>

      {/* Desktop layout */}
      <div className="hidden md:flex flex-row items-center justify-between gap-8 relative">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center text-center max-w-[150px]">
            <div
              className={`bg-gradient-to-r ${step.bg} w-14 h-14 flex items-center justify-center rounded-xl mb-4`}
            >
              <img src={step.icon} alt={step.title} className="w-6 h-6" />
            </div>
            <h3 className="font-semibold">{step.title}</h3>
            <p className="text-sm text-gray-500">{step.desc}</p>
          </div>
        ))}
        <div className="absolute top-7 left-7 right-7 hidden md:block">
          <div className="border-t border-dotted border-blue-300 w-full h-0"></div>
        </div>
      </div>
    </section>
  );
};

export default Section8;


