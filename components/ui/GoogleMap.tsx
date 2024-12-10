import { useEffect, useRef } from "react";

declare global {
  interface Window {
    initMap: () => void;
    google: typeof google;
  }
}

interface GoogleMapComponentProps {
  lat: number;
  lng: number;
  address: string;
}

const GoogleMapComponent = ({ lat, lng, address }: GoogleMapComponentProps) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const googleMapApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  useEffect(() => {
    const initMap = () => {
      if (window.google && mapRef.current) {
        const map = new window.google.maps.Map(mapRef.current, {
          center: { lat, lng },
          zoom: 14,
        });

        new window.google.maps.Marker({
          position: { lat, lng },
          map,
          title: address,
        });
      }
    };

    const loadGoogleMapsAPI = () => {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapApiKey}&libraries=places&callback=initMap`;
      script.defer = true;
      script.async = true;
      document.head.appendChild(script);
    };

    if (!window.google) {
      window.initMap = initMap;
      loadGoogleMapsAPI();
    } else {
      initMap();
    }
  }, [lat, lng, address]);

  return (
    <div>
      <h3 className="text-2xl font-bold mb-4">Map</h3>
      <div ref={mapRef} style={{ width: "100%", height: "300px" }}></div>
      <div className="mt-4 text-lg">
        <p>{address}</p>
      </div>
    </div>
  );
};

export default GoogleMapComponent;
