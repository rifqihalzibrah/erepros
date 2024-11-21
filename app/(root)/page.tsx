"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Accordion from "../../components/templates/home-page/Accordion";
import LogoCarousel from "../../components/templates/home-page/logo-carousel";
import PropertyCarousel from "../../components/templates/home-page/carousel-component"; // Adjust the path based on your folder structure

const images = [
  {
    url: "https://erepros.com/wp-content/uploads/2024/08/pexels-jonathanborba-5570226-scaled.jpg",
    text: "LET US HELP YOU FIND YOUR DREAM HOME.",
  },
  {
    url: "https://erepros.com/wp-content/uploads/2024/08/pexels-curtis-adams-1694007-5178034-scaled.jpg",
    text: "DISCOVER YOUR NEXT ADVENTURE.",
  },
  {
    url: "https://erepros.com/wp-content/uploads/2024/08/446814346_1224622515588256_5530116749449355341_n.jpg",
    text: "FIND YOUR PERFECT PLACE TO LIVE.",
  },
];

export default function HomePage() {
  const [activeLocation, setActiveLocation] = useState(null);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });

  const locations = [
    {
      name: "",
      cx: 436.8, // Adjust coordinates based on the map
      cy: 452,
      image: "https://erepros.com/wp-content/uploads/2024/08/Saginaw.jpg",
      description:
        "Saginaw is a vibrant city with scenic views and rich history.",
    },
    {
      name: "",
      cx: 304, // Adjust coordinates based on the map
      cy: 650,
      image:
        "https://erepros.com/wp-content/uploads/2024/08/Shiawassee-County.jpg",
      description:
        "Shiawassee is a vibrant city with scenic views and rich history.",
    },
    {
      name: "",
      cx: 353, // Adjust coordinates based on the map
      cy: 747.5,
      image:
        "https://erepros.com/wp-content/uploads/2024/08/Ingham-County-scaled.jpg",
      description:
        "Ingham is a vibrant city with scenic views and rich history.",
    },
    {
      name: "",
      cx: 355, // Adjust coordinates based on the map
      cy: 800,
      image:
        "https://erepros.com/wp-content/uploads/2024/07/Ann-Arbor-MI-scaled.jpg",
      description:
        "Washtenaw is a vibrant city with scenic views and rich history.",
    },
    {
      name: "",
      cx: 915,
      cy: 791.5,
      image:
        "https://erepros.com/wp-content/uploads/2024/07/Wayne-County-1-scaled.jpg",
      description:
        "Wayne County boasts bustling urban life and cultural landmarks.",
    },
    {
      name: "",
      cx: 927,
      cy: 650,
      image:
        "https://erepros.com/wp-content/uploads/2024/07/Oakland-County-scaled.jpg",
      description:
        "Oakland County boasts bustling urban life and cultural landmarks.",
    },
    {
      name: "",
      cx: 823,
      cy: 505,
      image:
        "https://erepros.com/wp-content/uploads/2024/08/Genesee-County-scaled.jpg",
      description:
        "Genesee County boasts bustling urban life and cultural landmarks.",
    },
  ];

  const openPopup = (location, event) => {
    if (activeLocation?.name === location.name) {
      // Close the pop-up if the same hotspot is clicked again
      setActiveLocation(null);
      return;
    }

    const rect = event.target.getBoundingClientRect(); // Get hotspot position
    setPopupPosition({ x: rect.left + rect.width + 10, y: rect.top - 260 }); // Adjust popup position
    setActiveLocation(location); // Set active location
  };

  // Close the pop-up when clicking anywhere outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click is outside the pop-up
      if (
        !event.target.closest(".popup-container") && // Pop-up
        !event.target.closest("circle") // Hotspot
      ) {
        setActiveLocation(null);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [activeLocation]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTextAnimating, setIsTextAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      moveToNext();
    }, 5000); // Change slides every 5 seconds
    return () => clearInterval(interval);
  }, [currentIndex]);

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
      <div className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0 h-full w-full">
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 h-full w-full bg-cover bg-center transition-opacity duration-1000 ${index === currentIndex ? "opacity-100" : "opacity-0"
                }`}
              style={{
                backgroundImage: `url(${image.url})`,
              }}
            ></div>
          ))}
        </div>
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
          {images.map((image, index) => (
            <h1
              key={index}
              className={`absolute text-center text-3xl font-marcellus font-thin text-white md:text-5xl transition-all duration-500 ${index === currentIndex
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
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white"
          onClick={moveToPrevious}
        >
          &#10094;
        </button>
        <button
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white"
          onClick={moveToNext}
        >
          &#10095;
        </button>
      </div>

      {/* What We Offer Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto flex flex-col items-center justify-between gap-8 px-4 md:flex-row">
          <div className="relative flex md:w-1/2">
            <div className="absolute top-0 left-0 z-10 w-[70%] translate-y-[-20%] translate-x-[10%] md:translate-x-[40%] rounded-lg shadow-lg">
              <Image
                src="https://erepros.com/wp-content/uploads/2024/07/pexels-rdne-8293773-1024x683.jpg"
                alt="House"
                width={1024}
                height={683}
                className="rounded-lg"
              />
            </div>
            <div className="absolute bottom-0 right-0 z-0 w-[70%] translate-y-[20%] translate-x-[-70%] md:translate-x-[-40%] rounded-lg shadow-lg">
              <Image
                src="https://erepros.com/wp-content/uploads/2024/07/pexels-heyho-5997996-1024x683.jpg"
                alt="Couple taking a selfie"
                width={1024}
                height={683}
                className="rounded-lg"
              />
            </div>
          </div>
          <div className="md:w-1/2">
            <h2 className="mb-8 text-3xl font-marcellus font-thin text-gold md:text-4xl">
              WHAT WE OFFER
            </h2>
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <img
                    src="https://erepros.com/wp-content/uploads/2024/07/Icon5.png"
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
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <img
                    src="https://erepros.com/wp-content/uploads/2024/07/Icon60.png"
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
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <img
                    src="https://erepros.com/wp-content/uploads/2024/07/Icon3.png"
                    alt="Real Estate"
                    className="h-12 w-12"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gold">
                    REAL ESTATE
                  </h3>
                  <p className="text-gray-600">
                    Elevate your real estate ventures with our premier services.
                    Whether you're buying, selling, or investing, our expert
                    team provides personalized solutions to meet your goals. We
                    turn your real estate aspirations into reality.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="bg-white py-16 text-center">
        <div className="container mx-auto space-y-12 px-4">
          <div>
            <h2 className="text-2xl font-marcellus text-gray-800 md:text-4xl">
              OWNING AND MANAGING OVER{" "}
              <span className="text-gold">2000+ PROPERTIES</span> ACROSS
              MICHIGAN
            </h2>
          </div>
          <div>
            <h2 className="text-2xl font-marcellus text-gray-800 md:text-4xl">
              STARTED IN 2005, WITH OVER{" "}
              <span className="text-gold">20+ YEARS</span> OF EXPERIENCE
            </h2>
          </div>
        </div>
      </section>

      {/* Interior Section */}
      <section className="relative h-[500px] w-full bg-gray-100">
        <div className="absolute inset-0">
          <img
            src="https://erepros.com/wp-content/uploads/2024/08/pexels-jonathanborba-5570222-1-scaled.jpg"
            alt="Interior Design"
            className="h-full w-full object-cover"
          />
        </div>
      </section>

      {/* Map Section */}
      <section className="relative bg-white py-16">
        <div className="container mx-auto flex flex-col items-center justify-between gap-8 px-4 md:flex-row">
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
              src="https://erepros.com/wp-content/uploads/2024/08/MAP-Newest-2-cropped-1024x920.jpg"
              alt="Map of Michigan"
              className="rounded-lg "
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
            className="absolute popup-container z-50 w-64 bg-white rounded-lg shadow-lg p-4"
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
      <section>
        <LogoCarousel />
      </section>
      {/* Other sections */}

      {/* 8 sections of the home page */}
      <section className="bg-gray-100 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">
          Featured Rentals
        </h2>
        <PropertyCarousel />
      </section>

      <section>
        <PropertyCarousel filterType="Other" />
      </section>
    </div>
  );
}
