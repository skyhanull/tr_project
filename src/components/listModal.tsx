"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
// import React, { useState } from "react";
import {
  FaPhone,
  FaStar,
  FaTags,
  FaRegBookmark,
  FaXmark,
} from "react-icons/fa6";
import Loader from "@/components/loader";
import { RiMapPin2Fill } from "react-icons/ri";
import { IoTime } from "react-icons/io5";
import { TiHome } from "react-icons/ti";
import { PlaceData } from "@/util/interface/scrapingType";
import SubwayTag from "../components/subwayTag";
import BusTag from "../components/busTag";

export default function ProductDetails({ curUrl, setIsCollapsed }: any) {
  const [placeData, setPlaceData] = useState<PlaceData | null>(null);
  useEffect(() => {
    const fetchPlaceData = async (url: string) => {
      try {
        const response = await fetch(`/api/scrapePlace?url=${curUrl}`);
        const data = await response.json();
        // console.log(data.html); // HTML 데이터를 콘솔에 출력
        setPlaceData(data);
      } catch (error) {
        console.error("Error fetching place data:", error);
      }
    };

    fetchPlaceData(curUrl);
  }, [curUrl]);

  return (
    <div className="absolute left-px-55 w-px-55 top-0  bg-white border-l z-50 overflow-scroll h-full">
      <div className="flex justify-end ">
        <button
          className="text-gray-600 hover:text-black transition duration-300"
          onClick={() => setIsCollapsed(false)}
        >
          <FaXmark size={40} />
        </button>
      </div>
      <div>
        {placeData ? (
          <>
            <div className="flex justify-center h-80 w-full relative bg-black">
              {placeData.backgroundImageUrl !== "/" ? (
                <Image
                  src={placeData.backgroundImageUrl}
                  alt=""
                  layout="fill"
                  objectFit="contain"
                  className="h-full w-full"
                />
              ) : (
                <div className="flex items-center justify-center h-full w-full">
                  <span className="text-white text-4xl">no Image</span>
                </div>
              )}
            </div>
            <div className="border-b-2 border-gray-200"></div>
            <div className="p-7 ">
              <div className="flex flex-col">
                <div className="text-3xl font-bold flex flex-row justify-between">
                  {placeData.ogTitle}
                  <FaRegBookmark />
                </div>
                <div className="flex py-1 items-center">
                  <div className="w-16">Review :</div>
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
                <div className="flex py-1 items-center ">
                  <div className="w-7">
                    <TiHome />
                  </div>
                  <div className="flex flex-wrap ">
                    <a
                      href={placeData.linkHomepage}
                      target="_blank"
                      rel={placeData.linkHomepage}
                      className="text-blue-500 hover:underline w-80 break-words whitespace-normal"
                    >
                      {placeData.linkHomepage}
                    </a>
                  </div>
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
              <div>
                {placeData.menus ? (
                  <div>
                    <div className="text-xl font-bold my-2">메뉴</div>
                    {placeData.menus.map((el, i) => (
                      <div key={i} className="flex">
                        <div>{el.name}</div>
                        <div>&nbsp;&nbsp;-&nbsp;&nbsp; </div>
                        <div>{el.price}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  ""
                )}
                <div>
                  {placeData?.subwayStations.length !== 0 && (
                    <>
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
                    </>
                  )}
                </div>
                <div>
                  {placeData?.busStations.length !== 0 && (
                    <>
                      <div className="text-xl font-bold my-2">버스정류장</div>
                      <div>
                        {placeData?.busStations?.map((el, i) => (
                          <div key={i}>
                            {el.busInfo.map((el) => (
                              <span
                                key={el.busNumbers}
                                className="flex items-center flex-wrap"
                              >
                                {el.busNumbers
                                  .split("|")
                                  .map((busNumber, idx) => (
                                    <span
                                      key={busNumber}
                                      className="border-r-2 border-slate-900 text-xs px-1"
                                    >
                                      {busNumber}
                                    </span>
                                  ))}
                                <span className="text-xs">
                                  <BusTag line={el.busType} />
                                </span>
                              </span>
                            ))}
                            {el.busStopName}
                            {el.busStopNumber}
                            <div className="border-b-2 m-4 border-gray-200"></div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </>
        ) : (
          <div>
            <Loader />
          </div>
        )}
      </div>
    </div>
  );
}
