"use client";

import Image from "next/image";
import { Metadata } from "next";
import React, { useState, useEffect, useCallback } from "react";
import { useRecoilState } from "recoil";
import { usePathname } from "next/navigation";
import SelectFilter from "../../../components/filterbar/fieldSelect";
import SearchBar from "../../../components/filterbar/search";
import Chip from "@mui/material/Chip";
import Pagination from "@mui/material/Pagination";
import Button from "@mui/material/Button";
import getChipColor from "@/utility/color";
import getImageSrc from "@/utility/image";
import LocalPopup from "../../../components/localPopup";
import { textState } from "../../../recoil/atoms";
import { HiOutlinePlus } from "@react-icons/all-files/hi/HiOutlinePlus";
import { Place } from "@/utility/interface/listInterface";
import { searchPlaces } from "../../../utility/kakao";

export const metadata: Metadata = {
  title: "관광지 검색 페이지",
  description: "관광지 검색 페이지입니다",
  // 기타 메타데이터 입니다
};

const filterArray = [
  { name: "추천루트", code: "loc" },
  { name: "맛집", code: "FD6" },
  { name: "관광지", code: "AT4" },
  { name: "카페", code: "CE7" },
  { name: "축제", code: "fes" },
];

const LocationList = () => {
  const router = usePathname();
  const [addList, setAddList] = useRecoilState(textState);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [filterChip, setFilterChip] = useState("loc");
  const [mapArray, setMapArray] = useState<Place[]>([]);
  const [curUrl, setCurUrl] = useState("");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const backgroundColorClass = getChipColor(filterChip);
  const [totalPages, setTotalPages] = useState(0);
  const searchUrl =
    search === ""
      ? router?.split("/")[2]
      : `${router?.split("/")[2]} ${search}`;
  //몽고디비 연결 api
  const url = new URL("/api/mapArray", window.location.origin);
  // if (collection) {
  //   url.searchParams.append('collectionName', `${router?.split("/")[2]}_list`);
  //   url.searchParams.append('filter', filterChip);
  // }
  console.log(url);

  const fetchData = async (collection: string = ""): Promise<void> => {
    const url = collection
      ? `/api/mapArray?collectionName=${
          router?.split("/")[2]
        }_list&filter=${filterChip}`
      : `/api/mapArray`;
    const res = await fetch(url);
    const data = await res.json();
    setMapArray(data); // Adjust according to your API response
  };

  //카카오 장소 검색 연결 api

  const fetchPlaces = async () => {
    try {
      const options = {
        size: 10, // 한 페이지에 보여질 문서의 개수
        page: currentPage,
        category_group_code: filterChip,
        filter: search,
      };
      const results = await searchPlaces(searchUrl, options);

      setTotalPages(Math.ceil(results.meta.total_count / 10));
      setMapArray(results.documents);
    } catch (error) {
      console.error("Error fetching places:", error);
    }
  };

  useEffect(() => {
    if (filterChip === "loc" || filterChip === "fes") {
      fetchData(filterChip);
    } else {
      fetchPlaces();
    }
  }, [filterChip, currentPage, search]);

  //전역변수넣는거
  // const locationHanlder = (
  //   x: string,
  //   y: string,
  //   name: string,
  //   address: string,
  //   chip: string
  // ) => {
  //   const loca = [{ x, y, name, filterChip, address, chip }];
  //   if (addList.length > 4) {
  //     alert("더 이상 추가 할 수 없습니다");
  //   } else {
  //     setAddList([...addList, ...loca]);
  //   }
  // };
  const locationHandler = useCallback(
    (x: string, y: string, name: string, address: string, chip: string) => {
      const loca = [{ x, y, name, filterChip, address, chip }];
      if (addList.length > 4) {
        alert("더 이상 추가 할 수 없습니다");
      } else {
        setAddList((prevList) => [...prevList, ...loca]);
      }
    },
    [addList, filterChip]
  );

  const toggleCollapse = (url: string) => {
    setIsCollapsed(true);
    setCurUrl(url);
  };
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };
  const closePopup = () => {
    setIsCollapsed(false);
    setCurUrl("");
  };

  return (
    <>
      <div>
        <SearchBar setSearch={setSearch} immediateFilter={false} />
        <SelectFilter setFilterChip={setFilterChip} Array={filterArray} />
        <div>
          {mapArray.length === 0 ? (
            <div className="flex justify-center items-center h-screen">
              데이터가 없습니다
            </div>
          ) : (
            <>
              {mapArray.map((el) => (
                <div
                  key={el.id}
                  className="h-full rounded-xl p-5 flex flex-col border-b overflow-auto"
                >
                  <div
                    className=" flex-row mb-2 text-xl "
                    onClick={() => toggleCollapse(el.place_url)}
                  >
                    {el.place_name}
                    <Chip
                      label={el.category_group_name}
                      sx={{ backgroundColorClass, color: backgroundColorClass }}
                      variant="outlined"
                      className="ml-3 text-xs"
                    />
                  </div>
                  <div className=" flex flex-row ">
                    <Image
                      src={getImageSrc(filterChip)}
                      alt=""
                      layout="fixed"
                      width={70}
                      height={90}
                      objectFit="cover"
                      className="rounded-lg shadow-xl"
                      loading="lazy"
                      placeholder="blur"
                      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F9PQAI8wNPvd7POQAAAABJRU5ErkJggg=="
                    />

                    <div className="flex ml-8 flex-row justify-between  w-full">
                      <div>
                        <span className="flex m-0 p-0 flex-row">
                          {el?.category_name
                            ?.split(" > ")
                            .slice(0, 3)
                            .map((category, i) => (
                              <Chip
                                key={i}
                                label={category}
                                size="small"
                                // variant="Filled"
                                className="m-1 text-xs "
                              />
                            ))}
                        </span>

                        <div className="mt-2 text-sm mr-1 min-h-10">
                          {el.road_address_name}
                        </div>
                      </div>
                      <div>
                        <Button
                          // variant="contained"
                          className="h-full bg-red-100 text-zinc-700 p-4"
                          onClick={() =>
                            locationHanlder(
                              el.x,
                              el.y,
                              el.place_name,
                              el.road_address_name,
                              el.category_group_name
                            )
                          }
                        >
                          <HiOutlinePlus className="text-2xl" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          variant="outlined"
          className="p-6 flex justify-center text-pink-500"
        />
      </div>
      {/* {isCollapsed && (
        <ListModal curUrl={curUrl} setIsCollapsed={setIsCollapsed} />
      )} */}
      {isCollapsed && <LocalPopup url={curUrl} onClose={closePopup} />}
    </>
  );
};

export default LocationList;
