// // lib/dynamicModel.js
// import mongoose from "mongoose";

// const createDynamicModel = (username) => {
//   const RoadSchema = new mongoose.Schema({
//     address: {
//       type: String,
//       required: true,
//     },
//     filterChip: {
//       type: String,
//       required: true,
//     },
//     chip: {
//       type: String,
//       required: true,
//     },
//     name: {
//       type: String,
//       required: true,
//     },
//     x: {
//       type: String,
//       required: true,
//     },
//     y: {
//       type: String,
//       required: true,
//     },
//   });

//   return (
//     mongoose.models[username] || mongoose.model(username, RoadSchema, username)
//   );
// };

// export default createDynamicModel;
import mongoose from "mongoose";

const userRoadSchema = new mongoose.Schema({
  userCode: { type: String, ref: "User" },
  listName: { type: String },
  date: { type: String },
  image: { type: String },
  roads: [
    {
      name: String,
      code: String,
      chip: String,
      x: String,
      y: String,
      filterChip: String,
      address: String,
      // 추가적인 필드
    },
  ],
});

const Road = mongoose.models.Road || mongoose.model("Road", userRoadSchema);
export default Road;
