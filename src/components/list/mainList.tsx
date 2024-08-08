"use client";
import { useState, useEffect, MouseEvent } from "react";
import { useRouter } from "next/navigation";
import { urlLink } from "../../utility/interface/urlLink";
import Image from "next/image";
import Search from "../filterbar/search";

const MainList = () => {
  const [images, setImages] = useState<urlLink[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const route = useRouter();

  useEffect(() => {
    const fetchImages = async () => {
      setIsLoading(true); // Set loading to true before starting the fetch
      try {
        const endpoint = searchQuery
          ? `/api/regions?query=${encodeURIComponent(searchQuery)}`
          : `/api/regionList`;
        const res = await fetch(endpoint);
        const data = await res.json();
        setImages(data);
      } catch (error) {
        console.error("Failed to fetch images:", error);
      } finally {
        setIsLoading(false); // Set loading to false after fetching is complete
      }
    };

    fetchImages();
  }, [searchQuery]);

  const LinkHandler = (
    url: string,
    lat: string,
    lon: string,
    e: MouseEvent<HTMLDivElement>
  ) => {
    e.stopPropagation();
    route.push(`/map/${url}?lat=${lat}&lon=${lon}`);
  };

  return (
    <div className="flex justify-center flex-col">
      <h2 className="flex justify-center m-16 text-6xl">Tour-list</h2>
      <Search
        setSearch={setSearchQuery}
        searchQuery={searchQuery}
        immediateFilter={true}
        images={images}
      />
      <div className="flex justify-center m-16 text-3xl text-rose-300">
        {"[ _여행지를 선택해주세요!_ ]"}
      </div>

      {/* Loading state */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-xl text-gray-600">Loading...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 p-10">
          {images.length === 0 ? (
            <div>No results found</div>
          ) : (
            images.map((image, index) => (
              <div
                key={index}
                onClick={(e) =>
                  LinkHandler(image.name, image.lat, image.lon, e)
                }
                className="flex flex-col justify-center items-center cursor-pointer"
              >
                <Image
                  src={image.src}
                  alt={image.name}
                  width={200}
                  height={200}
                  className="rounded-3xl object-cover w-40 h-40"
                  priority
                />

                <div className="my-6 text-xl flex items-center">
                  {image.name}
                  <span className="text-gray-400 text-sm ml-2">
                    ({image.country})
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default MainList;
