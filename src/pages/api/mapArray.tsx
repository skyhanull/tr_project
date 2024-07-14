import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/mongodb";
import mongoose, { Schema, model, models, Document, Model } from "mongoose";

// 인터페이스 정의
interface IMapItem extends Document {
  name: string;
  _id: number;
  lng: string;
  caption: string;
  E_name: string;
  location: string;
  img: string;
  type: "restaurant" | "tourist";
}

// 동적 모델 생성 함수
const createDynamicModel = (collectionName: string): Model<IMapItem> => {
  const mapItemSchema = new Schema<IMapItem>(
    {
      name: { type: String, required: true },
      _id: { type: Number, required: true },
      lng: { type: String, required: true },
      caption: { type: String, required: true },
      E_name: { type: String, required: true },
      location: { type: String, required: true },
      img: { type: String, required: true },
      type: {
        type: String,
        required: true,
        enum: ["restaurant", "tourist"],
      },
    },
    { collection: collectionName }
  );

  return (
    models[collectionName] || model<IMapItem>(collectionName, mapItemSchema)
  );
};

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

    const mapItems = await MapItem.find(filter); // 타입 필터링된 모든 문서 가져오기
    res.status(200).json(mapItems);
  } catch (error) {
    console.error("Error fetching data:", error); // 오류 메시지 출력
    res
      .status(500)
      .json({ error: "Failed to fetch data", details: error.message });
  }
}
