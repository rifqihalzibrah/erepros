"use client";

import React, { useEffect, useRef, useState } from "react";

const Overview = () => {
  // State for each section visibility
  const [isSection1Visible, setIsSection1Visible] = useState(false);
  const [isSection2Visible, setIsSection2Visible] = useState(false);

  const section1Ref = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);

  // Reusable function to handle Intersection Observer
  const handleVisibilityChange = (
    ref: React.RefObject<HTMLDivElement>,
    setVisibility: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisibility(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  };

  useEffect(() => {
    const cleanup1 = handleVisibilityChange(section1Ref, setIsSection1Visible);
    const cleanup2 = handleVisibilityChange(section2Ref, setIsSection2Visible);

    return () => {
      cleanup1?.();
      cleanup2?.();
    };
  }, []);

  return (
    <>
      {/* First Section */}
      <div className="pt-[136px] bg-white">
        <section
          ref={section1Ref}
          className={`py-6 transition-all duration-1000 transform ${
            isSection1Visible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-12"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between">
            {/* Text Section */}
            <div className="w-full lg:w-1/2 text-center lg:text-left lg:pr-8 lg:order-1 order-2">
              <h1 className="text-2xl lg:text-4xl font-marcellus text-gold mb-10 text-center hidden lg:block">
                PROPERTY MANAGEMENT
              </h1>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div>
                  <h2 className="text-xl font-thin tracking-wide text-gold font-marcellus uppercase mb-4">
                    Comprehensive Tenant Management Services:
                  </h2>
                  <p className="leading-relaxed text-justify">
                    As your dedicated property management company, we handle all
                    aspects of tenant management, including addressing tenant
                    concerns, rent collection, maintenance & repairs, city &
                    township inspections, and the careful screening and
                    placement of new tenants.
                  </p>
                </div>
                <div>
                  <h2 className="text-xl font-thin tracking-wide text-gold font-marcellus uppercase mb-4">
                    Online Account Management for Owners and Tenants:
                  </h2>
                  <p className="leading-relaxed text-justify">
                    Our user-friendly online portal serves both property owners
                    and tenants alike. Tenants benefit from convenient features
                    such as rent payments, maintenance requests, access to lease
                    agreements, and tracking of payment history.
                  </p>
                </div>
              </div>
            </div>
            {/* Image Section */}
            <div className="w-full lg:w-1/2 mt-12 lg:mt-0  lg:order-2 order-1 mb-6">
              <h2 className="font-marcellus lg:hidden text-3xl text-[#917648] mb-6 text-center">
                PROPERTY MANAGEMENT
              </h2>
              <img
                src="https://firebasestorage.googleapis.com/v0/b/erepros-35fe1.firebasestorage.app/o/erepros-assets%2FImages%2Fpexels-thirdman-8469939-scaled.jpg?alt=media&token=cbe1a0b9-43b8-446c-a21b-bbdf65087ac1"
                alt="Property Management"
                className="rounded-lg shadow-lg w-full h-[80vh]"
              />
            </div>
          </div>
        </section>

        {/* Second Section */}
        <section
          ref={section2Ref}
          className={`py-6 transition-all duration-1000 transform ${
            isSection2Visible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-12"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between">
            {/* Text Section */}
            <div className="w-full lg:w-1/2 text-center lg:text-left lg:order-2">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div>
                  <h2 className="text-xl font-thin tracking-wide text-gold font-marcellus uppercase mb-4">
                    24/7 Maintenance Support:
                  </h2>
                  <p className="leading-relaxed text-justify">
                    We offer round-the-clock maintenance assistance for tenants,
                    ensuring prompt resolution of any issues that may arise with
                    your rental property.
                  </p>
                </div>
                <div>
                  <h2 className="text-xl font-thin tracking-wide text-gold font-marcellus uppercase mb-4">
                    Expert Tenant Placement Services:
                  </h2>
                  <p className="leading-relaxed text-justify">
                    From advertising your property and conducting showings to
                    thorough tenant screening and lease creation, we handle
                    every step of the process.
                  </p>
                </div>
              </div>
              <div className="mt-12">
                <h2 className="text-xl font-thin tracking-wide text-gold font-marcellus uppercase mb-4">
                  Transforming Properties for Profit:
                </h2>
                <p className="leading-relaxed text-justify">
                  Our Full-Service Property Management Company Goes Beyond Just
                  Management – We’re Your Partners in Property Flipping Success!
                </p>
              </div>
            </div>
            {/* Image Section */}
            <div className="w-full lg:w-1/2 mb-12 lg:mb-0 lg:mr-8 lg:order-1 mt-12 lg:mt-0">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/erepros-35fe1.firebasestorage.app/o/erepros-assets%2FImages%2Fpexels-orlovamaria-4913437-scaled.jpg?alt=media&token=7ba90c47-93e2-4f6b-9b7f-1159fa4939c1"
                alt="Maintenance Support"
                className="rounded-lg shadow-lg w-full h-[80vh]"
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Overview;
