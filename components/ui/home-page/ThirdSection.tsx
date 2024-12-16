"use client";

import { useState, useEffect, useRef } from "react";
import CountUp from "react-countup";

interface AnimatedTextProps {
  text: string;
  delayBase?: number;
  isVisible: boolean;
}

const AnimatedText = ({
  text,
  delayBase = 0,
  isVisible,
}: AnimatedTextProps) => {
  const words = text.split(" ");

  return (
    <div className="flex justify-center md:inline-block">
      {words.map((word, index) => (
        <span
          key={index}
          className={`inline-block transition-all duration-700 ease-out transform text-xl sm:text-2xl md:text-3xl lg:text-4xl font-newsreader text-center md:text-left ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: `${delayBase + index * 100}ms` }}
        >
          {word}&nbsp;
        </span>
      ))}
    </div>
  );
};

const ThirdSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [startCount, setStartCount] = useState(false);
  const [startSecondCount, setStartSecondCount] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          setTimeout(() => setStartCount(true), 1000); // Start first count after 1s
          setTimeout(() => setStartSecondCount(true), 2500); // Start second count after 2s
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-12 px-4 sm:py-16 sm:px-6 lg:px-12 bg-white text-center space-y-16"
    >
      {/* First Row */}
      <div className="space-y-4">
        <AnimatedText
          text="OWNING AND MANAGING OVER"
          delayBase={0}
          isVisible={isVisible}
        />
        <div className="flex flex-col justify-center items-center">
          {/* Mobile View */}
          <div className="md:hidden flex flex-col items-center space-y-2">
            <span
              className={`block text-4xl sm:text-5xl  text-[#bfaf9e] transition-all duration-700 ease-out transform ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "1000ms" }}
            >
              {startCount && <CountUp start={0} end={2000} duration={2} />}+
            </span>
            <AnimatedText
              text="PROPERTIES ACROSS MICHIGAN"
              delayBase={1200}
              isVisible={isVisible}
            />
          </div>

          {/* Desktop View */}
          <div className="hidden md:block space-y-2">
            <div className="flex justify-center items-baseline">
              <span
                className={`text-4xl sm:text-5xl lg:text-4xl italic text-[#bfaf9e] transition-all duration-700 ease-out transform ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: "1000ms" }}
              >
                {startCount && <CountUp start={0} end={2000} duration={2} />}+
              </span>
              <AnimatedText
                text=" PROPERTIES ACROSS MICHIGAN"
                delayBase={1200}
                isVisible={isVisible}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Second Row */}
      <div className="space-y-4">
        <AnimatedText
          text="STARTED IN 2005, WITH OVER"
          delayBase={2000}
          isVisible={isVisible}
        />
        <div className="flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-2">
          <span
            className={`text-4xl sm:text-5xl italic lg:text-4xl text-[#bfaf9e] transition-all duration-700 ease-out transform ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "2300ms" }}
          >
            {startSecondCount && <CountUp start={0} end={20} duration={2} />}+
          </span>
          <span className="italic text-gold">
            <AnimatedText
              text="OF EXPERIENCE"
              delayBase={2400}
              isVisible={isVisible}
            />
          </span>
        </div>
      </div>
    </section>
  );
};

export default ThirdSection;
