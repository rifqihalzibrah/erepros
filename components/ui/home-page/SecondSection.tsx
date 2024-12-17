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
    <section
      ref={sectionRef}
      className="px-6  py-12  lg:py-16 lg:px-12 bg-white"
    >
      {/* Title */}
      <h2
        className={`text-center text-3xl lg:text-5xl font-newsreader text-[#bfaf9e] mb-12 transition-all duration-1000 ease-out transform ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
        style={{ transitionDelay: "200ms" }}
      >
        Our Specialty
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
              src="https://firebasestorage.googleapis.com/v0/b/erepros-35fe1.firebasestorage.app/o/erepros-assets%2FImages%2Fpexels-heyho-5997996-1024x683.jpg?alt=media&token=760fd473-3823-4340-8ea0-621f78f402ea"
              alt="Property"
              width={1024}
              height={683}
              // className="rounded-lg shadow-lg"
            />
          </div>
          <div className="absolute bottom-[-40%] right-[-2%] w-3/4 lg:w-2/3">
            <Image
              src="https://firebasestorage.googleapis.com/v0/b/erepros-35fe1.firebasestorage.app/o/erepros-assets%2FImages%2Fpexels-rdne-8293773-1024x683.jpg?alt=media&token=dfbbb393-eddf-4329-8c08-3d1b39956145"
              alt="Happy Family"
              width={1024}
              height={683}
              // className="rounded-lg shadow-lg"
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
            {/* <Image
              src="https://firebasestorage.googleapis.com/v0/b/erepros-35fe1.firebasestorage.app/o/erepros-assets%2FIcons%2FIcon5.png?alt=media&token=83d5764e-c8d2-43d1-8c8b-9eb389a43679"
              alt="Property Management Icon"
              width={40}
              height={40}
              className="w-12 h-12"
            /> */}
            <div>
              <h3 className="text-xl font-normal text-gold pb-2">
                Property Management
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed text-justify">
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
            {/* <Image
              src="https://firebasestorage.googleapis.com/v0/b/erepros-35fe1.firebasestorage.app/o/erepros-assets%2FIcons%2FIcon60.png?alt=media&token=69da163a-11da-4d0d-87b8-30c893cdbfc0"
              alt="HOA Icon"
              width={40}
              height={40}
              className="w-12 h-12"
            /> */}
            <div>
              <h3 className="text-xl font-normal text-gold pb-2">HOA</h3>
              <p className="text-gray-600 text-sm leading-relaxed text-justify">
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
            {/* <Image
              src="https://firebasestorage.googleapis.com/v0/b/erepros-35fe1.firebasestorage.app/o/erepros-assets%2FIcons%2FIcon3.png?alt=media&token=76d14556-47ed-4dec-8e48-a5e3b115b841"
              alt="Real Estate Icon"
              width={40}
              height={40}
              className="w-12 h-12"
            /> */}
            <div>
              <h3 className="text-xl font-normal text-gold pb-2">
                Real Estate
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed text-justify">
                Elevate your real estate ventures with our premier services.
                Whether you&apos;re buying, selling, or investing, our expert
                team provides personalized solutions to meet your goals. We turn
                your real estate aspirations into reality.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecondSection;
