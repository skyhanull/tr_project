"use client";
import { useEffect } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

export default function KakaoMap() {
  useEffect(() => {
    if (window.kakao) {
      window.kakao.maps.load(() => {
        const mapContainer = document.getElementById("map");
        const mapOption = {
          center: new window.kakao.maps.LatLng(37.566826, 126.9786567),
          level: 3,
        };

        var positions = [
          {
            title: "카카오",
            latlng: new window.kakao.maps.LatLng(37.566826, 126.9786567),
          },
          {
            title: "생태연못",
            latlng: new window.kakao.maps.LatLng(33.450936, 126.569477),
          },
          {
            title: "텃밭",
            latlng: new window.kakao.maps.LatLng(33.450879, 126.56994),
          },
          {
            title: "근린공원",
            latlng: new window.kakao.maps.LatLng(33.451393, 126.570738),
          },
        ];
        var imageSrc =
          "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png";

        var maps = new window.kakao.maps.Map(mapContainer, mapOption);
        for (var i = 0; i < positions.length; i++) {
          var imageSize = new window.kakao.maps.Size(24, 35);
          var markerImage = new window.kakao.maps.MarkerImage(
            imageSrc,
            imageSize
          );

          var marker = new window.kakao.maps.Marker({
            map: maps,
            position: positions[i].latlng,
            title: positions[i].title,
            image: markerImage,
          });
        }
      });
    }
  }, []);

  return <div id="map" style={{ height: "100%", width: "100%" }} />;
}
