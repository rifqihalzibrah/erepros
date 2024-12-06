"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Property } from "@/services/mlsAPI"; // Import the Property type
import { fetchSingleProperty } from "@/services/mlsAPI"; // Import the API call function
import { AiOutlineLeft, AiOutlineRight, AiOutlineClose } from "react-icons/ai";
import { PulseLoader } from "react-spinners";
import GoogleMapComponent from "@/components/ui/GoogleMap";

const PropertyDetailsSkeleton = () => (
  <div className="container mx-auto p-6 pt-[136px]">
    {/* Skeleton structure */}
    <div className="h-4 bg-gray-300 rounded w-1/4 mb-6"></div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
      <div className="h-96 bg-gray-300 rounded-lg md:col-span-2"></div>
      <div className="grid grid-cols-2 gap-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="h-40 bg-gray-300 rounded-lg"></div>
        ))}
        <div className="h-12 bg-gray-300 rounded-lg col-span-2"></div>
      </div>
    </div>
    <div className="h-6 bg-gray-300 rounded w-1/3 mb-4"></div>
    <div className="h-4 bg-gray-300 rounded w-1/4 mb-4"></div>
    <div className="h-6 bg-gray-300 rounded w-1/4 mb-6"></div>
    <div className="mt-10">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="h-4 bg-gray-300 rounded w-full mb-4"></div>
      ))}
    </div>
  </div>
);

