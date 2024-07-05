// pages/api/directions.js

import axios from "axios";

export default async function handler(req, res) {
  const { start, goal } = req.query;
  const clientId = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID;
  const clientSecret = process.env.NEXT_PUBLIC_NAVER_CLIENT_SECRET;
  const url = `https://naveropenapi.apigw.ntruss.com/map-direction-15/v1/driving?start=${start}&goal=${goal}`;
  const options = {
    headers: {
      "X-NCP-APIGW-API-KEY-ID": clientId,
      "X-NCP-APIGW-API-KEY": clientSecret,
    },
  };

  try {
    const response = await axios.get(url, options);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch directions" });
  }
}
