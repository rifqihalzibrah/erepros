// components/home-listing/MapViewHomeListing.tsx
import React, { useState, useRef, useCallback } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import MapRadiusListenerHomeListing from "./MapRadiusListenerHomeListing";

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

  const mapRef = useRef<google.maps.Map | null>(null);
  const [bounds, setBounds] = useState<google.maps.LatLngBounds | null>(null);
  const [initialCenter] = useState({
    lat: properties[0]?.Coordinates[1] || 0,
    lng: properties[0]?.Coordinates[0] || 0,
  });

  const onLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;

    map.addListener("idle", () => {
      if (mapRef.current) {
        const newBounds = mapRef.current.getBounds();
        if (newBounds) {
          setBounds(newBounds);
        }
      }
    });
  }, []);

  if (!isLoaded) return <p>Loading Map...</p>;

  return (
    <div style={{ position: "relative", height: "500px", width: "100%" }}>
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "100%" }}
        zoom={10}
        center={initialCenter}
        onLoad={onLoad}
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

      <MapRadiusListenerHomeListing bounds={bounds} />
    </div>
  );
};

export default MapViewHomeListing;
