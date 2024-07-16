"use client";
import SearchBar from "../../../components/filterbar/search";
import SelectFilter from "../../../components/filterbar/fieldSelect";
import Image from "next/image";
import { useRecoilState } from "recoil";
import convertDuration from "@/util/time";
import React, { useState, useEffect } from "react";
import { FaTrashCan } from "react-icons/fa6";
import Chip from "@mui/material/Chip";
import { textState } from "@/components/atoms";
import { useRecoilValue } from "recoil";
import Button from "@mui/material/Button";
import DirectionModal from "@/components/directionModal";
import getChipColor from "@/util/color";
import getImageSrc from "@/util/image";
const DirectionList = () => {
  const [filterChip, setFilterChip] = useState("loc");
  // const [selectList, setSelectList] = useRecoilState(textState);
  // const [todoList, setTodoList] = useRecoilState(textState);
  const [markerList, setMarkerList] = useRecoilState(textState);
  const [directions, setDirections] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  // const backgroundColorClass = getChipColor(markerList);
  const [error, setError] = useState(null);
  const filterArray = [
    { name: "자동차", code: "drive" },
    { name: "버스", code: "bus" },
  ];

  const destination = `${markerList[markerList.length - 1]?.x},${
    markerList[markerList.length - 1]?.y
  }`;

  const AAA = markerList
    ?.map((el) => `${el.x},${el.y}`)
    .slice(0, -1)
    .join(";");

  // console.log(markerPositions?.map((el) => `${el.x},${el.y}`).join(";"));
  // console.log(origin, destination, waypoints);
  console.log(AAA);
  useEffect(() => {
    const url = `/api/mapbox?origin=${AAA}&destination=${destination}`;
    const fetchDirections = async () => {
      try {
        const res = await fetch(url);
        const data = await res.json();
        if (res.ok) {
          setDirections(data);
          console.log(data);
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
  }, [markerList]);

  const deleteFilter = (i: number) => {
    const newList = markerList.filter((el, index) => index !== i);
    setMarkerList(newList);
  };
  console.log(markerList);
  return (
    <>
      <div>
        <div>
          <div className="text-4xl m-8">길찾기</div>
          <button onClick={() => setIsCollapsed(true)}>상세보기</button>
        </div>

        <SelectFilter setFilterChip={setFilterChip} Array={filterArray} />

        {markerList.length === 0 ? (
          <div>no result</div>
        ) : (
          markerList.map((el, i) => (
            <div
              key={el.id}
              className="rounded-xl p-10 flex flex-col border-b "
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
        <div className="h-60 border-2">
          <div>
            총 시간 : {convertDuration(directions?.routes[0]?.duration)}
          </div>
          <div>총 거리 : {directions?.routes[0]?.distance}</div>
          <div>거리:</div>
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
