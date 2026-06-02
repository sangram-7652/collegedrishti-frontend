import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/axios";

const WebStoryDetail = () => {
  const { slug } = useParams();

  const [story, setStory] = useState(null);
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStory();
  }, [slug]);

  const fetchStory = async () => {
    try {
      const res = await api.get(`/web-stories/${slug}`);

      if (res.data.success) {
        setStory(res.data.story);
        setSlides(res.data.slides || []);
      }
    } catch (error) {
      console.error("Story Error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading Story...
      </div>
    );
  }

  if (!story) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Story not found
      </div>
    );
  }

  return (
 <div className="bg-black min-h-screen">
  <div className="max-w-md mx-auto">

    <div className="sticky top-0 z-20 bg-black/70 backdrop-blur p-3">
      <Link to="/" className="text-white">
        ← Back
      </Link>
    </div>

    <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide">
      {slides.map((slide) => (
        <div
          key={slide.id}
          className="min-w-full snap-center relative"
        >
          <img
            src={slide.path}
            alt=""
            className="w-full h-screen object-cover"
          />

          <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black to-transparent">
            <h1 className="text-white text-xl font-bold">
              {story.title}
            </h1>
          </div>
        </div>
      ))}
    </div>

  </div>
</div>
  );
};

export default WebStoryDetail;