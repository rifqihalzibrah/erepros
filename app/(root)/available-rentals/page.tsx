"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { Property } from "../../../types/types";
import { getAccessKey, fetchData } from "../../../services/propertywareAPI";

const SkeletonCard = () => (
  <div className="border rounded-lg p-4 animate-pulse">
    <div className="w-full h-64 bg-gray-300 rounded-md mb-4"></div>
    <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
    <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
    <div className="h-4 bg-gray-300 rounded w-1/4 mb-2"></div>
    <div className="h-4 bg-gray-300 rounded w-2/3"></div>
  </div>
);

const AvailableRentals = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchValue, setSearchValue] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const propertiesPerPage = 12; // Number of properties per page

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const accessKey = await getAccessKey();
        const data = await fetchData(accessKey);
        setProperties(data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      const address = property.address?.toLowerCase() || "";
      const city = property.city?.toLowerCase() || "";
      const state = property.state?.toLowerCase() || "";
      const zip = property.zip?.toLowerCase() || "";
      const search = searchValue.toLowerCase();

      return (
        address.includes(search) ||
        city.includes(search) ||
        state.includes(search) ||
        zip.includes(search)
      );
    });
  }, [properties, searchValue]);

  // Get current page's properties
  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = filteredProperties.slice(
    indexOfFirstProperty,
    indexOfLastProperty
  );

  // Calculate total pages
  const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);

    // Scroll to the top of the page or specific section
    window.scrollTo({
      top: 0, // Adjust this value if needed
      behavior: "smooth",
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4 pt-[136px]">
        <h1 className="text-3xl font-bold mb-4">Available Rentals</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: propertiesPerPage }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (filteredProperties.length === 0) {
    return (
      <div className="container mx-auto p-4 pt-[136px]">
        <h1 className="text-3xl font-bold mb-4">Available Rentals</h1>
        <input
          type="text"
          value={searchValue}
          onChange={handleSearchChange}
          placeholder="Search by address, city, or neighborhood"
          className="border p-2 mb-4 w-full rounded-lg"
        />
        <p className="text-gray-500 text-center">No properties found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 pt-[136px]">
      <h1 className="text-3xl font-bold mb-4">Available Rentals</h1>

      {/* Search Bar */}
      <input
        type="text"
        value={searchValue}
        onChange={handleSearchChange}
        placeholder="Search by address, city, or neighborhood"
        className="border p-2 mb-4 w-full rounded-lg"
      />

      {/* Property Listings */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentProperties.map((property) => (
          <div
            key={property.id}
            className="border rounded-lg p-4 hover:shadow-lg transition-shadow duration-300"
          >
            <Link href={`/property-details/${property.id}`}>
              <img
                src={
                  property.images[0]?.original_image_url ||
                  "/placeholder-image.svg"
                }
                alt={property.address}
                className="w-full h-64 object-cover rounded-md mb-4"
              />
              <h2 className="text-2xl font-semibold">{property.address}</h2>
              <p className="text-gray-600">
                {property.city}, {property.state} {property.zip}
              </p>
              <p className="text-lg font-bold text-gray-900">
                ${property.target_rent}
              </p>
              <p className="text-gray-500">
                ${property.property_type} per sqft
              </p>
              <p className="text-sm text-gray-600 mt-2">
                {property.no_bedrooms} Beds • {property.no_bathrooms} Baths •{" "}
                {property.total_area} Sq Ft
              </p>
            </Link>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 space-x-2">
        {Array.from({ length: totalPages }).map((_, index) => {
          const page = index + 1;
          return (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-4 py-2 border rounded ${
                currentPage === page
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-700"
              }`}
            >
              {page}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default AvailableRentals;
