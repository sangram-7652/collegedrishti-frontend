import React from "react";
import { Link } from "react-router-dom";

const WebStoriesSection = ({ stories = [] }) => {
  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-2xl font-bold">
            Web Stories
          </h2>

          <Link
            to="/web-stories"
            className="text-blue-600 font-medium hover:underline"
          >
            View All
          </Link>
        </div>

        <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
          {stories.map((story) => (
            <Link
              key={story.id}
              to={`/web-stories/${story.slug}`}
              className="min-w-[180px] w-[180px] h-[320px] rounded-xl overflow-hidden relative shadow-md group"
            >
              <img
                src={story.image}
                alt={story.title}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>

              <div className="absolute bottom-0 left-0 p-3">
                <h3 className="text-white text-sm font-semibold line-clamp-3">
                  {story.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WebStoriesSection;