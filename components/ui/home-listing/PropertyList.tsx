import React from "react";
import { Property } from "@/services/mlsAPI";
import { useRouter } from "next/navigation";

const PropertyList: React.FC<{ properties: Property[] }> = ({ properties }) => {
  const router = useRouter();

  const handleCardClick = (listingKey: string) => {
    router.push(`/property/${listingKey}`); // Navigate to the property detail page
  };

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
      {properties.map((property) => (
        <div
          key={property.ListingKey}
          onClick={() => handleCardClick(property.ListingKey)} // Add click event for navigation
          className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white cursor-pointer"
        >
          {/* Property Image and Badge */}
          <div className="relative">
            <img
              src={property.Media[0]?.MediaURL || "/placeholder.jpg"}
              alt={`Property at ${property.City}`}
              className="w-full h-48 object-cover"
            />
            <span className="absolute top-3 left-3 bg-black bg-opacity-75 text-white text-xs font-semibold px-2 py-1 rounded-full">
              Active
            </span>
            <button className="absolute top-3 right-3 text-gray-500 hover:text-red-500">
              ♥
            </button>
          </div>

          {/* Property Details */}
          <div className="p-4">
            {/* Price */}
            <p className="text-xl font-semibold text-gray-900">
              ${property.ListPrice.toLocaleString()}
            </p>

            {/* Key Details */}
            <p className="text-sm text-gray-700">
              {property.BedroomsTotal || 0}bd • {property.BathroomsFull || 0}ba
              • {property.LotSizeArea || 0} sqft
            </p>

            {/* Address */}
            <p className="text-sm text-gray-500 truncate">
              {property.City}, {property.PostalCode}
            </p>

            {/* MLS Number */}
            <p className="text-xs text-gray-400 mt-1">
              MLS®: {property.ListingKey}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PropertyList;
