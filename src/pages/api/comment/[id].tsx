// /pages/api/comments/[id].ts

import type { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "@/lib/mongodb";
import Road from "@/lib/userRoad"; // Ensure this path is correct

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { id },
    method,
  } = req;

  await connectToDatabase(); // Connect to the database

  if (method === "GET") {
    try {
      const road = await Road.findById(id).exec();

      if (!road) {
        return res
          .status(404)
          .json({ success: false, message: "Road not found." });
      }

      res
        .status(200)
        .json({ success: true, data: { comments: road.comments } });
    } catch (error) {
      res.status(500).json({ success: false, message: error });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed." });
  }
}
