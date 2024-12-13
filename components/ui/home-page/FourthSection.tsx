"use client";

import { useState, useEffect, useRef } from "react";

const FourthSection = () => {
  const [scrollPos, setScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPos(window.pageYOffset);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative h-[50vh] overflow-hidden">
      {/* Parallax Image */}
      <div
        className="absolute inset-0 w-full h-full bg-fixed"
        style={{
          backgroundImage: `url("https://erepros.com/wp-content/uploads/2024/08/pexels-jonathanborba-5570222-1-scaled.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: `center ${50 - scrollPos * 0.1}%`, // Moves background image
          backgroundRepeat: "no-repeat",
        }}
      ></div>
    </section>
  );
};

export default FourthSection;
