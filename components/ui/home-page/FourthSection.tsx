"use client";

import { useEffect, useState } from "react";

const FourthSection = () => {
  const [scrollPos, setScrollPos] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

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
        className="absolute inset-0 w-full h-full bg-fixed bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url("https://firebasestorage.googleapis.com/v0/b/erepros-35fe1.firebasestorage.app/o/erepros-assets%2FImages%2Fpexels-jonathanborba-5570222-1-scaled.jpg?alt=media&token=a457d134-905f-4ce4-a1ff-1442706fa4b1")`,
          backgroundPosition: `center ${50 - scrollPos * 0.1}%`,
        }}
      ></div>
    </section>
  );
};

export default FourthSection;
