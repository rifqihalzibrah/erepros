// components/home-listing/SearchBarHomeListing.tsx
interface SearchBarHomeListingProps {
  setPage: (page: number) => void;
}

const SearchBarHomeListing: React.FC<SearchBarHomeListingProps> = ({
  setPage,
}) => {
  const handlePageChange = (page: number) => {
    setPage(page);
  };

  return (
    <div className="search-bar">
      {/* Include inputs, filters, or buttons for setting page */}
      <button onClick={() => handlePageChange(1)}>Go to Page 1</button>
    </div>
  );
};

export default SearchBarHomeListing;
