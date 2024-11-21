"use client";

import { useState, useEffect } from "react";
import SearchBarHomeListing from "./SearchBarHomeListing";
import ListingsGridHomeListing from "./ListingsGridHomeListing";
import PaginationHomeListing from "./PaginationHomeListing";
import MapViewHomeListing from "./MapViewHomeListing";
import { fetchProperties } from "../../../services/paragonApi";

const HomeListingsPage: React.FC = () => {
  const [properties, setProperties] = useState<any[]>([]);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });
  const [loading, setLoading] = useState(false);
  const [polygon, setPolygon] = useState<string | null>(null);

  // Function to load properties based on page number and polygon
  const loadProperties = async (pageNumber: number, polygon: string) => {
    setLoading(true);
    try {
      const data = await fetchProperties(pageNumber, polygon);
      setProperties(data);
      setPagination({
        page: pageNumber,
        totalPages: Math.ceil(data.length / 10),
      });
    } catch (error) {
      console.error("Failed to load properties:", error);
    } finally {
      setLoading(false);
    }
  };

  // Effect to load properties when page or polygon updates
  useEffect(() => {
    if (polygon) {
      loadProperties(pagination.page, polygon);
    }
  }, [pagination.page, polygon]);

  return (
    <div className="home-listings-page space-y-4">
      <SearchBarHomeListing
        setPage={(page: number) => setPagination((prev) => ({ ...prev, page }))}
      />
      <div className="listings-and-map flex flex-col md:flex-row gap-4">
        <div className="listings-container w-full md:w-2/5">
          <ListingsGridHomeListing
            properties={properties.slice(0, 10)}
            isLoading={loading}
          />
        </div>
        <div className="map-container w-full md:w-3/5 h-[500px]">
          <MapViewHomeListing
            properties={properties.slice(0, 10)}
            setPolygon={setPolygon} // Pass setPolygon to MapViewHomeListing
          />
        </div>
      </div>
      <PaginationHomeListing
        pagination={pagination}
        setPagination={setPagination}
      />
    </div>
  );
};

export default HomeListingsPage;