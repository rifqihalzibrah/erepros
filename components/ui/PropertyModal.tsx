import React, { useState } from "react";
import { Property } from "../../types/types"; // Import Property type
import { FaBed, FaBath, FaRulerCombined, FaBuilding } from "react-icons/fa"; // Icons for details
import { MdHome } from "react-icons/md";

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
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!property) return null;

  const mainImage =
    selectedImage ||
    property.images[0]?.original_image_url ||
    "/path-to-placeholder-image.svg";

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity ${
        isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="bg-white rounded-lg shadow-lg overflow-auto max-w-5xl w-full max-h-[90vh] relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 text-3xl"
        >
          &times;
        </button>

        <div className="p-6">
          {/* Image Grid Section */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {/* Main Image */}
            <div className="col-span-2">
              <img
                src={mainImage}
                alt={property.address}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
            {/* Thumbnail Images */}
            <div className="grid grid-cols-2 gap-4">
              {property.images.slice(1, 5).map((image, index) => (
                <img
                  key={index}
                  src={image.thumb_image_url}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-32 object-cover cursor-pointer rounded-lg"
                  onClick={() => setSelectedImage(image.original_image_url)}
                />
              ))}
            </div>
          </div>

          {/* Title, Price, and Property Details */}
          <div className="flex justify-between">
            {/* Property Information */}
            <div className="w-2/3">
              <h2 className="text-3xl font-marcellus text-gray-900">
                {property.address}
              </h2>
              <p className="text-gray-600 mb-2">
                {property.city}, {property.state} {property.zip}
              </p>

              <div className="text-gray-700 mb-4 text-2xl font-bold">
                ${property.target_rent}
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center">
                  <FaBed className="mr-2" /> {property.no_bedrooms} Beds
                </div>
                <div className="flex items-center">
                  <FaBath className="mr-2" /> {property.no_bathrooms} Baths
                </div>
                <div className="flex items-center">
                  <FaRulerCombined className="mr-2" /> {property.total_area} Sq
                  Ft
                </div>
                <div className="flex items-center">
                  <FaBuilding className="mr-2" /> {property.property_type}
                </div>
                <div className="flex items-center">
                  <MdHome className="mr-2" /> Built in{" "}
                  {property.year_built || "-"}
                </div>
              </div>

              <div className="mt-4">
                <h3 className="text-xl font-semibold">Description</h3>
                <p className="text-gray-700 mt-2">{property.description}</p>
              </div>
            </div>

            {/* Agent Information */}
            <div className="w-1/3 bg-gray-100 p-4 rounded-lg">
              <div className="flex items-center mb-4">
                <img
                  src="https://via.placeholder.com/50" // Replace with actual agent image
                  alt="Agent"
                  className="rounded-full h-12 w-12 mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">
                    Remax Grand Haven
                  </h4>
                  <p className="text-gray-600 text-sm">Sandi Gentry</p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-gray-600">
                  <span className="font-bold">Mobile number:</span> (616)
                  935-1150
                </p>
                <p className="text-gray-600">
                  <span className="font-bold">Email:</span>{" "}
                  sandi@sandigentry.com
                </p>
              </div>

              <button className="w-full px-4 py-2 bg-black text-white rounded-md hover:bg-opacity-80">
                Contact Agent
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyModal;
