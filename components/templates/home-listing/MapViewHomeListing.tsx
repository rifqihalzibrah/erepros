import React, { useState, useRef, useCallback } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import MapRadiusListenerHomeListing from "./MapRadiusListenerHomeListing";

interface Property {
  ListingKey: string;
  Coordinates: [number, number];
  Media?: string; // Image URL
  ListPrice: number; // Property price
  City: string;
  PostalCode: string;
}

interface MapViewHomeListingProps {
  properties: Property[];
  setPolygon: (polygon: string) => void;
}

const MapViewHomeListing: React.FC<MapViewHomeListingProps> = ({
  properties,
  setPolygon,
}) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  const mapRef = useRef<google.maps.Map | null>(null);
  const [bounds, setBounds] = useState<google.maps.LatLngBounds | null>(null);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null
  );
  const [center, setCenter] = useState<{ lat: number; lng: number }>({
    lat: properties[0]?.Coordinates[1] || 42.2808,
    lng: properties[0]?.Coordinates[0] || -83.743,
  });

  const onLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;

    map.addListener("idle", () => {
      if (mapRef.current) {
        const newBounds = mapRef.current.getBounds();
        if (newBounds) {
          setBounds(newBounds);
        }

        const newCenter = mapRef.current.getCenter();
        if (newCenter) {
          setCenter({
            lat: newCenter.lat(),
            lng: newCenter.lng(),
          });
        }
      }
    });
  }, []);

  const handleBoundsChange = (polygon: string) => {
    setPolygon(polygon);
  };

  if (!isLoaded) return <p>Loading Map...</p>;

  return (
    <div style={{ position: "relative", height: "100vh", width: "100%" }}>
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "100%" }}
        zoom={10}
        center={center}
        onLoad={onLoad}
        onDragEnd={() => {
          if (mapRef.current) {
            const newCenter = mapRef.current.getCenter();
            if (newCenter) {
              setCenter({
                lat: newCenter.lat(),
                lng: newCenter.lng(),
              });
            }
          }
        }}
      >
        {properties.map((property) => (
          <Marker
            key={property.ListingKey}
            position={{
              lat: property.Coordinates[1],
              lng: property.Coordinates[0],
            }}
            onClick={() => setSelectedProperty(property)}
          />
        ))}

        {selectedProperty && (
          <InfoWindow
            position={{
              lat: selectedProperty.Coordinates[1],
              lng: selectedProperty.Coordinates[0],
            }}
            onCloseClick={() => setSelectedProperty(null)}
          >
            <div style={{ maxWidth: "200px" }}>
              <img
                src={
                  selectedProperty.Media?.[0]?.MediaURL || "/placeholder.jpg"
                } // Use the first Media URL or fallback to placeholder
                alt="Property"
                style={{ width: "100%", height: "auto", marginBottom: "8px" }}
              />
              <p style={{ fontWeight: "bold", marginBottom: "4px" }}>
                ${selectedProperty.ListPrice.toLocaleString()}
              </p>
              <p>
                {selectedProperty.City}, {selectedProperty.PostalCode}
              </p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>

      <MapRadiusListenerHomeListing
        bounds={bounds}
        onBoundsChange={handleBoundsChange}
      />
    </div>
  );
};

export default MapViewHomeListing;
