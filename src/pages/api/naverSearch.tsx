// // src/pages/api/naverSearch.ts

// import type { NextApiRequest, NextApiResponse } from "next";
// import axios from "axios";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   const { query, page = 1 } = req.query;

//   if (!query) {
//     return res.status(400).json({ error: "Query parameter is required" });
//   }

//   const clientId = process.env.NEXT_PUBLIC_NAVER_CLIENT_OPEN_ID;
//   const clientSecret = process.env.NEXT_PUBLIC_NAVER_CLIENT_OPEN_SECRET;

//   if (!clientId || !clientSecret) {
//     console.error("API keys are missing");
//     return res.status(500).json({ error: "API keys are missing" });
//   }

//   const url = "https://openapi.naver.com/v1/search/local.json";
//   const encodedQuery = query; // 검색어를 URL 인코딩
//   const itemsPerPage = 100;
//   const start = (Number(page) - 1) * itemsPerPage + 1; // 시작 인덱스 계산
//   const params = {
//     query: encodedQuery,
//     display: 100,
//     start,
//   };
//   const headers = {
//     "X-Naver-Client-Id": clientId,
//     "X-Naver-Client-Secret": clientSecret,
//   };

//   try {
//     console.log("Requesting Naver API with:", params);

//     const response = await axios.get(url, {
//       params,
//       headers,
//     });
//     console.log("Naver API response:", response.data);
//     console.log("Encoded Query:", encodedQuery);
//     res.status(200).json(response.data);
//   } catch (error) {
//     console.error(
//       "Error fetching data from Naver API:",
//       error.response?.data || error.message
//     );
//     res.status(500).json({ error: error.response.data });
//   }
// }

//이 부분은 네이버주변검색을 이용하려했지만 5개밖에 나오지않아 이용 x
