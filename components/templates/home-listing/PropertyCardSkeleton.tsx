// components/home-listing/PropertyCardSkeleton.tsx
const PropertyCardSkeleton: React.FC = () => {
  return (
    <div className="border p-4 rounded-lg animate-pulse w-full max-w-[300px] h-[350px] flex flex-col space-y-4 bg-gray-200">
      <div className="w-full h-40 bg-gray-300 rounded"></div>
      <div className="h-6 bg-gray-300 rounded w-3/4"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2"></div>
      <div className="h-4 bg-gray-300 rounded w-1/3"></div>
    </div>
  );
};

export default PropertyCardSkeleton;
