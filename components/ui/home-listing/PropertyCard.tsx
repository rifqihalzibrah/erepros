interface PropertyCardProps {
  property: {
    City: string;
    ListPrice: number;
    BedroomsTotal: number;
    BathroomsTotalDecimal: number;
    LivingArea: number;
    StreetNumber: string;
    StreetName: string;
    ListingId: string;
    Media: { MediaURL: string }[];
  };
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-md">
      <img
        src={property.Media?.[0]?.MediaURL || "/placeholder.jpg"}
        alt="Property"
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-lg font-bold">${property.ListPrice}</h2>
        <p className="text-sm text-gray-600">
          {property.BedroomsTotal} bd • {property.BathroomsTotalDecimal} ba •{" "}
          {property.LivingArea} sqft
        </p>
        <p className="text-sm text-gray-500">
          {property.StreetNumber} {property.StreetName}, {property.City}
        </p>
        <p className="text-xs text-gray-400">MLS#: {property.ListingId}</p>
      </div>
    </div>
  );
};

export default PropertyCard;
