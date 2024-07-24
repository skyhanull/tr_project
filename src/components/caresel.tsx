"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Slider from "react-slick";
import Search from "../components/filterbar/search";
import { SlArrowRight, SlArrowLeft } from "react-icons/sl";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const res = await fetch("/images.json");
      const text = await res.text();
      const parsedImages = JSON.parse(text);
      setImages(parsedImages.images);
    };

    fetchImages();
  }, []);

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <span
        className="absolute top-52 block left-full"
        style={{
          ...style,
          display: "block",
          color: "black",
          width: "50px",
          height: "50px",
        }} // 화살표의 스타일을 조정하세요.
        onClick={onClick}
      >
        <SlArrowRight style={{ fontSize: "40px" }} />
      </span>
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <span
        // className={className}
        className="absolute top-52 block right-full"
        style={{
          ...style,
          display: "block",
          // background: "white",
          color: "black",
          width: "50px",
          height: "50px",
          marginRight: 100,
        }} // 화살표의 스타일을 조정하세요.
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
    nextArrow: <SampleNextArrow />, // 사용자 정의 다음 화살표 컴포넌트
    prevArrow: <SamplePrevArrow />, // 사용자 정의 이전 화살표 컴포넌트
  };

  return (
    <div className="slider-container">
      <Search />
      <h2 className="flex justify-center m-16 text-6xl">추천 여행지</h2>
      <Slider {...settings}>
        {images.map((image, index) => (
          <Link key={index} href={`/map/${image.url}`} className="m-10">
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
            <div className="my-6 text-3xl">{image.caption}</div>
          </Link>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
