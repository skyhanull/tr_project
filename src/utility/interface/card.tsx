export interface commentSchema {
  userName: String;
  text: String;
  date: String; // 댓글 작성 시간
  userImg: String; // 댓글 작성 시간
  userId: String;
  editedAt: String;
}

export interface cardItem {
  comments: string[];
  date: string;
  image: string;
  likes: string[];
  likesCount: number;
  listName: string;
  roads: string[];
  review: string;
  userCode: string;
  __v: number;
  _id: string;
}
