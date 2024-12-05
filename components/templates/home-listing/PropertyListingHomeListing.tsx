import Link from "next/link";

interface PropertyListingHomeListingProps {
  property: {
    ListingKey: string;
    ListPrice: number;
    City: string;
    PostalCode: string;
    BedroomsTotal: number; // Updated field for bedrooms
    Bathrooms: number;
    Sqft: number;
    Coordinates: [number, number];
    Media: { MediaURL: string }[];
  };
}

const PropertyListingHomeListing: React.FC<PropertyListingHomeListingProps> = ({
  property,
}) => {
  return (
    <Link
      href={`/property/${property.ListingKey}`}
      className="property-card border p-4 rounded block hover:shadow-lg"
    >
      <div className="relative">
        <img
          src={property.Media[0]?.MediaURL || "/placeholder.jpg"}
          alt="Property"
          className="w-full h-48 object-cover rounded"
        />
        <div className="absolute top-2 left-2 bg-black text-white text-sm px-2 py-1 rounded">
          Active
        </div>
        <button className="absolute top-2 right-2 text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 21l-8-8h16l-8 8zm0 0l8-8m-8 8v-4m0-8v-4"
            />
          </svg>
        </button>
      </div>
      <div className="mt-2">
        <h2 className="text-lg font-semibold">
          ${property.ListPrice.toLocaleString()}
        </h2>
        <p className="text-sm text-gray-600">
          {property.BedroomsTotal}bd • {property.Bathrooms}ba • {property.Sqft}{" "}
          sqft
        </p>
        <p className="text-sm text-gray-600">
          {property.City}, {property.PostalCode}
        </p>
        <p className="text-sm text-gray-600">MLS®: {property.BedroomsTotal}</p>
      </div>
    </Link>
  );
};

export default PropertyListingHomeListing;
