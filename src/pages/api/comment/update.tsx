// /pages/api/update-comment.ts

import type { NextApiRequest, NextApiResponse } from "next";
import Road from "@/lib/userRoad"; // Ensure this path is correct
import connectToDatabase from "@/lib/mongodb"; // Ensure this path is correct
import { format } from "date-fns";
import { ko } from "date-fns/locale";

// Function to update a specific comment on a road
async function updateCommentOnRoad(
  roadId: string,
  commentId: string,
  updatedText: string
) {
  try {
    const updatedDate = format(new Date(), "yyyy년 M월 d일 H시 m분", {
      locale: ko,
    });

    // Find the road and update the specific comment using $set
    const updatedRoad = await Road.findOneAndUpdate(
      {
        _id: roadId,
        "comments._id": commentId, // Ensure we target the correct comment
      },
      {
        $set: {
          "comments.$.text": updatedText,
          "comments.$.editedAt": updatedDate, // Update the comment date as well
        },
      },
      { new: true } // Return the updated document
    ).exec(); // Execute the query

    return updatedRoad;
  } catch (error) {
    throw new Error("Error updating comment: " + error);
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PATCH") {
    try {
      await connectToDatabase(); // Connect to the database

      const { roadId, commentId, updatedText } = req.body;

      if (!roadId || !commentId || !updatedText) {
        return res
          .status(400)
          .json({ success: false, message: "Missing required fields." });
      }

      const updatedRoad = await updateCommentOnRoad(
        roadId,
        commentId,
        updatedText
      );

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
