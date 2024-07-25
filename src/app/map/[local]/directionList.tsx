"use client";
import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import Image from "next/image";
import { FaTrashCan } from "react-icons/fa6";
import { textState } from "@/components/atoms";
import { FaShareNodes } from "react-icons/fa6";
import SelectFilter from "../../../components/filterbar/fieldSelect";
import convertDuration from "@/util/time";
import Button from "@mui/material/Button";
import DirectionModal from "@/components/directionModal";
import DistanceM from "@/util/distance";
import getImageSrc from "@/util/image";
import ShareKakao from "@/components/shareKakao";
const filterArray = [
  { name: "자동차", code: "driving" },
  { name: "도보", code: "walking" },
  { name: "실시간 경로", code: "driving-traffic" },
];

const DirectionList = () => {
  const [filterChip, setFilterChip] = useState("driving");
  const [markerList, setMarkerList] = useRecoilState(textState);
  const [directions, setDirections] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [error, setError] = useState(null);

  const destination = `${markerList[markerList.length - 1]?.x},${
    markerList[markerList.length - 1]?.y
  }`;

  const origin = markerList
    ?.map((el) => `${el.x},${el.y}`)
    .slice(0, -1)
    .join(";");

  useEffect(() => {
    const url = `/api/mapbox?origin=${origin}&destination=${destination}&mode=${filterChip}`;
    const fetchDirections = async () => {
      try {
        const res = await fetch(url);
        const data = await res.json();
        if (res.ok) {
          setDirections(data);
        } else {
          setError(data.error);
        }
      } catch (err) {
        setError(error);
      }
    };

    if (markerList) {
      fetchDirections();
    }
  }, [markerList, filterChip]);

  const deleteFilter = (i: number) => {
    const newList = markerList.filter((el, index) => index !== i);
    setMarkerList(newList);
  };

  return (
    <>
      <div>
        <div className="flex items-center justify-between mr-5 mt-5">
          <div className="text-4xl m-8">길찾기</div>
          <div className="flex items-center">
            <button
              onClick={() => setIsCollapsed(true)}
              className="bg-pink-300 p-3 mr-4 rounded-xl text-white"
            >
              상세보기
            </button>
            <ShareKakao
              title="제목 예시"
              description="설명 예시"
              imageUrl="https://example.com/image.jpg"
              linkUrl="https://example.com"
            />
          </div>
        </div>

        <SelectFilter setFilterChip={setFilterChip} Array={filterArray} />
        <div className="h-full">
          {markerList.length < 2 ? (
            <div>no result</div>
          ) : (
            markerList.map((el, i) => (
              <div
                key={el.id}
                className="rounded-xl p-8 flex flex-col border-b "
              >
                <div className=" flex flex-row ">
                  <Image
                    src={getImageSrc(el.filterChip)}
                    alt=""
                    layout="fixed"
                    width={100}
                    height={100}
                    objectFit="cover" // 원본 이미지의 비율을 유지하면서 컨테이너에 맞게 조정
                    className="rounded-lg shadow-md"
                  />
                  <div className="flex ml-10 flex-row justify-between w-full">
                    <div>
                      <div>
                        {/* <span onClick={toggleCollapse}>{el.tag}</span> */}
                        {el.name}
                      </div>
                      <div>{el.filterChip}</div>
                      <div>{el.address}</div>
                    </div>
                    <div>
                      <Button
                        variant="contained"
                        className="h-full bg-red-500"
                        onClick={() => deleteFilter(i)}
                      >
                        <FaTrashCan />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
          <div className="border-y-2  fixed bottom-0 p-10 flex flex-col bg-white w-px-55">
            <div className="text-2xl flex justify-between w-full">
              <div className="font-bold">총 시간 :</div>
              <div className="flex ml-48">
                {directions?.routes[0]?.duration
                  ? convertDuration(directions?.routes[0]?.duration)
                  : "0초"}
              </div>
            </div>
            <div className="text-2xl flex justify-between w-full">
              <div className="font-bold">총 거리 :</div>
              <div className="flex">
                {directions?.routes[0]?.distance
                  ? DistanceM(directions?.routes[0]?.distance)
                  : "0km"}
              </div>
            </div>
          </div>
        </div>
      </div>
      {isCollapsed && (
        <DirectionModal
          setIsCollapsed={setIsCollapsed}
          directions={directions}
        />
      )}
    </>
  );
};

export default DirectionList;
