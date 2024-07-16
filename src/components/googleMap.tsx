// "use client";
// // GoogleMap.jsx
// import React, { useEffect, useRef } from "react";

// declare global {
//   interface Window {
//     google: any;
//   }
// }

// const GoogleMap = ({}) => {
//   const mapRef = useRef(null);
//   const apiKey = process.env.NEXT_PUBLIC_KAKAO_MAPS_API_KEY;
//   const scriptSrc = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap&libraries=places,geometry`;
//   useEffect(() => {
//     if (window.kakao) {
//       window.kakao.maps.load(() => {
//         // id가 'map'인 요소에 지도를 생성
//         const mapContainer = document.getElementById("map");
//         const mapOption = {
//           // 해당 좌표는 서울 시청을 중심으로 함
//           center: new window.kakao.maps.LatLng(37.566826, 126.9786567),
//           // 줌 레벨 3으로 설정
//           level: 3,
//         };
//         const map = new window.kakao.maps.Map(mapContainer, mapOption);
//       });
//     }
//   }, []);

//   return <div ref={mapRef} style={{ width: "100vw", height: "100vh" }} />;
// };

// export default GoogleMap;
