"use client";

import React, { useState, useEffect } from "react";
import MapLayout from "../../../components/layout/nav";
import LocationList from "./locationList";
import DirectionList from "./directionList";

export default function Home() {
  const [tab, setTab] = useState("0");

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
  // console.log(tab);
  // const fetchData = async (collection = "") => {
  //   const url = collection
  //     ? `/api/mapArray?collectionName=${
  //         router?.split("/")[2]
  //       }_list&filter=${filterChip}`
  //     : `/api/mapArray`;
  //   const res = await fetch(url);
  //   const data = await res.json();
  //   console.log(data);
  //   setMapArray(data);
  // };

  // console.log(filterChip);

  // const fetchPlaces = async () => {
  //   try {
  //     const options = {
  //       size: 10, // 한 페이지에 보여질 문서의 개수
  //       page: currentPage,
  //       // sort: "accuracy",
  //       category_group_code: filterChip,
  //     };
  //     const results = await searchPlaces("서울", options);
  //     setMapArray(results);
  //   } catch (error) {
  //     console.error("Error fetching places:", error);
  //   }
  // };

  // const [currentPage, setCurrentPage] = useState(1);

  // useEffect(() => {
  //   if (filterChip === "loc" || filterChip === "fes") {
  //     fetchData(filterChip);
  //   } else {
  //     fetchPlaces();
  //   }

  //   // fetchPlaces();
  // }, [filterChip]);

  // const [placeData, setPlaceData] = useState([]);

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

  return (
    <div className="relative flex  flex-row p-0  ">
      <MapLayout setTab={setTab} />
      <div className=" w-px-55 bg-slate-50   overflow-auto">
        <div>{tab === "0" ? <LocationList /> : <DirectionList />}</div>
      </div>
    </div>
  );
}
