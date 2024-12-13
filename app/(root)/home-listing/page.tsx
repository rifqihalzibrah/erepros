"use client";

import { fetchPropertiesByPage, Property } from "@/services/mlsAPI";
import React, { useEffect, useState } from "react";
import FilterBar from "../../../components/ui/home-listing/FilterBar";
import MapView from "../../../components/ui/home-listing/MapView";
import PropertyList from "../../../components/ui/home-listing/PropertyList";

const HomePage: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error] = useState<string | null>(null);
  const [page, setPage] = useState(1); // Current page
  const [totalPages, setTotalPages] = useState(1); // Total pages (optional, depends on API)

  const pageSize = 10; // Number of properties per page

  const [filters, setFilters] = useState({
    search: "",
    forRent: false,
    priceRange: "",
    propertyType: [] as string[],
    beds: "Any",
    baths: "Any",
    minPrice: "",
    maxPrice: "",
  });

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const fetchedProperties = await fetchPropertiesByPage(
          page,
          pageSize,
          filters
        );
        if (!fetchedProperties || !Array.isArray(fetchedProperties)) {
          throw new Error("Invalid properties data");
        }
        setProperties(fetchedProperties);
        const totalCount = 100; // Replace with actual API response if available
        setTotalPages(Math.ceil(totalCount / pageSize));
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [page, filters]);

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return; // Prevent invalid page numbers
    setPage(newPage);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Filter Bar */}
      <FilterBar filters={filters} setFilters={setFilters} />

      {/* Main Content */}
      <div className="flex flex-1 h-screen">
        {/* Property List */}
        <div className="w-1/2 overflow-y-auto border-r">
          {loading ? (
            <div className="text-center mt-8">Loading properties...</div>
          ) : (
            <>
              <PropertyList properties={properties} />
              <div className="flex justify-center items-center gap-4 mt-4">
                <button
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                  className="px-4 py-2 bg-gold text-white rounded-lg hover:bg-black focus:outline-none disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="text-sm text-gray-700">
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === totalPages}
                  className="px-4 py-2 bg-gold text-white rounded-lg hover:bg-black focus:outline-none disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </>
          )}
          {error && (
            <div className="text-center text-red-500 mt-4">{error}</div>
          )}
        </div>

        {/* Map */}
        <div className="w-1/2 h-screen sticky top-0">
          <MapView properties={properties} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
