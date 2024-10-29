// components/home-listing/MapViewHomeListing.tsx
import React from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

interface Property {
  ListingKey: string;
  Coordinates: [number, number];
}

interface MapViewHomeListingProps {
  properties: Property[];
}

const MapViewHomeListing: React.FC<MapViewHomeListingProps> = ({
  properties,
}) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  if (!isLoaded) return <p>Loading Map...</p>;

  return (
    <GoogleMap
      mapContainerStyle={{ width: "100%", height: "500px" }}
      zoom={10}
      center={{
        lat: properties[0]?.Coordinates[1] || 0,
        lng: properties[0]?.Coordinates[0] || 0,
      }}
    >
      {properties.map((property) => (
        <Marker
          key={property.ListingKey}
          position={{
            lat: property.Coordinates[1],
            lng: property.Coordinates[0],
          }}
        />
      ))}
    </GoogleMap>
  );
};

export default MapViewHomeListing;
