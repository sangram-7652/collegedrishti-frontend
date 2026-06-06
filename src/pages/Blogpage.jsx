import React, { useEffect, useState, useRef } from 'react';
import api from '../api/axios';
import Header from "../pages/Header";
import MobileMenu from "../pages/MobileMenu";
import Footer from "../components/Footer";
import MobileFooterNav from '../components/MobileFooterNav';
import { Link } from "react-router-dom";

const BLOGS_PER_PAGE = 9;

// ── In-memory cache: page number → { blogs, totalPages, totalBlogs } ──
const blogCache = {};

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const getPages = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - 2 && i <= currentPage + 2)) {
        pages.push(i);
      } else if (i === currentPage - 3 || i === currentPage + 3) {
        pages.push('...');
      }
    }
    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-12 flex-wrap">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
      >
        ← Prev
      </button>
      {getPages().map((page, idx) =>
        page === '...' ? (
          <span key={`dots-${idx}`} className="px-2 text-gray-400 text-sm">...</span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-9 h-9 rounded-lg text-sm font-medium transition ${
              currentPage === page
                ? 'bg-blue-600 text-white border border-blue-600'
                : 'border border-gray-200 text-gray-700 hover:bg-gray-50'
            }`}
          >
            {page}
          </button>
        )
      )}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
      >
        Next →
      </button>
    </div>
  );
};

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalBlogs, setTotalBlogs] = useState(0);
  const abortRef = useRef(null);

  const fetchPage = async (page, options = {}) => {
    // Cache hit — return instantly, no API call
    if (blogCache[page]) {
      return blogCache[page];
    }

    const { signal } = options;

    const res = await api.get(`/blogs?page=${page}&limit=${BLOGS_PER_PAGE}`, { signal });

    if (!res.data.success) return null;

    const data = res.data.data;
    let result;

    if (res.data.totalPages) {
      result = {
        blogs: data,
        totalPages: res.data.totalPages,
        totalBlogs: res.data.total || data.length,
      };
    } else {
      // fallback: backend returns all — slice on frontend
      result = {
        blogs: data.slice((page - 1) * BLOGS_PER_PAGE, page * BLOGS_PER_PAGE),
        totalPages: Math.ceil(data.length / BLOGS_PER_PAGE),
        totalBlogs: data.length,
      };
    }

    // Store in cache
    blogCache[page] = result;
    return result;
  };

  useEffect(() => {
    // Cancel any in-flight request from previous page
    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    // If cached, load instantly — no loader flash
    if (blogCache[currentPage]) {
      const cached = blogCache[currentPage];
      setBlogs(cached.blogs);
      setTotalPages(cached.totalPages);
      setTotalBlogs(cached.totalBlogs);
      setLoading(false);
      setInitialLoad(false);
      // Still prefetch next in background
      prefetchNext(currentPage, cached.totalPages);
      return;
    }

    if (initialLoad) setLoading(true);

    fetchPage(currentPage, { signal: controller.signal })
      .then((result) => {
        if (!result) return;
        setBlogs(result.blogs);
        setTotalPages(result.totalPages);
        setTotalBlogs(result.totalBlogs);
        setInitialLoad(false);
        prefetchNext(currentPage, result.totalPages);
      })
      .catch((err) => {
        if (err.name !== 'CanceledError' && err.name !== 'AbortError') {
          console.error('Failed to load blogs:', err);
        }
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [currentPage]);

  const prefetchNext = (page, total) => {
    const next = page + 1;
    if (next <= total && !blogCache[next]) {
      fetchPage(next).catch(() => {});
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const rangeStart = (currentPage - 1) * BLOGS_PER_PAGE + 1;
  const rangeEnd = Math.min(currentPage * BLOGS_PER_PAGE, totalBlogs);

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

      {/* Main content */}
      <main className="flex-grow max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-center mb-2">Latest Blogs & Videos</h1>

        {!loading && totalBlogs > 0 && (
          <p className="text-center text-sm text-gray-400 mb-8">
            Showing {rangeStart}–{rangeEnd} of {totalBlogs} blogs
          </p>
        )}

        {/* First load — skeleton */}
        {loading && initialLoad ? (
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2, 3, 4, 5].map((item) => (
              <div
                key={item}
                className="overflow-hidden rounded-lg border border-gray-100 bg-white shadow"
              >
                <div className="h-48 animate-pulse bg-gray-100" />
                <div className="space-y-3 p-5">
                  <div className="h-5 w-4/5 rounded bg-gray-200 animate-pulse" />
                  <div className="h-3 w-full rounded bg-gray-100 animate-pulse" />
                  <div className="h-3 w-5/6 rounded bg-gray-100 animate-pulse" />
                  <div className="h-3 w-1/2 rounded bg-gray-100 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        ) : !loading && blogs.length === 0 ? (
  <div className="flex flex-col items-center gap-4 mt-20">
    <div className="flex h-12 items-end gap-1.5">
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
    <style>{`
      @keyframes blogWave {
        0%, 100% { transform: scaleY(0.45); opacity: 0.45; }
        50% { transform: scaleY(1); opacity: 1; }
      }
    `}</style>
  </div>
        ) : (
          <>
            {/* Page change — dim grid + small spinner only */}
            <div className={`transition-opacity duration-200 ${loading ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
              {loading && !initialLoad && (
                <div className="flex justify-center mb-6">
                  <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                </div>
              )}

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
                      loading="lazy"
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
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile footer nav */}
      <div className="md:hidden">
        <MobileFooterNav />
      </div>
    </div>
  );
};

export default BlogPage;
