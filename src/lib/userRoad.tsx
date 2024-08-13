import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  userName: { type: String, required: true }, // 댓글 작성자 ID
  text: { type: String, required: true }, // 댓글 내용
  date: { type: String }, // 댓글 작성 시간
  userImg: { type: String }, // 댓글 작성 시간
  userId: { type: String },
  editedAt: { type: String },
});

const userRoadSchema = new mongoose.Schema({
  userCode: { type: String, ref: "User" },
  listName: { type: String },
  date: { type: String },
  image: { type: String },
  visibility: { type: String },
  likes: { type: [String], default: [] },
  likesCount: { type: Number, default: 0 }, // 좋아요 수
  review: { type: String },

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
  comments: [commentSchema],
});

const Road = mongoose.models.Road || mongoose.model("Road", userRoadSchema);
export default Road;
