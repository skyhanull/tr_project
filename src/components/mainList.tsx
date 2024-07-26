"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Slider from "react-slick";
import Search from "../components/filterbar/search";
import { SlArrowRight, SlArrowLeft } from "react-icons/sl";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MainList = () => {
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const route = useRouter();
  useEffect(() => {
    const fetchImages = async () => {
      const endpoint = searchQuery
        ? `/api/region?query=${searchQuery}`
        : `/api/regionList`;
      const res = await fetch(endpoint);
      const data = await res.json();
      // const shuffledImages = shuffleArray(data).slice(0, 8);
      setImages(data);
    };

    fetchImages();
  }, [searchQuery]);

  const LinkHandler = (url, lat, lon, e) => {
    e.stopPropagation();
    route.push(`/map/${url}?lat=${lat}&lon=${lon}`);
  };
  return (
    <div className="flex justify-center flex-col">
      <Search />
      <h2 className="flex justify-center m-16 text-6xl">추천 여행지</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 p-10">
        {images.map((image, index) => (
          // <Link key={index} href={`/map/${image.url}`} className="m-10">
          <div
            key={index}
            onClick={(e) => LinkHandler(image.name, image.lat, image.lon, e)}
          >
            <div
              style={{ width: "300px", height: "300px", position: "relative" }}
            >
              <Image
                src={image.src}
                alt={image.caption}
                layout="fill"
                objectFit="cover"
                className="rounded-3xl"
              />
            </div>
            <div className="my-6 text-3xl">{image.name}</div>
          </div>

          // </Link>
        ))}
      </div>
    </div>
  );
};

export default MainList;
