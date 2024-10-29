// components/home-listing/MapRadiusListenerHomeListing.tsx
import React, { useEffect } from "react";

interface MapRadiusListenerProps {
  bounds: google.maps.LatLngBounds | null;
  onBoundsChange: (polygon: string) => void;
}

const MapRadiusListenerHomeListing: React.FC<MapRadiusListenerProps> = ({
  bounds,
  onBoundsChange,
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

      const polygon = `POLYGON((${topLeft.lng} ${topLeft.lat}, ${topRight.lng} ${topRight.lat}, ${bottomRight.lng} ${bottomRight.lat}, ${bottomLeft.lng} ${bottomLeft.lat}, ${topLeft.lng} ${topLeft.lat}))`;

      onBoundsChange(polygon);
    }
  }, [bounds, onBoundsChange]);

  return null;
};

export default MapRadiusListenerHomeListing;
