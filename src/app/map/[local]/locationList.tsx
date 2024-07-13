"use client";
import SearchBar from "../../../components/filterbar/search";
import SelectFilter from "../../../components/filterbar/fieldSelect";
import Image from "next/image";
import { useRecoilState } from "recoil";
import { textState } from "@/components/atoms";
import React, { useState, useEffect } from "react";

import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";

const LocationList = ({ mapArray }) => {
  const [filterChip, setFilterChip] = useState("loc");
  return (
    <>
      <SearchBar />
      <SelectFilter setFilterChip={setFilterChip} />
      {mapArray.map((el) => (
        <div key={el.id} className="rounded-xl p-10 flex flex-col border-b ">
          <div
            className="text-3xl h-10 flex-row mb-3"
            // onClick={() => toggleCollapse(el.place_url)}
          >
            {el.place_name}
            <Chip label={el.category_group_name} />
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
                <span className="flex m-0 p-0 flex-row  flex-wrap">
                  {el?.category_name?.split(" > ").map((category) => (
                    <Chip
                      key={category}
                      label={category}
                      size="small"
                      variant="Filled"
                      className="m-1"
                    />
                  ))}
                </span>

                <div>
                  {/* <span onClick={toggleCollapse}>{el.tag}</span> */}
                  {el.road_address_name}
                </div>
              </div>
              <div>
                <Button
                  variant="contained"
                  className="h-full"
                  // onClick={() => locationHanlder(el.x, el.y)}
                >
                  +
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default LocationList;
