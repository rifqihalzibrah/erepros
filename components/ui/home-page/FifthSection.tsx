"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation"; // Import useRouter for navigation

interface Location {
  name: string;
  cx: number;
  cy: number;
  image: string;
  description: string;
}

export default function MapSection() {
  const [activeLocation, setActiveLocation] = useState<Location | null>(null);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const [popupDirection, setPopupDirection] = useState<"left" | "right">(
    "right"
  );
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const router = useRouter(); // Router for navigation

  const locations: Location[] = [
    {
      name: "Saginaw",
      cx: 436.8,
      cy: 452,
      image: "https://erepros.com/wp-content/uploads/2024/08/Saginaw.jpg",
      description:
        "Saginaw is a vibrant city with scenic views and rich history.",
    },
    {
      name: "Shiawassee",
      cx: 304,
      cy: 650,
      image:
        "https://erepros.com/wp-content/uploads/2024/08/Shiawassee-County.jpg",
      description:
        "Shiawassee is a vibrant city with scenic views and rich history.",
    },
    {
      name: "Ingham",
      cx: 353,
      cy: 747.5,
      image:
        "https://erepros.com/wp-content/uploads/2024/08/Ingham-County-scaled.jpg",
      description: "Ingham is known for its community and lively events.",
    },
    {
      name: "Washtenaw",
      cx: 355,
      cy: 800,
      image:
        "https://erepros.com/wp-content/uploads/2024/07/Ann-Arbor-MI-scaled.jpg",
      description:
        "Washtenaw offers historic neighborhoods and beautiful scenery.",
    },
    {
      name: "Wayne",
      cx: 915,
      cy: 791.5,
      image:
        "https://erepros.com/wp-content/uploads/2024/07/Wayne-County-1-scaled.jpg",
      description:
        "Wayne County boasts bustling urban life and cultural landmarks.",
    },
    {
      name: "Oakland",
      cx: 927,
      cy: 650,
      image:
        "https://erepros.com/wp-content/uploads/2024/07/Oakland-County-scaled.jpg",
      description:
        "Oakland County is full of energy and modern infrastructure.",
    },
    {
      name: "Genesee",
      cx: 823,
      cy: 505,
      image:
        "https://erepros.com/wp-content/uploads/2024/08/Genesee-County-scaled.jpg",
      description:
        "Genesee County combines rural charm with modern convenience.",
    },
    // Add other locations here...
  ];

  const openPopup = (
    location: Location,
    event: React.MouseEvent<SVGCircleElement>
  ) => {
    if (activeLocation?.name === location.name) {
      setActiveLocation(null);
      return;
    }

    const circle = event.target as SVGCircleElement;

    if (mapContainerRef.current) {
      const containerRect = mapContainerRef.current.getBoundingClientRect();
      const circleRect = circle.getBoundingClientRect();
      const popupWidth = window.innerWidth <= 640 ? 140 : 280;
      const popupHeight = window.innerWidth <= 640 ? 160 : 240;

      const isOnRightSide =
        circleRect.left - containerRect.left > containerRect.width / 2;

      setPopupDirection(isOnRightSide ? "left" : "right");

      let x = isOnRightSide
        ? circleRect.left - containerRect.left - popupWidth - 10
        : circleRect.left - containerRect.left + circleRect.width / 2 + 10;

      let y =
        circleRect.top -
        containerRect.top +
        circleRect.height / 2 -
        popupHeight / 2;

      y = Math.max(10, Math.min(containerRect.height - popupHeight - 10, y));

      setPopupPosition({ x, y });
    }

    setActiveLocation(location);
  };

  const closePopup = () => setActiveLocation(null);

  // Navigate to available-rentals page with query parameter
  const handleCardClick = (name: string) => {
    router.push(`/available-rentals?name=${encodeURIComponent(name)}`);
  };

  return (
    <section className="relative max-w-7xl mx-auto py-16 px-4 bg-white">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h2 className="text-3xl font-marcellus text-black leading-snug">
            Elite Real Estate & Professional Management{" "}
            <span className="text-gold">
              specializes in single-family houses, condos, storage units,
              multi-family buildings, and commercial properties.
            </span>
          </h2>
        </div>

        <div className="relative md:w-1/2" ref={mapContainerRef}>
          <img
            src="https://erepros.com/wp-content/uploads/2024/08/MAP-Newest-2-cropped-1024x920.jpg"
            alt="Map"
            className="w-full rounded-lg"
          />
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 1024 920"
          >
            {locations.map((location) => (
              <g key={location.name}>
                <circle
                  cx={location.cx}
                  cy={location.cy}
                  r="12"
                  className="cursor-pointer fill-[#9A7648] hover:fill-[#b89f67] transition-colors duration-300"
                  onClick={(e) => openPopup(location, e)}
                />
              </g>
            ))}
          </svg>

          {/* Popup */}
          {activeLocation && (
            <div
              className={`absolute z-50 bg-white rounded-lg shadow-lg p-2 cursor-pointer hover:shadow-md transition-shadow ${
                popupDirection === "left" ? "text-right" : ""
              }`}
              style={{
                left: `${popupPosition.x}px`,
                top: `${popupPosition.y}px`,
                width: window.innerWidth <= 640 ? "140px" : "240px",
              }}
              onClick={() => handleCardClick(activeLocation.name)} // Handle routing on card click
            >
              <button
                className="absolute top-1 right-1 text-gray-500 hover:text-gray-800 text-sm"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent card click handler
                  closePopup();
                }}
              >
                &times;
              </button>
              <h3 className="text-xs md:text-lg font-bold text-gold mb-1 text-center">
                {activeLocation.name}
              </h3>
              <img
                src={activeLocation.image}
                alt={activeLocation.name}
                className="w-full h-16 md:h-28 rounded-lg object-cover mb-1"
              />
              <p className="text-xs md:text-sm text-gray-600 text-center">
                {activeLocation.description}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
