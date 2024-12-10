import React, { useState } from "react";
import FilterBarModal from "../home-listing/FilterBarModal";

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

const bedOptions = ["Any", "Studio", "1+", "2+", "3+", "4+", "5+"];
const bathOptions = ["Any", "1+", "2+", "3+", "4+", "5+"];

interface FilterBarProps {
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

const FilterBar: React.FC<FilterBarProps> = ({ filters, setFilters }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isPriceDropdownOpen, setIsPriceDropdownOpen] = useState(false);
  const [isPropertyTypeDropdownOpen, setIsPropertyTypeDropdownOpen] =
    useState(false);
  const [isBedsDropdownOpen, setIsBedsDropdownOpen] = useState(false);
  const [isBathsDropdownOpen, setIsBathsDropdownOpen] = useState(false);
  const [isFilterBarModalOpen, setIsFilterBarModalOpen] = useState(false);

  const toggleDropdown = (
    setter: React.Dispatch<React.SetStateAction<boolean>>
  ) => setter((prev) => !prev);

  const handlePropertyTypeSelect = (type: string) => {
    const isSelected = filters.propertyType.includes(type);
    setFilters((prev) => ({
      ...prev,
      propertyType: isSelected
        ? prev.propertyType.filter((t) => t !== type)
        : [...prev.propertyType, type],
    }));
  };

  return (
    <div className="pt-[136px]">
      <div className="flex flex-wrap items-center gap-4 bg-white p-4 shadow-md rounded-lg mb-6">
        {/* Search Input */}
        <div className="flex-grow">
          <input
            type="text"
            placeholder="City, neighborhood, ZIP code..."
            value={filters.search}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, search: e.target.value }))
            }
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold"
          />
        </div>

        {/* For Rent / For Sale Dropdown */}
        <div className="relative">
          <button
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-gold"
            onClick={() => toggleDropdown(setIsDropdownOpen)}
          >
            {filters.forRent ? "For Rent" : "For Sale"}
          </button>
          {isDropdownOpen && (
            <div className="absolute top-full mt-2 w-40 bg-white border border-gray-300 rounded-lg shadow-md">
              <div
                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                onClick={() =>
                  setFilters((prev) => ({ ...prev, forRent: !filters.forRent }))
                }
              >
                {filters.forRent ? "For Sale" : "For Rent"}
              </div>
            </div>
          )}
        </div>

        {/* Any Price Dropdown */}
        <div className="relative z-50">
          <button
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-gold"
            onClick={() => toggleDropdown(setIsPriceDropdownOpen)}
          >
            {filters.minPrice || filters.maxPrice
              ? `${filters.minPrice || "No Min"} to ${
                  filters.maxPrice || "No Max"
                }`
              : "Any Price"}
          </button>
          {isPriceDropdownOpen && (
            <div className="absolute top-full mt-2 w-60 bg-white border border-gray-300 rounded-lg shadow-md p-4">
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Min Price"
                  value={filters.minPrice}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      minPrice: e.target.value,
                    }))
                  }
                  className="w-1/2 border border-gray-300 rounded-lg px-2 py-1"
                />
                <span>to</span>
                <input
                  type="number"
                  placeholder="Max Price"
                  value={filters.maxPrice}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      maxPrice: e.target.value,
                    }))
                  }
                  className="w-1/2 border border-gray-300 rounded-lg px-2 py-1"
                />
              </div>
            </div>
          )}
        </div>

        {/* Property Type Dropdown */}
        <div className="relative z-50">
          <button
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-gold"
            onClick={() => toggleDropdown(setIsPropertyTypeDropdownOpen)}
          >
            {filters.propertyType.length > 0
              ? `${filters.propertyType.length} Selected`
              : "All Property Types"}
          </button>
          {isPropertyTypeDropdownOpen && (
            <div className="absolute top-full mt-2 w-64 bg-white border border-gray-300 rounded-lg shadow-md p-4 grid grid-cols-3 gap-2 z-50">
              {propertyTypes.map((type) => (
                <div
                  key={type.label}
                  className={`flex flex-col items-center p-2 border rounded-lg cursor-pointer ${
                    filters.propertyType.includes(type.label)
                      ? "bg-gray-100 border-black"
                      : "border-gray-300"
                  }`}
                  onClick={() => handlePropertyTypeSelect(type.label)}
                >
                  <div className="text-2xl">{type.icon}</div>
                  <div className="text-sm">{type.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Beds Dropdown */}
        <div className="relative z-50">
          <button
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-gold"
            onClick={() => toggleDropdown(setIsBedsDropdownOpen)}
          >
            {filters.beds === "Any" ? "All Beds" : `${filters.beds} Beds`}
          </button>
          {isBedsDropdownOpen && (
            <div className="absolute top-full mt-2 bg-white border border-gray-300 rounded-lg shadow-md p-2 flex gap-1">
              {bedOptions.map((bed) => (
                <button
                  key={bed}
                  className={`px-4 py-2 rounded-md ${
                    filters.beds === bed
                      ? "bg-gold text-white"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                  onClick={() => setFilters((prev) => ({ ...prev, beds: bed }))}
                >
                  {bed}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Baths Dropdown */}
        <div className="relative z-50">
          <button
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-gold"
            onClick={() => toggleDropdown(setIsBathsDropdownOpen)}
          >
            {filters.baths === "Any" ? "All Baths" : `${filters.baths} Baths`}
          </button>
          {isBathsDropdownOpen && (
            <div className="absolute top-full mt-2 bg-white border border-gray-300 rounded-lg shadow-md p-2 flex gap-1">
              {bathOptions.map((bath) => (
                <button
                  key={bath}
                  className={`px-4 py-2 rounded-md ${
                    filters.baths === bath
                      ? "bg-gold text-white"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                  onClick={() =>
                    setFilters((prev) => ({ ...prev, baths: bath }))
                  }
                >
                  {bath}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* All Filters Button */}
        <button
          className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-gold"
          onClick={() => setIsFilterBarModalOpen(true)}
        >
          All Filters
        </button>

        {/* Save Search Button */}
        <button className="px-4 py-2 bg-gold text-white rounded-lg">
          Save Search
        </button>

        {/* FilterBarModal */}
        {isFilterBarModalOpen && (
          <FilterBarModal
            isOpen={isFilterBarModalOpen}
            onClose={() => setIsFilterBarModalOpen(false)}
            filters={filters}
            setFilters={setFilters}
          />
        )}
      </div>
    </div>
  );
};

export default FilterBar;
