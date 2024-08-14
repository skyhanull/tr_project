// /pages/api/delete-comment.ts

import type { NextApiRequest, NextApiResponse } from "next";
import Road from "@/models/userRoad"; // Ensure this path is correct
import connectToDatabase from "@/lib/mongodb"; // Ensure this path is correct

// Function to delete a specific comment from a road
async function deleteCommentFromRoad(roadId: string, commentId: string) {
  try {
    // Find the road and remove the specific comment using $pull
    const updatedRoad = await Road.findByIdAndUpdate(
      roadId,
      {
        $pull: { comments: { _id: commentId } }, // Use $pull to remove the comment
      },
      { new: true } // Return the updated document
    ).exec();

    return updatedRoad;
  } catch (error) {
    throw new Error("Error deleting comment: " + error);
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "DELETE") {
    try {
      await connectToDatabase(); // Connect to the database

      const { roadId, commentId } = req.body;

      if (!roadId || !commentId) {
        return res
          .status(400)
          .json({ success: false, message: "Missing required fields." });
      }

      const updatedRoad = await deleteCommentFromRoad(roadId, commentId);

      if (updatedRoad) {
        res.status(200).json({ success: true, data: updatedRoad });
      } else {
        res
          .status(404)
          .json({ success: false, message: "Road or comment not found." });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: error });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed." });
  }
}
