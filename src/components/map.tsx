"use client";

import React, { useEffect, useRef } from "react";
import { textState } from "@/components/atoms";
import { useRecoilValue } from "recoil";
import axios from "axios";

declare global {
  interface Window {
    naver: any;
  }
}

const Map = () => {
  const mapElement = useRef(null);
  const markerPositions = useRecoilValue(textState);
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=YOUR_CLIENT_ID`;
    script.onload = () => {
      const { naver } = window;
      if (!mapElement.current || !naver) return;

      const mapOptions = {
        center: new naver.maps.LatLng(37.5665, 126.978), // 초기 중심 좌표 (서울 시청)
        zoom: 10,
      };

      const map = new naver.maps.Map(mapElement.current, mapOptions);

      // 추가적인 지도 설정 및 마커 추가 코드
      markerPositions.forEach((position) => {
        new naver.maps.Marker({
          position: new naver.maps.LatLng(position.y, position.x),
          map,
        });
      });
      if (markerPositions.length > 1) {
        const path = markerPositions.map(
          (position) => new naver.maps.LatLng(position.y, position.x)
        );
        const polyline = new naver.maps.Polyline({
          map: map,
          path: path,
          strokeColor: "#5347AA",
          strokeWeight: 3,
        });
      }
      // 길찾기 경로 추가
      // 길찾기 경로 추가
      if (markerPositions.length > 1) {
        const fetchDirections = async () => {
          const start = markerPositions[0];
          const end = markerPositions[1];
          try {
            const response = await fetch(
              `/api/directions?start=${start.x},${start.y}&goal=${end.x},${end.y}`
            );
            const data = await response.json();
            const path = data.route.traoptimal[0].path.map(
              ([lng, lat]) => new naver.maps.LatLng(lat, lng)
            );
            new naver.maps.Polyline({
              map: map,
              path: path,
              strokeColor: "#5347AA",
              strokeWeight: 3,
            });
            const summary = data.route.traoptimal[0].summary;
            console.log(
              `총 거리: ${summary.distance}m, 예상 시간: ${summary.duration}ms, 교통 수단: ${summary.fare}`
            );
          } catch (error) {
            console.error("Failed to fetch directions:", error);
          }
        };

        fetchDirections();
      }
    };
    // 경로 추가

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [markerPositions]);

  return <div ref={mapElement} style={{ width: "100%", height: "100%" }} />;
};

export default Map;
