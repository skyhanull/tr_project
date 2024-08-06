// import dbConnect from "../../lib/mongodb";
// import { getToken } from "next-auth/jwt";
// import protect from "../../lib/auth";
// import storeArray from "../../lib/storeArray";

// const handler = async (req, res) => {
//   const { method } = req;

//   await dbConnect();
//   const token = await getToken({ req, secret: process.env.AUTH_CLIENT_SECRET });
//   if (!token) {
//     return res.status(401).json({ success: false, message: "Not authorized" });
//   }

//   switch (method) {
//     case "POST":
//       try {
//         const roads = req.body; // 배열로 가정
//         // 필드 유효성 검사
//         for (const road of roads) {
//           if (!road.name) {
//             return res
//               .status(400)
//               .json({
//                 success: false,
//                 message: "Missing 'name' field in request body",
//               });
//           }
//         }
//         // 로그인한 사용자 정보 가져오기
//         const user = req.user;
//         // console.log(roads, user);
//         // 사용자별 동적 모델 생성
//         const Road = storeArray(user.name); // 예: email을 기반으로 컬렉션 생성
//         const ro = roads;
//         // 배열의 모든 항목을 데이터베이스에 저장

//         const savedRoads = await Road.insertMany(roads);

//         res.status(201).json({ success: true, data: savedRoads });
//       } catch (error) {
//         res.status(400).json({ success: false, message: error.message });
//       }
//       break;
//     default:
//       res.status(400).json({ success: false });
//       break;
//   }
// };

// export default handler;

import dbConnect from "../../lib/mongodb";
import { getSession } from "next-auth/react"; // next-auth에서 getSession 임포트
import Road from "../../lib/userRoad";

const handler = async (req, res) => {
  const { method } = req;

  await dbConnect();
  // const session = await getSession({ req }); // 세션 가져오기
  // if (!session || !session.user) {
  //   return res.status(401).json({ success: false, message: "Not authorized" });
  // }
  // console.log(session);
  // const userCode = session?.user?.code || session?.user?.userCode; // userCode가 다른 경로에 있을 가능성 고려
  // console.log("User Code:", userCode);

  // if (!userCode) {
  //   return res
  //     .status(400)
  //     .json({ success: false, message: "User code not found in session" });
  // }
  switch (method) {
    case "POST":
      try {
        const { userCode, markerList } = req.body;

        // 각 도로 객체에 userCode 추가
        if (!userCode || !Array.isArray(markerList)) {
          return res.status(400).json({
            success: false,
            message: "Invalid data. 'userCode' and 'markerList' are required.",
          });
        }

        const roadDoc = await Road.create({
          userCode,
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

        if (!userCode) {
          return res.status(400).json({
            success: false,
            message: "'userCode' query parameter is required.",
          });
        }

        // userCode로 필터링
        const filteredRoads = await Road.find({ userCode });

        res.status(200).json({ success: true, data: filteredRoads });
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