const PropertyDetails = () => {
  const { id } = useParams();
  const router = useRouter();
  // const searchParams = useSearchParams();
  // const page = searchParams.get("page");
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isImageLoading, setIsImageLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const selectedProperty = await fetchSingleProperty(id);
        setProperty(selectedProperty || null);
      } catch (error) {
        console.error("Error fetching property details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProperty();
  }, [id]);

  if (loading) return <PropertyDetailsSkeleton />;

  if (!property) {
    return (
      <div className="container mx-auto p-6 pt-[136px] text-center">
        <h1 className="text-3xl font-bold mb-4">Property Not Found</h1>
        <button
          onClick={() => router.push(`/home-listing`)}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Back to Listings
        </button>
      </div>
    );
  }

  const openModal = (index: number) => {
    setActiveImageIndex(index);
    setIsModalOpen(true);
    setIsImageLoading(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const nextImage = () => {
    setIsImageLoading(true);
    setActiveImageIndex((prevIndex) =>
      prevIndex === property.Media.length - 1 ? 0 : prevIndex + 1
    );
  };

  const previousImage = () => {
    setIsImageLoading(true);
    setActiveImageIndex((prevIndex) =>
      prevIndex === 0 ? property.Media.length - 1 : prevIndex - 1
    );
  };

  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    e.preventDefault();
    const element = document.getElementById(id);
    const offset = 150;

    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="container mx-auto p-6 pt-[136px]">
      {/* Back and Navigation */}
      <div className="flex items-center justify-between bg-white mb-4 sticky top-16 z-10">
        <button
          onClick={() => router.push(`/home-listing`)}
          className="text-blue-500 hover:text-blue-700"
        >
          &larr; Back to Listings
        </button>
        <ul className="flex space-x-4">
          <li>
            <a
              href="#property-description"
              className="text-gray-600 hover:text-black"
              onClick={(e) => handleSmoothScroll(e, "property-description")}
            >
              Property Description
            </a>
          </li>
          <li>
            <a
              href="#features-amenities"
              className="text-gray-600 hover:text-black"
              onClick={(e) => handleSmoothScroll(e, "features-amenities")}
            >
              Features & Amenities
            </a>
          </li>
          <li>
            <a
              href="#other-property-details"
              className="text-gray-600 hover:text-black"
              onClick={(e) => handleSmoothScroll(e, "other-property-details")}
            >
              Other Property Details
            </a>
          </li>
        </ul>
      </div>

      {/* Property Images with "All Photos" Button */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
        {/* Main Image */}
        <div className="md:col-span-2">
          <img
            src={property.Media[0]?.MediaURL || "/placeholder.jpg"}
            alt="Property Main"
            className="w-full h-96 object-cover rounded-lg cursor-pointer shadow-lg"
            onClick={() => openModal(0)}
          />
        </div>

        {/* Thumbnails and "All Photos" Button */}
        <div className="grid grid-cols-2 gap-2">
          {property.Media.slice(1, 5).map((image, index) => (
            <img
              key={index}
              src={image.MediaURL || "/placeholder.jpg"}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-40 object-cover rounded-lg cursor-pointer shadow"
              onClick={() => openModal(index + 1)}
            />
          ))}

          {/* "All Photos" Button */}
          <button
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg col-span-2 flex justify-center items-center shadow-lg transition duration-200 ease-in-out"
            onClick={() => openModal(0)}
          >
            All photos
          </button>
        </div>
      </div>

      {/* Image Modal */}
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
              {activeImageIndex + 1} / {property.Media.length}
            </div>

            {isImageLoading && (
              <div className="absolute inset-0 flex justify-center items-center z-50">
                <PulseLoader color="#ffffff" />
              </div>
            )}
            <img
              src={
                property.Media[activeImageIndex]?.MediaURL || "/placeholder.jpg"
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

      {/* Property Information */}
      <div
        id="property-description"
        className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
      >
        {/* Main Property Info */}
        <div className="md:col-span-2">
          <div className="flex justify-between items-start">
            {/* Property Title and Location */}
            <div>
              <h1 className="text-4xl font-bold mb-1">
                {property.BK15_L_Address || "N/A"}
              </h1>
              <p className="text-xl text-gray-600">
                {property.City}, {property.BK15_LA1_State}{" "}
                {property.BK15_LA1_Zip || "N/A"}
              </p>
            </div>

            {/* Property Price */}
            <div className="text-right">
              <div className="text-3xl font-bold text-gray-900">
                ${property.ListPrice?.toLocaleString() || "N/A"}
              </div>
              <p className="text-gray-500">
                ${(property.ListPrice / (property.LotSizeArea || 1)).toFixed(2)}{" "}
                per sqft
              </p>
            </div>
          </div>

          {/* Separator Line */}
          <hr className="border-t border-gray-300 my-4" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {/* Left Column */}
            <div className="space-y-2">
              <div className="flex items-center">
                <span className="mr-2">•</span> Active
              </div>
              <div className="flex items-center">
                <span className="mr-2">🛏️</span>{" "}
                {property.BedroomsTotal || "N/A"} Beds
              </div>
              <div className="flex items-center">
                <span className="mr-2">🛁</span>{" "}
                {property.BathroomsFull || "N/A"} Baths
              </div>
              <div className="flex items-center">
                <span className="mr-2">📐</span> {property.LotSizeArea || "N/A"}{" "}
                sqft
              </div>
              <div className="flex items-center">
                <span className="mr-2">🏠</span>{" "}
                {property.PropertyType || "N/A"}
              </div>
              <div className="flex items-center">
                <span className="mr-2">🗓️</span> Built in{" "}
                {property.YearBuilt || "N/A"}
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <p className="text-gray-700">
                {property.description || "No description available."}
              </p>
              <div className="flex justify-between">
                <div>
                  <span className="block text-sm font-bold">MLS® ID</span>
                  <span>{property.ListingId || "N/A"}</span>
                </div>
                <div>
                  <span className="block text-sm font-bold">Listed</span>
                  <span>{property.OnMarketDate || "Invalid Date"}</span>
                </div>
                <div>
                  <span className="block text-sm font-bold">Updated</span>
                  <span>
                    {property.BK15_LMD_MP_UpdateDate || "Invalid Date"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Agent Information */}
        <aside className="md:sticky top-32 h-max">
          <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-center items-start">
            <div className="flex items-center space-x-4 mb-4">
              <img
                src="https://erepros.com/wp-content/uploads/2024/07/IMG_8514-1024x1024.jpg"
                alt="Agent"
                className="w-14 h-14 rounded-full"
              />
              <div>
                <h2 className="text-lg font-bold">
                  {property.propertyManagers?.[0]?.name || "Jennifer Oliver"}
                </h2>
                <p className="text-sm text-gray-600">
                  {property.propertyManagers?.[0]?.company || "N/A"}
                </p>
              </div>
            </div>

            <div className="text-sm text-gray-600 space-y-2 w-full">
              <div className="flex justify-between">
                <p className="font-semibold">Mobile number</p>
                <p>{property.propertyManagers?.[0]?.phone || "N/A"}</p>
              </div>

              <hr className="border-t border-gray-300 my-4" />

              <div className="flex justify-between">
                <p className="font-semibold">Email</p>
                <p>
                  {property.propertyManagers?.[0]?.email ||
                    "Leasing@erepros.com"}
                </p>
              </div>
            </div>

            <button className="mt-4 bg-black text-white px-4 py-2 rounded-lg w-full hover:bg-gray-800 transition-colors">
              Contact agent
            </button>
          </div>
        </aside>
      </div>

      {/* Google Map */}
      <div className="md:col-span-2">
        <hr className="border-t border-gray-300 my-4" />
        <GoogleMapComponent
          lat={property.Latitude || 0}
          lng={property.Longitude || 0}
          address={`${property.BK15_L_Address}, ${property.City}, ${property.BK15_LA1_State} ${property.BK15_LA1_Zip}`}
        />
      </div>

      {/* Apply Now Button */}
      <div className="flex justify-center mt-10">
        <button
          onClick={() =>
            router.push(
              `/apply-tenants?property_id=${property.ListingKey
              }&address=${encodeURIComponent(property.City)}&bedrooms=${property.BedroomsTotal || "N/A"
              }`
            )
          }
          className="px-6 py-3 bg-gold text-white rounded-lg transition"
        >
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default PropertyDetails;
