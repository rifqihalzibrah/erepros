"use client";

import AnimatedSection from "@/components/ui/AnimatedSection";
import React, { useState, useEffect, useRef } from "react";

const TenantServiceRequest = () => {

  return (
    <main className="pt-[136px] bg-white">
      {/* Third Section */}
      <AnimatedSection>

      <section
        className={`flex flex-col md:flex-row items-center justify-center px-6 md:px-20 py-10 bg-white min-h-screen transition-opacity duration-1000 transform`}
        >
        {/* Left Side: Text Content */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-start text-left px-4 md:pr-10">
          <h2 className="text-4xl font-serif text-[#9A7648] mb-6 uppercase">
            Tenant Service Request
          </h2>
          <p className="text-gray-600 mb-6">
            Elite Real Estate & Professional Management Moving In or Out Forms:
          </p>
          <ul className="list-disc list-inside text-gray-600 mb-6">
            <li>
                Take at least two pictures of each item you are requesting service for and text them to (810) 715-5486
            </li>
            <li>
                Give as much of a detailed description as possible.
            </li>
          </ul>
          <p className="text-gray-600 mb-6 text-justify">
            We will try our best to accommodate your schedule, however our technicians work 9am-7pm and it is important to us to address each and every maintenance request in a reasonable amount of time. If you choose not to be present, you are giving our service team permission to enter and resolve the issues when their schedule allows.
            
          </p>
          <p className="text-gray-600 text-justify">
            If you will not be home, we will have a key to enter. In addition, if you will not be home all animals need to be secured. Please let us know if there are going to be minors present, as we cannot enter unless there is someone over 18 present with them.
          </p>
        </div>

        {/* Right Side: Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src="https://erepros.com/wp-content/uploads/2024/07/pexels-cottonbro-4568697-1-1024x683.jpg"
            alt="Family moving out"
            className="w-full h-auto object-cover rounded-lg"
            />
        </div>
      </section>
    </AnimatedSection>

      {/* Fourth Section */}
      <AnimatedSection>
      <section
        className={`flex flex-col md:flex-row items-center justify-center px-6 md:px-20 py-10 bg-white min-h-screen transition-opacity duration-1000 transform`}
        >

        {/* Left Side: Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src="https://erepros.com/wp-content/uploads/2024/07/pexels-cottonbro-4569340-1-1024x683.jpg"
            alt="Family key turn-in"
            className="w-full h-auto object-cover rounded-lg"
            />
        </div>

        {/* Right Side: Text Content */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-start text-left md:pl-10 px-4">
          <h3 className="text-xl font-serif text-[#9A7648] mb-4">
            Emergency Situations
          </h3>
          <p className="text-gray-600 mb-6 text-justify">
            If you are reporting lack of heat during outdoor temperatures lower than 50° or an active water leak outside of normal business hours please, call our 24/7 emergency service line at (810) 715-5486.
          </p>
                    <h3 className="text-xl font-serif text-[#9A7648] mb-4">
            If You Smell or Suspect a Natural Gas Leak

          </h3>
          <p className="text-gray-600 mb-6 text-justify">
            If you are reporting lack of heat during outdoor temperatures lower than 50° or an active water leak outside of normal business hours please, call our 24/7 emergency service line at (810) 715-5486.
          </p>
        <ul className="list-disc list-inside text-gray-600 mb-6">
            <li>
                Leave the area immediately.
            </li>
            <li>
                Go to an outside location where you can no longer smell natural gas.
            </li>
            <li>
                Call the DTE dedicated natural gas leak hotline 24/7 at 800-947-5000.
            </li>
            <li>
                Or Consumers Energy gas leak hotline 24/7 at 800-477-5050.
            </li>
          </ul>
        </div>
      </section>
    </AnimatedSection>
    </main>
  );
};

export default TenantServiceRequest;
