export enum PropertyType {
  Residential = "Residential",
  Commercial = "Commercial",
  Industrial = "Industrial",
  Other = "Other", // Fallback for unknown property types
}

export interface HomeListing {
  ListingKey: string; // Unique identifier for the property
  ListPrice?: number; // Price of the property
  City?: string; // City where the property is located
  PostalCode?: string; // Postal code of the property
  latitude: number; // Latitude coordinate for mapping
  longitude: number; // Longitude coordinate for mapping
  Media?: { MediaURL: string }[]; // Media objects (images)
  images?: { original_image_url: string }[]; // Image URLs for gallery
  address?: string; // Full address of the property
  BedroomsTotal?: number; // Number of bedrooms
  bathrooms?: number; // Number of bathrooms
  total_area?: number; // Total area in square feet
  property_type?: PropertyType; // Type of property (enum)
  year_built?: number; // Year the property was built
  description?: string; // Description of the property
  propertyManagers?: Array<{
    name: string; // Manager's name
    phone: string; // Manager's phone number
    email: string; // Manager's email
    company: string; // Company managing the property
  }>;
}
