"use client";

import { useEffect, useState, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Property } from "../../../types/types";
import { getAccessKey, fetchData } from "../../../services/propertywareAPI";
import BasicFilter from "@/components/ui/BasicFilter";

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
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialPage = Number(searchParams.get("page")) || 1;

  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filters, setFilters] = useState({
    search: "",
    saleType: "For sale",
    priceRange: { min: "", max: "" },
    propertyType: [],
    beds: "Any",
    baths: "Any",
  });
  const [currentPage, setCurrentPage] = useState<number>(initialPage);

  const propertiesPerPage = 12;

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
      const matchesSaleType =
        filters.saleType === "For sale"
          ? property.sale_type === "For sale"
          : property.sale_type === "For rent";

      const matchesPrice =
        (filters.priceRange.min === "" ||
          parseInt(property.target_rent) >= parseInt(filters.priceRange.min)) &&
        (filters.priceRange.max === "" ||
          parseInt(property.target_rent) <= parseInt(filters.priceRange.max));

      const matchesBeds =
        filters.beds === "Any" || property.no_bedrooms === filters.beds;

      const matchesBaths =
        filters.baths === "Any" || property.no_bathrooms === filters.baths;

      const matchesPropertyType =
        filters.propertyType.length === 0 ||
        filters.propertyType.includes(property.property_type);

      const search = filters.search.toLowerCase();
      const matchesSearch =
        property.address.toLowerCase().includes(search) ||
        property.city.toLowerCase().includes(search) ||
        property.state.toLowerCase().includes(search) ||
        property.zip.toLowerCase().includes(search);

      return (
        matchesSaleType &&
        matchesPrice &&
        matchesBeds &&
        matchesBaths &&
        matchesPropertyType &&
        matchesSearch
      );
    });
  }, [properties, filters]);

  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = filteredProperties.slice(
    indexOfFirstProperty,
    indexOfLastProperty
  );

  const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    router.push(`/available-rentals?page=${page}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4 pt-[136px]">
        <h1 className="text-4xl text-center text-gold font-marcellus mb-4">
          Available Rentals
        </h1>
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
        <BasicFilter filters={filters} setFilters={setFilters} />
        <p className="text-gray-500 text-center">No properties found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 pt-[136px]">
      <h1 className="text-5xl text-center text-gold font-marcellus mb-4">
        Available Rentals
      </h1>

      {/* Basic Filter */}
      <BasicFilter filters={filters} setFilters={setFilters} />

      {/* Property Listings */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentProperties.map((property) => (
          <div
            key={property.id}
            className="border rounded-lg p-4 hover:shadow-lg transition-shadow duration-300"
          >
            <Link
              href={{
                pathname: `/property-details/${property.id}`,
                query: { page: currentPage },
              }}
            >
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
              <p className="text-gray-500">{property.property_type} per sqft</p>
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
