// src/lib/mongodb.ts

import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false,
      dbName: "pide", // 여기에 기본 데이터베이스 이름을 설정합니다.
    };

    cached.promise = mongoose
      .connect(MONGODB_URI as string, opts)
      .then((mongoose) => {
        return mongoose;
      })
      .catch((err) => {
        console.error("Failed to connect to MongoDB:", err);
        throw err; // 에러를 다시 던져서 상위 레벨에서 처리할 수 있도록 합니다.
      });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
