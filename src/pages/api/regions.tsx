import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/mongodb";
import Region from "../../models/regionModels";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query } = req.query;

  try {
    await dbConnect(); // MongoDB에 연결

    // 쿼리 파라미터 확인 및 URL 디코딩
    const decodedQuery = query ? decodeURIComponent(query.toString()) : "";

    // 디코딩된 쿼리 파라미터로 필터링
    const filter = decodedQuery ? { name: decodedQuery } : {};

    // 필터를 적용하여 데이터 조회
    const regions = await Region.find(filter).limit(10).exec();

    console.log("Regions Found:", regions); // 검색된 데이터 확인

    res.status(200).json(regions);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
}
