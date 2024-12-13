"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";

const SecondSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
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
    <section ref={sectionRef} className="py-12 px-6 lg:py-16 lg:px-12 bg-white">
      {/* Title */}
      <h2
        className={`text-center text-3xl lg:text-5xl font-marcellus text-[#9A7648] mb-12 transition-all duration-1000 ease-out transform ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
        style={{ transitionDelay: "200ms" }}
      >
        WHAT WE OFFER
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Left: Images */}
        <div
          className={`relative flex justify-center transition-all duration-1000 ease-out transform ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "500ms" }}
        >
          <div className="relative left-[-12%] w-3/4 lg:w-2/3">
            <Image
              src="https://erepros.com/wp-content/uploads/2024/07/pexels-heyho-5997996-1024x683.jpg"
              alt="Property"
              width={1024}
              height={683}
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="absolute bottom-[-40%] right-[-2%] w-3/4 lg:w-2/3">
            <Image
              src="https://erepros.com/wp-content/uploads/2024/07/pexels-rdne-8293773-1024x683.jpg"
              alt="Happy Family"
              width={1024}
              height={683}
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>

        {/* Right: Content */}
        <div className="space-y-8 lg:mt-8 mt-24">
          {/* Property Management */}
          <div
            className={`flex items-start space-x-4 transition-all duration-1000 ease-out transform ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "700ms" }}
          >
            <Image
              src="https://erepros.com/wp-content/uploads/2024/07/Icon5.png"
              alt="Property Management Icon"
              width={40}
              height={40}
              className="w-12 h-12"
            />
            <div>
              <h3 className="text-xl font-semibold text-[#9A7648]">
                PROPERTY MANAGEMENT
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                From comprehensive tenant management to seamless online account
                access for owners and tenants, 24/7 maintenance support, and
                expert tenant placement, we ensure your investment is in the
                best hands.
              </p>
            </div>
          </div>

          {/* HOA */}
          <div
            className={`flex items-start space-x-4 transition-all duration-1000 ease-out transform ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "900ms" }}
          >
            <Image
              src="https://erepros.com/wp-content/uploads/2024/07/Icon60.png"
              alt="HOA Icon"
              width={40}
              height={40}
              className="w-12 h-12"
            />
            <div>
              <h3 className="text-xl font-semibold text-[#9A7648]">HOA</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                From administrative tasks to maintenance coordination, financial
                management, and community engagement, we ensure smooth
                operations and enhanced living experiences for all residents.
              </p>
            </div>
          </div>

          {/* Real Estate */}
          <div
            className={`flex items-start space-x-4 transition-all duration-1000 ease-out transform ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "1100ms" }}
          >
            <Image
              src="https://erepros.com/wp-content/uploads/2024/07/Icon3.png"
              alt="Real Estate Icon"
              width={40}
              height={40}
              className="w-12 h-12"
            />
            <div>
              <h3 className="text-xl font-semibold text-[#9A7648]">
                REAL ESTATE
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Elevate your real estate ventures with our premier services.
                Whether you’re buying, selling, or investing, our expert team
                provides personalized solutions to meet your goals. We turn your
                real estate aspirations into reality.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecondSection;
