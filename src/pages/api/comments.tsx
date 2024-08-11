// /pages/api/add-comment.ts

import type { NextApiRequest, NextApiResponse } from "next";
import Road from "@/lib/userRoad"; // Ensure this path is correct
import connectToDatabase from "@/lib/mongodb"; // Ensure this path is correct

async function addCommentToRoad(
  roadId: string,
  userId: string,
  commentText: string
) {
  try {
    const newComment = {
      userId,
      text: commentText,
      date: new Date(), // Set current date/time for the comment
    };

    const updatedRoad = await Road.findByIdAndUpdate(
      roadId,
      { $push: { comments: newComment } },
      { new: true } // Return the updated document
    ).exec(); // Ensure that we use exec() to execute the query

    return updatedRoad;
  } catch (error) {
    throw new Error("Error adding comment: " + error);
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      await connectToDatabase(); // Connect to the database

      const { roadId, userId, commentText } = req.body;

      if (!roadId || !userId || !commentText) {
        return res
          .status(400)
          .json({ success: false, message: "Missing required fields." });
      }

      const updatedRoad = await addCommentToRoad(roadId, userId, commentText);

      if (updatedRoad) {
        res.status(200).json({ success: true, data: updatedRoad });
      } else {
        res.status(404).json({ success: false, message: "Road not found." });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed." });
  }
}
