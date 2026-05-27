import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Modal from "react-modal";
import api from "../api/axios";
import "./ExperienceSection.css";
import { FaPlay } from "react-icons/fa";
import ShadeWaveLoader from "../components/ShadeWaveLoader";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

Modal.setAppElement("#root");

const Arrow = ({ onClick, direction }) => (
  <div
    className={`custom-arrow ${direction}`}
    onClick={onClick}
  >
    {direction === "left" ? "‹" : "›"}
  </div>
);

const SuccessStories = () => {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [videoId, setVideoId] = useState("");

  useEffect(() => {
    api
      .get("/stories")
      .then((res) => {
        const data =
          Array.isArray(res.data)
            ? res.data
            : res.data?.data || [];

        setSlides(data);
      })
      .catch((err) => {
        console.error("Stories API Error:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const settings = {
    centerMode: true,
    centerPadding: "260px",
    slidesToShow: 1,
    infinite: true,
    dots: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: true,
    prevArrow: <Arrow direction="left" />,
    nextArrow: <Arrow direction="right" />,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          centerPadding: "100px",
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerMode: false,
          centerPadding: "0px",
          arrows: true,
        },
      },
    ],
  };

  return (
    <section className="success-wrapper">

      {/* HEADING */}
      <div className="success-heading">
        <h2>
          Success Stories: Real Experiences, Real Impact!
        </h2>
      </div>

      {loading ? (
        <ShadeWaveLoader
          label="Loading success stories..."
          cards={3}
          compact
        />
      ) : (
        <Slider {...settings}>
          {slides.map((item) => (
            <div key={item.id} className="slide-item">
              <div className="slide-card w-full h-40 md:h-100">

                <img
                  src={item.image}
                  alt="success story"
                  className="story-image  w-full h-full "
                />

                <button
                  className="play-btn"
                  onClick={() => {
                    setVideoId(item.link);
                    setOpen(true);
                  }}
                >
                  <span>
                    <FaPlay />
                  </span>
                </button>

              </div>
            </div>
          ))}
        </Slider>
      )}

      {/* VIDEO MODAL */}
      <Modal
        isOpen={open}
        onRequestClose={() => {
          setOpen(false);
          setVideoId("");
        }}
        className="video-modal"
        overlayClassName="overlay"
      >
        <button
          className="close-btn"
          onClick={() => {
            setOpen(false);
            setVideoId("");
          }}
        >
          ✕
        </button>

        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          allow="autoplay; encrypted-media"
          allowFullScreen
          title="Success Story Video"
        />
      </Modal>

    </section>
  );
};

export default SuccessStories;