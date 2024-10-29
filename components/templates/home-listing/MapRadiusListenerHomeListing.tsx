// components/home-listing/MapRadiusListenerHomeListing.tsx
import React, { useEffect } from "react";

interface MapRadiusListenerProps {
  bounds: google.maps.LatLngBounds | null;
}

const MapRadiusListenerHomeListing: React.FC<MapRadiusListenerProps> = ({
  bounds,
}) => {
  useEffect(() => {
    if (bounds) {
      const topLeft = {
        lat: bounds.getNorthEast().lat(),
        lng: bounds.getSouthWest().lng(),
      };
      const topRight = {
        lat: bounds.getNorthEast().lat(),
        lng: bounds.getNorthEast().lng(),
      };
      const bottomLeft = {
        lat: bounds.getSouthWest().lat(),
        lng: bounds.getSouthWest().lng(),
      };
      const bottomRight = {
        lat: bounds.getSouthWest().lat(),
        lng: bounds.getNorthEast().lng(),
      };

      console.log("Top Left:", topLeft);
      console.log("Top Right:", topRight);
      console.log("Bottom Left:", bottomLeft);
      console.log("Bottom Right:", bottomRight);
    }
  }, [bounds]);

  return null;
};

export default MapRadiusListenerHomeListing;
