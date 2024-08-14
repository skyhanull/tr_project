import dbConnect from "../../../lib/mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import Road from "../../../models/userRoad";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const { userCode, markerList, listName, image, visibility, review } =
          req.body;

        // 각 도로 객체에 userCode 추가
        if (!userCode || !Array.isArray(markerList)) {
          return res.status(400).json({
            success: false,
            message: "Invalid data. 'userCode' and 'markerList' are required.",
          });
        }

        // 현재 시간 생성
        const date = format(new Date(), "yyyy년 M월 d일 H시 m분", {
          locale: ko,
        });
        const roadDoc = await Road.create({
          userCode,
          date,
          listName,
          image,
          visibility,
          review,
          roads: markerList, // `roads` 필드에 `markerList` 저장
        });

        res.status(201).json({ success: true, data: roadDoc });
      } catch (error) {
        res.status(400).json({ success: false, message: error });
      }
      break;
    case "GET":
      try {
        const { userCode, status, sortBy } = req.query;
        const page = parseInt(req.query.page as string) || 1; // 현재 페이지 (기본값 1)
        const limit = parseInt(req.query.limit as string) || 10; // 한 페이지에 표시할 항목 수 (기본값 10)
        const skip = (page - 1) * limit; // 페이지네이션 계산

        let filter: {
          userCode?: string | string[];
          status?: string | string[];
        } = {};
        if (userCode) {
          filter.userCode = userCode;
        }
        if (status) {
          filter.status = status; // Add status filtering if provided
        }
        let sortOptions: { [key: string]: 1 | -1 } = {};

        if (sortBy === "recent") {
          sortOptions.date = 1; // Sorting by date in descending order
        } else if (sortBy === "popular") {
          sortOptions.likesCount = -1; // Sorting by popularity in descending order
        }

        const countPromise = Road.countDocuments(filter);
        const roadsPromise = Road.find(filter)
          .skip(skip)
          .limit(limit)
          .sort(sortOptions);

        const [count, roads] = await Promise.all([countPromise, roadsPromise]);

        res.status(200).json({
          success: true,
          data: roads,
          pagination: {
            total: count,
            page,
            limit,
            totalPages: Math.ceil(count / limit),
          },
        });
      } catch (error) {
        res.status(400).json({ success: false, message: error });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
};

export default handler;
