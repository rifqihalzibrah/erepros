import React from "react";

const PropertyCardSkeleton: React.FC = () => {
  return (
    <div className="animate-pulse border rounded-lg p-4 bg-white shadow-md">
      <div className="h-40 bg-gray-300 rounded-lg mb-4"></div>
      <div className="h-6 bg-gray-300 rounded mb-2"></div>
      <div className="h-4 bg-gray-300 rounded mb-2 w-3/4"></div>
      <div className="h-4 bg-gray-300 rounded mb-2 w-1/2"></div>
      <div className="flex gap-2 mt-4">
        <div className="h-8 w-16 bg-gray-300 rounded"></div>
        <div className="h-8 w-16 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
};

export default PropertyCardSkeleton;
