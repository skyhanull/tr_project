"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
// import React, { useState } from "react";
import { Rating } from "@mui/material";
interface PlaceData {
  title: string;
  ogTitle: string;
  ogSiteName: string;
  ogDescription: string;
  ogImage: string;
  ogUrl: string;
  operatingHours: string;
  holidayOperatingHours: string;
  caution: string;
  contact: string;
  tags: string[];
  menuItems: { name: string; price: string }[];
}

interface ProductDetailsProps {
  placeData: PlaceData;
}

export default function ProductDetails({ curUrl, setIsCollapsed }: string) {
  const [placeDatas, setPlaceDatas] = useState<PlaceData[]>([]);

  useEffect(() => {
    const fetchPlaceData = async (url: string) => {
      try {
        const response = await fetch(`/api/scrapePlace?url=${curUrl}`);
        const data = await response.json();
        console.log(data.html); // HTML 데이터를 콘솔에 출력
        setPlaceDatas(data);
      } catch (error) {
        console.error("Error fetching place data:", error);
      }
    };

    fetchPlaceData(curUrl);
  }, [curUrl]);

  return (
    <div className="absolute left-px-55 w-px-55 top-0 h-full bg-white border-l z-50">
      <div className="flex justify-end p-2">
        <button
          className="text-gray-600 hover:text-black transition duration-300"
          onClick={() => setIsCollapsed(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div>
        <div className="flex justify-center h-96 relative">
          <Image
            src={placeDatas.backgroundImageUrl}
            alt=""
            layout="fill"
            objectFit="contain"
            className="h-full w-full"
          />
        </div>
        <div className="border-b-2 border-gray-200"></div>
        <div className="flex flex-col">
          <div className="text-3xl h-10 ">{placeDatas.ogTitle}</div>
          <div>
            <span>{placeDatas.reviewScore}</span>
            <Rating
              name="read-only"
              value={parseFloat(placeDatas.reviewScore)}
              readOnly
              precision={0.1}
            />
            {/* {el.caption}
                {el.lng} */}
          </div>
          <span>{placeDatas.address}</span>
          <span>{"추가"}</span>
          <span>{placeDatas.contactNumber}</span>
          <span>{"영업시간"}</span>
        </div>
        <div className="border-b-2 border-gray-200"></div>
        <span>{"사ㅓㄹ멸"}</span>
        {placeDatas?.menus ? (
          <div>{placeDatas?.menus.map((el) => el.menu)}</div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
