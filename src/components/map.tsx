"use client";
import React, { useEffect, useState, useRef, useMemo } from "react";
import useCoordinates from "./googleMap";

// const GoogleMap = (query: any) => {
//   const { coordinates, status } = useCoordinates(query.query.country);
//   console.log(coordinates, status);
//   const [mapSrc, setMapSrc] = useState("");
//   console.log(query?.country, query.query.country);
//   const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

//   useEffect(() => {
//     const mapUrl = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${query.query.country}&zoom=10`;
//     setMapSrc(mapUrl);

//     // 지도가 이미 로드되었다면 아무것도 하지 않음
//     if (!coordinates || !status) return;

//     // 지도가 로드되면 iframe의 src를 업데이트
//     const iframe = document.querySelector("#map-iframe");
//     if (iframe) {
//       iframe.src = mapUrl;
//     }
//   }, [coordinates, status, apiKey, query]);

//   return (
//     <iframe
//       width="100%"
//       height="100%"
//       // frameBorder="0"
//       style={{ border: 0 }}
//       referrerPolicy="no-referrer-when-downgrade"
//       src={mapSrc}
//       allowFullScreen
//     ></iframe>
//   );
// };

// export default GoogleMap;

const Map = ({ query }) => {
  const mapRef = useRef(null);
  const { coordinates, status } = useCoordinates(query.country);

  // 여러 마커의 위치 정보를 담을 배열
  const markers = useMemo(
    () => [
      { lat: 37.5665, lng: 126.978 }, // 첫 번째 마커 위치
      { lat: 35.6895, lng: 139.6917 }, // 두 번째 마커 위치
      // 여기에 더 많은 마커 위치를 추가할 수 있습니다.
    ],
    []
  );

  useEffect(() => {
    let mapInitialized = false; // 지도가 이미 초기화되었는지 추적하기 위한 플래그

    const initializeMap = () => {
      if (mapRef.current && !mapInitialized) {
        new window.google.maps.Map(mapRef.current, {
          center: { lat: coordinates?.lat ?? 0, lng: coordinates?.lng ?? 0 },
          zoom: 15,
        });
        // const marker = new google.maps.marker.AdvancedMarkerElement({
        //   map,
        //   position: { lat: 37.4239163, lng: -122.0947209 },
        // });

        // marker.addListener("click", ({ domEvent, latLng }) => {
        //   const { target } = domEvent;
        //   // Handle the click event.
        //   // ...
        // });
        // 모든 마커에 대해 추가
        markers.forEach((marker, index) => {
          new window.google.maps.Marker({
            position: marker,
            map: mapRef.current,
          });

          // 첫 번째 마커 이후에 길찾기
          if (index > 0) {
            const directionsService =
              new window.google.maps.DirectionsService();
            const origin = markers[index - 1];
            const destination = marker;
            console.log(directionsService);
            directionsService.route(
              {
                origin: origin,
                destination: destination,
                travelMode: window.google.maps.TravelMode.DRIVING,
              },
              (response, status) => {
                if (status === "OK") {
                  // 경로를 지도에 표시
                  new window.google.maps.DirectionsRenderer({
                    directionsService: directionsService,
                    map: mapRef.current,
                  }).setDirections(response);
                } else {
                  console.error("Directions request failed due to " + status);
                }
              }
            );
          }
        });

        mapInitialized = true; // 지도가 성공적으로 초기화되었음을 표시
      }
    };

    if (window.google) {
      initializeMap();
    } else {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;
      script.onload = initializeMap;
      document.head.appendChild(script);
    }
  }, [coordinates, markers]);

  return <div ref={mapRef} style={{ height: "100vh", width: "100%" }} />;
};

export default Map;
