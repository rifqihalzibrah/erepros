"use client";

import React from "react";
import { Property } from "@/types/types";
import { useRouter } from "next/navigation";

interface PropertyCardProps {
  property: Property;
  currentPage: number; // Accept currentPage as a prop
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  currentPage,
}) => {
  const {
    id,
    images,
    marketing_name,
    address,
    city,
    state,
    zip,
    target_rent,
    no_bedrooms,
    no_bathrooms,
    total_area,
    area_units,
  } = property;

  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/property-details/${id}?page=${currentPage}`); // Pass the current page as a query parameter
  };

  return (
    <div
      className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer"
      onClick={handleCardClick}
    >
      {/* Image Section */}
      <div className="relative">
        <img
          src={
            images[0]?.original_image_url || "https://via.placeholder.com/300"
          }
          alt={marketing_name}
          className="w-full h-48 object-cover"
        />
        <span className="absolute top-2 left-2 bg-gold text-white text-xs font-bold px-2 py-1 rounded">
          Active
        </span>
      </div>

      {/* Details Section */}
      <div className="p-4">
        <p className="text-lg font-semibold">{address}</p>
        <p className="text-gray-800 text-sm">
          {city}, {state} {zip}
        </p>
        <p className="text-lg font-semibold">${target_rent}</p>
        <p className="text-gray-600 text-sm">
          {no_bedrooms}bd • {no_bathrooms}ba • {total_area} {area_units}
        </p>
      </div>
    </div>
  );
};

export default PropertyCard;
