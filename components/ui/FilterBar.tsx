import React, { useEffect, useState } from "react";
import FilterBarModal from "../ui/FilterBarModal";
import { useSearchParams } from "next/navigation"; // For accessing query parameters

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

const bedOptions = ["Any", "Studio", "1", "2", "3", "4", "5+"];

const bathOptions = ["Any", "1", "2", "3", "4", "5+"];

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
  const searchParams = useSearchParams(); // Hook to access query parameters
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isPriceDropdownOpen, setIsPriceDropdownOpen] = useState(false);
  const [isPropertyTypeDropdownOpen, setIsPropertyTypeDropdownOpen] =
    useState(false);
  const [isBedsDropdownOpen, setIsBedsDropdownOpen] = useState(false);

  const handleToggleDropdown = () => setIsDropdownOpen((prev) => !prev);
  const togglePriceDropdown = () => setIsPriceDropdownOpen((prev) => !prev);
  const togglePropertyTypeDropdown = () =>
    setIsPropertyTypeDropdownOpen((prev) => !prev);
  const handlePropertyTypeSelect = (type: string) => {
    setFilters((prev) => {
      const isSelected = prev.propertyType.includes(type);
      const newPropertyTypes = isSelected
        ? prev.propertyType.filter((t) => t !== type)
        : [...prev.propertyType, type];

      return { ...prev, propertyType: newPropertyTypes };
    });
  };
  const toggleBedsDropdown = () => setIsBedsDropdownOpen((prev) => !prev);
  const handleBedsSelect = (bed: string) => {
    setFilters((prev) => ({
      ...prev,
      beds: bed,
    }));
    setIsBedsDropdownOpen(false);
  };
  const [isBathsDropdownOpen, setIsBathsDropdownOpen] = useState(false);
  const toggleBathsDropdown = () => setIsBathsDropdownOpen((prev) => !prev);

  const handleBathsSelect = (bath: string) => {
    setFilters((prev) => ({
      ...prev,
      baths: bath,
    }));
    setIsBathsDropdownOpen(false);
  };

  const [isFilterBarModalOpen, setIsFilterBarModalOpen] = useState(false);

  const handleOpenModal = () => setIsFilterBarModalOpen(true);
  const handleCloseModal = () => setIsFilterBarModalOpen(false);

  // Set the initial filter based on the "name" query parameter
  useEffect(() => {
    const nameParam = searchParams.get("name");
    if (nameParam) {
      setFilters((prev) => ({ ...prev, search: nameParam }));
    }
  }, [searchParams, setFilters]);

  return (
    <div className=" pt-[100px]">
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
        <div className="relative hidden md:block">
          <button
            className={`px-4 py-2 rounded-lg ${
              filters.forRent
                ? "bg-white border border-gray-300 text-gray-700"
                : "bg-white border border-gray-300 text-gray-700"
            }focus:outline-none focus:ring-2 focus:ring-gold`}
            onClick={handleToggleDropdown}
          >
            {filters.forRent ? "For rent" : "For sale"}
          </button>
          {isDropdownOpen && (
            <div className="absolute top-full mt-2 w-40 bg-white border border-gray-300 rounded-lg shadow-md">
              <div
                className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                  !filters.forRent
                    ? "font-semibold text-black"
                    : "text-gray-700"
                }`}
                onClick={() => {
                  setFilters((prev) => ({ ...prev, forRent: false }));
                  setIsDropdownOpen(false);
                }}
              >
                For sale
              </div>
              <div
                className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                  filters.forRent ? "font-semibold text-black" : "text-gray-700"
                }`}
                onClick={() => {
                  setFilters((prev) => ({ ...prev, forRent: true }));
                  setIsDropdownOpen(false);
                }}
              >
                For rent
              </div>
            </div>
          )}
        </div>

        {/* Any Price Dropdown */}
        <div className="relative hidden md:block">
          <button
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-gold"
            onClick={togglePriceDropdown}
          >
            {filters.minPrice || filters.maxPrice
              ? `${filters.minPrice || "No min"} to ${
                  filters.maxPrice || "No max"
                }`
              : "Any price"}
          </button>
          {isPriceDropdownOpen && (
            <div className="absolute top-full mt-2 w-60 bg-white border border-gray-300 rounded-lg shadow-md p-4">
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
                  <option value="">No min</option>
                  <option value="500">$500</option>
                  <option value="1000">$1,000</option>
                  <option value="1500">$1,500</option>
                  <option value="2000">$2,000</option>
                  <option value="2500">$2,500</option>
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
                  <option value="">No max</option>
                  <option value="1000">$1,000</option>
                  <option value="1500">$1,500</option>
                  <option value="2000">$2,000</option>
                  <option value="2500">$2,500</option>
                  <option value="3000">$3,000</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Property Type Dropdown */}
        <div className="relative hidden md:block">
          <button
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-gold"
            onClick={togglePropertyTypeDropdown}
          >
            {filters.propertyType.length > 0
              ? `${filters.propertyType.length} selected`
              : "All property types"}
          </button>
          {isPropertyTypeDropdownOpen && (
            <div className="absolute top-full mt-2 w-64 bg-white border border-gray-300 rounded-lg shadow-md p-4 grid grid-cols-3 gap-2 z-10">
              {propertyTypes.map((type) => (
                <div
                  key={type.label}
                  className={`flex flex-col items-center justify-center p-2 border rounded-lg cursor-pointer ${
                    filters.propertyType.includes(type.label)
                      ? "bg-gray-100 border-black"
                      : "border-gray-300"
                  }`}
                  onClick={() => handlePropertyTypeSelect(type.label)}
                >
                  <div className="text-2xl">{type.icon}</div>
                  <div className="text-sm text-center">{type.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Beds Dropdown */}
        <div className="relative hidden md:block">
          <button
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-gold"
            onClick={toggleBedsDropdown}
          >
            {filters.beds === "Any" ? "All beds" : `${filters.beds} beds`}
          </button>
          {isBedsDropdownOpen && (
            <div className="absolute top-full mt-2 bg-white border border-gray-300 rounded-lg shadow-md w-auto p-2 flex gap-1 z-10">
              {bedOptions.map((bed) => (
                <button
                  key={bed}
                  className={`px-4 py-2 rounded-md font-medium text-sm transition ${
                    filters.beds === bed
                      ? "bg-gold text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                  onClick={() => handleBedsSelect(bed)}
                >
                  {bed}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Baths Dropdown */}
        <div className="relative hidden md:block">
          <button
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-gold"
            onClick={toggleBathsDropdown}
          >
            {filters.baths === "Any" ? "All baths" : `${filters.baths} baths`}
          </button>
          {isBathsDropdownOpen && (
            <div className="absolute top-full mt-2 bg-white border border-gray-300 rounded-lg shadow-md w-auto p-2 flex gap-1 z-10">
              {bathOptions.map((bath) => (
                <button
                  key={bath}
                  className={`px-4 py-2 rounded-md font-medium text-sm transition ${
                    filters.baths === bath
                      ? "bg-gold text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                  onClick={() => handleBathsSelect(bath)}
                >
                  {bath}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* All Filters Button */}
        <div className="grid grid-cols-2 gap-4 w-full md:w-auto md:flex md:items-center md:gap-2">
          <button
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-gold"
            onClick={handleOpenModal}
          >
            All filters
          </button>

          {/* Save Search Button */}
          <button className="px-4 py-2 bg-gold text-white rounded-lg">
            Save search
          </button>
        </div>

        {/* FilterBarModal */}
        <FilterBarModal
          isOpen={isFilterBarModalOpen}
          onClose={handleCloseModal}
          filters={filters}
          setFilters={setFilters}
        />
      </div>
    </div>
  );
};

export default FilterBar;
