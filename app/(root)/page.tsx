"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Accordion from "../../components/templates/home-page/Accordion";
import PropertyCarousel from "../../components/templates/home-page/carousel-component"; // Adjust the path based on your folder structure
import LogoCarousel from "../../components/templates/home-page/logo-carousel";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.5, // Reduced delay between animations
      delayChildren: 0.5, // Initial delay
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }, // Smooth easing
  },
};

const images = [
  {
    url: "https://firebasestorage.googleapis.com/v0/b/erepros-35fe1.firebasestorage.app/o/erepros-assets%2FImages%2Fpexels-jonathanborba-5570226-scaled.jpg?alt=media&token=691c14a8-afdc-462a-9f8b-3d8cf931692f",
    text: "LET US HELP YOU FIND YOUR DREAM HOME.",
  },
  {
    url: "https://firebasestorage.googleapis.com/v0/b/erepros-35fe1.firebasestorage.app/o/erepros-assets%2FImages%2Fpexels-curtis-adams-1694007-5178034-scaled.jpg?alt=media&token=9decff42-d8b0-43ec-9e99-b4f2213d593f",
    text: "LET US HELP YOU FIND YOUR DREAM HOME.",
  },
  {
    url: "https://firebasestorage.googleapis.com/v0/b/erepros-35fe1.firebasestorage.app/o/erepros-assets%2FImages%2F446814346_1224622515588256_5530116749449355341_n.jpg?alt=media&token=19fcb75a-5d11-4625-a3d0-75fd80b16f83",
    text: "LET US HELP YOU FIND YOUR DREAM HOME.",
  },
];

interface InViewCounterProps {
  heading: string;
  startNumber: number;
  endNumber: number;
  suffix?: string; // Optional
  highlightedText: string;
  subText: string;
}

const InViewCounter: React.FC<InViewCounterProps> = ({
  heading,
  startNumber,
  endNumber,
  suffix = "",
  highlightedText,
  subText,
}) => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.5,
  });

  return (
    <div ref={ref}>
      {/* Heading */}
      <h2 className="text-2xl md:text-4xl font-marcellus text-gray-900 leading-snug">
        {heading}
      </h2>
      {/* CountUp with Highlighted Text */}
      <h2 className="text-2xl md:text-4xl font-marcellus leading-snug">
        <span className="text-gold">
          {inView && (
            <CountUp
              start={startNumber}
              end={endNumber}
              duration={2}
              suffix={suffix}
            />
          )}
        </span>{" "}
        {highlightedText}
      </h2>
      {/* Subtext */}
      <h2 className="text-2xl md:text-4xl font-marcellus text-gray-900 leading-snug">
        {subText}
      </h2>
    </div>
  );
};

interface Location {
  name: string;
  cx: number;
  cy: number;
  image: string;
  description: string;
}

