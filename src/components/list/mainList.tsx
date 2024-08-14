"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { urlLink } from "../../utility/interface/urlLink";
import useDebounce from "../../hook/useDebounce";
import ImageItem from "../img/mainListImg";
import Search from "../filterbar/search";

const MainList = () => {
  const [images, setImages] = useState<urlLink[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const route = useRouter();

  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const fetchImages = useCallback(async () => {
    setIsLoading(true);
    try {
      const endpoint = debouncedSearchQuery
        ? `/api/regions?query=${encodeURIComponent(debouncedSearchQuery)}`
        : `/api/regionList`;
      const res = await fetch(endpoint);
      const data = await res.json();
      setImages(data);
    } catch (error) {
      console.error("Failed to fetch images:", error);
    } finally {
      setIsLoading(false);
    }
  }, [debouncedSearchQuery]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  const LinkHandler = useCallback(
    (url: string, lat: string, lon: string) => {
      route.push(`/map/${url}?lat=${lat}&lon=${lon}`);
    },
    [route]
  );
  return (
    <div className="flex justify-center flex-col">
      <h2 className="flex justify-center m-16 text-6xl">Tour-list</h2>
      <Search
        setSearch={setSearchQuery}
        searchQuery={searchQuery}
        immediateFilter={true}
        images={images}
      />
      <div className="flex justify-center m-16 text-3xl text-Main_Rose">
        {"[ _여행지를 선택해주세요!_ ]"}
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-xl text-gray-600">Loading...</p>
        </div>
      ) : (
        <div className="">
          {images.length === 0 ? (
            <div className="w-full flex justify-center items-center mt-40 text-gray-500">
              검색 결과가 없습니다.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 p-10">
              {images.map((image) => (
                <ImageItem
                  key={`images-${image.name}`}
                  image={image}
                  onLinkHandler={LinkHandler}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MainList;
