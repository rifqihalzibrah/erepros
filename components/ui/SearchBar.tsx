// components/ui/SearchBar.tsx
import React, { useState } from "react";

interface SearchBarProps {
  onSearchChange: (value: string) => void; // New prop for handling search input
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearchChange }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearchChange(value); // Pass the search term to the parent component for filtering
  };

  return (
    <div className="mb-6">
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Address, city, neighborhood..."
        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
      />
    </div>
  );
};

export default SearchBar;
