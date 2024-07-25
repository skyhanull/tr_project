// pages/api/directions.js

import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { origin, destination, mode } = req.query; // 기본값을 driving으로 설정

  if (!origin || !destination) {
    return res
      .status(400)
      .json({ error: "Origin and destination are required" });
  }

  const apiKey = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

  // 경로 모드에 따라 URL 생성
  let urls = `https://api.mapbox.com/directions/v5/mapbox/${mode}/${origin};${destination}?access_token=${apiKey}`;

  // // 경유지가 있다면 waypoints 파라미터 추가 =>웨이 포인트를 이렇게 추가안하고 오리진에 같이넣으면 됨
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
