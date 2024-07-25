// pages/api/directions.js

// import axios from "axios";

// export default async function handler(req, res) {
//   const { start, end } = req.query;

//   if (!start || !end) {
//     return res.status(400).json({ error: "Missing start or end coordinates" });
//   }

//   try {
//     const url = `https://apis-navi.kakaomobility.com/v1/directions?origin=${start}&destination=${end}`;
//     const response = await axios.get(url, {
//       headers: {
//         Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_REST_KAKAO_CLIENT_KEY}`,
//         "Content-Type": "application/json",
//       },
//     });

//     if (response.status === 200) {
//       const data = response.data;
//       res.status(200).json(data.routes[0].paths[0]);
//     } else {
//       res.status(500).json({ error: "Failed to fetch directions" });
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// }
