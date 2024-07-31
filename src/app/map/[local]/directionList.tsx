"use client";
import Image from "next/image";
import { useRecoilState } from "recoil";
import React, { useState, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Button from "@mui/material/Button";
import SelectFilter from "../../../components/filterbar/fieldSelect";
import DistanceM from "@/utility/distance";
import getImageSrc from "@/utility/image";
import ShareModal from "../../../components/shareModal";
import { FaRegTrashAlt } from "@react-icons/all-files/fa/FaRegTrashAlt";
import { textState } from "@/recoil/atoms";
import { BiError } from "@react-icons/all-files/bi/BiError";
import { convertDuration } from "@/utility/time";
import { RouteResponse } from "../../../utility/interface/roadType";

const filterArray = [
  { name: "자동차", code: "driving" },
  { name: "도보", code: "walking" },
  { name: "실시간 경로", code: "driving-traffic" },
];
interface RoadType {
  address: string;
  filterChip: string;
  chip: string;
  name: string;
  x: string;
  y: string;
}

const DirectionList = () => {
  const [filterChip, setFilterChip] = useState("driving");
  const [markerList, setMarkerList] = useRecoilState<RoadType[]>(textState);
  const [directions, setDirections] = useState<RouteResponse | null>(null);

  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
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
          setDirections(null);
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
        <div className="flex items-center justify-between mr-5 mt-3">
          <div className="text-2xl m-8">길찾기</div>
          <div className="flex items-center">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-pink-300 p-2 mr-4 rounded-xl text-white text-sm"
            >
              상세보기
            </button>
          </div>
        </div>

        <SelectFilter setFilterChip={setFilterChip} Array={filterArray} />
        <div className="h-full">
          {markerList.length === 0 ? (
            <div className="flex justify-center items-center text-red-500 ">
              <BiError className="text-red-500 my-5" />
              <span>여행지를 추가해주세요</span>
            </div>
          ) : (
            <>
              {markerList.length === 1 && (
                <div className="flex justify-center items-center text-red-500">
                  <BiError className="text-red-500 my-5" />
                  <span>최소 2개의 여행지가 있어야 합니다</span>
                </div>
              )}
              {markerList.map((el, i) => (
                <div
                  key={el.name}
                  className="rounded-xl p-5 flex flex-col border-b "
                >
                  <div className=" flex-row mb-2 text-xl ">{el.name}</div>
                  <div className=" flex flex-row ">
                    <Image
                      src={getImageSrc(el.filterChip)}
                      alt=""
                      layout="fixed"
                      width={70}
                      height={90}
                      objectFit="cover" // 원본 이미지의 비율을 유지하면서 컨테이너에 맞게 조정
                      className="rounded-lg shadow-md"
                    />
                    <div className="flex ml-5 flex-row justify-between w-full">
                      <div>
                        <div className=" text-xs ">{el.chip}</div>
                        <div className=" text-xs ">{el.address}</div>
                      </div>
                      <div>
                        <Button
                          variant="contained"
                          className="h-full bg-red-500 "
                          onClick={() => deleteFilter(i)}
                        >
                          <FaRegTrashAlt />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}

          <div className="border-y-2  fixed bottom-0 p-10 flex flex-col bg-white w-px-55">
            <div className="text-xl flex justify-between w-full">
              <div className="font-bold ">총 시간 :</div>
              <div className="flex ">
                {directions?.routes[0]?.duration
                  ? convertDuration(directions?.routes[0]?.duration)
                  : "0초"}
              </div>
            </div>
            <div className="text-xl flex justify-between w-full">
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
      {/* {isCollapsed && (
        <DirectionModal
          setIsCollapsed={setIsCollapsed}
          directions={directions}
        />
      )} */}
      {isModalOpen && (
        <ShareModal
          markerList={markerList}
          directions={directions}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      )}
    </>
  );
};

export default DirectionList;
