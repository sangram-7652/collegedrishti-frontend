import React from "react";
import { CheckCircle } from "lucide-react";
import join1 from '../uni-image/join1.png';
import join2 from '../uni-image/join2.png';
import join3 from '../uni-image/join3.png';
import mbaImage from '../course-image/mba-future.png';

const specializations = [
  "Marketing", "Finance", "HR", "Operations",
  "IT", "International Business", "Healthcare", "Entrepreneurship"
];

const AdvantagesSection = () => {
  return (
    <section className="w-full px-4 md:px-10 lg:px-20 py-10 font-sans">
      <div className="max-w-7xl mx-auto space-y-16">

        {/* Future of MBA Section */}
        <div className="grid md:grid-cols-2 gap-10 items-center">

          <div className="flex justify-center">
            <img
              src={mbaImage}
              alt="Future of MBA"
              className="w-full max-w-md"
            />
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">Learn faster. <br />
              Stay Focused.<br />
              Build your career with the right guidance.</h2>
            <p className="text-gray-600 mb-6">
              <b>•</b> Get expert counselling for Online Programs across Top Universities<br />
              <b>•</b> Compare courses, fees, approvals, and placements in one place<br />
              <b>•</b> Find career paths that match your skills and future goals<br />
              <b>•</b> Access UGC-approved online programs<br />
              <b>•</b> Save time with quick shortlisting and application support<br />
              <b>•</b> Get step-by-step admission guidance from start to finish<br />
              <b>•</b> Stay updated with latest courses, trends, and job demand<br />
              <b>•</b> Make confident decisions with unbiased recommendations<br />
            </p>
            {/* <ul className="space-y-4">
              {[...Array(4)].map((_, i) => (
                <li key={i} className="flex gap-2 text-sm md:text-base text-gray-700">
                  <CheckCircle className="text-green-500 mt-1" size={18} />
                  <span>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</span>
                </li>
              ))}
            </ul> */}
          </div>

        </div>


      </div>
    </section>
  );
};

export default AdvantagesSection;
