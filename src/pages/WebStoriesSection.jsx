import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

const WebStoriesSection = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const res = await api.get("/web-stories");

        if (res.data.success) {
          setStories(res.data.data || []);
        }
      } catch (error) {
        console.error("Web Stories API Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  if (loading) {
    return (
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center py-8">
            Loading Web Stories...
          </div>
        </div>
      </section>
    );
  }

  if (!stories.length) return null;

  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4 shadow-md rounded-xl p-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-3 text-gray-900">
          Web Stories
        </h2>

        <div className="flex gap-4 overflow-x-auto py-4 mt-6 scrollbar-hide">
          {stories.map((story) => (
            <div
              key={story.id}
              to={`/web-stories/${story.slug}`}
              className="group relative min-w-[170px] md:min-w-[190px] w-[170px] md:w-[190px] h-[300px] md:h-[340px] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition"
            >
              <img
                src={story.image}
                alt={story.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-white text-sm md:text-base font-semibold line-clamp-3">
                  {story.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WebStoriesSection;