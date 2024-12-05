"use client";

import React from "react";

const logos = [
  "https://erepros.com/wp-content/uploads/elementor/thumbs/resized_image_3-qsx2sm15toxz7uywpagm3pc56gz2vakeowskx4jsow.png",
  "https://erepros.com/wp-content/uploads/elementor/thumbs/resized_image_2-qsx2ssm15j6zh4pcmvb035odc62nd6aj1tcza2a1hc.png",
  "https://erepros.com/wp-content/uploads/elementor/thumbs/resized_image_0-qsx2sz6whdfzqefskg5e2m0lhv67v20nepxdn00a9s.png",
  "https://erepros.com/wp-content/uploads/elementor/thumbs/resized_image_1-qsx2svfjq1aufyl96eivsmyr4bor09lq27bfpw5uyo.png",
];

export default function LogoCarousel() {
  return (
    <div className="relative overflow-hidden bg-white py-4">
      {/* Carousel Wrapper */}
      <div className="carousel flex animate-scroll">
        {[...logos, ...logos].map((logo, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-1/2 flex justify-center items-center border-l-2 border-gray-200 p-4"
          >
            <img
              src={logo}
              alt={`Logo ${index + 1}`}
              className="h-24 object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
