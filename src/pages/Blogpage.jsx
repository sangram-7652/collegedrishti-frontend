import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import Header from "../pages/Header";
import MobileMenu from "../pages/MobileMenu";
import Footer from "../components/Footer";
import MobileFooterNav from '../components/MobileFooterNav';
import { Link } from "react-router-dom";

const BlogLoadingState = () => (
  <div className="space-y-10">
    <div className="flex flex-col items-center gap-4">
      <div className="flex h-12 items-end gap-1.5" aria-label="Loading blogs">
        {[0, 1, 2, 3, 4].map((index) => (
          <span
            key={index}
            className="block w-2.5 rounded-full bg-blue-600 animate-[blogWave_1.05s_ease-in-out_infinite]"
            style={{
              height: `${18 + index * 5}px`,
              animationDelay: `${index * 0.1}s`,
            }}
          />
        ))}
      </div>
      <p className="text-sm font-medium text-gray-500">Loading latest blogs...</p>
    </div>

    <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {[0, 1, 2].map((item) => (
        <div
          key={item}
          className="overflow-hidden rounded-lg border border-gray-100 bg-white shadow"
        >
          <div className="h-48 animate-pulse bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100" />
          <div className="space-y-3 p-5">
            <div className="h-5 w-4/5 rounded bg-gray-200 animate-pulse" />
            <div className="h-3 w-full rounded bg-gray-100 animate-pulse" />
            <div className="h-3 w-5/6 rounded bg-gray-100 animate-pulse" />
            <div className="h-3 w-1/2 rounded bg-gray-100 animate-pulse" />
          </div>
        </div>
      ))}
    </div>

    <style>{`
      @keyframes blogWave {
        0%, 100% {
          transform: scaleY(0.45);
          opacity: 0.45;
        }
        50% {
          transform: scaleY(1);
          opacity: 1;
        }
      }
    `}</style>
  </div>
);

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
 

  useEffect(() => {
    api
      .get('/blogs') 
      .then((res) => {
        if (res.data.success) {
          setBlogs(res.data.data);
        }
      })
      .catch((err) => console.error('Failed to load blogs:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* ✅ Desktop Header */}
      <div className="hidden md:block">
        <Header />
      </div>

      {/* ✅ Mobile Header */}
      <div className="block md:hidden">
        <MobileMenu />
      </div>

      {/* ✅ Main content */}
      <main className="flex-grow max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-center mb-8">Latest Blogs & Videos</h1>

        {loading ? (
          <BlogLoadingState />
        ) : (
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
              <Link
                to={`/blog/${blog.slug}`}
                key={blog.id}
                className="bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition"
              >
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-5">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    {blog.title}
                  </h2>
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {blog.meta_dis?.replace(/<[^>]+>/g, "")}
                  </p>
                  <p className="text-xs text-gray-400 mt-2">
                    Published on {new Date(blog.created_at).toLocaleDateString()}
                  </p>
                </div>
              </Link>
            ))}

          </div>
        )}
      </main>

      {/* ✅ Footer always at bottom */}
      <Footer />

      {/* ✅ Mobile footer nav only for small screens */}
      <div className="md:hidden">
        <MobileFooterNav />
      </div>
    </div>
  );
};

export default BlogPage;
