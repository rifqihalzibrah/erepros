"use client";

import React, { useState, useEffect, useRef } from "react";

const MoveInMoveOutSection = () => {
  // Define state for each section visibility
  const [isSection1Visible, setIsSection1Visible] = useState(false);
  const [isSection2Visible, setIsSection2Visible] = useState(false);
  const [isSection3Visible, setIsSection3Visible] = useState(false);
  const [isSection4Visible, setIsSection4Visible] = useState(false);
  const section1Ref = useRef<HTMLElement | null>(null);
  const section2Ref = useRef<HTMLElement | null>(null);
  const section3Ref = useRef<HTMLElement | null>(null);
  const section4Ref = useRef<HTMLElement | null>(null);

  // Function to handle visibility change for each section
  const handleVisibilityChange = (
    ref: React.RefObject<HTMLElement>,
    setVisibility: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisibility(entry.isIntersecting);
      },
      { threshold: 0.3 }
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
    const cleanupFns = [
      handleVisibilityChange(section1Ref, setIsSection1Visible),
      handleVisibilityChange(section2Ref, setIsSection2Visible),
      handleVisibilityChange(section3Ref, setIsSection3Visible),
      handleVisibilityChange(section4Ref, setIsSection4Visible),
    ];

    // Cleanup observers on unmount
    return () => {
      cleanupFns.forEach((cleanup) => cleanup && cleanup());
    };
  }, []);

  return (
    <main className="pt-[136px] bg-white">
      {/* First Section */}
      <section
        ref={section1Ref}
        className={`flex justify-center items-center h-40 bg-white transition-opacity duration-1000 transform ${
          isSection1Visible ? "opacity-100 fade-up-1s" : "opacity-0"
        }`}
      >
        <h1 className="text-4xl md:text-5xl font-serif text-[#9A7648]">
          MOVING IN OR OUT
        </h1>
      </section>

      {/* Second Section */}
      <section
        ref={section2Ref}
        className={`flex flex-col md:flex-row items-center justify-center px-6 md:px-20 py-10 bg-white min-h-screen transition-opacity duration-1000 transform ${
          isSection2Visible ? "opacity-100 fade-up-1s" : "opacity-0"
        }`}
      >
        {/* Left Side: Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/erepros-35fe1.firebasestorage.app/o/erepros-assets%2FImages%2Fpexels-mart-production-7415039-1-1024x683.jpg?alt=media&token=f773b599-6138-400d-855d-cb2e795d9ed7"
            alt="Family moving in"
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>

        {/* Right Side: Centered Text */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-start text-left md:pl-10 px-4">
          <h2 className="text-4xl font-serif text-[#9A7648] mb-6">MOVING IN</h2>
          <p className="text-gray-600 mb-6 text-justify">
            Rental Property Inspection New renters of an apartment, house, or
            condo must complete and submit a{" "}
            <a href="#" className="text-[#9A7648] underline">
              Rental Property Inspection form
            </a>
            . This form can be filled out online, printed, and faxed or mailed.
          </p>
          <h3 className="text-xl font-serif text-[#9A7648] mb-4">
            TENANT UPDATE RESPONSIBILITY
          </h3>
          <p className="text-gray-600 text-justify">
            Tenants must{" "}
            <a href="#" className="text-[#9A7648] underline">
              notify
            </a>{" "}
            Elite Real Estate & Professional Management of any changes,
            including new roommates, long-term guests (staying longer than 2
            weeks), pets, phone number changes, and email address updates.
            Please include your address, property, and unit number for reference
            when providing updates.
          </p>
        </div>
      </section>

      {/* Third Section */}
      <section
        ref={section3Ref}
        className={`flex flex-col md:flex-row items-center justify-center px-6 md:px-20 py-10 bg-white min-h-screen transition-opacity duration-1000 transform ${
          isSection3Visible ? "opacity-100 fade-up-1s" : "opacity-0"
        }`}
      >
        {/* Left Side: Text Content */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-start text-left px-4 md:pr-10">
          <h2 className="text-4xl font-serif text-[#9A7648] mb-6">
            MOVING OUT
          </h2>
          <p className="text-gray-600 mb-6">
            <strong>WE NEED A 30 DAY WRITTEN NOTICE FOR A MOVE OUT.</strong>
          </p>
          <h3 className="text-xl font-serif text-[#9A7648] mb-4">
            SECURITY DEPOSIT INFORMATION
          </h3>
          <p className="text-gray-600 mb-6 text-justify">
            Your security deposit statement will be mailed within 14 days of{" "}
            <a href="#" className="text-[#9A7648] underline">
              returning your keys
            </a>{" "}
            to the corporate office. Checks will not be mailed without a
            forwarding address. We need a forwarding address before/after move
            out. Please review our{" "}
            <a href="#" className="text-[#9A7648] underline">
              Security Deposit Instructions
            </a>{" "}
            form for details.
          </p>
          <h3 className="text-xl font-serif text-[#9A7648] mb-4">
            CLEANING CHECKLIST
          </h3>
          <p className="text-gray-600 text-justify">
            Ensure your apartment, house, or condo is in the same condition, or
            better, than when you moved in. Use the Cleaning Checklist to
            thoroughly clean your unit and double-check that nothing is left
            behind.
          </p>
        </div>

        {/* Right Side: Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/erepros-35fe1.firebasestorage.app/o/erepros-assets%2FImages%2Fpexels-cottonbro-4568697-1-1024x683.jpg?alt=media&token=3d090e30-ef4e-4b3b-aec8-3ca730fee2be"
            alt="Family moving out"
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>
      </section>

      {/* Fourth Section */}
      <section
        ref={section4Ref}
        className={`flex flex-col md:flex-row items-center justify-center px-6 md:px-20 py-10 bg-white min-h-screen transition-opacity duration-1000 transform ${
          isSection4Visible ? "opacity-100 fade-up-1s" : "opacity-0"
        }`}
      >
        {/* Left Side: Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/erepros-35fe1.firebasestorage.app/o/erepros-assets%2FImages%2Fpexels-cottonbro-4569340-1-1024x683.jpg?alt=media&token=f97a0d81-cda7-4c02-9146-adb72b273409"
            alt="Family key turn-in"
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>

        {/* Right Side: Text Content */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-start text-left md:pl-10 px-4">
          <h3 className="text-xl font-serif text-[#9A7648] mb-4">
            KEY TURN-IN FORM
          </h3>
          <p className="text-gray-600 mb-6 text-justify">
            After cleaning your unit and removing all your belongings, submit
            your keys along with the{" "}
            <a href="#" className="text-[#9A7648] underline">
              Key Turn-In form
            </a>
            . You can turn in your keys in person at the office or use the drop
            box available on weekends. Rent is charged daily until all unit keys
            are returned to the corporate office. You can schedule the move-out
            walkthrough when submitting the move-out form.
          </p>
          <p className="text-gray-600 mb-4">
            Elite Real Estate & Professional Management Moving In or Out Forms:
          </p>
          <ul className="list-disc list-inside text-gray-600">
            <li>
              <a href="#" className="text-[#9A7648] underline">
                Security Deposit Instructions
              </a>
            </li>
            <li>
              <a href="#" className="text-[#9A7648] underline">
                Inspection of Rental
              </a>
            </li>
            <li>
              <a href="#" className="text-[#9A7648] underline">
                Key Turn In Directions
              </a>
            </li>
            <li>
              <a href="#" className="text-[#9A7648] underline">
                Cleaning Checklist
              </a>
            </li>
            <li>
              <a href="#" className="text-[#9A7648] underline">
                30 Day Notice to Vacate
              </a>
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
};

export default MoveInMoveOutSection;
