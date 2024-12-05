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

const bedOptions = ["Any", "Studio", "1+", "2+", "3+", "4+", "5+"];
const bathOptions = ["Any", "1+", "2+", "3+", "4+", "5+"];
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

interface FilterBarModalProps {
  isOpen: boolean;
  onClose: () => void;
  filters: {
    search: string;
    forRent: boolean;
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
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  if (!isOpen) return null;

  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };

  const isSectionExpanded = (section: string) =>
    expandedSections.includes(section);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4 border-b pb-2">
          <h2 className="text-lg font-bold">Filters</h2>
          <button
            className="text-gray-500 hover:text-gray-700 text-xl"
            onClick={onClose}
          >
            &times;
          </button>
        </div>

        {/* For Sale / Rent Toggle */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            className={`px-4 py-2 rounded-full font-semibold ${
              !filters.forRent
                ? "bg-black text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setFilters((prev) => ({ ...prev, forRent: false }))}
          >
            For Sale
          </button>
          <button
            className={`px-4 py-2 rounded-full font-semibold ${
              filters.forRent
                ? "bg-black text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setFilters((prev) => ({ ...prev, forRent: true }))}
          >
            For Rent
          </button>
        </div>

        {/* Price Range */}
        <div className="mb-6">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggleSection("price")}
          >
            <h3 className="text-md font-semibold">Price</h3>
            <span>{isSectionExpanded("price") ? "▲" : "▼"}</span>
          </div>
          {isSectionExpanded("price") && (
            <div className="mt-4 flex gap-2">
              <select
                value={filters.minPrice}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    minPrice: e.target.value,
                  }))
                }
                className="w-1/2 border border-gray-300 rounded-lg px-2 py-1"
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
                className="w-1/2 border border-gray-300 rounded-lg px-2 py-1"
              >
                {priceOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Bedrooms */}
        <div className="mb-6">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggleSection("beds")}
          >
            <h3 className="text-md font-semibold">Bedrooms</h3>
            <span>{isSectionExpanded("beds") ? "▲" : "▼"}</span>
          </div>
          {isSectionExpanded("beds") && (
            <div className="mt-4 flex gap-2">
              {bedOptions.map((bed) => (
                <button
                  key={bed}
                  className={`px-4 py-2 rounded-md ${
                    filters.beds === bed
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

        {/* Bathrooms */}
        <div className="mb-6">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggleSection("baths")}
          >
            <h3 className="text-md font-semibold">Bathrooms</h3>
            <span>{isSectionExpanded("baths") ? "▲" : "▼"}</span>
          </div>
          {isSectionExpanded("baths") && (
            <div className="mt-4 flex gap-2">
              {bathOptions.map((bath) => (
                <button
                  key={bath}
                  className={`px-4 py-2 rounded-md ${
                    filters.baths === bath
                      ? "bg-black text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
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

        {/* Property Types */}
        <div className="mb-6">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggleSection("propertyTypes")}
          >
            <h3 className="text-md font-semibold">Property Types</h3>
            <span>{isSectionExpanded("propertyTypes") ? "▲" : "▼"}</span>
          </div>
          {isSectionExpanded("propertyTypes") && (
            <div className="mt-4 grid grid-cols-3 gap-2">
              {propertyTypes.map((type) => (
                <div
                  key={type.label}
                  className={`flex flex-col items-center p-2 border rounded-md cursor-pointer ${
                    filters.propertyType.includes(type.label)
                      ? "bg-gray-200 border-black"
                      : "border-gray-300"
                  }`}
                  onClick={() => {
                    const isSelected = filters.propertyType.includes(
                      type.label
                    );
                    const updatedPropertyTypes = isSelected
                      ? filters.propertyType.filter((t) => t !== type.label)
                      : [...filters.propertyType, type.label];
                    setFilters((prev) => ({
                      ...prev,
                      propertyType: updatedPropertyTypes,
                    }));
                  }}
                >
                  <span className="text-xl">{type.icon}</span>
                  <span className="text-sm">{type.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end">
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
