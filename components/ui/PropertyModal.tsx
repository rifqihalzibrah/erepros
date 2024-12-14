"use client"; // Add this directive at the top for client-side rendering in Next.js 13+

import React, { useState } from "react";
import { Property } from "../../types/types"; // Import Property type
import { FaBed, FaBath, FaRulerCombined, FaBuilding } from "react-icons/fa";
import { MdHome } from "react-icons/md";
import { useRouter } from "next/navigation"; // Ensure we use client-side router navigation

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
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const router = useRouter(); // Use client-side router

  if (!property) return null;

  const mainImage =
    selectedImage ||
    property.images[0]?.original_image_url ||
    "/path-to-placeholder-image.svg";

  const handleApplyOnline = () => {
    router.push(
      `/apply-tenants?property_id=${property.id}&address=${encodeURIComponent(
        property.address
      )}&bedrooms=${property.no_bedrooms}`
    );
  };

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
            <div className="col-span-2">
              <img
                src={mainImage}
                alt={property.address}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
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

          {/* Property Details */}
          <div className="flex justify-between">
            <div className="w">
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
                <p className="text-gray-700 mt-2 text-justify">
                  {property.description}
                </p>
              </div>
            </div>
          </div>

          {/* Apply Button */}
          <div className="flex justify-center mt-6">
            <button
              onClick={() => setShowConfirmation(true)}
              className="px-6 py-2 bg-black text-white font-semibold rounded-md hover:bg-opacity-80"
            >
              Apply Now
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60">
          <div className="bg-white border-2 border-[#9A7648] rounded-lg p-8 w-[450px] text-center relative">
            <button
              onClick={() => setShowConfirmation(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 text-2xl"
            >
              &times;
            </button>

            {/* Title */}
            <h2 className="text-3xl font-marcellus text-[#9A7648] mb-4 tracking-wide">
              CONFIRMATION
            </h2>

            {/* Horizontal Separator */}
            <div className="border-t border-[#9A7648] w-full mb-4"></div>

            {/* Message */}
            <p className="text-gray-600 leading-relaxed mb-6">
              To start your application, there is a required payment of{" "}
              <strong>$40</strong> which serves as the fee to ensure that your
              application is given priority and handled efficiently.
            </p>

            {/* Bottom Separator */}
            <div className="border-t border-[#9A7648] w-full mt-6"></div>

            {/* Property Address */}
            <div className="font-bold text-gray-900 mb-2">
              {property.address}, {property.city} {property.state},{" "}
              {property.zip}
            </div>

            {/* Beds Info */}
            <div className="font-bold text-gray-900 mb-6">
              Beds: {property.no_bedrooms}
            </div>

            <div className="flex justify-center gap-4">
              <button
                onClick={handleApplyOnline}
                className="px-6 py-2 border border-[#9A7648] text-[#9A7648] rounded-md hover:bg-[#9A7648] hover:text-white"
              >
                Apply Online
              </button>
              <button
                onClick={() =>
                  window.open(
                    "https://drive.google.com/file/d/1zeBG9MWjI8v8LlrvmVS2Zl6moKpAxPjf/view",
                    "_blank"
                  )
                }
                className="px-6 py-2 border border-[#9A7648] text-[#9A7648] rounded-md hover:bg-[#9A7648] hover:text-white"
              >
                Apply Offline
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyModal;
