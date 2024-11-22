"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Property } from "../../../types/types"; // Ensure your Property type is correctly imported
import { getAccessKey, fetchData } from "../../../services/propertywareAPI"; // Import your API functions

const AvailableRentals = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchValue, setSearchValue] = useState<string>(""); // Search bar input

  useEffect(() => {
    // Fetch access key and then fetch property data
    const fetchProperties = async () => {
      try {
        const accessKey = await getAccessKey(); // Get the access key
        const data = await fetchData(accessKey); // Fetch property data using the access key
        setProperties(data); // Set the property data into state
        setLoading(false); // Loading finished
      } catch (error) {
        console.error("Error fetching properties:", error);
        setLoading(false); // Even if error, stop loading spinner
      }
    };

    fetchProperties();
  }, []);

  // Filter properties based on search input
  const filteredProperties = properties.filter((property) =>
    property.address.toLowerCase().includes(searchValue.toLowerCase())
  );

  // Handle search input change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (filteredProperties.length === 0) {
    return <div>No properties found</div>;
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
        {filteredProperties.map((property) => (
          <div
            key={property.id}
            className="border rounded-lg p-4 hover:shadow-lg transition-shadow duration-300"
          >
            <Link href={`/property-details/${property.id}`}>
              {/* Property Image */}
              <img
                src={
                  property.images[0]?.original_image_url ||
                  "/placeholder-image.svg"
                }
                alt={property.address}
                className="w-full h-64 object-cover rounded-md mb-4"
              />

              {/* Property Info */}
              <h2 className="text-2xl font-semibold">{property.address}</h2>
              <p className="text-gray-600">
                {property.city}, {property.state} {property.zip}
              </p>
              <p className="text-lg font-bold text-gray-900">
                ${property.target_rent}
              </p>
              <p className="text-gray-500">
                ${(property.target_rent / property.total_area).toFixed(2)} per
                sqft
              </p>
              <div className="mt-2">
                <p className="text-sm text-gray-600">
                  {property.no_bedrooms} Beds • {property.no_bathrooms} Baths •{" "}
                  {property.total_area} Sq Ft
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailableRentals;
