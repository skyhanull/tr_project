// /pages/api/delete-road.ts

import type { NextApiRequest, NextApiResponse } from "next";
import Road from "@/lib/userRoad"; // Ensure this path is correct
import connectToDatabase from "@/lib/mongodb"; // Ensure this path is correct

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "DELETE") {
    try {
      await connectToDatabase(); // Connect to the database

      const { roadId } = req.body;

      if (!roadId) {
        return res
          .status(400)
          .json({ success: false, message: "Missing roadId." });
      }

      // Directly use findByIdAndDelete
      const deletedRoad = await Road.findByIdAndDelete(roadId).exec();

      if (deletedRoad) {
        res.status(200).json({ success: true, data: deletedRoad });
      } else {
        res.status(404).json({ success: false, message: "Road not found." });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: error });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed." });
  }
}
