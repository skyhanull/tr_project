"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
// import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { textState } from "@/components/atoms";
import { Rating } from "@mui/material";
import { FaArrowDown } from "react-icons/fa6";
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

export default function ProductDetails({ setIsCollapsed, directions }: any) {
  console.log(directions);
  const [markerList, setMarkerList] = useRecoilState(textState);
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
      <div className="flex flex-col items-center space-y-4">
        {directions?.waypoints.map((el, i) => (
          <div key={i} className="flex flex-col items-center space-y-2 w-80">
            {i !== 0 && (
              <div className="flex items-center justify-center space-x-2 mt-7 mb-7">
                <FaArrowDown className="text-4xl" />
                <div className="w-14">{el.distance}</div>
              </div>
            )}
            <div className="bg-gray-200 rounded-md w-full p-6 flex justify-center">
              {markerList[i].name}
            </div>
          </div>
        ))}
      </div>
      <div>추천루트 :</div>
    </div>
  );
}
