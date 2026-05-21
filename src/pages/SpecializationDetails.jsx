
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Header from "../pages/Header";
import MobileMenu from "../pages/MobileMenu";
import Footer from "../components/Footer";
import MobileFooterNav from "../components/MobileFooterNav";
import LeadForm from "../components/LeadForm";

import api from "../api/axios";

const slugify = (text) => {
  return text
    ?.toLowerCase()
    .replace(/\u00A0/g, "")
    .replace(/[^\w\s-]/gi, "")
    .trim()
    .replace(/\s+/g, "-");
};

const SpecializationDetails = () => {
  const { slug } = useParams();

  const [data, setData] = useState(null);

  const [loading, setLoading] =
    useState(true);

  // Fetch Data
  useEffect(() => {
    if (!slug) return;

    api
      .get(`/specialization/${slug}`)
      .then((res) => {
        setData(res.data.data);

        window.scrollTo(0, 0);
      })
      .catch((err) =>
        console.error(err)
      )
      .finally(() =>
        setLoading(false)
      );
  }, [slug]);

  // Generate Heading IDs
  useEffect(() => {
    if (!data) return;

    const timer = setTimeout(() => {
      const content =
        document.querySelector(
          ".specialization-content"
        );

      if (!content) return;

      const headings =
        content.querySelectorAll(
          "h1, h2, h3, h4, h5, h6"
        );

      headings.forEach(
        (heading, index) => {
          const text =
            heading.textContent;

          if (!text) return;

          const cleanText = text
            .replace(/\u00A0/g, "")
            .trim();

          const finalId =
            slugify(cleanText);

          heading.id =
            finalId ||
            `section-${index}`;
        }
      );
    }, 500);

    return () =>
      clearTimeout(timer);
  }, [data]);

  // TOC Smooth Scroll
  useEffect(() => {
    const handleClick = (e) => {
      const link = e.target.closest(
        '.toc-content a[href^="#"]'
      );

      if (!link) return;

      e.preventDefault();

      const href =
        link.getAttribute("href");

      if (!href) return;

      const id = href
        .replace("#", "")
        .replace(/\u00A0/g, "")
        .trim()
        .toLowerCase()
        .replace(/[^\w\s-]/gi, "")
        .replace(/\s+/g, "-");

      const element =
        document.querySelector(
          `.specialization-content #${CSS.escape(
            id
          )}`
        );

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        setTimeout(() => {
          window.scrollBy({
            top: -100,
            behavior: "instant",
          });
        }, 300);

        window.history.replaceState(
          null,
          "",
          href
        );
      }
    };

    document.addEventListener(
      "click",
      handleClick
    );

    return () => {
      document.removeEventListener(
        "click",
        handleClick
      );
    };
  }, []);

  // Scroll To Hash On Load
  useEffect(() => {
    if (!data) return;

    const timer = setTimeout(() => {
      const hash =
        window.location.hash;

      if (!hash) return;

      const id = hash
        .replace("#", "")
        .replace(/\u00A0/g, "")
        .trim()
        .toLowerCase()
        .replace(/[^\w\s-]/gi, "")
        .replace(/\s+/g, "-");

      const element =
        document.querySelector(
          `.specialization-content #${CSS.escape(
            id
          )}`
        );

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        setTimeout(() => {
          window.scrollBy({
            top: -100,
            behavior: "instant",
          });
        }, 300);
      }
    }, 800);

    return () =>
      clearTimeout(timer);
  }, [data]);

  // Loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-14 h-14 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>

          <p className="text-lg font-semibold text-gray-700">
            Loading...
          </p>
        </div>
      </div>
    );
  }

  // No Data
  if (!data) {
    return (
      <p className="text-center py-20">
        Data not found
      </p>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">

      {/* Desktop Header */}
      <div className="hidden md:block">
        <Header />
      </div>

      {/* Mobile Header */}
      <div className="block md:hidden">
        <MobileMenu />
      </div>

      {/* Main */}
      <main className="flex-grow w-full bg-white py-6 md:py-10">

        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16 flex flex-col lg:flex-row gap-8">

          {/* Left Content */}
          <div className="w-full lg:w-2/3">

            {/* Title */}
            <div className="mb-8">
              <h1 className="course-content text-2xl sm:text-4xl md:text-5xl font-extrabold leading-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {data.specialize_name}
              </h1>

              <div className="w-20 h-1 bg-blue-600 mt-4 rounded-full"></div>
            </div>

            {/* Image */}
            {/* {data.image && (
              <div className="w-full mb-8">
                <img
                  src={data.image}
                  alt={
                    data.specialize_name
                  }
                  className="w-full h-auto rounded-xl object-cover shadow-sm"
                  loading="lazy"
                />
              </div>
            )} */}

            {/* Table Of Content */}
            {data.table_con && (
              <div className="border border-gray-300 rounded-2xl p-6 md:p-8 my-8 bg-white shadow-sm">

                <h2 className="text-2xl font-bold text-center mb-6 text-black">
                  Table of Content
                </h2>

                <div
                  className="course-content toc-content [&_a]:text-blue-600 [&_a]:underline [&_a]:cursor-pointer"
                  dangerouslySetInnerHTML={{
                    __html:
                      data.table_con,
                  }}
                />
              </div>
            )}

            {/* Description */}
            {data.disc && (
              <div
                suppressHydrationWarning={
                  true
                }
                className="
                  course-content
                  specialization-content
                  mt-8 md:mt-10

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

                  [&_h1]:text-2xl
                  [&_h1]:font-bold
                  [&_h1]:mt-8
                  [&_h1]:mb-4

                  [&_h2]:text-xl
                  [&_h2]:font-bold
                  [&_h2]:mt-8
                  [&_h2]:mb-4

                  [&_h3]:text-lg
                  [&_h3]:font-semibold
                  [&_h3]:mt-6
                  [&_h3]:mb-3

                  [&_ul]:list-disc
                  [&_ul]:pl-6

                  [&_ol]:list-decimal
                  [&_ol]:pl-6

                  [&_table]:w-full
                  [&_table]:border-collapse

                  [&_td]:border
                  [&_td]:border-gray-300
                  [&_td]:p-2

                  [&_th]:border
                  [&_th]:border-gray-300
                  [&_th]:p-2
                  [&_th]:bg-gray-100
                "
                dangerouslySetInnerHTML={{
                  __html: data.disc
                    ?.replace(
                      /src="(?!https?:\/\/)/g,
                      'src="https://api.collegedrishti.com/'
                    )

                    // Remove Inline Sizes
                    .replace(
                      /width="[^"]*"/g,
                      ""
                    )
                    .replace(
                      /height="[^"]*"/g,
                      ""
                    )
                    .replace(
                      /style="[^"]*"/g,
                      ""
                    )

                    // Responsive Tables
                    .replace(
                      /<table/g,
                      '<div class="table-wrapper overflow-x-auto"><table'
                    )
                    .replace(
                      /<\/table>/g,
                      "</table></div>"
                    ),
                }}
              />
            )}

          </div>

          {/* Desktop Sticky Form */}
          <div className="hidden lg:block lg:w-1/3">
            <div className="sticky top-24">
              <LeadForm />
            </div>
          </div>

        </div>
      </main>

      {/* Mobile Lead Form */}
      <div className="block lg:hidden px-4 mt-6 mb-24">
        <LeadForm />
      </div>

      {/* Footer */}
      <Footer />

      {/* Mobile Footer */}
      <div className="md:hidden">
        <MobileFooterNav />
      </div>
    </div>
  );
};

export default SpecializationDetails;