"use client";

import { useRouter } from "next/navigation"; // Import useRouter for navigation
import { useRef, useState } from "react";

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
      image:
        "https://firebasestorage.googleapis.com/v0/b/erepros-35fe1.firebasestorage.app/o/erepros-assets%2FLocations%2FSaginaw.jpg?alt=media&token=bd6e69c3-6382-465d-a23a-97d13efd41bf",
      description:
        "Saginaw is a vibrant city with scenic views and rich history.",
    },
    {
      name: "Shiawassee",
      cx: 304,
      cy: 650,
      image:
        "https://firebasestorage.googleapis.com/v0/b/erepros-35fe1.firebasestorage.app/o/erepros-assets%2FLocations%2FShiawassee-County.jpg?alt=media&token=505249f7-a8b7-4795-b171-be9846a5af96",
      description:
        "Shiawassee is a vibrant city with scenic views and rich history.",
    },
    {
      name: "Ingham",
      cx: 353,
      cy: 747.5,
      image:
        "https://firebasestorage.googleapis.com/v0/b/erepros-35fe1.firebasestorage.app/o/erepros-assets%2FLocations%2FIngham-County-scaled.jpg?alt=media&token=95d1fedf-3cc2-4ccc-a9b9-3045f7f57556",
      description: "Ingham is known for its community and lively events.",
    },
    {
      name: "Washtenaw",
      cx: 355,
      cy: 800,
      image:
        "https://firebasestorage.googleapis.com/v0/b/erepros-35fe1.firebasestorage.app/o/erepros-assets%2FLocations%2FAnn-Arbor-MI-scaled.jpg?alt=media&token=a7d88477-dedd-40e4-8d1f-8eb5ed871da8",
      description:
        "Washtenaw offers historic neighborhoods and beautiful scenery.",
    },
    {
      name: "Wayne",
      cx: 915,
      cy: 791.5,
      image:
        "https://firebasestorage.googleapis.com/v0/b/erepros-35fe1.firebasestorage.app/o/erepros-assets%2FLocations%2FWayne-County-1-scaled.jpg?alt=media&token=0c127b09-6284-4c44-b492-50c524f2d195",
      description:
        "Wayne County boasts bustling urban life and cultural landmarks.",
    },
    {
      name: "Oakland",
      cx: 927,
      cy: 650,
      image:
        "https://firebasestorage.googleapis.com/v0/b/erepros-35fe1.firebasestorage.app/o/erepros-assets%2FLocations%2FOakland-County-scaled.jpg?alt=media&token=8379093b-ab22-4cab-b0be-808476fdaa47",
      description:
        "Oakland County is full of energy and modern infrastructure.",
    },
    {
      name: "Genesee",
      cx: 823,
      cy: 505,
      image:
        "https://firebasestorage.googleapis.com/v0/b/erepros-35fe1.firebasestorage.app/o/erepros-assets%2FLocations%2FGenesee-County-scaled.jpg?alt=media&token=f27b6023-7c45-4b5d-87ab-12b4496dfb10",
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

      const x = isOnRightSide
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
            src="https://firebasestorage.googleapis.com/v0/b/erepros-35fe1.firebasestorage.app/o/erepros-assets%2FLocations%2FMAP-Newest-2-cropped-1024x920.jpg?alt=media&token=20e03d6a-62d7-4059-a9b9-5c55183e4bd3"
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
              className={`absolute z-50 bg-white rounded-lg shadow-lg p-2 cursor-pointer hover:shadow-md transition-shadow ${popupDirection === "left" ? "text-right" : ""
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
