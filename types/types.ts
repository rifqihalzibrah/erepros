export interface Property {
  id: number;
  address: string;
  target_rent: number;
  no_bedrooms: number;
  no_bathrooms: number;
  total_area: number;
  city: string;
  state: string;
  zip: string;
  description: string;
  property_type: string;
  year_built?: string;
  available_date?: string;
  updated_date?: string;
  images: { thumb_image_url: string; original_image_url: string }[];
  agent_name?: string;
  agent_phone?: string;
  agent_email?: string;
  longitude: number;
  lattitude: number;
}
