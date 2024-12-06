// components/home-listing/ListingsGridHomeListing.tsx
import PropertyListingHomeListing from "./PropertyListingHomeListing";
import PropertyCardSkeleton from "./PropertyCardSkeleton";

interface Property {
  ListingKey: string;
  City: string;
  PostalCode: string;
  ListPrice: number;
  PropertyType: string;
  Beds: number;
  Baths: number;
  // Add other fields as necessary
}

interface ListingsGridHomeListingProps {
  properties: Property[];
  isLoading: boolean;
}

const ListingsGridHomeListing: React.FC<ListingsGridHomeListingProps> = ({
  properties,
  isLoading,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {isLoading
        ? Array.from({ length: 10 }).map((_, index) => (
          <PropertyCardSkeleton key={index} />
        ))
        : properties.map((property) => (
          <PropertyListingHomeListing
            key={property.ListingKey}
            property={property}
          />
        ))}
    </div>
  );
};

export default ListingsGridHomeListing;
