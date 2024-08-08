import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/mongodb";
import createDynamicModel from "../../models/MapItem";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const collectionName = req.query.collectionName as string; // 기본 컬렉션 설정
  const { type } = req.query;

  await dbConnect();

  const MapItem = createDynamicModel(collectionName);
  try {
    let filter = {};
    if (type) {
      filter = { type }; // 타입 필터링
    }

    const mapItems = await MapItem.find(filter);
    res.status(200).json(mapItems);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Failed to fetch data", details: error });
  }
}
