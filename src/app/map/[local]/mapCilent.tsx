"use client";
import SearchBar from "../../../components/filterbar/search";
import SelectFilter from "../../../components/filterbar/fieldSelect";
import Image from "next/image";
import { useRecoilState } from "recoil";
import { textState } from "@/components/atoms";
import React, { useState, useEffect } from "react";
import ListModal from "../../../components/listModal";
import MapLayout from "../../../components/layout/nav";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { searchPlaces } from "../../../util/kakao";
import { Place } from "@/util/interface/listInterface";
import LocationList from "./locationList";
export enum Status {
  MAP = 1,
  SUCCESS = 2,
  ERROR = "error",
}
declare global {
  interface Window {
    naver: any;
  }
}

export default function Home() {
  const [todoList, setTodoList] = useRecoilState(textState);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [tab, setTab] = useState("0");
  const [filterChip, setFilterChip] = useState("loc");
  const [page, setPage] = useState(1);
  const [mapArray, setMapArray] = useState<Place[]>([]);

  const router = usePathname();

  // var map = new naver.maps.Map("map", {
  //   center: new naver.maps.LatLng(37.3595704, 127.105399),
  //   zoom: 15,
  // });
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
  console.log(tab);
  const fetchData = async (collection = "") => {
    const url = collection
      ? `/api/mapArray?collectionName=${
          router?.split("/")[2]
        }_list&filter=${filterChip}`
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
      setMapArray(results);
    } catch (error) {
      console.error("Error fetching places:", error);
    }
  };

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (filterChip === "loc" || filterChip === "fes") {
      fetchData(filterChip);
    } else {
      fetchPlaces();
    }

    // fetchPlaces();
  }, [filterChip]);

  const [placeData, setPlaceData] = useState([]);

  // const fetchPlaceData = async (url: string) => {
  //   setIsCollapsed(!isCollapsed);
  //   try {
  //     const response = await fetch(`/api/scrapePlace?url=${url}`);
  //     const data = await response.json();
  //     console.log(data.html); // HTML 데이터를 콘솔에 출력
  //     setPlaceData(data);
  //   } catch (error) {
  //     console.error("Error fetching place data:", error);
  //   }
  // };
  const locationHanlder = (x, y) => {
    const loca = [{ x, y }];
    setTodoList([...todoList, ...loca]);
  };
  console.log(todoList);
  const [curUrl, setCurUrl] = useState("");
  const toggleCollapse = (url: string) => {
    setIsCollapsed(true);
    setCurUrl(url);
  };

  return (
    <div className="relative flex h-screen flex-row p-0">
      <MapLayout setTab={setTab} />
      <div className="h-full w-px-55 bg-slate-50 flex-1 overflow-scroll">
        <div>{tab === "0" ? <LocationList mapArray={mapArray} /> : ""}</div>
      </div>

      {isCollapsed && (
        <ListModal curUrl={curUrl} setIsCollapsed={setIsCollapsed} />
      )}
    </div>
  );
}
