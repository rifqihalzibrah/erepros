"use client";

import React, { useEffect, useState } from "react";
import { Property } from "@/types/types";
import { fetchData, getAccessKey } from "@/services/propertywareAPI";
import PropertyCard from "../../../components/ui/PropertyCard";
import PropertyCardSkeleton from "../../../components/ui/PropertyCardSkeleton";
import FilterBar from "../../../components/ui/FilterBar";
import Pagination from "../../../components/ui/Pagination";
import { filterProperties } from "../../../utils/filterProperties";
import FilterBarSkeleton from "../../../components/ui/FilterBarSkeleton";

const AvailableRentals = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Filter state
  const [filters, setFilters] = useState({
    search: "",
    forRent: true,
    priceRange: "Any price",
    propertyType: [],
    beds: "Any",
    baths: "Any",
    minPrice: "",
    maxPrice: "",
  });

  // Fetch properties from API
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const accessKey = await getAccessKey();
        const data: Property[] = await fetchData(accessKey);
        setProperties(data);
        setFilteredProperties(data); // Initialize with all properties
      } catch (error) {
        console.error("Error fetching available rentals:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // Apply filters whenever filters or properties change
  useEffect(() => {
    setFilteredProperties(filterProperties(properties, filters));
    setCurrentPage(1); // Reset to first page when filters change
  }, [filters, properties]);

  // Determine properties to display on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProperties = filteredProperties.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div className="p-6 bg-gray-100 min-h-screen pt-[150px]">
        {/* Filter Bar Skeleton */}
        <FilterBarSkeleton />

        {/* Property Card Skeletons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
          {Array.from({ length: 6 }).map((_, index) => (
            <PropertyCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Filter Bar */}
      <FilterBar filters={filters} setFilters={setFilters} />

      {/* Header Section */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Real Estate & Homes for Rent</h1>
        <p className="text-gray-600">{filteredProperties.length} results</p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {currentProperties.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
            currentPage={currentPage}
          />
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={filteredProperties.length}
        currentPage={currentPage}
        paginate={paginate}
      />
    </div>
  );
};

export default AvailableRentals;
