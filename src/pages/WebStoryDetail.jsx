import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

const WebStoryDetail = () => {
  const { slug } = useParams();

  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const res = await api.get(`/web-stories/${slug}`);

        if (res.data.success) {
          setStory(res.data.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchStory();
  }, [slug]);

  if (loading) {
    return (
      <div className="text-center py-10">
        Loading...
      </div>
    );
  }

  if (!story) {
    return (
      <div className="text-center py-10">
        Story not found
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto min-h-screen bg-black">
      <img
        src={story.image}
        alt={story.title}
        className="w-full h-screen object-cover"
      />

      <div className="fixed bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black to-transparent">
        <h1 className="text-white text-2xl font-bold">
          {story.title}
        </h1>

        {story.link && (
          <a
            href={story.link}
            target="_blank"
            rel="noreferrer"
            className="inline-block mt-3 bg-white text-black px-4 py-2 rounded"
          >
            Read More
          </a>
        )}
      </div>
    </div>
  );
};

export default WebStoryDetail;