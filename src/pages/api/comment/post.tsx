// /pages/api/add-comment.ts

import type { NextApiRequest, NextApiResponse } from "next";
import Road from "@/lib/userRoad"; // Ensure this path is correct
import connectToDatabase from "@/lib/mongodb"; // Ensure this path is correct
import { format } from "date-fns";
import { ko } from "date-fns/locale";

async function addCommentToRoad(
  roadId: string,
  userName: string,
  userImg: string,
  commentText: string,
  userId: string
) {
  try {
    const date = format(new Date(), "yyyy년 M월 d일 H시 m분", {
      locale: ko,
    });

    const newComment = {
      userName,
      text: commentText,
      userImg,
      userId,
      date: date, // Set current date/time for the comment
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

      const { roadId, userName, commentText, userImg, userId } = req.body;

      if (!roadId || !userName || !commentText) {
        return res
          .status(400)
          .json({ success: false, message: "Missing required fields." });
      }

      const updatedRoad = await addCommentToRoad(
        roadId,
        userName,
        userImg,
        commentText,
        userId
      );

      if (updatedRoad) {
        res.status(200).json({ success: true, data: updatedRoad });
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
