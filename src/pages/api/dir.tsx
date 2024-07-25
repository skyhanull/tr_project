// // pages/api/directions.js

// import axios from "axios";

// export default async function handler(req, res) {
//   const { origin, destination, waypoints } = req.query;

//   console.log(origin, destination, waypoints);
//   if (!origin || !destination) {
//     return res
//       .status(400)
//       .json({ error: "Origin and destination are required" });
//   }

//   const apiKey = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_KEY;
//   let url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${apiKey}&travelMode='DRIVING`;
//   let urls = `https://maps.googleapis.com/maps/api/directions/json?origin=%EC%84%9C%EC%9A%B8%20%EA%B0%95%EB%82%A8%EA%B5%AC%20%EB%86%80%ED%98%84%EB%A1%9C%20508&destination=%EC%84%9C%EC%9A%B8%20%EC%86%A1%ED%8C%8C%EA%B5%AC%20%EC%98%AC%EB%A6%BC%ED%94%BC%EB%A1%9C%20300&key=${apiKey}
// `;
//   // if (waypoints && waypoints.length > 0) {
//   //   url += `&waypoints=${waypoints}`;
//   // }
//   try {
//     const response = await axios.get(urls);
//     res.status(200).json(response.data);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// }
