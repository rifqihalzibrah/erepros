"use client";

import { useState, useEffect } from "react";
import ListingsGridHomeListing from "./ListingsGridHomeListing";
import PaginationHomeListing from "./PaginationHomeListing";
import MapViewHomeListing from "./MapViewHomeListing";
import FilterBarHomeListing from "./FilterBarHomeListing";
import { fetchProperties } from "../../../services/paragonApi";

const HomeListingsPage: React.FC = () => {
  const [properties, setProperties] = useState<any[]>([]);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });
  const [loading, setLoading] = useState(false);
  const [polygon, setPolygon] = useState<string | null>(null);
  const [filters, setFilters] = useState<string>("");

  const loadProperties = async (
    pageNumber: number,
    polygon: string | null,
    filterString: string
  ) => {
    setLoading(true);
    try {
      const { properties, totalCount } = await fetchProperties(
        pageNumber,
        polygon || "",
        filterString
      );
      setProperties(properties);
      setPagination({
        page: pageNumber,
        totalPages: Math.ceil(totalCount / 10),
      });
    } catch (error) {
      console.error("Failed to load properties:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProperties(pagination.page, polygon, filters);
  }, [pagination.page, polygon, filters]);

  const handleFilters = (filterData: any) => {
    const conditions: string[] = [];
    if (filterData.city) conditions.push(`City eq '${filterData.city}'`);
    if (filterData.zipCode)
      conditions.push(`PostalCode eq '${filterData.zipCode}'`);
    if (filterData.minPrice)
      conditions.push(`ListPrice ge ${filterData.minPrice}`);
    if (filterData.maxPrice)
      conditions.push(`ListPrice le ${filterData.maxPrice}`);
    if (filterData.propertyType)
      conditions.push(`PropertyType eq '${filterData.propertyType}'`);
    if (filterData.beds) conditions.push(`Beds ge ${filterData.beds}`);
    if (filterData.baths) conditions.push(`Baths ge ${filterData.baths}`);
    setFilters(conditions.join(" and "));
    setPagination((prev) => ({ ...prev, page: 1 })); // Reset to first page
  };

  return (
    <div className="home-listings-page space-y-4 pt-[136px]">
      <FilterBarHomeListing onApplyFilters={handleFilters} />
      <div className="listings-and-map flex flex-col md:flex-row gap-4">
        <div className="listings-container w-full md:w-2/5">
          <ListingsGridHomeListing
            properties={properties}
            isLoading={loading}
          />
        </div>
        <div className="map-container w-full md:w-3/5 h-[500px]">
          <MapViewHomeListing properties={properties} setPolygon={setPolygon} />
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
