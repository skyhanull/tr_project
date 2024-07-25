"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
// import React, { useState } from "react";
import { FaPhone, FaTag, FaStar, FaTags, FaRegBookmark } from "react-icons/fa6";
import { Rating } from "@mui/material";
import { RiMapPin2Fill } from "react-icons/ri";
import { IoTime } from "react-icons/io5";
import { BsFillMenuButtonWideFill } from "react-icons/bs";
import { TiHome } from "react-icons/ti";
import { PlaceData } from "@/util/interface/scrapingType";
import SubwayTag from "../components/subwayTag";

interface ProductDetailsProps {
  placeData: PlaceData;
}

export default function ProductDetails({ curUrl, setIsCollapsed }) {
  // const [placeDatas, setPlaceDatas] = useState<PlaceData[]>([]);
  const [placeData, setPlaceData] = useState<PlaceData | null>(null);
  useEffect(() => {
    const fetchPlaceData = async (url: string) => {
      try {
        const response = await fetch(`/api/scrapePlace?url=${curUrl}`);
        const data = await response.json();
        console.log(data.html); // HTML 데이터를 콘솔에 출력
        setPlaceData(data);
      } catch (error) {
        console.error("Error fetching place data:", error);
      }
    };

    fetchPlaceData(curUrl);
  }, [curUrl]);

  // console.log(placeDatas.tags.split("/n"));
  const placeholderImage = "/img/seoul.png";
  console.log(placeData);
  return (
    <div className="absolute left-px-55 w-px-55 top-0 max-h-full bg-white border-l z-50 overflow-scroll ">
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
      <div className="overflow-scroll flex flex-col">
        {placeData ? (
          <>
            <div className="flex justify-center h-80 w-full relative bg-black">
              <Image
                src={
                  placeData.backgroundImageUrl !== "/"
                    ? placeData.backgroundImageUrl
                    : placeholderImage
                }
                alt=""
                layout="fill"
                objectFit="contain"
                className="h-full w-full "
              />
            </div>
            <div className="border-b-2 border-gray-200"></div>
            <div className="p-7 my-2 h-fit\">
              <div className="flex flex-col">
                <div className="text-3xl font-bold flex flex-row justify-between">
                  {placeData.ogTitle}
                  <FaRegBookmark />
                </div>
                <div className="flex py-1 items-center">
                  <div className="w-16">Review</div>
                  <span>{placeData.reviewCount}</span>
                </div>
                <div className="flex py-1 items-center">
                  <div className="w-7">
                    <FaStar />
                  </div>
                  <span>{placeData.reviewScore}</span>
                </div>
                <div className="flex py-1 items-center">
                  <div className="w-7">
                    <FaPhone />
                  </div>
                  <div>{placeData.contactNumber}</div>
                </div>

                <div className="flex py-1 items-center">
                  <div className="w-7">
                    <RiMapPin2Fill />
                  </div>
                  {placeData.address}
                </div>
                <div className="flex py-1 items-center">
                  <div className="w-7">
                    <IoTime />
                  </div>
                  <div>{placeData.operationTime}</div>
                </div>
                <div className="flex py-1 items-center">
                  <div className="w-7">
                    <TiHome />
                  </div>

                  <a
                    href={placeData.ogUrl}
                    target="_blank"
                    rel={placeData.ogUrl}
                    className="text-blue-500 hover:underline"
                  >
                    {placeData.ogUrl}
                  </a>
                </div>
                <div className="flex py-1 items-center">
                  <div className="w-7">
                    <FaTags />
                  </div>
                  <div className="flex flex-row flex-wrap">
                    {placeData.filteredTags.map((el, i) => (
                      <div
                        className="text-gray-500 m-1 flex flex-row flex-wrap"
                        key={i}
                      >
                        {el}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="border-b-2 border-gray-200 my-2"></div>
              <div className="overflow-scroll h-screen ">
                {placeData.menus ? (
                  <div>
                    <div className="text-xl font-bold my-2">메뉴</div>
                    {placeData.menus.map((el, i) => (
                      <div key={i} className="flex">
                        <div>{el.name}</div>
                        <div>{el.price}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  ""
                )}
                <div>
                  <div>
                    <div className="text-xl font-bold my-2">지하철역</div>
                    <div>
                      {placeData?.subwayStations?.map((el, i) => (
                        <div key={i} className="flex items-center leading-8">
                          {el.stationName}{" "}
                          <SubwayTag line={+el.lines[0].split("")[0]} /> |
                          <span className="ml-2"> {el.exit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div>
                  <div>
                    <div className="text-xl font-bold my-2">버스정류장</div>
                    <div>
                      {placeData?.busStations?.map((el, i) => (
                        <div key={i}>
                          <div>
                            {" "}
                            {el.busInfo[0].busNumbers} {el.busInfo[0].busType}
                          </div>
                          {el.busStopName}
                          {el.busStopNumber}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div>sldaijflfjaldkfj</div>
              </div>
            </div>
          </>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
}
