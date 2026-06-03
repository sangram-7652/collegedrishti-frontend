import React, { useEffect, useState } from "react";
import api from "../api/axios";
import PodcastMic from "../course-image/podcast.png";
import { FaPlay, FaShareAlt } from "react-icons/fa";

export default function Podcast({ slug }) {
  const [podcast, setPodcast] = useState(null);
  const [showPodcastPopup, setShowPodcastPopup] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);

  useEffect(() => {
    if (!slug) return;

    api.get(`/course/${slug}/podcast`)
      .then((res) => {
        if (res.data.success) setPodcast(res.data.data);
      })
      .catch((err) => console.error("Podcast API Error:", err));
  }, [slug]);

  if (!podcast) return null;

  return (
    <>
      {/* Podcast Card */}
      <div className="w-full mt-6">
        <img
          src={PodcastMic}
          alt="Podcast Section"
          className="w-full h-auto rounded-xl cursor-pointer"
          onClick={() => setShowPodcastPopup(true)}
        />
      </div>

      {/* Podcast Popup */}
      {showPodcastPopup && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 w-11/12 max-w-md bg-white rounded-xl shadow-lg p-6 z-50">
          <button
            className="absolute top-2 right-2 text-red-500 text-lg"
            onClick={() => setShowPodcastPopup(false)}
          >
            ❌
          </button>

          <div className="flex flex-col items-center">
            <img src={PodcastMic} alt="Podcast Mic" className="w-10 h-10 mb-3" />
            <h2 className="font-bold text-xl text-center mb-3">
              {podcast.title}
            </h2>

            <audio controls className="w-full my-3">
              <source src={podcast.audio_url} />
            </audio>

            <div className="flex justify-between items-center w-full mb-4 px-2 text-gray-500 text-sm">
              <div className="flex items-center gap-2">
                <FaPlay />
                <span>00:00</span>
              </div>
              <div className="flex items-center gap-2">
                <FaShareAlt className="cursor-pointer" />
              </div>
            </div>

            <button
              className="w-full text-center text-gray-700 font-semibold py-2 border-t border-b mb-2"
              onClick={() => setShowTranscript(!showTranscript)}
            >
              View Transcript
            </button>

            {showTranscript && (
              <div className="text-gray-600 text-sm text-left mt-2 max-h-40 overflow-y-auto">
                <p>{podcast.transcript || "Transcript available nahi hai."}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}






