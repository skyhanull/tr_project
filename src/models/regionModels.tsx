import mongoose, { Schema, Document, Model } from "mongoose";

//  인터페이스 정의
interface IRegion extends Document {
  name: string;
  _id: string;
  id: string;
  lat: string;
  lon: string;
}

//  스키마 정의
const RegionSchema: Schema = new Schema({
  name: { type: String, required: true },
  lat: { type: String, required: true },
  lon: { type: String, required: true },
  _id: { type: String, required: false },
  id: { type: String, required: true },
});

// 모델 정의 및 가져오기
const Region: Model<IRegion> =
  mongoose.models.Region ||
  mongoose.model<IRegion>("Region", RegionSchema, "region");

export default Region;
