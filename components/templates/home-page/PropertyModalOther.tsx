"use client";

import React from "react";
import { Property } from "../../../types/types";

interface PropertyModalOtherProps {
  property: Property | null;
  isOpen: boolean;
  onClose: () => void;
}

const PropertyModalOther: React.FC<PropertyModalOtherProps> = ({
  property,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !property) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-red-500">
          Special Property Modal
        </h2>
        <p className="mb-2">
          <strong>Address:</strong> {property.address}
        </p>
        <p className="mb-2">
          <strong>City:</strong> {property.city}
        </p>
        <p>
          <strong>Details:</strong> This modal is specifically for
          &quot;Other&quot; type properties.
        </p>
        <button
          onClick={onClose}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default PropertyModalOther;
