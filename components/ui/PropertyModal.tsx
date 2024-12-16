"use client"; // Add this directive at the top for client-side rendering in Next.js 13+

import React, { useState } from "react";
import { Property } from "../../types/types"; // Import Property type
import { FaBed, FaBath, FaRulerCombined, FaBuilding } from "react-icons/fa";
import { MdHome } from "react-icons/md";
import { useRouter } from "next/navigation"; // Ensure we use client-side router navigation
import { AiOutlineLeft, AiOutlineRight, AiOutlineClose } from "react-icons/ai";
import { PulseLoader } from "react-spinners";

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
  // const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const router = useRouter(); // Use client-side router

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isImageLoading, setIsImageLoading] = useState(true);

  const openModal = (index: number) => {
    setActiveImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (!property) return null;

  // const mainImage =
  //   selectedImage ||
  //   property.images[0]?.original_image_url ||
  //   "/path-to-placeholder-image.svg";

  const handleApplyOnline = () => {
    router.push(
      `/apply-tenants?property_id=${property.id}&address=${encodeURIComponent(
        property.address
      )}&bedrooms=${property.no_bedrooms}`
    );
  };

  const nextImage = () => {
    setIsImageLoading(true);
    setActiveImageIndex((prevIndex) =>
      prevIndex === property.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const previousImage = () => {
    setIsImageLoading(true);
    setActiveImageIndex((prevIndex) =>
      prevIndex === 0 ? property.images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity ${isOpen
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

        <br />

        <div className="p-6">
          {/* Image Grid Section */}
          <div className="grid gap-4 mb-6">
            {/* Main Image Section */}
            <div className="md:col-span-2 md:row-span-2 md:grid md:grid-cols-3 md:gap-4">
              <div className="md:col-span-2">
                <img
                  src={
                    property.images[0]?.original_image_url ||
                    "/placeholder-image.svg"
                  }
                  alt={property.address}
                  className="w-full h-64 md:h-96 object-cover rounded-lg cursor-pointer shadow-lg"
                />
              </div>
              {/* Thumbnails for Desktop */}
              <div className="hidden md:grid grid-cols-2 gap-2">
                {property.images.slice(1, 5).map((image, index) => (
                  <img
                    key={index}
                    src={image.original_image_url || "/placeholder-image.svg"}
                    alt={`Thumbnail ${index}`}
                    className="w-full h-32 object-cover rounded-lg cursor-pointer shadow"
                    onClick={() => openModal(index + 1)}
                  />
                ))}
                {/* All Photos Button */}
                <button
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg col-span-2 flex justify-center items-center shadow-lg transition duration-200 ease-in-out"
                  onClick={() => openModal(0)}
                >
                  All photos
                </button>
              </div>
            </div>

            {/* Mobile Version: Thumbnails and Button */}
            <div className="grid grid-cols-2 gap-2 md:hidden">
              {property.images.slice(1, 5).map((image, index) => (
                <img
                  key={index}
                  src={image.original_image_url || "/placeholder-image.svg"}
                  alt={`Thumbnail ${index}`}
                  className="w-full h-32 object-cover rounded-lg cursor-pointer shadow"
                  onClick={() => openModal(index + 1)}
                />
              ))}
              {/* All Photos Button */}
              <button
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg col-span-2 flex justify-center items-center shadow-lg transition duration-200 ease-in-out"
                onClick={() => openModal(0)}
              >
                All photos
              </button>
            </div>
          </div>

          {/* Modal for displaying images */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-100 flex justify-center items-center z-50">
              <div className="relative flex flex-col justify-center items-center max-w-screen-lg">
                <button
                  className="absolute top-4 right-4 text-white text-2xl"
                  onClick={closeModal}
                >
                  <AiOutlineClose />
                </button>

                <div className="absolute top-6 left-1/2 transform -translate-x-1/2 text-white text-xl bg-black bg-opacity-50 px-3 py-1 rounded-lg">
                  {activeImageIndex + 1} / {property.images.length}
                </div>

                {isImageLoading && (
                  <div className="absolute inset-0 flex justify-center items-center z-50">
                    <PulseLoader color="#ffffff" />
                  </div>
                )}
                <img
                  src={
                    property.images[activeImageIndex]?.original_image_url ||
                    "/placeholder-image.svg"
                  }
                  alt={`Image ${activeImageIndex + 1}`}
                  className={`max-w-[80%] max-h-[80vh] rounded-lg transition-opacity duration-300 ${isImageLoading ? "opacity-0" : "opacity-100"
                    }`}
                  onLoad={() => setIsImageLoading(false)}
                  onError={() => {
                    setIsImageLoading(false);
                    alert("Failed to load image.");
                  }}
                />

                <button
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-3xl"
                  onClick={previousImage}
                >
                  <AiOutlineLeft />
                </button>
                <button
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-3xl"
                  onClick={nextImage}
                >
                  <AiOutlineRight />
                </button>
              </div>
            </div>
          )}

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
          <div className="bg-white border-2 border-[#bfaf9e] rounded-lg p-8 w-[450px] text-center relative">
            <button
              onClick={() => setShowConfirmation(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 text-2xl"
            >
              &times;
            </button>

            {/* Title */}
            <h2 className="text-3xl font-marcellus text-[#bfaf9e] mb-4 tracking-wide">
              CONFIRMATION
            </h2>

            {/* Horizontal Separator */}
            <div className="border-t border-[#bfaf9e] w-full mb-4"></div>

            {/* Message */}
            <p className="text-gray-600 leading-relaxed mb-6">
              To start your application, there is a required payment of{" "}
              <strong>$40</strong> which serves as the fee to ensure that your
              application is given priority and handled efficiently.
            </p>

            {/* Bottom Separator */}
            <div className="border-t border-[#bfaf9e] w-full mt-6"></div>

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
                className="px-6 py-2 border border-[#bfaf9e] text-[#bfaf9e] rounded-md hover:bg-[#bfaf9e] hover:text-white"
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
                className="px-6 py-2 border border-[#bfaf9e] text-[#bfaf9e] rounded-md hover:bg-[#bfaf9e] hover:text-white"
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
