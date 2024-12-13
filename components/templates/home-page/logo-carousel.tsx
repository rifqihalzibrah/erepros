"use client";

import React from "react";

const logos = [
  "https://firebasestorage.googleapis.com/v0/b/erepros-35fe1.firebasestorage.app/o/erepros-assets%2FLogo%2Fresized_image_3-qsx2sm15toxz7uywpagm3pc56gz2vakeowskx4jsow.png?alt=media&token=57be097c-06d1-41cf-9e00-58eeceae8854",
  "https://firebasestorage.googleapis.com/v0/b/erepros-35fe1.firebasestorage.app/o/erepros-assets%2FLogo%2Fresized_image_2-qsx2ssm15j6zh4pcmvb035odc62nd6aj1tcza2a1hc.png?alt=media&token=3b624c30-00a8-4cbf-82b8-81ea0a78860c",
  "https://firebasestorage.googleapis.com/v0/b/erepros-35fe1.firebasestorage.app/o/erepros-assets%2FLogo%2Fresized_image_0-qsx2sz6whdfzqefskg5e2m0lhv67v20nepxdn00a9s.png?alt=media&token=3e9cb910-9e76-4358-9670-2c4800276f93",
  "https://firebasestorage.googleapis.com/v0/b/erepros-35fe1.firebasestorage.app/o/erepros-assets%2FLogo%2Fresized_image_1-qsx2svfjq1aufyl96eivsmyr4bor09lq27bfpw5uyo.png?alt=media&token=13c798a8-79c2-4419-9334-dec13fc200d8",
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
