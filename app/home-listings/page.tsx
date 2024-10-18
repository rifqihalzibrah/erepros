"use client";
import { motion } from "framer-motion";
import React from "react";
import { ImagesSliderCustom } from "../../components/ui/images-slider-custom";

export default function HomeListings() {
  const images = [
    "https://images.unsplash.com/photo-1485433592409-9018e83a1f0d?q=80&w=1814&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1483982258113-b72862e6cff6?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1482189349482-3defd547e0e9?q=80&w=2848&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

  return (
    <>
      <ImagesSliderCustom className="h-[40rem]" images={images}>
        <motion.div
          initial={{
            opacity: 0,
            y: -80,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          className="z-50 flex flex-col justify-center items-center"
        >
          <motion.p className="font-bold text-xl md:text-6xl text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 py-4">
            The hero section slideshow <br /> nobody asked for
          </motion.p>
          <button className="px-4 py-2 backdrop-blur-sm border bg-emerald-300/10 border-emerald-500/20 text-white mx-auto text-center rounded-full relative mt-4">
            <span>Join now →</span>
            <div className="absolute inset-x-0  h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-emerald-500 to-transparent" />
          </button>
        </motion.div>
      </ImagesSliderCustom>

      {/* What We Offer Section */}
      <section className="py-16 px-8 md:px-24 bg-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {" "}
            {/* Added 'items-center' */}
            {/* Left Side with Images */}
            <div className="space-y-6">
              <img
                src="https://erepros.com/wp-content/uploads/2024/07/pexels-heyho-5997996-1024x683.jpg"
                alt="Property Image 1"
                className="w-full h-auto object-cover"
              />
              <img
                src="https://erepros.com/wp-content/uploads/2024/07/pexels-rdne-8293773-1024x683.jpg"
                alt="Property Image 2"
                className="w-full h-auto object-cover"
              />
            </div>
            {/* Right Side with Text */}
            <div className="space-y-8">
              <h2 className="text-center text-4xl font-bold text-gray-800 mb-12">
                What We Offer
              </h2>
              <div className="flex items-start space-x-4">
                <div className="text-4xl text-gray-800">
                  {/* Replace with actual icon */}
                  <i className="fas fa-home"></i>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    Property Management
                  </h3>
                  <p className="text-gray-600">
                    From comprehensive tenant management to seamless online
                    account access for owners and tenants, 24/7 maintenance
                    support, and expert tenant placement, we ensure your
                    investment is in the best hands.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="text-4xl text-gray-800">
                  {/* Replace with actual icon */}
                  <i className="fas fa-users"></i>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">HOA</h3>
                  <p className="text-gray-600">
                    From administrative tasks to maintenance coordination,
                    financial management, and community engagement, we ensure
                    smooth operations and enhanced living experiences for all
                    residents.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="text-4xl text-gray-800">
                  {/* Replace with actual icon */}
                  <i className="fas fa-key"></i>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    Real Estate
                  </h3>
                  <p className="text-gray-600">
                    Elevate your real estate ventures with our premier services.
                    Whether you’re buying, selling, or investing, our expert
                    team provides personalized solutions to meet your goals.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
