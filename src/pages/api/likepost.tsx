import type { NextApiRequest, NextApiResponse } from "next";
import Road from "@/models/userRoad";
import connectToDatabase from "@/lib/mongodb";

async function addLikeToRoad(roadId: string, userId: string) {
  try {
    const road = await Road.findById(roadId).exec();

    if (!Array.isArray(road.likes)) {
      road.likes = [];
    }

    // Check if the user has already liked this road
    if (road.likes.includes(userId)) {
      throw new Error("User has already liked this road.");
    }

    const updatedRoad = await Road.findByIdAndUpdate(
      roadId,
      {
        $push: { likes: userId },
        $inc: { likesCount: 1 },
      },
      { new: true } // Return the updated document
    ).exec();

    return updatedRoad;
  } catch (error) {
    throw new Error("Error adding like: " + error);
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      await connectToDatabase(); // Connect to the database

      const { roadId, userId } = req.body;

      const updatedRoad = await addLikeToRoad(roadId, userId);

      res.status(200).json({ success: true, data: updatedRoad });
    } catch (error) {
      res.status(500).json({ success: false, message: error });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed." });
  }
}
