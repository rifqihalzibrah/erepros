import axios from "axios";

const API_BASE_URL = "https://api.paragonapi.com/api/v2/OData";
const DATASET_ID = process.env.NEXT_PUBLIC_PARAGON_DATASET_ID;
const API_TOKEN = process.env.NEXT_PUBLIC_PARAGON_API_TOKEN;

interface Property {
  ListingKey: string;
  ListPrice: number;
  City: string;
  PostalCode: string;
  Coordinates: [number, number];
  Media: { MediaURL: string }[];
}

interface FetchPropertiesResponse {
  properties: Property[];
  totalCount: number;
}

/**
 * Fetches properties from the Paragon API using server-side pagination.
 * @param page - The page number for pagination.
 * @param polygon - The polygon string for bounding box filtering.
 * @returns A promise that resolves to an object containing properties and the total count.
 */
export const fetchProperties = async (
  page: number = 1,
  polygon: string
): Promise<FetchPropertiesResponse> => {
  const pageSize = 21;
  const skip = (page - 1) * pageSize;

  try {
    // Build the filter conditionally
    const filter = polygon
      ? `geo.intersects(Coordinates, ${polygon})`
      : undefined;

    // Debug: Log request details
    console.log(
      "Fetching properties with URL:",
      `${API_BASE_URL}/${DATASET_ID}/Properties`
    );
    console.log("Params:", {
      access_token: API_TOKEN,
      ...(filter && { $filter: filter }),
      $orderby: "ListPrice desc",
      $top: pageSize,
      $skip: skip,
    });

    const response = await axios.get(
      `${API_BASE_URL}/${DATASET_ID}/Properties`,
      {
        params: {
          access_token: API_TOKEN,
          ...(filter && { $filter: filter }), // Include filter only if defined
          $orderby: "ListPrice desc",
          $top: pageSize,
          $skip: skip,
        },
      }
    );

    const totalCount = response.data["@odata.count"] || 0;

    const properties = response.data.value.map((property: any) => ({
      ListingKey: property.ListingKey,
      ListPrice: property.ListPrice,
      City: property.City,
      PostalCode: property.PostalCode,
      Coordinates: property.Coordinates,
      Media: property.Media || [], // Keep the entire Media array
    }));

    return {
      properties,
      totalCount,
    };
  } catch (error: any) {
    // Enhanced error logging
    console.error("Error fetching properties:", {
      message: error.message,
      response: error.response?.data,
    });
    throw new Error("Failed to fetch properties from Paragon API.");
  }
};

/**
 * Fetches a single property by ListingKey.
 * @param listingKey - The unique identifier of the property.
 * @returns A promise that resolves to the property data.
 */
export const fetchSingleProperty = async (
  listingKey: string
): Promise<Property> => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/${DATASET_ID}/Properties/${listingKey}`,
      {
        params: {
          access_token: API_TOKEN,
        },
      }
    );

    const property = response.data;

    return {
      ListingKey: property.ListingKey,
      ListPrice: property.ListPrice,
      City: property.City,
      PostalCode: property.PostalCode,
      Coordinates: property.Coordinates,
      Media: property.Media || [],
    };
  } catch (error: any) {
    console.error("Error fetching property by ID:", {
      message: error.message,
      response: error.response?.data,
    });
    throw new Error("Failed to fetch property by ID.");
  }
};
