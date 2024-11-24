"use client";

// components/templates/PropertyListings.tsx
import React from "react";
import { Property } from "../../types/types"; // Import Property interface

interface PropertyListingsProps {
  properties?: Property[]; // Make properties optional for loading state
  onPropertyClick?: (property: Property) => void;
  isLoading: boolean; // Add loading state
}

const SkeletonCard: React.FC = () => (
  <div className="border border-gray-200 rounded-lg overflow-hidden shadow-lg animate-pulse">
    <div className="h-48 bg-gray-200"></div>
    <div className="p-4 space-y-3">
      <div className="h-6 bg-gray-300 rounded w-1/2"></div>
      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
      <div className="h-4 bg-gray-300 rounded w-2/3"></div>
      <div className="h-4 bg-gray-300 rounded w-full"></div>
    </div>
  </div>
);

const PropertyListings: React.FC<PropertyListingsProps> = ({
  properties = [],
  onPropertyClick,
  isLoading,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {isLoading
        ? // Render skeleton cards when loading
          Array.from({ length: 6 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))
        : // Render property cards when data is available
          properties.map((property) => (
            <div
              key={property.id}
              className="border border-gray-200 rounded-lg overflow-hidden shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
              onClick={() => onPropertyClick?.(property)}
            >
              <div className="h-48 bg-gray-100">
                <img
                  src={
                    property.images[0]?.original_image_url ||
                    property.images[0]?.thumb_image_url ||
                    "placeholder.jpg"
                  }
                  alt="Property"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gold">
                  ${property.target_rent}
                </h3>
                <p className="text-gray-700">
                  {property.no_bedrooms}bd • {property.no_bathrooms}ba •{" "}
                  {property.total_area} sqft
                </p>
                <p className="text-gray-500">{property.address}</p>
                <p className="text-gray-500">{property.posting_title}</p>
              </div>
            </div>
          ))}
    </div>
  );
};

export default PropertyListings;
