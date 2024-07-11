// // export default function SearchFacility(e) {
// //   const { kakao } = window;
// //   var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
// //   var ps = new kakao.maps.services.Places(); // 키워드로 검색 인스턴스 생성

// //   const where = e.target.value;

// //   const current = new kakao.maps.LatLng(location.x, location.y);
// //   // ps.keywordSearch(where, (data, status, pagination)=>{  // 키워드로 검색한다.

// //   //   if (status === kakao.maps.services.Status.OK) {
// //   //     facilityLocationStore.setLocationArr(data);  // 스토어에 좌표값들을 저장한다.
// //   //     if(markerArr.length !==0){
// //   //       deleteMarker();
// //   //     }
// //   //     const tmpArr = [];
// //   //     for (var i=0; i<data.length; i++) {
// //   //         displayMarker(map,infowindow ,data[i], tmpArr, where);
// //   //     }
// //   //     setMarkerArr(tmpArr);
// //   //   }

// //   // },{location : current});  // 현재 위치를 기반으로 키워드 검색
// // }
// import React, { useEffect, useRef } from "react";
// import { useRecoilValue } from "recoil";
// import { textState } from "@/components/atoms";
// import axios from "axios";

// declare global {
//   interface Window {
//     kakao: any;
//   }
// }

// const Map = () => {
//   const mapRef = useRef(null);
//   const markerPositions = useRecoilValue(textState); // Recoil에서 마커 위치 상태를 가져옴

//   useEffect(() => {
//     // 카카오 맵 스크립트를 동적으로 로드
//     const script = document.createElement("script");
//     script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_JS_KAKAO_CLIENT_KEY}&libraries=services,clusterer,drawing`;
//     script.async = true;
//     document.head.appendChild(script);
//     const { kakao } = window;
//     const onLoadKakaoMap = () => {
//       script.onload = () => {
//         kakao.maps.load(() => {
//           const container = mapRef.current;
//           var mapContainer = document.getElementById("map");
//           const options = {
//             center: new kakao.maps.LatLng(37.5665, 126.978), // 초기 중심 좌표 (서울 시청)
//             level: 10, // 지도 확대 레벨
//           };

//           const map = new kakao.maps.Map(mapContainer, options);
//           // script.addEventListener("load", map);
//           // // 마커 추가
//           // markerPositions.forEach((position) => {
//           //   const marker = new kakao.maps.Marker({
//           //     position: new kakao.maps.LatLng(position.y, position.x),
//           //     map: map,
//           //   });
//           // });

//           // // 경로 그리기 함수
//           // const drawPath = async () => {
//           //   if (markerPositions.length < 2) return;

//           //   const start = markerPositions[0];
//           //   const end = markerPositions[1];
//           //   const url = `https://dapi.kakao.com/v2/local/search/route.json?startX=${start.x}&startY=${start.y}&endX=${end.x}&endY=${end.y}&option=trafast`;

//           //   try {
//           //     const response = await axios.get(url, {
//           //       headers: {
//           //         Authorization: process.env.NEXT_PUBLIC_KAKAO_CLIENT_KEY,
//           //       },
//           //     });

//           //     const { documents } = response.data;
//           //     const points = documents[0].path.map(
//           //       ({ x, y }) => new kakao.maps.LatLng(y, x)
//           //     );

//           //     const polyline = new kakao.maps.Polyline({
//           //       path: points,
//           //       strokeWeight: 3,
//           //       strokeColor: "#5347AA",
//           //       strokeOpacity: 0.8,
//           //     });

//           //     polyline.setMap(map);

//           //     const { distance, duration, fare } = documents[0].summary;
//           //     console.log(
//           //       `총 거리: ${distance}m, 예상 시간: ${duration}ms, 교통 수단: ${fare}`
//           //     );
//           //   } catch (error) {
//           //     console.error("Failed to fetch directions:", error);
//           //   }
//           // };

//           // drawPath(); // 경로 그리기 함수 호출
//         });
//       };

//       return () => {
//         document.head.removeChild(script);
//       };
//     };
//     script.addEventListener("load", onLoadKakaoMap);
//   }, []);

//   return <div ref={mapRef} style={{ width: "100%", height: "100%" }} />;
// };

// export default Map;

// import React, { useEffect, useRef } from "react";
// import { useRecoilValue } from "recoil";
// import { textState } from "@/components/atoms";
// import axios from "axios";

// declare global {
//   interface Window {
//     kakao: any;
//   }
// }

// const Map = () => {
//   const mapRef = useRef(null);
//   const markerPositions = useRecoilValue(textState);
//   const { kakao } = window;
//   useEffect(() => {
//     const script = document.createElement("script");
//     script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_JS_KAKAO_CLIENT_KEY}&libraries=services,clusterer,drawing&autoload="false"`;
//     script.async = true;
//     document.head.appendChild(script);

//     const onLoadKakaoMap = () => {
//       script.onload = () => {
//         kakao.maps.load(() => {
//           const mapContainer = mapRef.current
//             ? mapRef.current
//             : document.getElementById("map");
//           if (!mapContainer) return;

//           const options = {
//             center: new kakao.maps.LatLng(37.5665, 126.978),
//             level: 10,
//           };

//           const map = new kakao.maps.Map(mapContainer, options);
//           // 마커 추가, 경로 그리기 등의 로직...
//         });
//       };
//     };

//     script.addEventListener("load", onLoadKakaoMap);

//     return () => {
//       document.head.removeChild(script);
//     };
//   }, []); // 의존성 배열 비우기

//   return (
//     <div ref={mapRef} style={{ width: "100%", height: "100%" }} id="map"></div>
//   );
// };

// export default Map;
// import { useEffect, useRef } from 'react';
// import { useRecoilValue } from 'recoil';
// import { textState } from './yourRecoilState';

// const Map = () => {
//   const mapRef = useRef(null);
//   const markerPositions = useRecoilValue(textState);

//   useEffect(() => {
//     const script = document.createElement("script");
//     script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_JS_KAKAO_CLIENT_KEY}&libraries=services,clusterer,drawing`;
//     script.async = true;
//     document.head.appendChild(script);

//     script.onload = () => {
//       console.log("Kakao map script loaded");
//       if (!window.kakao || !window.kakao.maps) {
//         console.error("Kakao maps API is not available");
//         return;
//       }

//       window.kakao.maps.load(() => {
//         const mapContainer = mapRef.current;
//         if (!mapContainer) {
//           console.error("Map container is not available");
//           return;
//         }

//         const options = {
//           center: new window.kakao.maps.LatLng(37.5665, 126.978),
//           level: 10,
//         };

//         const map = new window.kakao.maps.Map(mapContainer, options);
//         console.log("Map initialized");

//         // 마커 추가 로직
//         markerPositions.forEach(position => {
//           new window.kakao.maps.Marker({
//             position: new window.kakao.maps.LatLng(position.lat, position.lng),
//             map: map,
//           });
//         });
//       });
//     };

//     script.onerror = () => {
//       console.error("Failed to load the Kakao map script");
//     };

//     return () => {
//       script.onload = null;
//       document.head.removeChild(script);
//     };
//   }, [markerPositions]);

//   return (
//     <div ref={mapRef} style={{ width: "100%", height: "100%" }} id="map"></div>
//   );
// };
// "use client";
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
          markerPositions.forEach((position) => {
            new window.kakao.maps.Marker({
              position: new window.kakao.maps.LatLng(position.y, position.x),
              map: map,
            });
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
