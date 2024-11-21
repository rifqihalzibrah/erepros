"use client";

import React, { useEffect, useState } from "react";
import { Property } from "../../../types/types"; // Ensure your Property type is correctly imported
import { getAccessKey, fetchData } from "../../../services/propertywareAPI"; // Import your API functions

interface PropertyCarouselProps {
  filterType?: string; // Optional filter prop to filter properties by type
}

const PropertyCarousel: React.FC<PropertyCarouselProps> = ({ filterType }) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const accessKey = await getAccessKey();
        const data = await fetchData(accessKey);

        // Apply filter if filterType is provided
        const filtered = filterType
          ? data.filter(
              (property: Property) => property.property_type === filterType
            )
          : data;

        setProperties(filtered);
        setFilteredProperties(filtered.slice(0, 1000)); // Optionally limit displayed properties
        setLoading(false);
      } catch (error) {
        console.error("Error fetching properties:", error);
        setLoading(false);
      }
    };

    fetchProperties();
  }, [filterType]);

  const nextSlide = () => {
    if (filteredProperties.length <= 3) return;
    setCurrentIndex((prevIndex) =>
      prevIndex === filteredProperties.length - 3 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    if (filteredProperties.length <= 3) return;
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? filteredProperties.length - 3 : prevIndex - 1
    );
  };

  return (
    <div className="relative">
      {loading ? (
        // Skeleton Loader (3 cards)
        <div className="flex gap-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="w-1/3 flex-shrink-0 bg-gray-200 p-4 rounded-lg animate-pulse"
            >
              <div className="h-40 bg-gray-300 rounded-md mb-4"></div>
              <div className="h-6 bg-gray-300 rounded-md mb-2"></div>
              <div className="h-4 bg-gray-300 rounded-md mb-2"></div>
              <div className="h-4 bg-gray-300 rounded-md mb-2"></div>
              <div className="h-4 bg-gray-300 rounded-md"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex overflow-hidden">
          {/* Carousel Wrapper */}
          <div
            className="relative flex w-full transition-transform duration-300"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {filteredProperties.map((property: Property) => (
              <div
                key={property.id}
                className="flex-shrink-0 w-1/3 p-2"
                style={{ flexBasis: "33.3333%" }}
              >
                {/* Property Card */}
                <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow duration-300">
                  <img
                    src={
                      property.images[0]?.original_image_url ||
                      "/placeholder-image.svg"
                    }
                    alt={property.address}
                    className="w-full h-64 object-cover rounded-md mb-4"
                  />
                  <h2 className="text-lg font-bold">{property.address}</h2>
                  <p className="text-gray-600">
                    {property.city}, {property.state} {property.zip}
                  </p>
                  <p className="text-lg font-bold text-gray-900">
                    ${property.target_rent}
                  </p>
                  <p className="text-sm text-gray-500">
                    {property.property_type} Beds • {property.no_bathrooms}{" "}
                    Baths • {property.total_area} Sq Ft
                  </p>
                </div>
              </div>
            ))}
          </div>
          {/* Navigation Arrows */}
          <button
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 p-2 rounded-full"
            onClick={prevSlide}
          >
            &#8592;
          </button>
          <button
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 p-2 rounded-full"
            onClick={nextSlide}
          >
            &#8594;
          </button>
        </div>
      )}
    </div>
  );
};

export default PropertyCarousel;
