// Google Maps API 스크립트 로드
const script = document.createElement("script");
script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places`;
script.async = true;
document.head.appendChild(script);

// 경로 계산 함수
function calculateRoute(origins, destination) {
  const directionsService = new google.maps.DirectionsService();
  const request = {
    origin: origin,
    destination: destination,
    travelMode: google.maps.TravelMode.DRIVING, // 이동 수단 선택 (DRIVING, WALKING 등)
  };

  directionsService.route(request, (response, status) => {
    if (status === "OK") {
      // response에서 경로 정보 추출
      const route = response.routes[0];
      console.log(route); // 경로 정보 출력
      // 여기서 route를 이용하여 카카오맵에 표시하거나 필요한 작업을 수행할 수 있음
    } else {
      console.error("Directions request failed due to " + status);
    }
  });
}

// 예제 사용
const origins = new google.maps.LatLng(37.7749, -122.4194); // 출발지 좌표
const destination = new google.maps.LatLng(37.8715, -122.273); // 목적지 좌표
calculateRoute(origins, destination);
