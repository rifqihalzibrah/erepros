import React, { useState } from "react";

type Filters = Record<string, string | number | boolean>;

interface FilterBarProps {
  onApplyFilters: (filters: Filters) => void;
}

const FilterBarHomeListing: React.FC<FilterBarProps> = ({ onApplyFilters }) => {
  const [filters, setFilters] = useState({
    city: "",
    zipCode: "",
    minPrice: "",
    maxPrice: "",
    propertyType: "",
    beds: "",
    baths: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleApplyFilters = () => {
    onApplyFilters(filters);
  };

  return (
    <div className="filter-bar bg-white shadow p-4 rounded flex flex-wrap gap-4">
      <input
        type="text"
        name="city"
        placeholder="City"
        className="border p-2 rounded"
        value={filters.city}
        onChange={handleChange}
      />
      <input
        type="text"
        name="zipCode"
        placeholder="ZIP Code"
        className="border p-2 rounded"
        value={filters.zipCode}
        onChange={handleChange}
      />
      <input
        type="number"
        name="minPrice"
        placeholder="Min Price"
        className="border p-2 rounded"
        value={filters.minPrice}
        onChange={handleChange}
      />
      <input
        type="number"
        name="maxPrice"
        placeholder="Max Price"
        className="border p-2 rounded"
        value={filters.maxPrice}
        onChange={handleChange}
      />
      <select
        name="propertyType"
        className="border p-2 rounded"
        value={filters.propertyType}
        onChange={handleChange}
      >
        <option value="">All Property Types</option>
        <option value="single-family">Single-Family</option>
        <option value="apartment">Apartment</option>
        <option value="townhouse">Townhouse</option>
      </select>
      <input
        type="number"
        name="beds"
        placeholder="Beds"
        className="border p-2 rounded"
        value={filters.beds}
        onChange={handleChange}
      />
      <input
        type="number"
        name="baths"
        placeholder="Baths"
        className="border p-2 rounded"
        value={filters.baths}
        onChange={handleChange}
      />
      <button
        onClick={handleApplyFilters}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Apply Filters
      </button>
    </div>
  );
};

export default FilterBarHomeListing;
