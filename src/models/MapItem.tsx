// models/mapItem.ts
import mongoose, { Schema, model, models, Document, Model } from "mongoose";

// 인터페이스 정의
export interface IMapItem extends Document {
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

export default createDynamicModel;
