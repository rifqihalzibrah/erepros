import React, { useState } from "react";

const priceOptions = [
  { value: "", label: "No min" },
  { value: "500", label: "$500" },
  { value: "1000", label: "$1,000" },
  { value: "1500", label: "$1,500" },
  { value: "2000", label: "$2,000" },
  { value: "2500", label: "$2,500" },
  { value: "3000", label: "$3,000" },
];

const bedOptions = ["Any", "Studio", "1", "2", "3", "4", "5+"];
const bathOptions = ["Any", "1", "2", "3", "4", "5+"];

const propertyTypes = [
  { label: "House", icon: "🏠" },
  { label: "Apartment", icon: "🏢" },
  { label: "Co-op", icon: "🏛️" },
  { label: "Multi-family", icon: "🏘️" },
  { label: "Condos", icon: "🏙️" },
  { label: "Commercial", icon: "🏬" },
  { label: "Manufactured", icon: "🏚️" },
  { label: "Land", icon: "🌍" },
  { label: "Other", icon: "…" },
];

// Removed unused listingStatuses and unused handlers

interface FilterBarModalProps {
  isOpen: boolean;
  onClose: () => void;
  filters: {
    search: string;
    forRent: boolean;
    priceRange: string;
    propertyType: string[];
    beds: string;
    baths: string;
    minPrice: string;
    maxPrice: string;
  };
  setFilters: React.Dispatch<
    React.SetStateAction<{
      search: string;
      forRent: boolean;
      priceRange: string;
      propertyType: string[];
      beds: string;
      baths: string;
      minPrice: string;
      maxPrice: string;
    }>
  >;
}

const FilterBarModal: React.FC<FilterBarModalProps> = ({
  isOpen,
  onClose,
  filters,
  setFilters,
}) => {
  // Declare hooks before any returns
  const [isPriceCollapsed, setIsPriceCollapsed] = useState(false);
  const [isBedroomsCollapsed, setIsBedroomsCollapsed] = useState(false);
  const [isBathroomsCollapsed, setIsBathroomsCollapsed] = useState(false);
  const [isPropertyTypesCollapsed, setIsPropertyTypesCollapsed] =
    useState(false);

  // If isOpen is false, return after hooks are declared
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-4 border-b pb-2">
          <button className="text-gray-500 hover:text-gray-700" onClick={onClose}>
            &times;
          </button>
          <h2 className="text-lg font-bold text-center flex-grow">Filters</h2>
        </div>

        {/* Toggle for Sale / Rent */}
        <div className="flex justify-center items-center gap-2 py-4">
          <button
            className={`px-4 py-2 rounded-full ${!filters.forRent
                ? "bg-gray-200 text-black"
                : "bg-white border border-gray-300"
              }`}
            onClick={() => setFilters((prev) => ({ ...prev, forRent: false }))}
          >
            For sale
          </button>
          <button
            className={`px-4 py-2 rounded-full ${filters.forRent
                ? "bg-gray-200 text-black"
                : "bg-white border border-gray-300"
              }`}
            onClick={() => setFilters((prev) => ({ ...prev, forRent: true }))}
          >
            For rent
          </button>
        </div>

        {/* Price Section */}
        <div className="py-4">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => setIsPriceCollapsed((prev) => !prev)}
          >
            <h3 className="text-lg font-semibold">Price</h3>
            <span>{isPriceCollapsed ? "▲" : "▼"}</span>
          </div>
          {isPriceCollapsed && (
            <div className="mt-4">
              <div className="flex items-center gap-2">
                <select
                  value={filters.minPrice}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      minPrice: e.target.value,
                    }))
                  }
                  className="w-1/2 border border-gray-300 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {priceOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <span>to</span>
                <select
                  value={filters.maxPrice}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      maxPrice: e.target.value,
                    }))
                  }
                  className="w-1/2 border border-gray-300 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {priceOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Bedrooms Section */}
        <div className="py-4">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => setIsBedroomsCollapsed((prev) => !prev)}
          >
            <h3 className="text-lg font-semibold">Bedrooms</h3>
            <span>{isBedroomsCollapsed ? "▲" : "▼"}</span>
          </div>
          {isBedroomsCollapsed && (
            <div className="mt-4 flex gap-2">
              {bedOptions.map((bed) => (
                <button
                  key={bed}
                  className={`px-4 py-2 rounded-md font-medium text-sm transition ${filters.beds === bed
                      ? "bg-black text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  onClick={() => setFilters((prev) => ({ ...prev, beds: bed }))}
                >
                  {bed}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Bathrooms Section */}
        <div className="py-4">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => setIsBathroomsCollapsed((prev) => !prev)}
          >
            <h3 className="text-lg font-semibold">Bathrooms</h3>
            <span>{isBathroomsCollapsed ? "▲" : "▼"}</span>
          </div>
          {isBathroomsCollapsed && (
            <div className="mt-4 flex gap-2">
              {bathOptions.map((bath) => (
                <button
                  key={bath}
                  className={`px-4 py-2 rounded-md font-medium text-sm transition ${filters.baths === bath
                      ? "bg-black text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  onClick={() => setFilters((prev) => ({ ...prev, baths: bath }))}
                >
                  {bath}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Property Types Section */}
        <div className="py-4">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => setIsPropertyTypesCollapsed((prev) => !prev)}
          >
            <h3 className="text-lg font-semibold">Property types</h3>
            <span>{isPropertyTypesCollapsed ? "▲" : "▼"}</span>
          </div>
          {isPropertyTypesCollapsed && (
            <div className="mt-4 grid grid-cols-3 gap-4">
              {propertyTypes.map((type) => (
                <div
                  key={type.label}
                  className={`flex flex-col items-center justify-center p-4 border rounded-lg cursor-pointer ${filters.propertyType.includes(type.label)
                      ? "bg-gray-100 border-black"
                      : "border-gray-300 hover:bg-gray-200"
                    }`}
                  onClick={() => {
                    const isSelected = filters.propertyType.includes(type.label);
                    const updatedPropertyTypes = isSelected
                      ? filters.propertyType.filter((t) => t !== type.label)
                      : [...filters.propertyType, type.label];
                    setFilters((prev) => ({
                      ...prev,
                      propertyType: updatedPropertyTypes,
                    }));
                  }}
                >
                  <span className="text-2xl">{type.icon}</span>
                  <span className="text-sm text-center">{type.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end mt-4">
          <button
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterBarModal;
