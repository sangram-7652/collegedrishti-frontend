import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../api/axios";
import Header from "../pages/Header";
import MobileMenu from "../pages/MobileMenu";
import Footer from "../components/Footer";
import MobileFooterNav from "../components/MobileFooterNav";
import FAQSection from "../pages/FAQSection";
import LeadForm from "../components/LeadForm";

const slugify = (text) => {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/gi, "")
    .trim()
    .replace(/\s+/g, "-");
};

const processContent = (html) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  const headings = doc.querySelectorAll("h2");

  headings.forEach((heading, index) => {
    if (!heading.id) {
      heading.id = slugify(heading.innerText) || `section-${index}`;
    }
  });

  return {
    updatedContent: doc.body.innerHTML,
    toc: [],
  };
};

const makeTOCClickable = (html) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  const items = doc.querySelectorAll("li");

  items.forEach((li) => {
    const text = li.innerText.trim();
    const id = slugify(text);

    li.innerHTML = `<a href="#${id}">${text}</a>`;
  });

  return doc.body.innerHTML;
};

function decodeHtml(html) {
  if (!html) return "";
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

const TableOfContents = ({ toc }) => {
  if (!toc.length) return null;

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 md:p-6 my-8 shadow-sm">
      <h2 className="font-semibold text-lg text-gray-800 mb-4">
        Table of Contents
      </h2>

      <ul id="toc" className="space-y-2">
        {toc.map((item, i) => (
          <li
            key={i}
            className={`${
              item.level === "H3"
                ? "ml-4 text-sm text-gray-600"
                : "text-base font-medium text-gray-800"
            }`}
          >
            <a
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();

                const el = document.getElementById(item.id);
                if (el) {
                  const yOffset = -110;
                  const y =
                    el.getBoundingClientRect().top +
                    window.pageYOffset +
                    yOffset;

                  window.scrollTo({ top: y, behavior: "smooth" });
                }
              }}
              className="hover:text-blue-600 transition"
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

const RecentBlogsSection = ({ recentBlogs }) => {
  if (!recentBlogs.length) return null;

  return (
    <section className="w-full bg-white py-10 md:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16">
        <h2 className="text-xl md:text-2xl font-bold mb-6 text-[#0B3C5D]">
          Recent Blogs
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          {recentBlogs.map((item) => (
            <Link
              key={item.id}
              to={`/blog/${item.slug}`}
              className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-40 w-full object-cover"
              />

              <div className="p-4">
                <h3 className="line-clamp-2 text-sm font-semibold text-gray-900">
                  {item.title}
                </h3>

                <span className="mt-2 inline-block text-sm font-medium text-blue-600">
                  Read More
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

const BlogDetail = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toc, setToc] = useState([]);
  const [recentBlogs, setRecentBlogs] = useState([]);

  useEffect(() => {
    api
      .get(`/blogs/${slug}`)
      .then((res) => {
        if (res.data.success) {
          const blogData = res.data.data;
          const { updatedContent, toc: nextToc } = processContent(
            decodeHtml(blogData.content),
          );

          setBlog({
            ...blogData,
            content: updatedContent,
          });

          setToc(nextToc);
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

  useEffect(() => {
    const handleScroll = () => {
      let current = "";

      document.querySelectorAll("h2, h3").forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 150) {
          current = section.id;
        }
      });

      document.querySelectorAll("#toc a").forEach((a) => {
        a.classList.remove("text-red-500");

        if (a.getAttribute("href") === `#${current}`) {
          a.classList.add("text-red-500");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    api.get("/blogs").then((res) => {
      if (res.data.success) {
        setRecentBlogs(res.data.data.slice(0, 3));
      }
    });
  }, []);

  if (loading) return <p className="text-center py-20">Loading...</p>;
  if (!blog) return <p className="text-center py-20">Blog not found</p>;

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="hidden md:block">
        <Header />
      </div>

      <div className="block md:hidden">
        <MobileMenu />
      </div>

      <main className="flex-grow w-full bg-white py-6 md:py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16 flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-2/3">
            <h1 className="course-content text-2xl md:text-4xl font-bold text-[#0B3C5D] leading-snug">
              {blog?.title}
            </h1>

            <p className="course-content text-sm text-[#3B5B7A] mt-2">
              Published on{" "}
              {blog?.created_at
                ? new Date(blog.created_at).toLocaleDateString()
                : "N/A"}
            </p>

            {blog.image && (
              <div className="mt-6">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-auto rounded-xl object-contain"
                />
              </div>
            )}

            {blog.meta_dis && (
              <div className="mt-4 md:mt-6 bg-blue-50 border-l-4 border-blue-600 rounded-xl px-4 py-3">
                <div
                  className="course-content text-gray-800 leading-relaxed font-medium"
                  dangerouslySetInnerHTML={{ __html: blog.meta_dis }}
                />
              </div>
            )}

            <TableOfContents toc={toc} />

            {blog.table_con && (
              <div className="bg-white border border-gray-200 rounded-xl p-5 md:p-6 my-8 shadow-sm">
                <h2 className="font-semibold text-lg text-gray-800 mb-4">
                  Table of Contents
                </h2>

                <div
                  className="course-content"
                  dangerouslySetInnerHTML={{
                    __html: makeTOCClickable(decodeHtml(blog.table_con)),
                  }}
                />
              </div>
            )}

            {blog?.content && (
              <div
                className="course-content mt-8 md:mt-10"
                dangerouslySetInnerHTML={{
                  __html: blog.content
                    .replace(/<table/g, '<div class="table-wrapper"><table')
                    .replace(/<\/table>/g, "</table></div>"),
                }}
              />
            )}
          </div>

          <div className="hidden md:block md:w-1/3">
            <LeadForm />
          </div>
        </div>
      </main>

      <FAQSection />

      <RecentBlogsSection recentBlogs={recentBlogs} />

      <div className="block md:hidden px-4 mt-6 mb-24">
        <LeadForm />
      </div>

      <Footer />
      <div className="md:hidden">
        <MobileFooterNav />
      </div>
    </div>
  );
};

export default BlogDetail;
