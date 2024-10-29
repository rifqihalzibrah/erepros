// services/paragonApi.ts
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

/**
 * Fetches properties from the Paragon API with pagination and a dynamic map bounds filter.
 * @param page - The page number for pagination.
 * @param polygon - The polygon string for bounding box filtering.
 * @returns A promise that resolves to an array of Property objects.
 */
export const fetchProperties = async (
  page: number = 1,
  polygon: string
): Promise<Property[]> => {
  const skip = (page - 1) * 10; // Adjusted to fetch only 10 properties per page

  const params: Record<string, any> = {
    access_token: API_TOKEN,
    $skip: skip,
    $orderby: "ListPrice desc",
    $top: 10,
    $filter: `geo.intersects(Coordinates, ${polygon})`,
  };

  try {
    const response = await axios.get(
      `${API_BASE_URL}/${DATASET_ID}/Properties`,
      { params }
    );

    return response.data.value.map((property: any) => ({
      ListingKey: property.ListingKey,
      ListPrice: property.ListPrice,
      City: property.City,
      PostalCode: property.PostalCode,
      Coordinates: property.Coordinates,
      Media: property.Media ?? [], // Default to empty array if no media is available
    }));
  } catch (error) {
    console.error("Error fetching properties:", error);
    throw new Error("Failed to fetch properties from Paragon API.");
  }
};
