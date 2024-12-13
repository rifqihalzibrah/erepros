import axios, { AxiosInstance } from "axios";

// Base configuration
const API_BASE_URL =
  process.env.NEXT_PUBLIC_PARAGON_API_BASE_URL ||
  "https://api.paragonapi.com/api/v2/OData";
const DATASET_ID = process.env.NEXT_PUBLIC_PARAGON_DATASET_ID;
const API_TOKEN = process.env.NEXT_PUBLIC_PARAGON_API_TOKEN;

// Ensure required environment variables are set
if (!DATASET_ID || !API_TOKEN) {
  throw new Error("Missing required environment variables for Paragon API.");
}

// Create a reusable Axios instance
const axiosInstance: AxiosInstance = axios.create({
  baseURL: `${API_BASE_URL}/${DATASET_ID}`,
  params: {
    access_token: API_TOKEN,
  },
});

// Define interfaces for properties
interface Media {
  MediaURL: string;
}

export interface Property {
  ListingKey: string;
  ListingId: number;
  ListPrice: number;
  City: string;
  PostalCode: string;
  Coordinates: [number, number];
  Media: Media[];
  BedroomsTotal: number;
  BathroomsFull: number;
  LotSizeArea: number;
  Latitude: number; // Latitude for map location
  Longitude: number; // Longitude for map location
  PropertyType: string;
  BK15_LA1_State: string;
  BK15_LA1_Zip: number;
  BK15_L_Address: string;
  YearBuilt: number;
  OnMarketDate: string;
  BK15_LMD_MP_UpdateDate: string;
  PublicRemarks: string;
}

/**
 * Builds an OData $filter query based on the provided filters.
 * @param filters - Object containing filter values.
 * @returns A string representing the OData $filter query.
 */
const buildFilterQuery = (filters: any): string | null => {
  const filterClauses: string[] = [];

  if (filters.search) {
    filterClauses.push(
      `contains(City, '${filters.search}') or contains(PostalCode, '${filters.search}')`
    );
  }

  if (filters.minPrice) {
    filterClauses.push(`ListPrice ge ${filters.minPrice}`);
  }

  if (filters.maxPrice) {
    filterClauses.push(`ListPrice le ${filters.maxPrice}`);
  }

  if (filters.beds && filters.beds !== "Any") {
    filterClauses.push(`BedroomsTotal ge ${filters.beds.replace("+", "")}`);
  }

  if (filters.baths && filters.baths !== "Any") {
    filterClauses.push(`BathroomsFull ge ${filters.baths.replace("+", "")}`);
  }

  if (filters.propertyType.length > 0) {
    const typeFilters = filters.propertyType.map(
      (type: string) => `PropertyType eq '${type}'`
    );
    filterClauses.push(`(${typeFilters.join(" or ")})`);
  }

  return filterClauses.length > 0 ? filterClauses.join(" and ") : null;
};

/**
 * Fetches exactly `pageSize` properties with images and applies filters.
 * @param page - The page number to start fetching from.
 * @param pageSize - The desired number of properties with images.
 * @param filters - Object containing filtering criteria.
 * @returns A promise resolving to an array of properties with images.
 */
export const fetchPropertiesByPage = async (
  page: number,
  pageSize: number,
  filters: any
): Promise<Property[]> => {
  const propertiesWithImages: Property[] = [];
  let currentPage = page;

  const filterQuery = buildFilterQuery(filters);

  try {
    while (propertiesWithImages.length < pageSize) {
      const params: any = {
        $top: pageSize,
        $skip: (currentPage - 1) * pageSize,
        $orderby: "ListPrice desc",
        $select:
          "ListingKey,ListPrice,City,PostalCode,Coordinates,Media,BedroomsTotal,BathroomsFull,LotSizeArea,Latitude,Longitude,ListingId,PropertyType,BK15_LA1_State,BK15_LA1_Zip,BK15_L_Address,YearBuilt,OnMarketDate,BK15_LMD_MP_UpdateDate,PublicRemarks",
      };

      if (filterQuery) {
        params.$filter = filterQuery;
      }

      const response = await axiosInstance.get("/Properties", { params });
      const fetchedProperties = response.data.value;

      // Filter properties to include only those with images
      const propertiesWithImagesInPage = fetchedProperties.filter(
        (property: Property) => property.Media?.length > 0
      );

      propertiesWithImages.push(...propertiesWithImagesInPage);

      // Stop fetching if fewer properties are returned than `pageSize`
      if (
        fetchedProperties.length < pageSize ||
        !response.data["@odata.nextLink"]
      ) {
        break;
      }

      currentPage++; // Fetch the next page
    }

    // Return exactly `pageSize` properties with images
    return propertiesWithImages.slice(0, pageSize);
  } catch (error: any) {
    console.error("Error fetching properties:", error.message);
    throw new Error("Failed to fetch properties.");
  }
};

/**
 * Fetches a single property by its ListingKey.
 * @param listingKey - The unique identifier of the property.
 * @returns A promise resolving to the property data.
 */
export const fetchSingleProperty = async (
  listingKey: string
): Promise<Property> => {
  try {
    const response = await axiosInstance.get(`/Properties('${listingKey}')`);
    const property = response.data;

    return {
      ListingKey: property.ListingKey,
      ListingId: property.ListingId,
      ListPrice: property.ListPrice,
      City: property.City,
      PostalCode: property.PostalCode,
      Coordinates: property.Coordinates,
      Media: property.Media || [],
      BedroomsTotal: property.BedroomsTotal,
      BathroomsFull: property.BathroomsFull,
      LotSizeArea: property.LotSizeArea,
      Latitude: property.Latitude,
      Longitude: property.Longitude,
      PropertyType: property.PropertyType,
      BK15_LA1_State: property.BK15_LA1_State,
      BK15_LA1_Zip: property.BK15_LA1_Zip,
      BK15_L_Address: property.BK15_L_Address,
      YearBuilt: property.YearBuilt,
      OnMarketDate: property.OnMarketDate,
      BK15_LMD_MP_UpdateDate: property.BK15_LMD_MP_UpdateDate,
      PublicRemarks: property.PublicRemarks,
    };
  } catch (error: any) {
    console.error("Error fetching single property:", error.message);
    throw new Error("Failed to fetch property.");
  }
};
