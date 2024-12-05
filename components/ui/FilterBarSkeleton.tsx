import React from "react";

const FilterBarSkeleton: React.FC = () => {
  return (
    <div className="flex flex-wrap items-center gap-4 bg-white p-4 shadow-md rounded-lg mb-6 animate-pulse">
      {/* Search Input Skeleton */}
      <div className="w-full sm:flex-grow">
        <div className="h-10 bg-gray-300 rounded-lg w-full"></div>
      </div>

      {/* Button Skeletons */}
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="h-10 bg-gray-300 rounded-lg w-28"
        ></div>
      ))}
    </div>
  );
};

export default FilterBarSkeleton;
