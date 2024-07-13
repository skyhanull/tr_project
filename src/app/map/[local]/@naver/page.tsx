"use client";

import React, { useEffect, useRef } from "react";

declare global {
  interface Window {
    naver: any;
  }
}

const Map = () => {
  const mapElement = useRef(null);

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
      new naver.maps.Marker({
        position: new naver.maps.LatLng(37.5665, 126.978),
        map,
      });
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return <div ref={mapElement} style={{ width: "100%", height: "100%" }} />;
};

export default Map;
