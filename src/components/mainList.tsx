"use client";
import { useState, useEffect, MouseEvent } from "react";
import { useRouter } from "next/navigation";
import { urlLink } from "../util/interface/urlLink";
import Image from "next/image";
import Search from "../components/filterbar/search";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MainList = () => {
  const [images, setImages] = useState<urlLink[]>();
  const [searchQuery, setSearchQuery] = useState("");
  const route = useRouter();

  useEffect(() => {
    const fetchImages = async () => {
      const endpoint = searchQuery
        ? `/api/regions?query=${encodeURIComponent(searchQuery)}`
        : `/api/regionList`;
      const res = await fetch(endpoint);
      const data = await res.json();
      setImages(data);
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
      <div className="flex justify-center m-16 text-3xl">
        {"[ 여행지를 선택해주세요! ]"}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 p-10">
        {images?.length === 0 ? (
          <div></div>
        ) : (
          <>
            {images?.map((image, index) => (
              <div
                key={index}
                onClick={(e) =>
                  LinkHandler(image.name, image.lat, image.lon, e)
                }
                className="flex flex-col justify-center items-center"
              >
                <div
                  style={{
                    width: "200px",
                    height: "200px",
                    position: "relative",
                  }}
                >
                  <Image
                    src={image?.src}
                    alt=""
                    layout="fill"
                    objectFit="cover"
                    className="rounded-3xl justify-center"
                  />
                </div>
                <div className="my-6 text-xl justify-start flex  items-center">
                  {image.name}
                  <span className="text-gray-400 text-sm items-center">
                    ({image.country})
                  </span>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default MainList;
