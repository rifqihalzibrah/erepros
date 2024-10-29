import React from "react";

const PricingPage = () => {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-center text-3xl font-bold text-gray-800 mb-8">
        Property Management Pricing & Services
      </h1>

      {/* Table Header */}
      <div className="grid grid-cols-4 bg-[#9A7648] text-white font-semibold">
        <div></div>
        <div className="p-4 border-l border-[#9A7648]">Standard Fee</div>
        <div className="p-4 border-l border-[#9A7648]">Flat Fee</div>
        <div className="p-4 border-l border-[#9A7648]">Placement Only</div>
      </div>

      {/* Table Rows */}
      <div className="grid grid-cols-4 text-gray-700">
        <div className="p-4 bg-gray-100 border-l border-t border-[#9A7648]">
          Monthly Management Fee
        </div>
        <div className="p-4 bg-white border-l border-t border-[#9A7648]">
          10% Management Fee
        </div>
        <div className="p-4 bg-white border-l border-t border-[#9A7648]">
          $100 Management Fee
        </div>
        <div className="p-4 bg-white border-l border-t border-r border-[#9A7648]">
          N/A
        </div>
      </div>

      <div className="grid grid-cols-4 text-gray-700">
        <div className="p-4 bg-gray-100 border-l border-t border-[#9A7648]">
          Tenant Placement Fee
        </div>
        <div className="p-4 bg-white border-l border-t border-[#9A7648]">
          50% of 1st Month's Rent
        </div>
        <div className="p-4 bg-white border-l border-t border-[#9A7648]">
          75% of 1st Month's Rent
        </div>
        <div className="p-4 bg-white border-l border-t border-r border-[#9A7648]">
          100% of 1st Month's Rent
        </div>
      </div>

      <div className="grid grid-cols-4 text-gray-700">
        <div className="p-4 bg-gray-100 border-l border-t border-[#9A7648]">
          Lease Renewal Fee
        </div>
        <div className="p-4 bg-white border-l border-t border-[#9A7648]">
          FREE
        </div>
        <div className="p-4 bg-white border-l border-t border-[#9A7648]">
          FREE
        </div>
        <div className="p-4 bg-white border-l border-t border-r border-[#9A7648]">
          N/A
        </div>
      </div>

      {/* Row with Checkmarks */}
      <div className="grid grid-cols-4 text-gray-700">
        <div className="p-4 bg-gray-100 border-l border-t border-[#9A7648]">
          Rent Assessment
        </div>
        <div className="p-4 bg-white flex justify-center items-center border-l border-t border-[#9A7648]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="#9A7648"
              strokeWidth="2"
              fill="none"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4"
              stroke="#9A7648"
            />
          </svg>
        </div>
        <div className="p-4 bg-white flex justify-center items-center border-l border-t border-[#9A7648]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="#9A7648"
              strokeWidth="2"
              fill="none"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4"
              stroke="#9A7648"
            />
          </svg>
        </div>
        <div className="p-4 bg-white flex justify-center items-center border-l border-t border-r border-[#9A7648]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="#9A7648"
              strokeWidth="2"
              fill="none"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4"
              stroke="#9A7648"
            />
          </svg>
        </div>
      </div>

      {/* Add more rows as needed */}
    </div>
  );
};

export default PricingPage;
