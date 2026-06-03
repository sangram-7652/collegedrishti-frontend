
import React, {
  useEffect,
  useState,
} from "react";

import { useParams } from "react-router-dom";

import Header from "../pages/Header";
import MobileMenu from "../pages/MobileMenu";

import Footer from "../components/Footer";
import MobileFooterNav from "../components/MobileFooterNav";
import LeadForm from "../components/LeadForm";
import SEO from "../components/SEO";

import api from "../api/axios";

const BASE_URL =
  import.meta.env.VITE_API_BASE_URL.replace(
    /\/$/,
    ""
  );

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

  const [data, setData] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  // FETCH DATA
  useEffect(() => {
    if (!slug) return;

    setLoading(true);

    api
      .get(`/specialization/${slug}`)
      .then((res) => {
        setData(res.data.data);

        window.scrollTo(0, 0);
      })
      .catch((err) => {
        console.error(
          "API Error:",
          err
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, [slug]);

  // GENERATE IDS
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
          "h1,h2,h3,h4,h5,h6"
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

  // TOC SCROLL
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

  // HASH SCROLL
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

  // FORMAT CONTENT
  const formattedContent =
    data?.disc

      // IMAGE FIX
      ?.replace(
        /src="(?!https?:\/\/|data:|blob:)(.*?)"/g,
        (match, path) => {
          const cleanPath =
            path.replace(
              /^\/+/,
              ""
            );

          return `src="${BASE_URL}/${cleanPath}"`;
        }
      )

      // REMOVE WIDTH HEIGHT
      .replace(
        /width="[^"]*"/g,
        ""
      )

      .replace(
        /height="[^"]*"/g,
        ""
      )

      // REMOVE EMPTY PARAGRAPHS
      .replace(
        /<p>\s*<\/p>/g,
        ""
      )

      // FAQ FIX — question + answer both inside one <li>, keeps number inline
      .replace(
        /<li>\s*<p>([\s\S]*?)<\/p>\s*<p>([\s\S]*?)<\/p>/gi,
        "<li><strong>$1</strong><span>$2</span>"
      )

      // FAQ FIX — single <p> inside <li>
      .replace(
        /<li>\s*<p>(.*?)<\/p>/gis,
        "<li><span>$1</span>"
      )

      // Remaining <p> → <span>
      .replace(
        /<p>(.*?)<\/p>/gis,
        "<span>$1</span>"
      )

      .replace(
        /<\/span>\s*<span>/g,
        " "
      )

      .replace(
        /<li>\s*<br\s*\/?>/g,
        "<li>"
      )

      // RESPONSIVE TABLE
      .replace(
        /<table/g,
        '<div class="overflow-x-auto"><table'
      )

      .replace(
        /<\/table>/g,
        "</table></div>"
      );

  // LOADING
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

  // NO DATA
  if (!data) {
    return (
      <p className="text-center py-20 text-lg font-semibold">
        Data not found
      </p>
    );
  }


  const getImageUrl = (img) => {
  if (!img) return "";

  if (img.startsWith("http")) {
    return img;
  }

  return `${import.meta.env.VITE_FILE_BASE_URL}/${img}`;

};

console.log(data);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <SEO
  title={data?.specialize_name}
  description={
    data?.disc
      ?.replace(/<[^>]+>/g, "")
      ?.replace(/\s+/g, " ")
      ?.trim()
      ?.slice(0, 160)
  }
  keywords={data?.specialize_name}
  canonical={`https://collegedrishti.com/specialization/${data?.slug}`}
  image={getImageUrl(data?.image)}
/>
      {/* DESKTOP HEADER */}
      <div className="hidden md:block">
        <Header />
      </div>

      {/* MOBILE HEADER */}
      <div className="block md:hidden">
        <MobileMenu />
      </div>

      {/* MAIN */}
      <main className="flex-grow w-full bg-white py-6 md:py-10">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16 flex flex-col lg:flex-row gap-8">
          {/* LEFT */}
          <div className="w-full lg:w-2/3">
            {/* TITLE */}
            <div className="mb-8">
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold leading-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {
                  data.specialize_name
                }
              </h1>

              <div className="w-20 h-1 bg-blue-600 mt-4 rounded-full"></div>
            </div>

            {/* IMAGE */}
            {data.image && (
              <div className="w-full mb-8">
                <img
                  src={getImageUrl(data.image)}
                  alt={
                    data.specialize_name
                  }
                  className="w-full h-auto rounded-xl object-cover shadow-sm"
                  loading="lazy"
                />
              </div>
            )}

            {/* TOC */}
            {data.table_con && (
              <div className="border border-gray-300 rounded-2xl p-6 md:p-8 my-8 bg-white shadow-sm">
                <h2 className="text-2xl font-bold text-center mb-6 text-black">
                  Table of Content
                </h2>

                <div
                  className="toc-content [&_a]:text-blue-600 [&_a]:underline [&_a]:cursor-pointer"
                  dangerouslySetInnerHTML={{
                    __html:
                      data.table_con,
                  }}
                />
              </div>
            )}

            {/* DESCRIPTION */}
            {formattedContent && (
              <div
                suppressHydrationWarning={
                  true
                }
                className="
                  specialization-content
                  mt-8 md:mt-10

                  w-full
                  max-w-full
                  overflow-hidden

                  text-gray-700
                  text-sm sm:text-base md:text-lg
                  leading-relaxed

                  [&_*]:max-w-full
                  [&_*]:break-words

                  /* IMAGE */
                  [&_img]:w-full
                  [&_img]:h-auto
                  [&_img]:rounded-xl
                  [&_img]:my-6

                  /* H1 */
                  [&_h1]:text-3xl
                  md:[&_h1]:text-5xl
                  [&_h1]:font-extrabold
                  [&_h1]:leading-tight
                  [&_h1]:mt-8
                  [&_h1]:mb-6
                  [&_h1]:text-black

                  /* H2 */
                  [&_h2]:text-2xl
                  [&_h2]:font-bold
                  [&_h2]:mt-8
                  [&_h2]:mb-4
                  [&_h2]:text-black

                  /* H3 */
                  [&_h3]:text-xl
                  [&_h3]:font-bold
                  [&_h3]:mt-6
                  [&_h3]:mb-3
                  [&_h3]:text-black

                  /* SPAN */
                  [&_span]:leading-8

                  /* UL LIST */
                  [&_ul]:list-disc
                  [&_ul]:pl-6
                  [&_ul]:space-y-3

                  /* OL LIST — numbers stay inline */
                  [&_ol]:list-decimal
                  [&_ol]:pl-6
                  [&_ol]:space-y-4

                  [&_ol>li]:list-item
                  [&_ol>li]:leading-normal
                  [&_ol>li]:mb-4
                  [&_ol>li]:pl-1

                  [&_ol>li_strong]:block
                  [&_ol>li_strong]:font-bold
                  [&_ol>li_strong]:mb-1
                  [&_ol>li_strong]:text-gray-900

                  [&_ol>li_span]:block
                  [&_ol>li_span]:leading-7
                  [&_ol>li_span]:text-gray-700

                  /* BOLD */
                  [&_strong]:font-bold
                  [&_b]:font-bold

                  /* TABLE */
                  [&_table]:w-full
                  [&_table]:border-collapse
                  [&_table]:my-6

                  [&_th]:border
                  [&_th]:border-gray-300
                  [&_th]:p-3
                  [&_th]:bg-gray-100
                  [&_th]:font-bold

                  [&_td]:border
                  [&_td]:border-gray-300
                  [&_td]:p-3
                "
                dangerouslySetInnerHTML={{
                  __html:
                    formattedContent,
                }}
              />
            )}
          </div>

          {/* DESKTOP FORM */}
          <div className="hidden lg:block lg:w-1/3">
            <div className="sticky top-50">
              <LeadForm />
            </div>
          </div>
        </div>
      </main>

      {/* MOBILE FORM */}
      <div className="block lg:hidden px-4 mt-6 mb-24">
        <LeadForm />
      </div>

      {/* FOOTER */}
      <Footer />

      {/* MOBILE FOOTER */}
      <div className="md:hidden">
        <MobileFooterNav />
      </div>
    </div>
  );
};

export default SpecializationDetails;