"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Property } from "../../../../types/types";
import { getAccessKey, fetchData } from "../../../../services/propertywareAPI";
import { AiOutlineLeft, AiOutlineRight, AiOutlineClose } from "react-icons/ai";
import { PulseLoader } from "react-spinners";
import GoogleMapComponent from "@/components/ui/GoogleMap";

const PropertyDetailsSkeleton = () => (
  <div className="container mx-auto p-6 pt-[136px]">
    {/* Back Button */}
    <div className="h-4 bg-gray-300 rounded w-1/4 mb-6"></div>

    {/* Main Image Skeleton */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
      <div className="h-96 bg-gray-300 rounded-lg md:col-span-2"></div>
      <div className="grid grid-cols-2 gap-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="h-40 bg-gray-300 rounded-lg"></div>
        ))}
        <div className="h-12 bg-gray-300 rounded-lg col-span-2"></div>
      </div>
    </div>

    {/* Property Info Skeleton */}
    <div className="h-6 bg-gray-300 rounded w-1/3 mb-4"></div>
    <div className="h-4 bg-gray-300 rounded w-1/4 mb-4"></div>

    {/* Price and Details */}
    <div className="h-6 bg-gray-300 rounded w-1/4 mb-6"></div>
    <div className="grid grid-cols-2 gap-6">
      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
    </div>

    {/* Features & Details */}
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
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isImageLoading, setIsImageLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchProperty = async () => {
        try {
          const accessKey = await getAccessKey();
          const allProperties = await fetchData(accessKey);
          const selectedProperty = allProperties.find(
            (prop: Property) => prop.id.toString() === id
          );
          setProperty(selectedProperty || null);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching property details:", error);
          setLoading(false);
        }
      };

      fetchProperty();
    }
  }, [id]);

  if (loading) {
    return <PropertyDetailsSkeleton />;
  }

  if (!property) {
    return (
      <div className="container mx-auto p-6 pt-[136px] text-center">
        <h1 className="text-3xl font-bold mb-4">Property Not Found</h1>
        <button
          onClick={() => router.push("/available-rentals")}
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
  };

  const closeModal = () => {
    setIsModalOpen(false);
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

  // Smooth scroll handler function
  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    e.preventDefault();
    const element = document.getElementById(id);
    const offset = 150; // Adjust this value based on your sticky navbar height

    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const renderInteriorFeatures = () => {
    const features = [
      { label: "Total Stories", value: property.total_stories || "N/A" },
      { label: "Bedrooms", value: property.bedrooms || "N/A" },
      { label: "Total Bathrooms", value: property.total_bathrooms || "N/A" },
      { label: "Full Bathrooms", value: property.full_bathrooms || "N/A" },
      {
        label: "Interior Features",
        value: property.interior_features || "N/A",
      },
      { label: "Appliances", value: property.appliances || "N/A" },
      {
        label: "Laundry Description",
        value: property.laundry_description || "N/A",
      },
      { label: "Fireplace", value: property.fireplace ? "Yes" : "No" },
      {
        label: "Fireplace Description",
        value: property.fireplace_description || "N/A",
      },
      { label: "Cooling", value: property.cooling ? "Yes" : "No" },
      {
        label: "Cooling Description",
        value: property.cooling_description || "N/A",
      },
      { label: "Heating", value: property.heating ? "Yes" : "No" },
      {
        label: "Heating Description",
        value: property.heating_description || "N/A",
      },
    ];

    return (
      <div id="features-amenities" className="mt-20">
        <h3 className="text-2xl font-bold mb-4">Interior Features</h3>
        <div className="grid grid-cols-1 gap-4">
          {features.map((feature, index) => (
            <div key={index} className="flex justify-between border-b py-2">
              <span className="font-semibold text-gray-600">
                {feature.label}
              </span>
              <span className="text-gray-800">{feature.value}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };
  const renderSchoolInformation = () => {
    const features = [
      { label: "School District", value: property.total_stories || "N/A" },
    ];

    return (
      <div className="mt-32 ">
        <h3 className="text-2xl font-bold mb-4">School Information</h3>
        <div className="grid grid-cols-1 gap-4">
          {features.map((feature, index) => (
            <div key={index} className="flex justify-between border-b py-2">
              <span className="font-semibold text-gray-600">
                {feature.label}
              </span>
              <span className="text-gray-800">{feature.value}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };
  const renderOtherPropertyDetails = () => {
    const features = [
      { label: "Area Name", value: property.total_stories || "N/A" },
      { label: "Taxes", value: property.bedrooms || "N/A" },
      { label: "Tax Frequency", value: property.total_bathrooms || "N/A" },
      { label: "Association Fee", value: property.full_bathrooms || "N/A" },
      {
        label: "Association Fee Frequency",
        value: property.interior_features || "N/A",
      },
      { label: "Garage", value: property.appliances || "N/A" },
      {
        label: "Garage Spaces",
        value: property.laundry_description || "N/A",
      },
      { label: "Parking", value: property.fireplace ? "Yes" : "No" },
      {
        label: "View",
        value: property.fireplace_description || "N/A",
      },
      { label: "County", value: property.cooling ? "Yes" : "No" },
      {
        label: "Water Source",
        value: property.cooling_description || "N/A",
      },
      { label: "Pool", value: property.heating ? "Yes" : "No" },
    ];

    return (
      <div id="other-property-details" className="mt-20">
        <h3 className="text-2xl font-bold mb-4">Other Property Details</h3>
        <div className="grid grid-cols-1 gap-4">
          {features.map((feature, index) => (
            <div key={index} className="flex justify-between border-b py-2">
              <span className="font-semibold text-gray-600">
                {feature.label}
              </span>
              <span className="text-gray-800">{feature.value}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto p-6 pt-[136px]">
      {/* Back and navigation buttons */}
      <div className="flex items-center justify-between  bg-white mb-4 sticky top-16 ">
        <div>
          <a
            href="/available-rentals"
            className="text-blue-500 hover:text-blue-700"
          >
            &larr; Back to Listings
          </a>
        </div>

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

      {/* Main Image and Thumbnails */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
        {/* Main Image Section */}
        <div className="md:col-span-2">
          <img
            src={
              property.images[0]?.original_image_url || "/placeholder-image.svg"
            }
            alt={property.address}
            className="w-full h-96 object-cover rounded-lg cursor-pointer shadow-lg "
            onClick={() => openModal(0)} // Open modal on click
          />
        </div>

        {/* Thumbnails Section */}
        <div className="grid grid-cols-2 gap-2">
          {property.images.slice(1, 5).map((image, index) => (
            <img
              key={index}
              src={image.original_image_url || "/placeholder-image.svg"}
              alt={`Thumbnail ${index}`}
              className="w-full h-40 object-cover rounded-lg cursor-pointer shadow"
              onClick={() => openModal(index + 1)} // Open modal for clicked thumbnail
            />
          ))}

          {/* All Photos Button */}
          <button
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg col-span-2 flex justify-center items-center shadow-lg transition duration-200 ease-in-out"
            onClick={() => openModal(0)} // Open modal on click
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
              className={`max-w-[80%] max-h-[80vh] rounded-lg transition-opacity duration-300 ${
                isImageLoading ? "opacity-0" : "opacity-100"
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
      <div className="" id="property-description">
        <br />
        <br />
      </div>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="md:col-span-2">
          <div className="flex justify-between items-start md:col-span-2">
            {/* Property Title and Location */}
            <div>
              <h1 className="text-4xl font-bold mb-1">{property.address}</h1>
              <p className="text-xl text-gray-600">
                {property.city}, {property.state} {property.zip}
              </p>
            </div>

            {/* Property Price */}
            <div className="text-right">
              <div className="text-3xl font-bold text-gray-900">
                ${property.target_rent}
              </div>
              <p className="text-gray-500">
                ${(property.target_rent / property.total_area).toFixed(2)} per
                sqft
              </p>
            </div>
          </div>

          {/* Add the line here */}
          <hr className="border-t border-gray-300 my-4" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {/* Left column with icons */}
            <div className="space-y-2">
              <div className="flex items-center">
                <span className="mr-2">•</span> Active
              </div>
              <div className="flex items-center">
                <span className="mr-2">🛏️</span> {property.bedrooms || "N/A"}{" "}
                Beds
              </div>
              <div className="flex items-center">
                <span className="mr-2">🛁</span> {property.bathrooms || "N/A"}{" "}
                Baths
              </div>
              <div className="flex items-center">
                <span className="mr-2">📐</span> {property.total_area || "N/A"}{" "}
                sqft
              </div>
              <div className="flex items-center">
                <span className="mr-2">🏠</span>{" "}
                {property.property_type || "N/A"}
              </div>
              <div className="flex items-center">
                <span className="mr-2">🗓️</span> Built in{" "}
                {property.year_built || "N/A"}
              </div>
            </div>

            {/* Right column with description and MLS information */}
            <div className="space-y-4">
              <p className="text-gray-700">
                {property.description || "No description available."}
              </p>
              <div className="flex justify-between">
                <div>
                  <span className="block text-sm font-bold">MLS® ID</span>
                  <span>{property.mls_id || "N/A"}</span>
                </div>
                <div>
                  <span className="block text-sm font-bold">Listed</span>
                  <span>{property.listed_date || "Invalid Date"}</span>
                </div>
                <div>
                  <span className="block text-sm font-bold">Updated</span>
                  <span>{property.updated_date || "Invalid Date"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Agent Information - moved to an aside */}
        <aside className="md:sticky top-32 h-max">
          <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-center items-start">
            {/* Agent Image and Name */}
            <div className="flex items-center space-x-4 mb-4 justify-start">
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

            {/* Contact Info */}
            <div className="text-sm text-gray-600 space-y-2 w-full">
              <div className="flex justify-between">
                <p className="font-semibold">Mobile number</p>
                <p>{property.propertyManagers?.[0]?.phone || "N/A"}</p>
              </div>

              {/* Add the line here */}
              <hr className="border-t border-gray-300 my-4" />

              <div className="flex justify-between">
                <p className="font-semibold">Email</p>
                <p>
                  {property.propertyManagers?.[0]?.email ||
                    "Leasing@erepros.com"}
                </p>
              </div>
            </div>

            {/* Contact Agent Button */}
            <button className="mt-4 bg-black text-white px-4 py-2 rounded-lg w-full hover:bg-gray-800 transition-colors">
              Contact agent
            </button>
          </div>
        </aside>

        <div className="md:col-span-2">
          <hr className="border-t border-gray-300 my-4" />
          <br />
          {/* Google Map Section */}
          <GoogleMapComponent
            lat={property.lattitude || 0} // Assuming you have lat and lng in the property data
            lng={property.longitude || 0}
            address={`${property.address}, ${property.city}, ${property.state} ${property.zip}`}
          />

          {/* Add the line here */}
          <br />
          <hr className="border-t border-gray-300 my-4" />
          <div>
            <br />
          </div>
          {/* Interior Features */}
          {renderInteriorFeatures()}

          {/* School Information */}
          {renderSchoolInformation()}

          <div>
            <br />
          </div>
          {/* Other Property Details */}
          {renderOtherPropertyDetails()}
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
