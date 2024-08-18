"use client";
import Image from "next/image";
import { Metadata } from "next";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { usePathname } from "next/navigation";
import SelectFilter from "../../../components/filterbar/fieldSelect";
import SearchBar from "../../../components/filterbar/search";
import Chip from "@mui/material/Chip";
import { usePlaces } from "@/hook/usePlaces";
import Pagination from "@mui/material/Pagination";
import Button from "@mui/material/Button";
import getChipColor from "@/utility/color";
import getImageSrc from "@/utility/image";
import LocalPopup from "../../../components/popup/localPopup";
import { textState } from "../../../recoil/atoms";
import { HiOutlinePlus } from "@react-icons/all-files/hi/HiOutlinePlus";
import { FILTER_ARRAY } from "@/constants/listFilter";

export const metadata: Metadata = {
  title: "관광지 검색 페이지",
  description: "관광지 검색 페이지입니다",
  // 기타 메타데이터 입니다
};

const LocationList = () => {
  const router = usePathname();
  const [addList, setAddList] = useRecoilState(textState);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [filterChip, setFilterChip] = useState("FD6");
  const [curUrl, setCurUrl] = useState("");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const backgroundColorClass = getChipColor(filterChip);

  const searchUrl =
    search === ""
      ? router?.split("/")[2]
      : `${router?.split("/")[2]} ${search}`;

  const { places, totalPages, isLoading, error } = usePlaces(
    filterChip,
    currentPage,
    searchUrl
  );

  // 전역변수넣는거;
  const locationHanlder = (
    x: string,
    y: string,
    name: string,
    address: string,
    chip: string
  ) => {
    const loca = [{ x, y, name, filterChip, address, chip }];
    if (addList.length > 4) {
      alert("더 이상 추가 할 수 없습니다");
    } else {
      setAddList([...addList, ...loca]);
    }
  };

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
        <SelectFilter setFilterChip={setFilterChip} Array={FILTER_ARRAY} />
        <div>
          {places.length === 0 ? (
            <div className="flex justify-center items-center h-screen">
              데이터가 없습니다
            </div>
          ) : (
            <>
              {places.map((el) => (
                <div
                  key={`places-${el.id}`}
                  className="h-full rounded-xl p-5 flex flex-col border-b overflow-auto"
                >
                  <div className="flex items-center">
                    <div
                      className=" flex-row mb-2 text-xl "
                      onClick={() => toggleCollapse(el.place_url)}
                    >
                      {el.place_name}
                    </div>
                    <Chip
                      label={el.category_group_name}
                      sx={{ backgroundColorClass, color: backgroundColorClass }}
                      variant="outlined"
                      className="ml-2 text-xs"
                      size="small"
                    />
                  </div>
                  <div className=" flex flex-row ">
                    <Image
                      src={getImageSrc(filterChip)}
                      alt=""
                      width="0"
                      height="0"
                      sizes="10vw"
                      style={{ width: "20%", height: "auto" }}
                    />

                    <div className="flex ml-8 flex-row justify-between  w-full">
                      <div>
                        <span className="flex m-0 p-0 flex-row">
                          {el?.category_name
                            ?.split(" > ")
                            .slice(0, 3)
                            .map((category, i) => (
                              <Chip
                                key={`Chip-${i}`}
                                label={category}
                                size="small"
                                // variant="Filled"
                                className="mr-1 text-xs "
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
      {isCollapsed && <LocalPopup url={curUrl} onClose={closePopup} />}
    </>
  );
};

export default LocationList;
