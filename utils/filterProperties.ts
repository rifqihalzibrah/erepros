import { Property } from "@/types/types";

interface Filters {
  search: string;
  forRent: boolean;
  priceRange: string;
  propertyType: string[];
  beds: string;
  baths: string;
  minPrice: string;
  maxPrice: string;
}

export const filterProperties = (
  properties: Property[],
  filters: Filters
): Property[] => {
  let filtered = properties;

  // Search filter
  if (filters.search) {
    filtered = filtered.filter(
      (property) =>
        property.address.toLowerCase().includes(filters.search.toLowerCase()) ||
        property.city.toLowerCase().includes(filters.search.toLowerCase()) ||
        property.zip.includes(filters.search)
    );
  }

  // For Rent/Sale filter
  filtered = filtered.filter((property) =>
    filters.forRent
      ? property.is_published_for_rent
      : property.is_published_for_sale
  );

  // Price Range filter
  if (filters.minPrice) {
    filtered = filtered.filter(
      (property) => property.target_rent >= parseInt(filters.minPrice)
    );
  }
  if (filters.maxPrice) {
    filtered = filtered.filter(
      (property) => property.target_rent <= parseInt(filters.maxPrice)
    );
  }

  // Property Type filter
  if (filters.propertyType.length > 0) {
    filtered = filtered.filter((property) =>
      filters.propertyType.includes(property.property_type)
    );
  }

  // Beds filter
  if (filters.beds !== "Any") {
    const beds = filters.beds === "Studio" ? 0 : parseInt(filters.beds);
    filtered = filtered.filter((property) => property.no_bedrooms === beds);
  }

  // Baths filter
  // Baths filter
  if (filters.baths !== "Any") {
    const baths = filters.baths === "5+" ? 5 : parseInt(filters.baths);
    filtered = filtered.filter((property) => property.no_bathrooms >= baths);
  }

  return filtered;
};
