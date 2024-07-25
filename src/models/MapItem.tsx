import mongoose, { Schema, Document, models } from "mongoose";

// 인터페이스 정의
interface IMapItem extends Document {
  name: string;
  _id: number;
  lng: string;
  caption: string;
  E_name: string;
  location: string;
  img: string;
  type: "restaurant" | "cafe" | "cultural" | "recommended" | "tourist"; // 타입 필드
}

// 스키마 정의
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
      enum: ["location", "cafe", "cultural", "recommended", "tourist"],
    },
  },
  { collection: "MapItems" }
);

const MapItem =
  models.MapItems || mongoose.model<IMapItem>("MapItems", mapItemSchema);

export default MapItem;
