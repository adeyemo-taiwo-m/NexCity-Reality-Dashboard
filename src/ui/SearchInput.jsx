import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function SearchInput({ field }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState(
    searchParams.get("name") || ""
  );

  // ⏱ Debounce (wait 300ms after typing stops)
  useEffect(() => {
    const timeout = setTimeout(() => {
      const value = searchValue.trim();

      if (value !== "") {
        searchParams.set("search", value);
      } else {
        searchParams.delete("name");
      }

      setSearchParams(searchParams);
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchValue, searchParams, setSearchParams]);

  return (
    <input
      type="text"
      placeholder={`Search ${field}...`}
      value={searchValue}
      onChange={(e) => setSearchValue(e.target.value)}
      className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-normal transition-all duration-200"
    />
  );
}

export default SearchInput;
