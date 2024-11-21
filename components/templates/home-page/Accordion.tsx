"use client";

import React, { useState, useRef } from "react";

const locations = [
  {
    number: "01",
    title: "Wayne County",
    description: `
      Located in southeastern Michigan, is the most populous county in the state and is home to the city of Detroit.
    `,
    backgroundImage:
      "http://erepros.com/wp-content/uploads/2024/07/Wayne-County-1-scaled.jpg",
    link: "/area-we-service-e/#wayne",
  },
  {
    number: "02",
    title: "Shiawassee County",
    description: `
      Shiawassee County offers a peaceful retreat from the hustle and bustle of city life.
      With picturesque small towns, fertile farmland, and historic sites, the county is a hidden gem.
    `,
    backgroundImage:
      "http://erepros.com/wp-content/uploads/2024/08/Shiawassee-County.jpg",
    link: "/area-we-service-e/#shiawassee",
  },
  {
    number: "03",
    title: "Ingham County",
    description: `
      Ingham County is home to the state capital of Lansing and Michigan State University.
      It offers a dynamic blend of government, education, and culture, making it a vibrant community.
    `,
    backgroundImage:
      "http://erepros.com/wp-content/uploads/2024/08/Ingham-County-scaled.jpg",
    link: "/area-we-service-e/#ingham",
  },
  {
    number: "04",
    title: "Oakland County",
    description: `
      Oakland County combines luxury living with natural beauty and recreational opportunities.
      Explore upscale malls, enjoy outdoor activities, or attend cultural events.
    `,
    backgroundImage:
      "http://erepros.com/wp-content/uploads/2024/07/Oakland-County-scaled.jpg",
    link: "/area-we-service-e/#oakland",
  },
  {
    number: "05",
    title: "Washtenaw County",
    description: `
      Washtenaw County is a vibrant community that blends suburban neighborhoods with cultural experiences.
      Home to Ann Arbor and the University of Michigan, it is a hub for education and recreation.
    `,
    backgroundImage:
      "http://erepros.com/wp-content/uploads/2024/07/Ann-Arbor-MI-scaled.jpg",
    link: "/area-we-service-e/#washtenaw",
  },
  {
    number: "06",
    title: "Genesee County",
    description: `
      Genesee County boasts a blend of urban and rural landscapes.
      Discover the natural beauty of Crossroads Village or explore the Flint Institute of Arts.
    `,
    backgroundImage:
      "http://erepros.com/wp-content/uploads/2024/08/Genesee-County-scaled.jpg",
    link: "/area-we-service-e/#genesee",
  },
];

export default function Accordion() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const calculateHeight = (index: number) => {
    const content = contentRefs.current[index];
    if (content) {
      return content.scrollHeight;
    }
    return 0;
  };

  return (
    <div className="step-container bg-white p-4 rounded-lg shadow-lg">
      {locations.map((location, index) => (
        <div
          key={index}
          className="step mb-4 group border-b border-gray-300 last:border-none"
        >
          {/* Header */}
          <div
            className={`step-header h-24 relative flex items-center justify-between p-4 rounded-lg cursor-pointer bg-cover bg-center transition-transform duration-500 `}
            onClick={() => toggleAccordion(index)}
          >
            <span className="step-number text-lg font-bold text-gold group-hover:text-white z-10">
              {location.number}
            </span>
            <span
              className={`step-title text-xl z-10 group-hover:text-white ${
                activeIndex === index ? "text-white" : "text-gold"
              }`}
            >
              {location.title}
            </span>
            <span
              className={`step-icon text-2xl z-10 group-hover:text-white ${
                activeIndex === index ? "transform rotate-45 text-white" : ""
              }`}
            >
              +
            </span>
            {/* Background on Hover and Active */}
            <div
              className={`absolute h-24 inset-0 bg-cover bg-center ${
                activeIndex === index ? "opacity-100" : "opacity-0"
              } group-hover:opacity-100 rounded-lg transition-opacity duration-500`}
              style={{ backgroundImage: `url(${location.backgroundImage})` }}
            ></div>
          </div>

          {/* Content */}
          <div
            ref={(el) => (contentRefs.current[index] = el)}
            className={`step-content overflow-hidden transition-[height] duration-500 ease-in-out`}
            style={{
              height:
                activeIndex === index ? `${calculateHeight(index)}px` : "0",
            }}
          >
            <div className="p-4">
              <p className="text-center text-gray-700 mb-4">
                {location.description}
              </p>
              <div className="flex justify-center">
                <a
                  href={location.link}
                  className="cities-button inline-block text-white bg-gold px-4 py-2 rounded-lg hover:bg-yellow-800"
                >
                  Cities We Serve
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
