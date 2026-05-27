import React, { useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";


import api from "../api/axios";

import Header from "../pages/Header";
import MobileMenu from "../pages/MobileMenu";
import Footer from "../components/Footer";
import MobileFooterNav from "../components/MobileFooterNav";
import LeadForm from "../components/LeadForm";

import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const slugify = (text) => {
  return text
    ?.toLowerCase()
    .replace(/\u00A0/g, "")
    .replace(/[^\w\s-]/gi, "")
    .trim()
    .replace(/\s+/g, "-");
};

function decodeHtml(html) {
  if (!html) return "";

  const txt = document.createElement("textarea");

  txt.innerHTML = html;

  return txt.value;
}

const RecentBlogsSection = ({ recentBlogs }) => {
  if (!recentBlogs.length) return null;

  return (
    <section className="w-full bg-white py-10 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16">
        <h2 className="text-xl md:text-2xl font-bold mb-6 text-[#0B3C5D]">
          Recent Blogs
        </h2>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          navigation
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="recent-blog-swiper pb-14"
        >
          {recentBlogs.map((item) => (
            <SwiperSlide key={item.id}>
              <Link
                to={`/blog/${item.slug}`}
                className="block overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className=" w-full object-cover"
                />

                <div className="p-4">
                  <h3 className="line-clamp-2 text-sm font-semibold text-gray-900">
                    {item.title}
                  </h3>

                  <div className="mt-2">
                    <button
                      type="button"
                      className="text-sm font-semibold text-blue-600 hover:text-blue-800 cursor-pointer"
                    >
                      Read More →
                    </button>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

const BlogDetail = () => {
  const { slug } = useParams();

  const [blog, setBlog] = useState(null);

  const [loading, setLoading] = useState(true);

  const [recentBlogs, setRecentBlogs] = useState([]);

  // Fetch Blog
  useEffect(() => {
    api
      .get(`/blogs/${slug}`)
      .then((res) => {
        if (res.data.success) {
          const blogData = res.data.data;

          setBlog({
            ...blogData,
            content: decodeHtml(blogData.content),
          });

          window.scrollTo(0, 0);
        } else {
          setBlog(null);
        }
      })
      .catch((err) => {
        console.error(err);
        setBlog(null);
      })
      .finally(() => setLoading(false));
  }, [slug]);



  // Generate IDs After Render
  useEffect(() => {
    if (!blog) return;

    const timer = setTimeout(() => {
      const content = document.querySelector(".blog-content");

      if (!content) return;

      const headings = content.querySelectorAll("h1, h2, h3, h4, h5, h6");

      headings.forEach((heading, index) => {
        const text = heading.textContent;

        if (!text) return;

        const cleanText = text.replace(/\u00A0/g, "").trim();

        const finalId = slugify(cleanText);

        heading.id = finalId || `section-${index}`;
      });
    }, 500);

    return () => clearTimeout(timer);
  }, [blog]);

  // TOC Smooth Scroll
  useEffect(() => {
    const handleClick = (e) => {
      const link = e.target.closest('.toc-content a[href^="#"]');

      if (!link) return;

      e.preventDefault();

      const href = link.getAttribute("href");

      if (!href) return;

      const id = href
        .replace("#", "")
        .replace(/\u00A0/g, "")
        .trim()
        .toLowerCase()
        .replace(/[^\w\s-]/gi, "")
        .replace(/\s+/g, "-");

      const element = document.querySelector(
        `.blog-content #${CSS.escape(id)}`,
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

        window.history.replaceState(null, "", href);
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  // Scroll To Hash On Load
  useEffect(() => {
    if (!blog) return;

    const timer = setTimeout(() => {
      const hash = window.location.hash;

      if (!hash) return;

      const id = hash
        .replace("#", "")
        .replace(/\u00A0/g, "")
        .trim()
        .toLowerCase()
        .replace(/[^\w\s-]/gi, "")
        .replace(/\s+/g, "-");

      const element = document.querySelector(
        `.blog-content #${CSS.escape(id)}`,
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

    return () => clearTimeout(timer);
  }, [blog]);

  // Fetch Recent Blogs
  useEffect(() => {
    api.get("/blogs").then((res) => {
      if (res.data.success) {
        setRecentBlogs(
          res.data.data.filter((item) => item.slug !== slug).slice(0, 6),
        );
      }
    });
  }, [slug]);

useEffect(() => {

  if (!blog) return;

  // Remove HTML Tags
  const cleanTitle =
    blog?.title
      ?.replace(/<[^>]*>/g, "")
      ?.trim();

  const cleanDescription =
    blog?.meta_dis
      ?.replace(/<[^>]*>/g, "")
      ?.trim();

  const cleanKeywords =
    blog?.meta_keywords
      ?.replace(/<[^>]*>/g, "")
      ?.trim();

  // Dynamic Title
  document.title =
    `${cleanTitle} | CollegeDrishti`;

  // Helper Function
  const updateMetaTag = (
    selector,
    attribute,
    value
  ) => {

    if (!value) return;

    let element =
      document.querySelector(
        selector
      );

    if (!element) {

      element =
        document.createElement(
          "meta"
        );

      element.setAttribute(
        attribute,
        selector.includes(
          "property="
        )
          ? selector.match(
              /property="([^"]+)"/
            )[1]
          : selector.match(
              /name="([^"]+)"/
            )[1]
      );

      document.head.appendChild(
        element
      );
    }

    element.content = value;
  };

  // Meta Description
  updateMetaTag(
    'meta[name="description"]',
    "name",
    cleanDescription ||
      "Explore top online universities."
  );

  // Keywords
  updateMetaTag(
    'meta[name="keywords"]',
    "name",
    cleanKeywords ||
      "online universities"
  );

  // Open Graph
  updateMetaTag(
    'meta[property="og:title"]',
    "property",
    cleanTitle
  );

  updateMetaTag(
    'meta[property="og:description"]',
    "property",
    cleanDescription
  );

  updateMetaTag(
    'meta[property="og:image"]',
    "property",
    blog?.image
  );

  updateMetaTag(
    'meta[property="og:type"]',
    "property",
    "article"
  );

  // Twitter
  updateMetaTag(
    'meta[name="twitter:card"]',
    "name",
    "summary_large_image"
  );

  updateMetaTag(
    'meta[name="twitter:title"]',
    "name",
    cleanTitle
  );

  updateMetaTag(
    'meta[name="twitter:description"]',
    "name",
    cleanDescription
  );

  updateMetaTag(
    'meta[name="twitter:image"]',
    "name",
    blog?.image
  );

  // Canonical URL
  let canonical =
    document.querySelector(
      'link[rel="canonical"]'
    );

  if (!canonical) {

    canonical =
      document.createElement(
        "link"
      );

    canonical.rel =
      "canonical";

    document.head.appendChild(
      canonical
    );
  }

  canonical.href =
    window.location.href;

}, [blog]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-14 h-14 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>

          <p className="text-lg font-semibold text-gray-700">Loading Blog...</p>
        </div>
      </div>
    );
  }

  if (!blog) return <p className="text-center py-20">Blog not found</p>;

  

  return (
    <>
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
          <div className="max-w-8xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12 flex flex-col lg:flex-row gap-10">
            {/* Left Content */}
            <div className="w-full lg:w-2/3">
              {/* Blog Title */}
              <h1 className="course-content text-2xl md:text-4xl font-bold text-[#0B3C5D] leading-snug">
                {blog?.title}
              </h1>

              {/* Date */}
              <p className="course-content text-sm text-[#3B5B7A] mt-2">
                Published on{" "}
                {blog?.created_at
                  ? new Date(blog.created_at).toLocaleDateString()
                  : "N/A"}
              </p>

              {/* Blog Image */}
              {blog.image && (
                <div className="mt-6">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-auto rounded-xl object-contain"
                  />
                </div>
              )}

              {/* Meta Description */}
              {blog.meta_dis && (
                <div className="mt-4 md:mt-6 bg-blue-50 border-l-4 border-blue-600 rounded-xl px-4 py-3">
                  <div
                    className="course-content text-gray-800 leading-relaxed font-medium"
                    dangerouslySetInnerHTML={{
                      __html: blog.meta_dis,
                    }}
                  />
                </div>
              )}

              {/* TOC */}
              {blog.table_con && (
                <div className="border border-gray-300 rounded-2xl p-6 md:p-8 my-8 bg-white shadow-sm">
                  <h2 className="text-2xl font-bold text-center mb-6 text-black">
                    Table of Content
                  </h2>

                  <div
                    className="course-content toc-content [&_a]:text-blue-600 [&_a]:underline [&_a]:cursor-pointer"
                    dangerouslySetInnerHTML={{
                      __html: decodeHtml(blog.table_con),
                    }}
                  />
                </div>
              )}

              {/* Blog Content */}
              {blog?.content && (
                <div
                  suppressHydrationWarning={true}
                  className="course-content blog-content mt-8 md:mt-10"
                  dangerouslySetInnerHTML={{
                    __html: blog.content
                      .replace(/<table/g, '<div class="table-wrapper"><table')
                      .replace(/<\/table>/g, "</table></div>"),
                  }}
                />
              )}
            </div>

            {/* Desktop Sticky Form */}
            <div className="hidden lg:block lg:w-1/4">
              <div className="sticky top-30">
                <LeadForm />
              </div>
            </div>
          </div>
        </main>

        {/* Recent Blogs */}
        <RecentBlogsSection recentBlogs={recentBlogs} />

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
    </>
  );
};

export default BlogDetail;
