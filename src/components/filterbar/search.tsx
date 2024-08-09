import React, {
  useState,
  useRef,
  useEffect,
  KeyboardEvent,
  useCallback,
} from "react";
import { urlLink } from "../../utility/interface/urlLink";
import useDebounce from "../../hook/useDebounce";
import { FaSearch } from "@react-icons/all-files/fa/FaSearch";

const DEBOUNCE_DELAY = 200;

interface Props {
  setSearch: (newSearchQuery: string) => void;
  searchQuery?: string;
  immediateFilter: boolean;
  images?: urlLink[];
}

const Search = ({
  searchQuery = "",
  setSearch,
  immediateFilter,
  images = [],
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);
  const [focusIndex, setFocusIndex] = useState(-1);

  const debouncedSearchQuery = useDebounce(localSearchQuery, DEBOUNCE_DELAY);

  useEffect(() => {
    if (immediateFilter) {
      setSearch(debouncedSearchQuery);
    }
  }, [debouncedSearchQuery, immediateFilter, setSearch]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setLocalSearchQuery(e.target.value);
    },
    []
  );

  const handleSuggestionClick = useCallback(
    (name: string) => {
      setSearch(name);
    },
    [setSearch]
  );
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

  // const filteredImages = useMemo(() =>
  //   images.filter(img => img.name.toLowerCase().includes(localSearchQuery.toLowerCase())),
  //   [images, localSearchQuery]
  // );

  return (
    <header>
      <div className="flex items-center justify-center relative ">
        <div className="relative w-4/6 mt-10 mb-5">
          <FaSearch className="absolute top-1/2 left-4 transform -translate-y-1/2 text-Highlight_Rose" />
          <input
            ref={inputRef}
            className="border-rose-400 border-2 rounded-xl pl-12 pr-4 py-2 w-full  text-md focus:ring-blue-100/50 focus:ring-8 focus:outline-none "
            placeholder="여행가고 싶은 지역을 검색하세요"
            value={localSearchQuery}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
        </div>
        {!immediateFilter ? null : (
          <>
            {searchQuery === "" ? null : (
              <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-4/6 mt-2 border-2 border-gray-400 overflow-scroll bg-white z-20">
                <div className="px-4 py-2 w-full h-60">
                  {images?.map((el, index) => (
                    <div
                      key={`suggestion-${el.name}`}
                      id={`suggestion-${index}`}
                      className={`cursor-pointer px-4 py-2 ${
                        index === focusIndex ? "bg-gray-200" : ""
                      } hover:bg-gray-200`}
                      onMouseDown={() => handleSuggestionClick(el.name)}
                      aria-selected={index === focusIndex}
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
