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

const Carousel = () => {
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
      const shuffledImages = shuffleArray(data).slice(0, 8);
      setImages(shuffledImages);
    };

    fetchImages();
  }, [searchQuery]);
  console.log(images);
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  function SampleNextArrow(props) {
    const { style, onClick } = props;
    return (
      <span
        className="absolute top-52 block left-full"
        style={{
          ...style,
          display: "block",
          color: "black",
          width: "50px",
          height: "50px",
        }}
        onClick={onClick}
      >
        <SlArrowRight style={{ fontSize: "40px" }} />
      </span>
    );
  }

  function SamplePrevArrow(props) {
    const { style, onClick } = props;
    return (
      <span
        className="absolute top-52 block right-full"
        style={{
          ...style,
          display: "block",
          color: "black",
          width: "50px",
          height: "50px",
          marginRight: 100,
        }}
        onClick={onClick}
      >
        <SlArrowLeft style={{ fontSize: "40px" }} />
      </span>
    );
  }

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  const LinkHandler = (url, lat, lon, e) => {
    e.stopPropagation();
    route.push(`/map/${url}?lat=${lat}&lon=${lon}`);
  };
  return (
    <div className="slider-container">
      <Search />
      <h2 className="flex justify-center m-16 text-6xl">추천 여행지</h2>
      <Slider {...settings}>
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
      </Slider>
    </div>
  );
};

export default Carousel;
