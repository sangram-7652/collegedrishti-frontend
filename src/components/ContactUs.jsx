import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import {
  AcademicCapIcon,
  ShieldCheckIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";
import MobileFooterNav from "./MobileFooterNav";
import Footer from "./Footer";
import Header from "../pages/Header";
import MobileMenu from "../pages/MobileMenu";
import touch from "../assets/touch.webp";

export default function ContactHero() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("FORM CLICKED"); // debug

    if (!formData.name || !formData.email || !formData.phone) {
      alert("Please fill all required fields");
      return;
    }

    console.log("Form Submitted:", formData);

    alert("Form submitted successfully ✅");

    navigate("/thank-you");
  };
  return (
    <>
      {/* ✅ Desktop Header */}
      <div className="hidden md:block">
        <Header />
      </div>

      {/* ✅ Mobile Header */}
      <div className="block md:hidden">
        <MobileMenu />
      </div>

      {/* Banner Section FIXED */}
      {/* Banner Section */}
      <div className="w-full">
        {/* ✅ Desktop Banner */}
        <img
          src={touch}
          alt="Contact Banner"
          className="
      hidden md:block
      w-full
      h-[380px]
      lg:h-[420px]
      object-cover
      object-center
    "
        />

        {/* ✅ Mobile Banner */}
        <img
          src={touch}
          alt="Contact Banner"
          className="
      block md:hidden
      w-full
      h-auto
      object-contain
    "
        />
      </div>
      {/* <div className="w-full mt-2">
        <div className="w-full h-[300px] sm:h-[320px] md:h-[380px] lg:h-[420px] flex items-center justify-center bg-white overflow-hidden">
          <img
            src={touch}
            alt="Contact Banner"
            className="max-h-full w-auto object-contain"
          />
        </div>
      </div> */}

      {/* --- SECTION 2 : Contact Info Cards --- */}

      <div className="w-full py-20 bg-[#F9FAFB]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 px-6">
          {/* CARD 1 - CALL US */}
          <div
            className="bg-white px-10 pt-12 pb-10 rounded-3xl shadow-[0_4px_30px_rgba(0,0,0,0.07)] text-center 
                hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 cursor-pointer"
          >
            <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-4">
              <PhoneIcon className="w-6 h-6 text-blue-600" />
            </div>

            <h3 className="text-[22px] font-semibold mb-3">Call Us</h3>
            <p className="text-gray-600 mb-4 text-[16px]">
              Speak directly with our education experts
            </p>

            <a
              href="tel:+919205780885"
              className="text-blue-600 font-semibold text-[20px] hover:underline"
            >
              +91 92057 80885
            </a>

            <p className="text-gray-500 mt-3 text-[15px]">
              Mon - Sat: 9:00 AM - 8:00 PM
            </p>
          </div>

          {/* CARD 2 - EMAIL US */}
          <div className="bg-white px-10 pt-12 pb-10 rounded-3xl shadow-[0_4px_30px_rgba(0,0,0,0.07)] text-center hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 cursor-pointer">
            <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-4">
              <EnvelopeIcon className="w-6 h-6 text-blue-600" />
            </div>

            <h3 className="text-[22px] font-semibold mb-3">Email Us</h3>
            <p className="text-gray-600 mb-4 text-[16px]">
              Get detailed information via email
            </p>

            <a
              href="mailto:info@collegedrishti.com"
              className="text-blue-600 font-semibold text-[20px] hover:underline"
            >
              info@collegedrishti.com
            </a>

            <p className="text-gray-500 mt-3 text-[15px]">
              Response within 24 hours
            </p>
          </div>

          {/* CARD 3 - VISIT US */}
          <div className="bg-white px-10 pt-12 pb-10 rounded-3xl shadow-[0_4px_30px_rgba(0,0,0,0.07)] text-center hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 cursor-pointer">
            <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-4">
              <MapPinIcon className="w-6 h-6 text-blue-600" />
            </div>

            <h3 className="text-[22px] font-semibold mb-3">Visit Us</h3>
            <p className="text-gray-600 mb-4 text-[16px]">
              Meet our counselors in person
            </p>

            <a
              href="https://www.google.com/maps?q=New+Delhi+India"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 font-semibold text-[20px] hover:underline"
            >
              New Delhi, India
            </a>

            <p className="text-gray-500 mt-3 text-[15px]">
              By appointment only
            </p>
          </div>
        </div>
      </div>

      {/* --- SECTION 3 (Updated) LEFT FORM + RIGHT TWO-CARDS --- */}

      <div className="w-full py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-14 px-6">
          {/* LEFT — Contact Form */}
          <div className="bg-white p-6 md:p-10 rounded-3xl shadow-lg">
            <h2 className="text-3xl font-bold mb-4">Send us a Message</h2>
            <p className="text-gray-600 mb-10">
              Fill out the form below and our education counselors will get back
              to you within 24 hours.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400"
                  placeholder="Full Name *"
                />

                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400"
                  placeholder="Email Address *"
                />

                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400"
                  placeholder="Phone Number *"
                />

                <select
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400"
                >
                  <option value="">Select a course</option>
                  <option>PG Course</option>
                  <option>UG Course</option>
                  <option>New Diploma</option>
                  <option>Skill</option>
                  <option>Bachelor's</option>
                </select>
              </div>

              <textarea
                rows="5"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="border border-gray-300 p-3 rounded-lg w-full mt-6 focus:ring-2 focus:ring-blue-400"
                placeholder="Tell us about your educational goals..."
              />

              <button
                type="submit"
                className="w-full mt-6 bg-blue-600 text-white py-4 rounded-xl text-lg font-semibold hover:bg-blue-700 transition-all duration-300 hover:shadow-lg active:scale-[0.98]"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* RIGHT SIDE — TWO CARDS STACKED */}
          <div className="flex flex-col gap-10">
            {/* --- Card 1: WHY CHOOSE --- */}
            <div className="bg-white p-10 rounded-3xl shadow-lg">
              <h2 className="text-2xl font-bold mb-10">
                Why Choose College Drishti?
              </h2>

              <div className="space-y-8">
                {/* Point 1 */}
                <div className="flex gap-3">
                  <div className="w-16 h-12 rounded-full bg-blue-100 flex items-center justify-center shadow-sm">
                    <AcademicCapIcon className="w-7 h-7 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">Expert Guidance</h3>
                    <p className="text-gray-600">
                      Our experienced counselors have helped thousands of
                      students find their perfect match.
                    </p>
                  </div>
                </div>

                {/* Point 2 */}
                <div className="flex gap-3">
                  <div className="w-14 h-12 rounded-full bg-blue-100 flex items-center justify-center shadow-sm">
                    <ShieldCheckIcon className="w-7 h-7 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">
                      Verified Information
                    </h3>
                    <p className="text-gray-600">
                      All course and university information is verified and
                      updated regularly.
                    </p>
                  </div>
                </div>

                {/* Point 3 */}
                <div className="flex gap-3">
                  <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center shadow-sm">
                    <ChatBubbleLeftRightIcon className="w-7 h-7 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">24/7 Support</h3>
                    <p className="text-gray-600">
                      Get support throughout your admission process, from
                      application to enrollment.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* --- Card 2: FAQ --- */}
            <div className="bg-white p-10 rounded-3xl shadow-lg">
              <h2 className="text-3xl font-bold mb-8">
                Frequently Asked Questions
              </h2>

              <div className="space-y-3">
                {/* Q1 */}
                <div>
                  <h3 className="font-semibold text-sm">
                    How quickly will I get a response?
                  </h3>
                  <p className="text-gray-600">
                    We respond to all inquiries within 24 hours, often much
                    sooner during business hours.
                  </p>
                </div>

                <hr className="border-gray-200" />

                {/* Q2 */}
                <div>
                  <h3 className="font-semibold text-sm">
                    Is the consultation free?
                  </h3>
                  <p className="text-gray-600">
                    Yes, our initial consultation and course guidance services
                    are completely free of charge.
                  </p>
                </div>

                <hr className="border-gray-200" />

                <div>
                  <h3 className="font-semibold text-sm">
                    Do you help with admission applications?
                  </h3>
                  <p className="text-gray-600">
                    Absolutely! We provide end-to-end support including
                    application assistance, document preparation, and interview
                    guidance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- SECTION 4 : Find Us + Map --- */}

      <div className="w-full py-20 bg-white">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold mb-3">Find Us</h2>
          <p className="text-gray-600 text-lg">
            Visit our office for in-person consultation
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-6">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30773484.55170563!2d61.0245165611659!3d19.69009515037612!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xaa778452d5ceba43%3A0x6e713afe387e261a!2sCollege%20Drishti!5e0!3m2!1sen!2sin!4v1778149030196!5m2!1sen!2sin"
            className="w-full h-[450px] rounded-3xl shadow-lg border-none"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

      <Footer />

      <MobileFooterNav />
    </>
  );
}