export default function HomePage() {
  const [activeLocation, setActiveLocation] = useState<Location | null>(null);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const [currentTarget, setCurrentTarget] = useState<SVGCircleElement | null>(
    null
  );

  const locations: Location[] = [
    {
      name: "",
      cx: 436.8, // Adjust coordinates based on the map
      cy: 452,
      image:
        "https://firebasestorage.googleapis.com/v0/b/erepros-35fe1.firebasestorage.app/o/erepros-assets%2FLocations%2FSaginaw.jpg?alt=media&token=bd6e69c3-6382-465d-a23a-97d13efd41bf",
      description:
        "Saginaw is a vibrant city with scenic views and rich history.",
    },
    {
      name: "",
      cx: 304, // Adjust coordinates based on the map
      cy: 650,
      image:
        "https://firebasestorage.googleapis.com/v0/b/erepros-35fe1.firebasestorage.app/o/erepros-assets%2FLocations%2FShiawassee-County.jpg?alt=media&token=505249f7-a8b7-4795-b171-be9846a5af96",
      description:
        "Shiawassee is a vibrant city with scenic views and rich history.",
    },
    {
      name: "",
      cx: 353, // Adjust coordinates based on the map
      cy: 747.5,
      image:
        "https://firebasestorage.googleapis.com/v0/b/erepros-35fe1.firebasestorage.app/o/erepros-assets%2FLocations%2FIngham-County-scaled.jpg?alt=media&token=95d1fedf-3cc2-4ccc-a9b9-3045f7f57556",
      description:
        "Ingham is a vibrant city with scenic views and rich history.",
    },
    {
      name: "",
      cx: 355, // Adjust coordinates based on the map
      cy: 800,
      image:
        "https://firebasestorage.googleapis.com/v0/b/erepros-35fe1.firebasestorage.app/o/erepros-assets%2FLocations%2FAnn-Arbor-MI-scaled.jpg?alt=media&token=a7d88477-dedd-40e4-8d1f-8eb5ed871da8",
      description:
        "Washtenaw is a vibrant city with scenic views and rich history.",
    },
    {
      name: "",
      cx: 915,
      cy: 791.5,
      image:
        "https://firebasestorage.googleapis.com/v0/b/erepros-35fe1.firebasestorage.app/o/erepros-assets%2FLocations%2FWayne-County-1-scaled.jpg?alt=media&token=0c127b09-6284-4c44-b492-50c524f2d195",
      description:
        "Wayne County boasts bustling urban life and cultural landmarks.",
    },
    {
      name: "",
      cx: 927,
      cy: 650,
      image:
        "https://firebasestorage.googleapis.com/v0/b/erepros-35fe1.firebasestorage.app/o/erepros-assets%2FLocations%2FOakland-County-scaled.jpg?alt=media&token=8379093b-ab22-4cab-b0be-808476fdaa47",
      description:
        "Oakland County boasts bustling urban life and cultural landmarks.",
    },
    {
      name: "",
      cx: 823,
      cy: 505,
      image:
        "https://firebasestorage.googleapis.com/v0/b/erepros-35fe1.firebasestorage.app/o/erepros-assets%2FLocations%2FGenesee-County-scaled.jpg?alt=media&token=f27b6023-7c45-4b5d-87ab-12b4496dfb10",
      description:
        "Genesee County boasts bustling urban life and cultural landmarks.",
    },
  ];

  const openPopup = (
    location: Location,
    event: React.MouseEvent<SVGCircleElement>
  ) => {
    if (activeLocation?.name === location.name) {
      // Close the pop-up if the same hotspot is clicked again
      setActiveLocation(null);
      setCurrentTarget(event.target as SVGCircleElement);
      return;
    }

    const rect = (event.target as SVGCircleElement).getBoundingClientRect(); // Get hotspot position
    setPopupPosition({
      x: rect.left + rect.width / 2, // Center horizontally
      y: rect.top + rect.height + 10, // Add a margin below
    }); // Adjust popup position
    setActiveLocation(location); // Set active location
  };

  // Close the pop-up when clicking anywhere outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        !event.target ||
        (!(event.target as HTMLElement).closest(".popup-container") &&
          !(event.target as HTMLElement).closest("circle"))
      ) {
        setActiveLocation(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [activeLocation]);

  useEffect(() => {
    const handleScroll = () => {
      if (currentTarget) {
        const rect = currentTarget.getBoundingClientRect();
        setPopupPosition({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height + 10,
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [currentTarget]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTextAnimating, setIsTextAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTextAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        setIsTextAnimating(false);
      }, 500);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const moveToNext = () => {
    setIsTextAnimating(true); // Trigger text animation
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      setIsTextAnimating(false); // Reset text animation
    }, 500); // Match animation duration
  };

  const moveToPrevious = () => {
    setIsTextAnimating(true); // Trigger text animation
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
      setIsTextAnimating(false); // Reset text animation
    }, 500); // Match animation duration
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-[70vh] md:h-screen w-full overflow-hidden">
        <div className="absolute inset-0 h-full w-full">
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 h-full w-full bg-cover bg-center transition-opacity duration-1000 ${
                index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
              style={{ backgroundImage: `url(${image.url})` }}
            ></div>
          ))}
        </div>
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
          {images.map((image, index) => (
            <h1
              key={index}
              className={`absolute text-center text-2xl md:text-5xl font-marcellus font-thin text-white px-4 transition-all duration-500 ${
                index === currentIndex
                  ? isTextAnimating
                    ? "opacity-0 translate-y-8"
                    : "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              {image.text}
            </h1>
          ))}
        </div>
        <button
          className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 text-white text-2xl md:text-3xl bg-gray-800 bg-opacity-50 px-2 md:px-3 rounded-full"
          onClick={moveToPrevious}
        >
          &#10094;
        </button>
        <button
          className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 text-white text-2xl md:text-3xl bg-gray-800 bg-opacity-50 px-2 md:px-3 rounded-full"
          onClick={moveToNext}
        >
          &#10095;
        </button>
      </div>

      {/* What We Offer Section */}
      <section className="max-w-7xl mx-auto py-16 px-8">
        <motion.div
          className="container mx-auto flex flex-col items-center justify-between gap-8 px-4 md:flex-row"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          {/* Left Animated Image Section */}
          <motion.div
            variants={itemVariants}
            className="relative flex md:w-1/2"
          >
            <div className="absolute top-0 left-0 z-10 w-[70%] translate-y-[-20%] translate-x-[10%] md:translate-x-[40%] rounded-lg shadow-lg">
              <Image
                src="https://firebasestorage.googleapis.com/v0/b/erepros-35fe1.firebasestorage.app/o/erepros-assets%2FImages%2Fpexels-rdne-8293773-1024x683.jpg?alt=media&token=dfbbb393-eddf-4329-8c08-3d1b39956145"
                alt="House"
                width={1024}
                height={683}
                className="rounded-lg"
              />
            </div>
            <div className="absolute bottom-0 right-0 z-0 w-[70%] translate-y-[20%] translate-x-[-70%] md:translate-x-[-40%] rounded-lg shadow-lg">
              <Image
                src="https://firebasestorage.googleapis.com/v0/b/erepros-35fe1.firebasestorage.app/o/erepros-assets%2FImages%2Fpexels-heyho-5997996-1024x683.jpg?alt=media&token=760fd473-3823-4340-8ea0-621f78f402ea"
                alt="Couple taking a selfie"
                width={1024}
                height={683}
                className="rounded-lg"
              />
            </div>
          </motion.div>

          {/* Right Animated Content Section */}
          <motion.div className="md:w-1/2" variants={containerVariants}>
            {/* Heading */}
            <motion.h2
              variants={itemVariants}
              className="mb-8 text-3xl font-marcellus font-thin text-gold md:text-4xl"
            >
              WHAT WE OFFER
            </motion.h2>

            {/* PROPERTY MANAGEMENT */}
            <motion.div
              variants={itemVariants}
              className="flex items-start gap-4 mb-6"
            >
              <div className="flex-shrink-0">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/erepros-35fe1.firebasestorage.app/o/erepros-assets%2FIcons%2FIcon5.png?alt=media&token=83d5764e-c8d2-43d1-8c8b-9eb389a43679"
                  alt="Property Management"
                  className="h-12 w-12"
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gold">
                  PROPERTY MANAGEMENT
                </h3>
                <p className="text-gray-600">
                  From comprehensive tenant management to seamless online
                  account access for owners and tenants, 24/7 maintenance
                  support, and expert tenant placement, we ensure your
                  investment is in the best hands.
                </p>
              </div>
            </motion.div>

            {/* HOA */}
            <motion.div
              variants={itemVariants}
              className="flex items-start gap-4 mb-6"
            >
              <div className="flex-shrink-0">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/erepros-35fe1.firebasestorage.app/o/erepros-assets%2FIcons%2FIcon60.png?alt=media&token=69da163a-11da-4d0d-87b8-30c893cdbfc0"
                  alt="HOA"
                  className="h-12 w-12"
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gold">HOA</h3>
                <p className="text-gray-600">
                  From administrative tasks to maintenance coordination,
                  financial management, and community engagement, we ensure
                  smooth operations and enhanced living experiences for all
                  residents.
                </p>
              </div>
            </motion.div>

            {/* REAL ESTATE */}
            <motion.div
              variants={itemVariants}
              className="flex items-start gap-4"
            >
              <div className="flex-shrink-0">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/erepros-35fe1.firebasestorage.app/o/erepros-assets%2FIcons%2FIcon3.png?alt=media&token=76d14556-47ed-4dec-8e48-a5e3b115b841"
                  alt="Real Estate"
                  className="h-12 w-12"
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gold">REAL ESTATE</h3>
                <p className="text-gray-600">
                  Elevate your real estate ventures with our premier services.
                  Whether you&apos;re buying, selling, or investing, our expert
                  team provides personalized solutions to meet your goals. We
                  turn your real estate aspirations into reality.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Statistics Section */}
      <section className="bg-white py-24 flex flex-col items-center justify-center text-center">
        <motion.div
          className="space-y-8 max-w-4xl"
          initial="hidden"
          whileInView="visible"
          variants={containerVariants}
          viewport={{ once: true, amount: 0.5 }}
        >
          {/* 1. OWNING AND MANAGING OVER */}
          <motion.div variants={itemVariants}>
            <h2 className="text-2xl md:text-4xl font-marcellus text-gray-900 leading-snug">
              OWNING AND MANAGING OVER
            </h2>
          </motion.div>

          {/* 2. 2,000+ PROPERTIES ACROSS */}
          <motion.div variants={itemVariants}>
            <h2 className="text-2xl md:text-4xl font-marcellus leading-snug">
              <span className="text-gold">
                <CountUp start={1990} end={2000} duration={2} suffix="+" />
              </span>{" "}
              PROPERTIES ACROSS
            </h2>
          </motion.div>

          {/* 3. MICHIGAN */}
          <motion.div variants={itemVariants}>
            <h2 className="text-2xl md:text-4xl font-marcellus text-gray-900 leading-snug">
              MICHIGAN
            </h2>
          </motion.div>

          {/* 4. STARTED IN 2005, WITH OVER */}
          <motion.div variants={itemVariants}>
            <h2 className="text-2xl md:text-4xl font-marcellus text-gray-900 leading-snug">
              STARTED IN 2005, WITH OVER
            </h2>
          </motion.div>

          {/* 5. 20+ YEARS */}
          <motion.div variants={itemVariants}>
            <h2 className="text-2xl md:text-4xl font-marcellus leading-snug">
              <span className="text-gold">
                <CountUp start={10} end={20} duration={2} suffix="+" />
              </span>{" "}
              YEARS
            </h2>
          </motion.div>

          {/* 6. OF EXPERIENCE */}
          <motion.div variants={itemVariants}>
            <h2 className="text-2xl md:text-4xl font-marcellus text-gray-900 leading-snug">
              OF EXPERIENCE
            </h2>
          </motion.div>
        </motion.div>
      </section>

      {/* Interior Section */}
      <section className="relative h-[500px] w-full bg-gray-100 overflow-hidden">
        <div
          className="absolute inset-0 bg-fixed bg-center bg-cover"
          style={{
            backgroundImage: `url('https://firebasestorage.googleapis.com/v0/b/erepros-35fe1.firebasestorage.app/o/erepros-assets%2FImages%2Fpexels-jonathanborba-5570222-1-scaled.jpg?alt=media&token=a457d134-905f-4ce4-a1ff-1442706fa4b1')`,
          }}
        ></div>
      </section>

      {/* Map Section */}
      <section className="max-w-7xl mx-auto py-16 px-8 transition-opacity duration-1000 relative bg-white">
        <div className="mx-auto flex flex-col items-center justify-between md:flex-row">
          {/* Left Text Content */}
          <div className="md:w-1/2">
            <h2 className="mb-4 text-2xl font-marcellus text-black md:text-3xl">
              Elite Real Estate & Professional Management
              <span className="text-gold">
                {" "}
                specializes in single-family houses, condos, storage units,
                multi-family buildings, and commercial.
              </span>
            </h2>
          </div>

          {/* Right Map Content */}
          <div className="relative md:w-1/2">
            {/* Map Image */}
            <img
              src="https://firebasestorage.googleapis.com/v0/b/erepros-35fe1.firebasestorage.app/o/erepros-assets%2FLocations%2FMAP-Newest-2-cropped-1024x920.jpg?alt=media&token=20e03d6a-62d7-4059-a9b9-5c55183e4bd3"
              alt="Map of Michigan"
              className="rounded-lg"
            />

            {/* SVG Overlay */}
            <svg
              className="absolute inset-0 w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1024 920"
            >
              {locations.map((location, index) => (
                <g key={index}>
                  {/* Hotspot */}
                  <circle
                    cx={location.cx}
                    cy={location.cy}
                    r="15"
                    className="fill-gold opacity-100 hover:opacity-100 cursor-pointer"
                    onClick={(e) => openPopup(location, e)}
                  />
                  {/* Label */}
                  <text
                    x={location.cx + 30}
                    y={location.cy}
                    className="text-sm fill-black font-semibold"
                  >
                    {location.name.toUpperCase()}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </div>

        {/* Pop-Up */}
        {activeLocation && (
          <div
            className="fixed popup-container z-50 w-64 bg-white rounded-lg shadow-lg p-4"
            style={{
              left: `${popupPosition.x}px`,
              top: `${popupPosition.y}px`,
            }}
          >
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={() => setActiveLocation(null)}
            >
              &times;
            </button>
            <h3 className="text-xl font-bold text-yellow-600 mb-2">
              {activeLocation.name}
            </h3>
            <img
              src={activeLocation.image}
              alt={activeLocation.name}
              className="rounded-lg h-32 w-full object-cover mb-2"
            />
            <p className="text-gray-600 text-sm">
              {activeLocation.description}
            </p>
          </div>
        )}
      </section>

      {/* Other sections... */}
      <section className="bg-white py-16">
        <h2 className="text-center text-3xl font-marcellus text-black mb-8">
          Counties We Serve
        </h2>
        <Accordion />
      </section>
      {/* Other sections... */}

      {/* Other sections */}
      <section className="max-w-7xl mx-auto py-16 px-8 transition-opacity duration-1000">
        <LogoCarousel />
      </section>
      {/* Other sections */}

      {/* 8 sections of the home page */}
      <section className="max-w-7xl mx-auto py-16 transition-opacity duration-1000">
        <h2 className="font-marcellus text-3xl text-center mb-8">
          Featured Rentals
        </h2>
        <PropertyCarousel />
      </section>

      <section className="max-w-7xl mx-auto pb-16 transition-opacity duration-1000">
        <PropertyCarousel filterType="Other" />
      </section>
    </div>
  );
}
