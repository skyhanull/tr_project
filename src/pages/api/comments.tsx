// /pages/api/add-comment.ts

import type { NextApiRequest, NextApiResponse } from "next";
import Road from "@/lib/userRoad"; // 모델 경로에 따라 수정하세요.
import connectToDatabase from "@/lib/mongodb"; // 데이터베이스 연결 유틸리티 경로에 따라 수정하세요.

async function addCommentToRoad(
  roadId: string,
  userId: string,
  commentText: string
) {
  try {
    const newComment = {
      userId,
      text: commentText,
    };

    const updatedRoad = await Road.findByIdAndUpdate(
      roadId,
      { $push: { comments: newComment } },
      { new: true }
    );

    return updatedRoad;
  } catch (error) {
    throw new Error("Error adding comment: " + error.message);
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      await connectToDatabase(); // 데이터베이스에 연결

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
