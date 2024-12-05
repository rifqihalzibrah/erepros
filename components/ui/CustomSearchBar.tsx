// CustomSearchBar.tsx

import React, { useState } from "react";

const AllFiltersModal = ({ isOpen, onClose, filters, setFilters }) => {
  const [isPriceExpanded, setPriceExpanded] = useState(false);
  const [isBedsExpanded, setBedsExpanded] = useState(false);
  const [isBathsExpanded, setBathsExpanded] = useState(false);
  const [isPropertyTypesExpanded, setPropertyTypesExpanded] = useState(false);
  const [isListingStatusExpanded, setListingStatusExpanded] = useState(false);
  const [isPropertyDetailsExpanded, setPropertyDetailsExpanded] =
    useState(false);
  const [isPropertyFeaturesExpanded, setPropertyFeaturesExpanded] =
    useState(false);
  const [isCostsExpanded, setCostsExpanded] = useState(false);

  const toggleSection = (section) => {
    switch (section) {
      case "price":
        setPriceExpanded((prev) => !prev);
        break;
      case "beds":
        setBedsExpanded((prev) => !prev);
        break;
      case "baths":
        setBathsExpanded((prev) => !prev);
        break;
      case "propertyTypes":
        setPropertyTypesExpanded((prev) => !prev);
        break;
      case "listingStatus":
        setListingStatusExpanded((prev) => !prev);
        break;
      case "propertyDetails":
        setPropertyDetailsExpanded((prev) => !prev);
        break;
      case "propertyFeatures":
        setPropertyFeaturesExpanded((prev) => !prev);
        break;
      case "costs":
        setCostsExpanded((prev) => !prev);
        break;
      default:
        break;
    }
  };

  const propertyOptions = [
    { label: "Residential", icon: "🏠" },
    { label: "Townhomes", icon: "🏢" },
    { label: "Co-op", icon: "🏘️" },
    { label: "Multi-family", icon: "🏙️" },
    { label: "Condos", icon: "🏬" },
    { label: "Commercial", icon: "🏪" },
    { label: "Manufactured", icon: "🏚️" },
    { label: "Land", icon: "🗺️" },
    { label: "Other", icon: "..." },
  ];

  const bedOptions = ["Any", "Studio", "1", "2", "3", "4", "5+"];
  const bathOptions = ["Any", "1", "2", "3", "4", "5+"];
  const listingStatusOptions = [
    "Active",
    "Coming soon",
    "Pending",
    "Under contract",
    "Sold",
  ];

  const propertyDetails = [
    { label: "Square feet", key: "squareFeet" },
    { label: "Lot size", key: "lotSize" },
    { label: "Year built", key: "yearBuilt" },
    { label: "Parking spots", key: "parkingSpots", isButtonGroup: true },
    { label: "Stories", key: "stories", isButtonGroup: true },
  ];

  const propertyFeatures = ["A/C", "Fireplace", "Heater", "Pool", "Waterfront"];

  const costOptions = ["All", "Yes", "No"];

  return (
    <div
      className={`fixed inset-0 z-50 bg-black bg-opacity-30 transition-opacity ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      } flex items-center justify-center`}
    >
      <div className="bg-white w-full max-w-lg rounded-lg shadow-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Filters</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        {/* Content */}
        <div className="p-4 space-y-6">
          {/* Sale Type */}
          <div className="w-full flex justify-center">
            <div className="flex w-full max-w-sm rounded-full border border-gray-300 bg-gray-100 overflow-hidden">
              <button
                onClick={() =>
                  setFilters((prev) => ({ ...prev, saleType: "For sale" }))
                }
                className={`flex-1 px-4 py-2 text-center transition-all duration-300 ${
                  filters.saleType === "For sale"
                    ? "bg-white text-black font-medium shadow-sm"
                    : "text-gray-500"
                }`}
              >
                For sale
              </button>
              <button
                onClick={() =>
                  setFilters((prev) => ({ ...prev, saleType: "For rent" }))
                }
                className={`flex-1 px-4 py-2 text-center transition-all duration-300 ${
                  filters.saleType === "For rent"
                    ? "bg-white text-black font-medium shadow-sm"
                    : "text-gray-500"
                }`}
              >
                For rent
              </button>
            </div>
          </div>

          {/* Price Range */}
          <div>
            <div
              className="flex justify-between cursor-pointer"
              onClick={() => toggleSection("price")}
            >
              <span className="text-lg font-semibold">Price</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-6 w-6 transform transition-transform ${
                  isPriceExpanded ? "rotate-90" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
            {isPriceExpanded && (
              <div className="flex items-center space-x-4 mt-4">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="No min"
                    value={filters.priceRange.min}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        priceRange: { ...prev.priceRange, min: e.target.value },
                      }))
                    }
                    className="w-full border rounded-lg px-4 py-2 outline-none focus:ring focus:ring-blue-300"
                  />
                </div>
                <span>to</span>
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="No max"
                    value={filters.priceRange.max}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        priceRange: { ...prev.priceRange, max: e.target.value },
                      }))
                    }
                    className="w-full border rounded-lg px-4 py-2 outline-none focus:ring focus:ring-blue-300"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Bedrooms */}
          <div>
            <div
              className="flex justify-between cursor-pointer"
              onClick={() => toggleSection("beds")}
            >
              <span className="text-lg font-semibold">Bedrooms</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-6 w-6 transform transition-transform ${
                  isBedsExpanded ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
            {isBedsExpanded && (
              <div className="flex space-x-2 mt-4">
                {bedOptions.map((option) => (
                  <button
                    key={option}
                    className={`px-4 py-2 rounded-lg border ${
                      filters.beds === option
                        ? "bg-black text-white border-black"
                        : "bg-white text-black border-gray-300"
                    }`}
                    onClick={() =>
                      setFilters((prev) => ({ ...prev, beds: option }))
                    }
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Bathrooms */}
          <div>
            <div
              className="flex justify-between cursor-pointer"
              onClick={() => toggleSection("baths")}
            >
              <span className="text-lg font-semibold">Bathrooms</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-6 w-6 transform transition-transform ${
                  isBathsExpanded ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
            {isBathsExpanded && (
              <div className="flex space-x-2 mt-4">
                {bathOptions.map((option) => (
                  <button
                    key={option}
                    className={`px-4 py-2 rounded-lg border ${
                      filters.baths === option
                        ? "bg-black text-white border-black"
                        : "bg-white text-black border-gray-300"
                    }`}
                    onClick={() =>
                      setFilters((prev) => ({ ...prev, baths: option }))
                    }
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Property Types */}
          <div>
            <div
              className="flex justify-between cursor-pointer"
              onClick={() => toggleSection("propertyTypes")}
            >
              <span className="text-lg font-semibold">Property Types</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-6 w-6 transform transition-transform ${
                  isPropertyTypesExpanded ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
            {isPropertyTypesExpanded && (
              <div className="grid grid-cols-2 gap-2 mt-4">
                {propertyOptions.map((option) => (
                  <div
                    key={option.label}
                    className={`flex flex-col items-center justify-center p-2 cursor-pointer rounded-lg border ${
                      filters.propertyType?.includes(option.label)
                        ? "border-black bg-gray-100"
                        : "border-gray-300"
                    }`}
                    onClick={() =>
                      setFilters((prev) => ({
                        ...prev,
                        propertyType: filters.propertyType?.includes(
                          option.label
                        )
                          ? filters.propertyType.filter(
                              (type) => type !== option.label
                            )
                          : [...(filters.propertyType || []), option.label],
                      }))
                    }
                  >
                    <span className="text-2xl">{option.icon}</span>
                    <span className="text-sm mt-1">{option.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Listing Status */}
          <div>
            <div
              className="flex justify-between cursor-pointer"
              onClick={() => toggleSection("listingStatus")}
            >
              <span className="text-lg font-semibold">Listing Status</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-6 w-6 transform transition-transform ${
                  isListingStatusExpanded ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
            {isListingStatusExpanded && (
              <div className="space-y-2 mt-4">
                {listingStatusOptions.map((status) => (
                  <div
                    key={status}
                    className="flex items-center space-x-2 cursor-pointer"
                    onClick={() =>
                      setFilters((prev) => ({
                        ...prev,
                        listingStatus: filters.listingStatus?.includes(status)
                          ? filters.listingStatus.filter((s) => s !== status)
                          : [...(filters.listingStatus || []), status],
                      }))
                    }
                  >
                    <div
                      className={`h-5 w-5 flex items-center justify-center border rounded-sm ${
                        filters.listingStatus?.includes(status)
                          ? "bg-black text-white border-black"
                          : "bg-white border-gray-300"
                      }`}
                    >
                      {filters.listingStatus?.includes(status) && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="text-sm">{status}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Property Details */}
          <div>
            <div
              className="flex justify-between cursor-pointer"
              onClick={() => toggleSection("propertyDetails")}
            >
              <span className="text-lg font-semibold">Property Details</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-6 w-6 transform transition-transform ${
                  isPropertyDetailsExpanded ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
            {isPropertyDetailsExpanded && (
              <div className="mt-4 space-y-4">
                {propertyDetails.map((detail) => (
                  <div key={detail.key} className="flex items-center space-x-4">
                    {detail.isButtonGroup ? (
                      // Render Button Group for Parking Spots and Stories
                      <div className="w-full">
                        <span className="text-lg font-semibold">
                          {detail.label}
                        </span>
                        <div className="flex space-x-2 mt-2">
                          {["Any", "1", "2", "3", "4", "5+"].map((option) => (
                            <button
                              key={option}
                              className={`px-4 py-2 rounded-lg border ${
                                filters[detail.key] === option
                                  ? "bg-black text-white border-black"
                                  : "bg-white text-black border-gray-300"
                              }`}
                              onClick={() =>
                                setFilters((prev) => ({
                                  ...prev,
                                  [detail.key]: option,
                                }))
                              }
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : (
                      // Render Min/Max Input Fields for other Property Details
                      <>
                        <div className="flex-1">
                          <input
                            type="text"
                            placeholder={`No min ${detail.label.toLowerCase()}`}
                            value={filters[detail.key]?.min || ""}
                            onChange={(e) =>
                              setFilters((prev) => ({
                                ...prev,
                                [detail.key]: {
                                  ...prev[detail.key],
                                  min: e.target.value,
                                },
                              }))
                            }
                            className="w-full border rounded-lg px-4 py-2 outline-none focus:ring focus:ring-blue-300"
                          />
                        </div>
                        <span>to</span>
                        <div className="flex-1">
                          <input
                            type="text"
                            placeholder={`No max ${detail.label.toLowerCase()}`}
                            value={filters[detail.key]?.max || ""}
                            onChange={(e) =>
                              setFilters((prev) => ({
                                ...prev,
                                [detail.key]: {
                                  ...prev[detail.key],
                                  max: e.target.value,
                                },
                              }))
                            }
                            className="w-full border rounded-lg px-4 py-2 outline-none focus:ring focus:ring-blue-300"
                          />
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Property Features */}
        <div className="p-4 space-y-6">
          <div>
            <div
              className="flex justify-between cursor-pointer"
              onClick={() => toggleSection("propertyFeatures")}
            >
              <span className="text-lg font-semibold">Property Features</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-6 w-6 transform transition-transform ${
                  isPropertyFeaturesExpanded ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
            {isPropertyFeaturesExpanded && (
              <div className="mt-4 space-y-4">
                {propertyFeatures.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center space-x-2 cursor-pointer"
                    onClick={() =>
                      setFilters((prev) => ({
                        ...prev,
                        propertyFeatures: prev.propertyFeatures?.includes(
                          feature
                        )
                          ? prev.propertyFeatures.filter((f) => f !== feature)
                          : [...(prev.propertyFeatures || []), feature],
                      }))
                    }
                  >
                    <div
                      className={`h-5 w-5 flex items-center justify-center border rounded-sm ${
                        filters.propertyFeatures?.includes(feature)
                          ? "bg-black text-white border-black"
                          : "bg-white border-gray-300"
                      }`}
                    >
                      {filters.propertyFeatures?.includes(feature) && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
                <div>
                  <label className="block text-sm font-semibold">
                    Keyword search
                  </label>
                  <input
                    type="text"
                    placeholder='Try "office" or "pool"...'
                    value={filters.keyword || ""}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        keyword: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-2 border rounded-lg outline-none focus:ring focus:ring-blue-300"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Costs Section */}
        <div className="p-4 space-y-6">
          <div>
            <div
              className="flex justify-between cursor-pointer"
              onClick={() => toggleSection("costs")}
            >
              <span className="text-lg font-semibold">Costs</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-6 w-6 transform transition-transform ${
                  isCostsExpanded ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
            {isCostsExpanded && (
              <div className="mt-4">
                <span className="block font-medium mb-2">Association Fee</span>
                <div className="flex space-x-2">
                  {costOptions.map((option) => (
                    <button
                      key={option}
                      className={`px-4 py-2 rounded-lg border ${
                        filters.costs === option
                          ? "bg-black text-white border-black"
                          : "bg-white text-black border-gray-300"
                      }`}
                      onClick={() =>
                        setFilters((prev) => ({ ...prev, costs: option }))
                      }
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t flex items-center justify-between">
          <button
            className="px-4 py-2 border rounded-lg"
            onClick={() =>
              setFilters({
                search: "",
                saleType: "For sale",
                priceRange: { min: "", max: "" },
                beds: "Any",
                baths: "Any",
                propertyType: [],
                listingStatus: [],
                propertyDetails: [],
                propertyFeatures: [],
                costs: "All",
                keyword: "",
              })
            }
          >
            Reset filters
          </button>
          <div className="flex space-x-4">
            <button className="px-4 py-2 border rounded-lg">Save search</button>
            <button className="px-4 py-2 bg-black text-white rounded-lg">
              See {107} properties
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const FilterBar = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const [filters, setFilters] = useState({
    search: "",
    saleType: "For sale",
    priceRange: { min: "", max: "" },
    propertyType: [],
    beds: "Any",
    baths: "Any",
  });

  const [dropdowns, setDropdowns] = useState({
    saleType: false,
    priceRange: false,
    propertyType: false,
    beds: false,
    baths: false,
  });

  const toggleDropdown = (key: string) => {
    setDropdowns((prev) => ({
      ...prev,
      [key]: !prev[key as keyof typeof dropdowns],
    }));
  };

  const closeDropdowns = () => {
    setDropdowns({
      saleType: false,
      priceRange: false,
      propertyType: false,
      beds: false,
      baths: false,
    });
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({ ...prev, search: event.target.value }));
  };

  const handleSaleTypeChange = (type: string) => {
    setFilters((prev) => ({ ...prev, saleType: type }));
    closeDropdowns();
  };

  const handlePriceChange = (key: "min" | "max", value: string) => {
    setFilters((prev) => ({
      ...prev,
      priceRange: { ...prev.priceRange, [key]: value },
    }));
  };

  const handlePropertyTypeChange = (type: string) => {
    setFilters((prev) => {
      const isAlreadySelected = prev.propertyType.includes(type);
      const updatedTypes = isAlreadySelected
        ? prev.propertyType.filter((t) => t !== type) // Remove if already selected
        : [...prev.propertyType, type]; // Add if not selected
      return { ...prev, propertyType: updatedTypes };
    });
  };

  const handleBedsChange = (value: string) => {
    setFilters((prev) => ({ ...prev, beds: value }));
  };

  const handleBathsChange = (value: string) => {
    setFilters((prev) => ({ ...prev, baths: value }));
  };

  const propertyOptions = [
    { label: "Residential", icon: "🏠" },
    { label: "Townhomes", icon: "🏢" },
    { label: "Co-op", icon: "🏘️" },
    { label: "Multi-family", icon: "🏙️" },
    { label: "Condos", icon: "🏬" },
    { label: "Commercial", icon: "🏪" },
    { label: "Manufactured", icon: "🏚️" },
    { label: "Land", icon: "🗺️" },
    { label: "Other", icon: "..." },
  ];

  const bedOptions = ["Any", "Studio", "1", "2", "3", "4", "5+"];
  const bathOptions = ["Any", "1", "2", "3", "4", "5+"];

  return (
    <div className="flex flex-wrap items-center space-x-4 p-4 bg-gray-100 rounded-lg shadow-sm relative">
      {/* Search Bar */}
      <div className="flex-1">
        <input
          type="text"
          value={filters.search}
          onChange={handleSearchChange}
          placeholder="City, neighborhood, ZIP code..."
          className="w-full px-4 py-2 border rounded-lg outline-none"
        />
      </div>

      {/* "For Sale" Dropdown */}
      <div className="relative">
        <button
          className="border px-4 py-2 rounded-lg flex items-center"
          onClick={() => toggleDropdown("saleType")}
        >
          {filters.saleType}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="ml-2 h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {dropdowns.saleType && (
          <div className="absolute left-0 mt-2 w-40 bg-white border rounded-lg shadow-lg z-10">
            {["For sale", "For rent"].map((option) => (
              <div
                key={option}
                className={`p-2 cursor-pointer flex items-center justify-between ${
                  filters.saleType === option
                    ? "bg-gray-200 font-bold"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => handleSaleTypeChange(option)}
              >
                {option}
                {filters.saleType === option && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-black"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* "Any Price" Dropdown */}
      <div className="relative">
        <button
          className="border px-4 py-2 rounded-lg flex items-center"
          onClick={() => toggleDropdown("priceRange")}
        >
          Any price
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="ml-2 h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {dropdowns.priceRange && (
          <div className="absolute left-0 mt-2 w-96 bg-white border rounded-lg shadow-lg z-10 p-4">
            <div className="flex items-center space-x-4 relative">
              {/* Min Price Input and Dropdown */}
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={filters.priceRange.min}
                  placeholder="No min"
                  className="w-full border p-2 rounded-lg focus:ring focus:ring-blue-300 outline-none cursor-pointer"
                  onClick={() => toggleDropdown("minPriceOptions")}
                  onChange={(e) => handlePriceChange("min", e.target.value)} // Manual input
                />
                {dropdowns.minPriceOptions && (
                  <div className="absolute top-full left-0 mt-2 w-full bg-white border rounded-lg shadow-lg z-20">
                    {[
                      "No min",
                      "$300,000",
                      "$400,000",
                      "$500,000",
                      "$600,000",
                    ].map((price) => (
                      <div
                        key={price}
                        className={`p-2 cursor-pointer flex items-center justify-between ${
                          filters.priceRange.min === price
                            ? "bg-gray-200 font-bold"
                            : "hover:bg-gray-100"
                        }`}
                        onClick={() => {
                          handlePriceChange("min", price); // Update state
                          toggleDropdown("minPriceOptions"); // Close dropdown
                        }}
                      >
                        {price}
                        {filters.priceRange.min === price && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-black"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <span className="text-gray-500">to</span>

              {/* Max Price Input and Dropdown */}
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={filters.priceRange.max}
                  placeholder="No max"
                  className="w-full border p-2 rounded-lg focus:ring focus:ring-blue-300 outline-none cursor-pointer"
                  onClick={() => toggleDropdown("maxPriceOptions")}
                  onChange={(e) => handlePriceChange("max", e.target.value)} // Manual input
                />
                {dropdowns.maxPriceOptions && (
                  <div className="absolute top-full left-0 mt-2 w-full bg-white border rounded-lg shadow-lg z-20">
                    {[
                      "No max",
                      "$300,000",
                      "$400,000",
                      "$500,000",
                      "$600,000",
                    ].map((price) => (
                      <div
                        key={price}
                        className={`p-2 cursor-pointer flex items-center justify-between ${
                          filters.priceRange.max === price
                            ? "bg-gray-200 font-bold"
                            : "hover:bg-gray-100"
                        }`}
                        onClick={() => {
                          handlePriceChange("max", price); // Update state
                          toggleDropdown("maxPriceOptions"); // Close dropdown
                        }}
                      >
                        {price}
                        {filters.priceRange.max === price && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-black"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* "All Property Types" Dropdown */}

      <div className="relative">
        <button
          className="border px-4 py-2 rounded-lg flex items-center"
          onClick={() => toggleDropdown("propertyType")}
        >
          Property Types · {filters.propertyType.length || 0}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="ml-2 h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {dropdowns.propertyType && (
          <div className="absolute left-0 mt-2 w-80 bg-white border rounded-lg shadow-lg z-10 p-4">
            <div className="grid grid-cols-3 gap-4">
              {propertyOptions.map((option) => (
                <div
                  key={option.label}
                  className={`flex flex-col items-center justify-center p-2 cursor-pointer hover:bg-gray-100 rounded-lg ${
                    filters.propertyType.includes(option.label)
                      ? "border-black border-2"
                      : "border-gray-300 border"
                  }`}
                  onClick={() => handlePropertyTypeChange(option.label)}
                >
                  <span className="text-2xl">{option.icon}</span>
                  <span className="text-sm mt-1">{option.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* "All Beds" Dropdown */}
      <div className="relative">
        <button
          className="border px-4 py-2 rounded-lg flex items-center"
          onClick={() => toggleDropdown("beds")}
        >
          All beds
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="ml-2 h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {dropdowns.beds && (
          <div className="absolute left-0 mt-2 bg-white border rounded-lg shadow-lg z-10 p-3">
            <div className="flex flex-row space-x-2">
              {bedOptions.map((option) => (
                <button
                  key={option}
                  className={`px-4 py-2 rounded-lg border ${
                    filters.beds === option
                      ? "bg-black text-white border-black"
                      : "bg-white text-black border-gray-300"
                  } hover:bg-gray-100 transition-colors`}
                  onClick={() => handleBedsChange(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* "All Baths" Dropdown */}
      <div className="relative">
        <button
          className="border px-4 py-2 rounded-lg flex items-center"
          onClick={() => toggleDropdown("baths")}
        >
          All baths
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="ml-2 h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {dropdowns.baths && (
          <div className="absolute left-0 mt-2 bg-white border rounded-lg shadow-lg z-10 p-3">
            <div className="flex flex-row space-x-2">
              {bathOptions.map((option) => (
                <button
                  key={option}
                  className={`px-4 py-2 rounded-lg border ${
                    filters.baths === option
                      ? "bg-black text-white border-black"
                      : "bg-white text-black border-gray-300"
                  } hover:bg-gray-100 transition-colors`}
                  onClick={() => handleBathsChange(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Additional Buttons */}
      {/* Filter Bar */}
      <div className="flex flex-wrap items-center space-x-4 p-4 bg-gray-100 rounded-lg shadow-sm relative">
        {/* Other filters */}
        {/* "All Filters" Button */}
        <button
          className="border px-4 py-2 rounded-lg"
          onClick={() => setModalOpen(true)}
        >
          All filters
        </button>
      </div>

      {/* Modal */}
      <AllFiltersModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        filters={filters}
        setFilters={setFilters}
      />
      <button className="bg-black text-white px-4 py-2 rounded-lg">
        Save search
      </button>
    </div>
  );
};

export default FilterBar;
