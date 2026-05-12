


import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import mbaImage from '../course-image/mba-future.png';
import { Link } from "react-router-dom";


const Section6 = ({ course, specializations = [] }) => {
  if (!course) return null;

  const courseName = course?.sub_name || "Course";

  return (
    <section className="bg-white px-4 md:px-12 py-14">
      <div className="max-w-7xl mx-auto">
        {/* Future of Course */}
        {/* ✅ Future of Dynamic Course */}
        <div>
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">
              Future of {courseName}
            </h2>

            {course?.future_scope ? (
              <div
                className="course-content text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: course.future_scope
                }}
              />
            ) : (
              <p className="text-gray-500">
                Future information not available.
              </p>
            )}
          </div>








        {/* Specializations */}
        <div className="mt-14">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-[#0F172A] mb-2">
            {courseName} Specializations
          </h2>

          <p className="text-gray-600 mb-8 max-w-3xl">
            Completion of 10+2 (or equivalent) from a recognized board.
          </p>

          {specializations.length === 0 ? (
            <p className="text-red-500">No specializations found for this course.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 md:gap-6">

      

             {specializations.map((sp) => {
                if (!sp.slug) {
                  console.error("Slug missing for:", sp);
                }

                return (
                  <Link
                    key={sp.specialize_id}
                    to={`/specialization/${sp.slug}`}
                  className="bg-white border border-gray-200 shadow px-4 py-2.5 text-center rounded-lg text-sm text-blue-600 cursor-pointer hover:shadow-lg transition-all">
                    {sp.specialize_name}
                  </Link>
                );
              })}


           


            </div>
          )}
{/* 
          {specializations.length > 0 && (
            <div className="text-center mt-6">
              <button className="bg-blue-600 text-white px-6 py-2 rounded-full text-sm shadow-md hover:shadow-lg hover:bg-blue-700 transition">
                View All
              </button>
            </div>
          )} */}
        </div>
      </div>
    </section>
  );
};

export default Section6;

