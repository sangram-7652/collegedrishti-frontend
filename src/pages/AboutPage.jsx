import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            About College Drishti
          </h1>

          <p className="max-w-3xl mx-auto text-lg text-blue-100">
            Helping Students Choose the Right Path for a Better Tomorrow
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="bg-white rounded-2xl shadow-md p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              Welcome to College Drishti
            </h2>

            <p className="text-gray-700 leading-8 mb-5">
              At College Drishti, we believe that every student deserves the
              right guidance to build a successful future. Our platform is
              dedicated to helping students, working professionals, and
              career-focused individuals discover the best Online, Distance,
              and Regular Education programs from UGC-approved universities
              across India.
            </p>

            <p className="text-gray-700 leading-8 mb-5">
              Choosing the right university and course can be challenging in
              today’s evolving educational landscape. College Drishti simplifies
              this process by providing expert counselling, detailed university
              information, admission assistance, and personalized career
              guidance.
            </p>

            <p className="text-gray-700 leading-8">
              Our goal is to bridge the gap between students and quality
              education by delivering accurate, transparent, and up-to-date
              information that empowers learners to make informed academic and
              career decisions.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="pb-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid md:grid-cols-2 gap-8">

            <div className="bg-white rounded-2xl shadow-md p-8">
              <h2 className="text-3xl font-bold text-blue-700 mb-5">
                Our Mission
              </h2>

              <p className="text-gray-700 leading-8 mb-4">
                Our mission is to make quality higher education accessible to
                everyone through reliable guidance, honest counselling, and
                comprehensive information about online and distance learning
                programs.
              </p>

              <ul className="space-y-3 text-gray-700">
                <li>✓ Choose the right course based on career goals.</li>
                <li>✓ Compare universities effectively.</li>
                <li>✓ Understand fees, approvals and eligibility.</li>
                <li>✓ Get admission support from experts.</li>
                <li>✓ Build a successful career through informed decisions.</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-8">
              <h2 className="text-3xl font-bold text-blue-700 mb-5">
                Our Vision
              </h2>

              <p className="text-gray-700 leading-8">
                To become India’s most trusted education guidance platform by
                empowering students with accurate information, expert
                counselling, and career-focused educational solutions.
              </p>

              <p className="text-gray-700 leading-8 mt-4">
                We envision a future where every student can confidently choose
                the right educational path regardless of location, background,
                or professional commitments.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-4xl font-bold text-center mb-12">
            What We Do
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            <div className="p-6 rounded-xl border hover:shadow-lg transition">
              <h3 className="text-xl font-bold mb-3">
                University Guidance
              </h3>
              <p className="text-gray-600">
                Explore and compare top online and distance universities based
                on accreditation, fees, placements, and career opportunities.
              </p>
            </div>

            <div className="p-6 rounded-xl border hover:shadow-lg transition">
              <h3 className="text-xl font-bold mb-3">
                Career Counselling
              </h3>
              <p className="text-gray-600">
                Personalized guidance to help students choose programs aligned
                with their interests and long-term career goals.
              </p>
            </div>

            <div className="p-6 rounded-xl border hover:shadow-lg transition">
              <h3 className="text-xl font-bold mb-3">
                Admission Assistance
              </h3>
              <p className="text-gray-600">
                Complete support from application submission to enrollment and
                document verification.
              </p>
            </div>

            <div className="p-6 rounded-xl border hover:shadow-lg transition">
              <h3 className="text-xl font-bold mb-3">
                Course Comparison
              </h3>
              <p className="text-gray-600">
                Compare courses, universities, fees, specializations, and
                career opportunities in one place.
              </p>
            </div>

            <div className="p-6 rounded-xl border hover:shadow-lg transition">
              <h3 className="text-xl font-bold mb-3">
                Educational Resources
              </h3>
              <p className="text-gray-600">
                Stay updated with blogs, guides, university news, and industry
                insights.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-4xl font-bold text-center mb-12">
            Why Choose College Drishti?
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="font-bold text-xl mb-3">
                Trusted Guidance
              </h3>
              <p className="text-gray-600">
                Transparent and unbiased counselling focused on student success.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="font-bold text-xl mb-3">
                Expert Counsellors
              </h3>
              <p className="text-gray-600">
                Experienced education advisors helping students make informed decisions.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="font-bold text-xl mb-3">
                Verified Information
              </h3>
              <p className="text-gray-600">
                Accurate information on UGC-approved universities, courses, and admissions.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="font-bold text-xl mb-3">
                Student-Centric Approach
              </h3>
              <p className="text-gray-600">
                Personalized recommendations tailored to individual goals.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="font-bold text-xl mb-3">
                End-to-End Support
              </h3>
              <p className="text-gray-600">
                Guidance from course selection to successful admission.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Impact */}
      <section className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-4xl font-bold text-center mb-12">
            Our Impact
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">

            <div>
              <h3 className="text-4xl font-bold">1000+</h3>
              <p>Students Guided</p>
            </div>

            <div>
              <h3 className="text-4xl font-bold">100+</h3>
              <p>UGC Approved Universities</p>
            </div>

            <div>
              <h3 className="text-4xl font-bold">500+</h3>
              <p>Programs Available</p>
            </div>

            <div>
              <h3 className="text-4xl font-bold">24/7</h3>
              <p>Admission Support</p>
            </div>

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h2 className="text-4xl font-bold mb-6">
            Your Future Starts with the Right Guidance
          </h2>

          <p className="text-gray-600 text-lg mb-8">
            Whether you're a student, working professional, or career changer,
            College Drishti is here to help you make the right educational
            decision.
          </p>

          <Link
            to="/contact-us"
            className="inline-block bg-blue-700 hover:bg-blue-800 text-white px-8 py-3 rounded-lg font-semibold"
          >
            Contact Us
          </Link>
        </div>
      </section>

    </div>
  );
};

export default About;