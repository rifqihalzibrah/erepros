import React from "react";
import { Property } from "../../../types/types";
import { AiOutlineClose } from "react-icons/ai";
import GoogleMapComponent from "@/components/ui/GoogleMap";

interface PropertyModalProps {
  property: Property | null;
  isOpen: boolean;
  onClose: () => void;
}

const PropertyModal: React.FC<PropertyModalProps> = ({
  property,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !property) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl p-6 relative overflow-auto max-h-[90vh]">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          <AiOutlineClose size={24} />
        </button>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Image Section */}
          <div className="md:col-span-2">
            <img
              src={
                property.images[0]?.original_image_url ||
                "/placeholder-image.svg"
              }
              alt={property.address}
              className="w-full h-72 object-cover rounded-lg mb-4"
            />
            {/* Thumbnails */}
            <div className="grid grid-cols-3 gap-2">
              {property.images.slice(1, 4).map((image, index) => (
                <img
                  key={index}
                  src={image.original_image_url || "/placeholder-image.svg"}
                  alt={`Thumbnail ${index}`}
                  className="w-full h-24 object-cover rounded-lg"
                />
              ))}
            </div>
          </div>

          {/* Agent Section */}
          <aside className="bg-gray-50 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-bold mb-2">
              {property.propertyManagers?.[0]?.name || "Agent Name"}
            </h3>
            <p className="text-sm text-gray-600">
              {property.propertyManagers?.[0]?.company || "Company Name"}
            </p>
            <div className="text-sm text-gray-600 space-y-2 mt-4">
              <div>
                <strong>Mobile number:</strong>{" "}
                {property.propertyManagers?.[0]?.work_phone || "N/A"}
              </div>
              <div>
                <strong>Email:</strong>{" "}
                {property.propertyManagers?.[0]?.email || "N/A"}
              </div>
            </div>
            <button className="mt-4 bg-black text-white px-4 py-2 rounded-lg w-full hover:bg-gray-800">
              Contact Agent
            </button>
          </aside>
        </div>

        {/* Property Information */}
        <div className="mt-6">
          <h2 className="text-2xl font-bold">{property.address}</h2>
          <p className="text-gray-600 mb-4">
            {property.city}, {property.state} {property.zip}
          </p>
          <p className="text-lg font-bold text-gray-900">
            ${property.target_rent} / month
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-700 mt-2">
            <span>{property.no_bedrooms} Beds</span>
            <span>{property.no_bathrooms} Baths</span>
            <span>{property.total_area} Sq Ft</span>
            <span>{property.property_type || "N/A"}</span>
          </div>
          <p className="mt-4">
            {property.description || "No description available."}
          </p>
        </div>

        {/* Map Section */}
        <div className="mt-6">
          <h3 className="text-lg font-bold mb-4">Location</h3>
          <GoogleMapComponent
            lat={property.lattitude || 0}
            lng={property.longitude || 0}
            address={`${property.address}, ${property.city}, ${property.state} ${property.zip}`}
          />
        </div>
      </div>
    </div>
  );
};

export default PropertyModal;
