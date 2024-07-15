"use client";
import SearchBar from "../../../components/filterbar/search";
import SelectFilter from "../../../components/filterbar/fieldSelect";
import Image from "next/image";
import { useRecoilState } from "recoil";

import React, { useState, useEffect } from "react";
import { FaTrashCan } from "react-icons/fa6";
import Chip from "@mui/material/Chip";
import { textState } from "@/components/atoms";
import { useRecoilValue } from "recoil";
import Button from "@mui/material/Button";

const DirectionList = () => {
  const [filterChip, setFilterChip] = useState("loc");
  const [selectList, setSelectList] = useRecoilState(textState);
  const [todoList, setTodoList] = useRecoilState(textState);
  const markerPositions = useRecoilValue<any[]>(textState);
  const [directions, setDirections] = useState(null);
  const [error, setError] = useState(null);
  const filterArray = [
    { name: "자동차", code: "drive" },
    { name: "버스", code: "bus" },
  ];
  const origin = `${markerPositions[0].y},${markerPositions[0].x}`;
  const destination = `${markerPositions[markerPositions.length - 1].y},${
    markerPositions[markerPositions.length - 1].x
  }`;
  const waypoints = markerPositions
    .slice(1, -1)
    .map((wp) => `${wp.y},${wp.x}`)
    .join("|");
  console.log(origin, destination, waypoints);
  console.log(todoList);
  useEffect(() => {
    const url = `/api/dir?origin=${origin}&destination=${destination}`;
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
        setError("Failed to fetch directions");
      }
    };

    fetchDirections();
  }, []);

  return (
    <div>
      <SearchBar />
      <SelectFilter setFilterChip={setFilterChip} Array={filterArray} />
      {todoList.map((el) => (
        <div key={el.id} className="rounded-xl p-10 flex flex-col border-b ">
          <div
            className="text-3xl h-10 flex-row mb-3"
            // onClick={() => toggleCollapse(el.place_url)}
          >
            {el.place_name}
            {/* <Chip label={el.category_group_name} /> */}
          </div>
          <div className=" flex flex-row ">
            <Image
              src={el.img}
              alt=""
              layout="fixed"
              width={100}
              height={100}
              objectFit="cover" // 원본 이미지의 비율을 유지하면서 컨테이너에 맞게 조정
              className="rounded-lg shadow-md"
            />

            <div className="flex ml-10 flex-row justify-between w-full">
              <div>
                {/* <div>
                      <span onClick={toggleCollapse}>{el.tag}</span>
                      {el.road_address_name}
                    </div> */}
              </div>
              <div>
                <Button
                  variant="contained"
                  className="h-full"
                  onClick={() => locationHanlder(el.x, el.y, el.place_name)}
                >
                  <FaTrashCan />
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DirectionList;
