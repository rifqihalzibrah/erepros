// components/home-listing/PropertyListingHomeListing.tsx
interface PropertyListingHomeListingProps {
  property: {
    ListingKey: string;
    ListPrice: number;
    City: string;
    PostalCode: string;
    Coordinates: [number, number];
    Media: { MediaURL: string }[];
  };
}

const PropertyListingHomeListing: React.FC<PropertyListingHomeListingProps> = ({
  property,
}) => {
  return (
    <div className="property-card border p-4 rounded">
      <img
        src={property.Media[0]?.MediaURL || "/placeholder.jpg"}
        alt="Property"
        className="w-full h-48 object-cover rounded"
      />
      <div className="mt-2">
        <h2 className="text-lg font-semibold">
          ${property.ListPrice.toLocaleString()}
        </h2>
        <p>
          {property.City}, {property.PostalCode}
        </p>
        <p>
          Coordinates: {property.Coordinates[1]}, {property.Coordinates[0]}
        </p>
      </div>
    </div>
  );
};

export default PropertyListingHomeListing;
