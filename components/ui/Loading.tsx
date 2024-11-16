import React from "react";

const Loading: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-64">
      {/* Replace with your custom SVG from the public folder */}
      <img
        src="/svgs/REAL ESTATE full white (1)(3).svg"
        alt="Loading"
        className="h-16 w-16 animate-spin-custom" // Apply custom Tailwind animation
      />
    </div>
  );
};

export default Loading;
