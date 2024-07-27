import Image from "next/image";
import React, {
  useState,
  useRef,
  useEffect,
  MouseEvent,
  ChangeEvent,
  KeyboardEvent,
} from "react";
import { FaSearch } from "react-icons/fa";
import { urlLink } from "../../util/interface/urlLink";

interface Props {
  setSearch: (newSearchQuery: string) => void;
  searchQuery?: string;
  immediateFilter: boolean;
  images?: urlLink[];
}

const Search = ({
  searchQuery,
  setSearch,
  immediateFilter,
  images = [],
}: Props) => {
  const inputRef = useRef(null);
  const [focusIndex, setFocusIndex] = useState(-1);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (immediateFilter) {
      setSearch(e.target.value);
    }
  };

  const handleSuggestionClick = (name: string) => {
    setSearch(name);
  };
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setFocusIndex((prevIndex) => Math.min(prevIndex + 1, images.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setFocusIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    } else if (e.key === "Enter") {
      if (focusIndex >= 0 && focusIndex < images.length) {
        setSearch(images[focusIndex].name);
      } else if (!immediateFilter) {
        // Cast e.target to HTMLInputElement to access .value
        const target = e.target as HTMLInputElement;
        setSearch(target.value);
      }
    }
  };

  useEffect(() => {
    if (focusIndex >= 0 && focusIndex < images?.length) {
      const focusedElement = document.getElementById(
        `suggestion-${focusIndex}`
      );
      if (focusedElement) {
        focusedElement.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    }
  }, [focusIndex, images?.length]);

  return (
    <header>
      <div className="flex items-center justify-center relative ">
        {" "}
        {/* 부모 요소를 relative로 설정 */}
        <div className="relative w-4/6 mt-10 mb-5">
          <FaSearch className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-500" />
          <input
            ref={inputRef}
            className="border-rose-300 border-4 rounded-xl pl-12 pr-4 py-2 w-full h-20 text-lg"
            placeholder="여행가고 싶은 지역을 검색하세요"
            value={searchQuery}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
        </div>
        {!immediateFilter ? null : (
          <>
            {searchQuery === "" ? null : (
              <div className="absolute top-28 left-1/2 transform -translate-x-1/2 w-4/6 mt-2 border-2 border-gray-400 overflow-scroll bg-white">
                <div className="px-4 py-2  w-full h-60">
                  {images?.map((el, index) => (
                    <div
                      key={el.name}
                      id={`suggestion-${index}`}
                      className={`cursor-pointer px-4 py-2 ${
                        index === focusIndex ? "bg-gray-200" : ""
                      }`}
                      onMouseDown={() => handleSuggestionClick(el.name)}
                    >
                      {el.name}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </header>
  );
};

export default Search;
