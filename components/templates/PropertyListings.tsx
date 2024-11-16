"use client";

// components/templates/PropertyListings.tsx
import React from "react";
import { Property } from "../../types/types"; // Import Property interface

interface PropertyListingsProps {
  properties: Property[];
  onPropertyClick: (property: Property) => void;
}

const PropertyListings: React.FC<PropertyListingsProps> = ({
  properties,
  onPropertyClick,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property) => (
        <div
          key={property.id}
          className="border border-gray-200 rounded-lg overflow-hidden shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
          onClick={() => onPropertyClick(property)}
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
