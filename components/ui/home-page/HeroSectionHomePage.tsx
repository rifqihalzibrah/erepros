"use client";

import { useState, useEffect } from "react";

const images = [
  {
    url: "https://firebasestorage.googleapis.com/v0/b/erepros-35fe1.firebasestorage.app/o/erepros-assets%2FImages%2Fpexels-jonathanborba-5570226-scaled.jpg?alt=media&token=691c14a8-afdc-462a-9f8b-3d8cf931692f",
    text: "LET US HELP YOU FIND YOUR DREAM HOME.",
  },
  {
    url: "https://firebasestorage.googleapis.com/v0/b/erepros-35fe1.firebasestorage.app/o/erepros-assets%2FImages%2Fpexels-curtis-adams-1694007-5178034-scaled.jpg?alt=media&token=9decff42-d8b0-43ec-9e99-b4f2213d593f",
    text: "LET US HELP YOU FIND YOUR DREAM HOME.",
  },
  {
    url: "https://firebasestorage.googleapis.com/v0/b/erepros-35fe1.firebasestorage.app/o/erepros-assets%2FImages%2F446814346_1224622515588256_5530116749449355341_n.jpg?alt=media&token=19fcb75a-5d11-4625-a3d0-75fd80b16f83",
    text: "LET US HELP YOU FIND YOUR DREAM HOME.",
  },
];

const HeroSectionHomePage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTextAnimating, setIsTextAnimating] = useState(false);

  const nextSlide = () => {
    setIsTextAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
      setIsTextAnimating(false);
    }, 500);
  };

  const prevSlide = () => {
    setIsTextAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
      setIsTextAnimating(false);
    }, 500);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[100vh] md:h-screen w-full overflow-hidden">
      {/* Image Background */}
      <div className="absolute inset-0 h-full w-full">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 h-full w-full bg-cover bg-center transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
            style={{ backgroundImage: `url(${image.url})` }}
          ></div>
        ))}
      </div>

      {/* Text Overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 px-4">
        <h1
          className={`text-center text-2xl md:text-5xl font-newsreader font-thin text-white leading-snug transition-all duration-700 ${
            isTextAnimating
              ? "opacity-0 translate-y-8"
              : "opacity-100 translate-y-0"
          }`}
        >
          {/* First Line: Different for Mobile and Larger Screens */}
          <span className="block lg:hidden font-normal">
            Let Us Help You Find
          </span>
          <span className="hidden lg:inline font-normal">
            Let Us Help You Find Your
          </span>
          {/* Second Line */}
          <span className="hidden lg:block font-normal">Dream Home</span>
          <span className="block lg:hidden font-normal">Your Dream Home</span>
        </h1>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 bg-transparent hover:bg-opacity-20 text-white p-2 md:p-4 rounded-full flex items-center justify-center transition duration-300"
        aria-label="Previous Slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="white"
          className="w-8 h-8 md:w-10 md:h-10"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 bg-transparent hover:bg-opacity-20 text-white p-2 md:p-4 rounded-full flex items-center justify-center transition duration-300"
        aria-label="Next Slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="white"
          className="w-8 h-8 md:w-10 md:h-10"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default HeroSectionHomePage;
