import dbConnect from "../../lib/mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import Road from "../../lib/userRoad";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const { userCode, markerList, listName } = req.body;

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
          roads: markerList, // `roads` 필드에 `markerList` 저장
        });

        res.status(201).json({ success: true, data: roadDoc });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;
    case "GET":
      try {
        const { userCode } = req.query;
        const page = parseInt(req.query.page) || 1; // 현재 페이지 (기본값 1)
        const limit = parseInt(req.query.limit) || 10; // 한 페이지에 표시할 항목 수 (기본값 10)
        const skip = (page - 1) * limit; // 페이지네이션 계산

        let filteredRoads;
        const countPromise = Road.countDocuments(userCode ? { userCode } : {});
        const roadsPromise = Road.find(userCode ? { userCode } : {})
          .skip(skip)
          .limit(limit);

        const [count, roads] = await Promise.all([countPromise, roadsPromise]);
        // let filteredRoads;
        // if (userCode) {
        //   filteredRoads = await Road.find({ userCode });
        // } else {
        //   filteredRoads = await Road.find(); // Return all records if no userCode
        // }
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
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
};

export default handler;
// // userId와 code를 가져옵니다.
// const userId = session?.user?.id;
// const userCode = session?.user?.code;
// let roadDoc = await userRoadSchema.findOne({ userId: userCode });
// // if (!roadDoc) {
// //   // 도큐먼트가 없으면 새로 생성
// //   roadDoc = new Road({
// //     userId: session.user.id,
// //     roads: [],
// //   });
// // }

// // // 도로 데이터 추가
// // roadDoc.roads.push(
// //   ...roads.map((road) => ({ ...road, code: session.code }))
// // );

// // // 도큐먼트 저장
// // const savedRoadDoc = await roadDoc.save();
