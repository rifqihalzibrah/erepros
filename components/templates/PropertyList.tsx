"use client";

import { useEffect, useState } from "react";
import { getParagonListings } from "@/services/paragonService";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

interface Listing {
  "@odata.id": string;
  City?: string;
  ListPrice?: number;
  StreetName?: string;
  PostalCode?: string;
  Latitude?: number;
  Longitude?: number;
  BedroomsTotal?: number;
  BathroomsTotalDecimal?: number;
  Media?: { MediaURL: string }[];
}

const PropertyList = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalListings, setTotalListings] = useState<number>(0);
  const pageSize = 10;

  const googleMapsApiKey = "AIzaSyDOK76m7BqhVMRzHrPotzSxejDellh4SMI"; // Replace with your actual Google Maps API Key

  useEffect(() => {
    loadListings(currentPage);
  }, [currentPage]);

  const loadListings = async (page: number) => {
    setLoading(true);
    try {
      const data = await getParagonListings(page, pageSize);

      if (data?.value && Array.isArray(data.value)) {
        setListings(data.value);
        setTotalListings(data["@odata.count"] || 0);
      } else {
        console.error("Unexpected data format:", data);
        setError("Failed to load listings");
      }
    } catch (error) {
      console.error("Error fetching property listings:", error);
      setError("Error fetching property listings");
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(totalListings / pageSize);

  const getPageNumbers = () => {
    const maxPages = 10;
    let startPage = Math.max(1, currentPage - Math.floor(maxPages / 2));
    let endPage = startPage + maxPages - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxPages + 1);
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  };

  return (
    <div className="flex w-full h-screen">
      {/* Property Listings Section */}
      <div className="w-1/2 overflow-y-scroll h-full p-4">
        <h1 className="text-2xl font-semibold">Real Estate & Homes for Sale</h1>
        <p>{totalListings} results</p>
        <div className="grid grid-cols-2 gap-4 mt-4">
          {listings.map((listing) => (
            <div
              key={listing["@odata.id"]}
              className="border p-4 rounded-lg shadow"
            >
              {listing.Media && listing.Media.length > 0 && (
                <img
                  src={listing.Media[0].MediaURL}
                  alt="Property Image"
                  className="w-full h-40 object-cover mb-2 rounded-md"
                />
              )}
              <h3 className="text-lg font-bold">{listing.City}</h3>
              <p>Price: ${listing.ListPrice?.toLocaleString()}</p>
              <p>
                Address: {listing.StreetName}, {listing.PostalCode}
              </p>
              <p>Bedrooms: {listing.BedroomsTotal}</p>
              <p>Bathrooms: {listing.BathroomsTotalDecimal}</p>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-4">
          {currentPage > 1 && (
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              className="mx-1 px-3 py-1 rounded bg-gray-200"
            >
              Prev
            </button>
          )}

          {getPageNumbers().map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`mx-1 px-3 py-1 rounded ${
                currentPage === page ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              {page}
            </button>
          ))}

          {currentPage < totalPages && (
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              className="mx-1 px-3 py-1 rounded bg-gray-200"
            >
              Next
            </button>
          )}
        </div>

        {loading && <p>Loading listings...</p>}
        {error && <p>{error}</p>}
      </div>

      {/* Google Map Integration Section */}
      <div className="w-1/2 h-full">
        <LoadScript googleMapsApiKey={googleMapsApiKey}>
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "100%" }}
            center={{
              lat: listings[0]?.Latitude || 37.7749,
              lng: listings[0]?.Longitude || -122.4194,
            }}
            zoom={10}
          >
            {listings.map(
              (listing) =>
                listing.Latitude &&
                listing.Longitude && (
                  <Marker
                    key={listing["@odata.id"]}
                    position={{ lat: listing.Latitude, lng: listing.Longitude }}
                    title={listing.City || "Property Location"}
                  />
                )
            )}
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
};

export default PropertyList;
