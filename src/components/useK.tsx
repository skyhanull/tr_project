"use client";

import { useEffect, useRef } from "react";
import { textState } from "@/components/atoms";
import { useRecoilValue } from "recoil";

export default function MapTest() {
  const mapRef = useRef(null);
  const markerPositions = useRecoilValue(textState);

  useEffect(() => {
    const mapScript = document.createElement("script");
    mapScript.async = true;
    mapScript.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_JS_KAKAO_CLIENT_KEY}&autoload=false`;
    document.head.appendChild(mapScript);

    const onLoadKakaoMap = () => {
      if (window.kakao && window.kakao.maps) {
        window.kakao.maps.load(() => {
          const mapContainer = mapRef.current;
          const mapOption = {
            center: new window.kakao.maps.LatLng(
              37.570844667978704,
              126.9799234417087
            ), // 지도의 중심좌표
            level: 3, // 지도의 확대 레벨
          };
          const map = new window.kakao.maps.Map(mapContainer, mapOption);

          // 마커 추가
          // markerPositions.forEach((position) => {
          //   new window.kakao.maps.Marker({
          //     position: new window.kakao.maps.LatLng(position.y, position.x),
          //     map: map,
          //   });
          // });
          markerPositions.forEach((position, index) => {
            const content = `<div style="padding:5px; background: white; border: 1px solid black; border-radius: 50%; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center;">${
              index + 1
            }</div>`;

            const customOverlay = new window.kakao.maps.CustomOverlay({
              position: new window.kakao.maps.LatLng(position.y, position.x),
              content: content,
              yAnchor: 1,
              clickable: true,
            });

            customOverlay.setMap(map);
          });
          // 폴리라인 추가
          if (markerPositions.length > 1) {
            const path = markerPositions.map(
              (position) => new window.kakao.maps.LatLng(position.y, position.x)
            );
            new window.kakao.maps.Polyline({
              map: map,
              path: path,
              strokeColor: "#5347AA",
              strokeWeight: 3,
            });
          }
        });
      }
    };

    mapScript.addEventListener("load", onLoadKakaoMap);

    return () => {
      mapScript.removeEventListener("load", onLoadKakaoMap);
      document.head.removeChild(mapScript);
    };
  }, [markerPositions]);

  return (
    <div ref={mapRef} style={{ width: "100%", height: "100%" }} id="map"></div>
  );
}
