"use client";
import SearchBar from "../../../components/filterbar/search";
import SelectFilter from "../../../components/filterbar/fieldSelect";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import MapLayout from "../../../components/layout/nav";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import { searchPlaces } from "../../../util/kakao";
export enum Status {
  MAP = 1,
  SUCCESS = 2,
  ERROR = "error",
}

export default function Home() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [type, setType] = useState(Status.MAP);
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
  const [query, setQuery] = useState("서울 강남");
  const [items, setItems] = useState<any[]>([]);
  const [filterChip, setFilterChip] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [mapArray, setMapArray] = useState([]);
  const [searchQuery, setSearchQuery] = useState("SeoulMenu");
  const [collectionName, setCollectionName] = useState("SeoulMenu"); // 컬렉션 이름 초기화

  // const fetchDatad = async () => {
  //   try {
  //     const response = await axios.get(`/api/naverSearch?query=${query}`, {
  //       params: { page, limit: 10, display: 100 },
  //     });
  //     const newItems = response.data;
  //     if (!Array.isArray(newItems)) {
  //       throw new Error("Fetched data is not an array");
  //     }
  //     setItems((prevItems) => [...prevItems, ...newItems]);
  //     if (newItems.length === 0 || newItems.length < 10) {
  //       setHasMore(false);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };
  const fetchData = async (query = "", collection = "") => {
    const url = collection
      ? `/api/mapArray?collectionName=${collection}`
      : `/api/mapArray`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    setMapArray(data);
  };

  const fetchPlaces = async () => {
    try {
      const options = {
        size: 10, // 한 페이지에 보여질 문서의 개수
        page: currentPage,
        // sort: "accuracy",
        category_group_code: filterChip,
      };
      const results = await searchPlaces("서울", options);
      setPlaces(results);
    } catch (error) {
      console.error("Error fetching places:", error);
    }
  };
  const [places, setPlaces] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  console.log(filterChip);
  useEffect(() => {
    // async function fetchPlaces() {
    //   try {
    //     const options = {
    //       size: 10, // 한 페이지에 보여질 문서의 개수
    //       page: currentPage,
    //       // sort: "accuracy",
    //       category_group_code: 'FD6'
    //     };
    //     const results = await searchPlaces("서울 음식점", options);
    //     setPlaces(results);
    //   } catch (error) {
    //     console.error("Error fetching places:", error);
    //   }
    // }

    fetchPlaces();
  }, [filterChip]);

  // const fetchMoreData = () => {
  //   setPage((prevPage) => prevPage + 1);
  //   fetchDatad();
  // };
  // useEffect(() => {
  //   fetchDatad();
  // }, []);

  useEffect(() => {
    fetchData(searchQuery, collectionName);
    // fetchPlaces();
  }, [searchQuery, collectionName]);
  // const handlePageChange = (page) => {
  //   setCurrentPage(page);
  // };

  return (
    <div className="relative flex h-screen flex-row p-0">
      <MapLayout />
      <div className="h-full w-auto bg-slate-50 flex-1 overflow-scroll">
        <div>
          {Status.MAP === type ? (
            <>
              <SearchBar />
              <SelectFilter setFilterChip={setFilterChip} />
              {mapArray.map((el) => (
                <div
                  key={el.id}
                  className="rounded-xl p-10 flex flex-row border-b"
                >
                  <div>
                    <Image
                      src={el.img}
                      alt=""
                      layout="fixed"
                      width={150}
                      height={150}
                      objectFit="cover" // 원본 이미지의 비율을 유지하면서 컨테이너에 맞게 조정
                      className="rounded-lg shadow-md"
                    />
                  </div>
                  <div className="flex flex-col ml-10">
                    <div className="text-3xl h-10" onClick={toggleCollapse}>
                      {el.name}
                    </div>
                    <div>{el.E_name}</div>
                    <div>
                      <span onClick={toggleCollapse}>{el.tag}</span>
                      {el.location}
                    </div>
                    <div>
                      <button
                        // key={index + 1}
                        onClick={() => handlePageChange(page + 2)}
                      >
                        {page + 1}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <>
              <SearchBar />
              <SelectFilter />
              {mapArray.map((el) => (
                <div
                  key={el.id}
                  className="rounded-xl p-10 flex flex-row border-b"
                >
                  <div>
                    <Image src={el.img} alt="" width={150} height={150} />
                  </div>
                  <div className="flex flex-col ml-10">
                    <div className="w-56 text-3xl h-10">{el.name}</div>
                    <div>
                      <span onClick={toggleCollapse}>{el.tag}</span>
                      {el.caption}
                      {el.lng}
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
      {isCollapsed && (
        <div className="absolute left-px-55 w-px-55 top-0 h-full bg-gray-200 border-l z-50">
          <div>ㅇ이ㅏㄴ민dsf.dmfs.</div>
          <div>
            <div>
              <Image src="/img/seoul.png" alt="" width={350} height={250} />
            </div>
            <div className="border-b-2 border-gray-500"></div>
            <div className="flex flex-col ml-10">
              <div className="w-56 text-3xl h-10">{"dkssudjsdkf"}</div>
              <div>
                <span>{"위치 :ㅇㅇㅇㅇㅇㅇ  "}</span>
                {/* {el.caption}
                      {el.lng} */}
              </div>
              <span>{"추가"}</span>
              <span>{"추가"}</span>
            </div>
            <div className="border-b-2 border-gray-500"></div>
            <span>{"사ㅓㄹ멸"}</span>
          </div>
        </div>
      )}
    </div>
  );
}
