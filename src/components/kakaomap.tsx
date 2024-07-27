"use client";

import axios from "axios";
import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useRecoilValue } from "recoil";
import { textState } from "@/components/atoms";

export default function MapTest() {
  const mapRef = useRef(null);
  const pathname = useSearchParams();
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
          // const mapOption = {
          //   center: new window.kakao.maps.LatLng(
          //     +pathname.get("lat"),
          //     +pathname.get("lon")
          //   ),
          //   level: 4,
          // };
          if (mapContainer && pathname) {
            const lat = pathname.get("lat");
            const lon = pathname.get("lon");

            const centerLatLng = new window.kakao.maps.LatLng(
              lat ? parseFloat(lat) : 0, // Fallback to 0 if lat is invalid
              lon ? parseFloat(lon) : 0 // Fallback to 0 if lon is invalid
            );

            const mapOption = {
              center: centerLatLng,
              level: 4,
            };
            const map = new window.kakao.maps.Map(mapContainer, mapOption);

            // Add markers
            markerPositions.forEach((position, index) => {
              const content = `<div style="padding:5px; color: white; background: #ff4343; border: 1px solid black; border-radius: 50%; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center;">${
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

            // // Fetch directions from the API
            // const fetchDirections = async () => {
            //   if (markerPositions.length > 1) {
            //     const start = `${markerPositions[0].y},${markerPositions[0].x}`;
            //     const end = `${markerPositions[markerPositions.length - 1].y},${
            //       markerPositions[markerPositions.length - 1].x
            //     }`;

            //     try {
            //       const response = await axios.get(
            //         `/api/directions?start=${start}&end=${end}`
            //       );

            //       const path = response.data.map(
            //         (point) => new window.kakao.maps.LatLng(point[1], point[0])
            //       );

            //       // new window.kakao.maps.Polyline({
            //       //   map: map,
            //       //   path: path,
            //       //   strokeColor: "#5347AA",
            //       //   strokeWeight: 5,
            //       // });

            //       const bounds = new window.kakao.maps.LatLngBounds();
            //       path.forEach((latLng) => bounds.extend(latLng));
            //       map.setBounds(bounds);
            //     } catch (error) {
            //       console.error("Error fetching directions:", error.message);
            //     }
            //   }
            // };

            // fetchDirections();
            const bounds = map.getBounds();
            markerPositions.forEach((position, index) => {
              const latLng = new window.kakao.maps.LatLng(
                position.y,
                position.x
              );
              if (!bounds.contain(latLng)) {
                console.log(`Marker ${index + 1} is outside the map bounds.`);

                // Optional: Move the map center to the out-of-bounds marker
                map.setCenter(latLng);
              }
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
