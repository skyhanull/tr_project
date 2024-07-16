// pages/api/directions.js

import axios from "axios";

export default async function handler(req, res) {
  const { origin, destination, mode = "driving" } = req.query; // 기본값을 driving으로 설정
  console.log(origin, destination, mode);

  if (!origin || !destination) {
    return res
      .status(400)
      .json({ error: "Origin and destination are required" });
  }

  // function convertWaypointsToQueryString(waypoints) {
  //   return waypoints
  //     .map((waypoint) => `waypoints[stopover]=${waypoint.x},${waypoint.y}`)
  //     .join("&");
  // }

  // // Wesaypoint 객체를 쿼리 문자열로 변환
  // const waypointsParam = convertWaypointsToQueryString(waypoints);

  const apiKey = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

  const originCoords = origin.split(",").reverse().join(",");
  const destinationCoords = destination.split(",").reverse().join(",");

  // 경로 모드에 따라 URL 생성
  let url = `https://api.mapbox.com/directions/v5/mapbox/${mode}/${originCoords};${destinationCoords}?access_token=${apiKey}`;
  let urls = `https://api.mapbox.com/directions/v5/mapbox/driving/${origin}?access_token=${apiKey}`;

  // // 경유지가 있다면 waypoints 파라미터 추가
  // if (waypoints && waypoints.length > 0) {
  //   // const waypointParams = waypoints
  //   //   .split(",")
  //   //   .map((waypoint) => `stopover:${waypoint.trim()}`)
  //   //   .join("&");
  //   // url += `&waypoints=${waypointParams}`;
  //   url += `&${waypoints}`;
  // }

  try {
    const response = await axios.get(urls);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: urls });
  }
}
