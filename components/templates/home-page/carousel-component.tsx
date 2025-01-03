"use client";

import React, { useEffect, useState } from "react";
import { Property } from "../../../types/types"; // Ensure your Property type is correctly imported
import { getAccessKey, fetchData } from "../../../services/propertywareAPI"; // Import your API functions
import PropertyModal from "@/components/ui/PropertyModal"; // Default modal
import PropertyModalOther from "@/components/templates/home-page/PropertyModalOther"; // New modal for 'Other'

interface PropertyCarouselProps {
  filterType?: string; // Optional filter prop to filter properties by type
}

const PropertyCarousel: React.FC<PropertyCarouselProps> = ({ filterType }) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null
  ); // For the modal
  const [slidesToShow, setSlidesToShow] = useState<number>(1);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const accessKey = await getAccessKey();
        const data = await fetchData(accessKey);

        // Apply filter if filterType is provided
        const filtered = filterType
          ? data.filter(
              (property: Property) =>
                property.property_type.toLowerCase() ===
                filterType.toLowerCase()
            )
          : data.filter(
              (property: Property) => property.property_type !== "Other"
            ); // Exclude "Other"

        setProperties(filtered);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching properties:", error);
        setLoading(false);
      }
    };

    fetchProperties();
  }, [filterType]);

  useEffect(() => {
    const updateSlidesToShow = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setSlidesToShow(3);
      } else if (width >= 768) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(1);
      }
    };

    updateSlidesToShow();
    window.addEventListener("resize", updateSlidesToShow);
    return () => window.removeEventListener("resize", updateSlidesToShow);
  }, []);

  const nextSlide = () => {
    if (properties.length <= slidesToShow) return;
    setCurrentIndex((prevIndex) =>
      prevIndex === properties.length - slidesToShow ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    if (properties.length <= slidesToShow) return;
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? properties.length - slidesToShow : prevIndex - 1
    );
  };

  const openModal = (property: Property) => {
    setSelectedProperty(property);
  };

  const closeModal = () => {
    setSelectedProperty(null);
  };

  // Pre-filter properties
  const otherProperties = properties.filter(
    (property) => property.property_type === "Other"
  );

  const defaultProperties = properties.filter(
    (property) => property.property_type !== "Other"
  );

  return (
    <div className="relative px-8" style={{ overflow: "hidden" }}>
      {loading ? (
        <div className="flex gap-4">
          {Array.from({ length: slidesToShow }).map((_, index) => (
            <div
              key={index}
              className="w-full sm:w-1/2 md:w-1/3 flex-shrink-0 bg-gray-200 p-4 rounded-lg animate-pulse"
            >
              <div className="h-40 bg-gray-300 rounded-md mb-4"></div>
              <div className="h-6 bg-gray-300 rounded-md mb-2"></div>
              <div className="h-4 bg-gray-300 rounded-md mb-2"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="relative">
          <div className="flex overflow-hidden">
            <div
              className="relative flex w-full transition-transform duration-300"
              style={{
                transform: `translateX(-${
                  (currentIndex * 100) / slidesToShow
                }%)`,
              }}
            >
              {/* Render "Other" property cards */}
              {/* <div className="flex"> */}
              {otherProperties.map((property: Property) => (
                <div
                  key={property.id}
                  className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 p-2"
                  onClick={() => openModal(property)}
                >
                  <div className="border rounded-lg p-4 hover:shadow-lg cursor-pointer">
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
                      {property.total_area} Sq Ft • {property.posting_title}
                    </p>
                  </div>
                </div>
              ))}
              {/* </div> */}

              {/* Render Default Property Cards */}
              {/* <div className="flex"> */}
              {defaultProperties.map((property: Property) => (
                <div
                  key={property.id}
                  className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 p-2"
                  onClick={() => openModal(property)}
                >
                  <div className="border rounded-lg p-4 hover:shadow-lg cursor-pointer">
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
                      {property.no_bedrooms} Beds • {property.no_bathrooms}{" "}
                      Baths • {property.total_area} Sq Ft
                    </p>
                  </div>
                </div>
              ))}
              {/* </div> */}
            </div>
          </div>
          {/* Navigation */}
          {properties.length > slidesToShow && (
            <>
              <button
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-200 p-2 rounded-full"
                onClick={prevSlide}
              >
                &#8592;
              </button>
              <button
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-200 p-2 rounded-full"
                onClick={nextSlide}
              >
                &#8594;
              </button>
            </>
          )}
        </div>
      )}

      {/* Conditional Modal Rendering */}
      {filterType === "Other" ? (
        <PropertyModalOther
          property={selectedProperty}
          isOpen={!!selectedProperty}
          onClose={closeModal}
        />
      ) : (
        <PropertyModal
          property={selectedProperty}
          isOpen={!!selectedProperty}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default PropertyCarousel;
