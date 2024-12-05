import React, { useState } from "react";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useJsApiLoader,
} from "@react-google-maps/api";
import { Property } from "@/services/mlsAPI";

const MapView: React.FC<{ properties: Property[] }> = ({ properties }) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null
  );

  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <GoogleMap
      center={{
        lat: properties[0]?.Latitude || 42.63358, // Default center if properties are empty
        lng: properties[0]?.Longitude || -83.284028,
      }}
      zoom={10}
      mapContainerStyle={{ width: "100%", height: "100%" }}
    >
      {properties.map((property) => (
        <Marker
          key={property.ListingKey}
          position={{ lat: property.Latitude, lng: property.Longitude }}
          onClick={() => setSelectedProperty(property)} // Set the selected property when clicking a marker
        />
      ))}

      {selectedProperty && (
        <InfoWindow
          position={{
            lat: selectedProperty.Latitude,
            lng: selectedProperty.Longitude,
          }}
          onCloseClick={() => setSelectedProperty(null)}
        >
          <div className="p-2 w-64">
            {/* Property Image */}
            <img
              src={selectedProperty.Media[0]?.MediaURL || "/placeholder.jpg"}
              alt={`Image of ${selectedProperty.City}`}
              className="w-full h-32 object-cover rounded-md mb-2"
            />

            {/* Property Details */}
            <p className="font-bold text-gray-800">
              ${selectedProperty.ListPrice.toLocaleString()}
            </p>
            <p className="text-sm text-gray-600">
              {selectedProperty.BedroomsTotal}bd •{" "}
              {selectedProperty.BathroomsFull}ba
            </p>
            <p className="text-xs text-gray-400 truncate">
              {selectedProperty.City}, {selectedProperty.PostalCode}
            </p>
            <p className="text-xs text-gray-400">
              MLS®: {selectedProperty.ListingKey}
            </p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};

export default MapView;
