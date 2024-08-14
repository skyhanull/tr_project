import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import { useSession } from "next-auth/react";
import { HiThumbUp } from "@react-icons/all-files/hi/HiThumbUp";
import AvataImg from "../img/avata";
import CustomTextField from "../filterbar/textInput";
import { cardItem } from "../../utility/interface/card";
import { Pagenationtype } from "../../utility/interface/pagenation";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  card: cardItem;
  state: boolean;
}

const Modal = ({ isOpen, onClose, card, state }: ModalProps) => {
  const { data: session } = useSession(); // To get user info

  const [comments, setComments] = useState<any[]>(card.comments || []); // Assuming card has comments
  const [newComment, setNewComment] = useState<string>("");
  const [editComment, setEditComment] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isEdit, setIsEdit] = useState("");

  useEffect(() => {
    if (isOpen) {
      fetchComments();
    }
  }, [isOpen]);

  const fetchComments = async () => {
    try {
      const response = await axios.get(`/api/comment/${card._id}`);
      const result = response.data;

      if (result.success) {
        setComments(result.data.comments);
      } else {
        setError(result.message || "댓글을 가져오는 중 오류가 발생했습니다.");
      }
    } catch (error) {
      setError("댓글을 가져오는 중 오류가 발생했습니다.");
    }
  };

  // 댓글 추가 핸들러
  const handleSubmitComment = async () => {
    if (newComment.trim() === "") {
      setError("댓글을 입력해 주세요.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("/api/comment/post", {
        roadId: card._id,
        userName: session?.user.name,
        userImg: session?.user.image,
        userId: session?.user.code,
        commentText: newComment,
      });
      const result = response.data;

      if (result.success) {
        setNewComment("");
        fetchComments(); // 댓글 추가 후 최신 댓글 목록을 가져옴
      } else {
        setError(result.message || "댓글을 추가하는 중 오류가 발생했습니다.");
      }
    } catch (error) {
      setError("댓글을 추가하는 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  // 댓글 수정 핸들러
  const handleEditComment = async (id: string) => {
    if (editComment.trim() === "") {
      setError("댓글을 입력해 주세요.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.patch("/api/comment/update", {
        roadId: card._id, // Assuming card has _id
        commentId: id,
        updatedText: editComment,
      });
      const result = response.data;

      if (result.success) {
        fetchComments();

        setIsEdit(""); // Exit edit mode
        setEditComment(""); // Clear the edit input
        setNewComment("");
      } else {
        setError(result.message || "댓글을 수정하는 중 오류가 발생했습니다.");
      }
    } catch (error) {
      setError("댓글을 수정하는 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  // 댓글 삭제 핸들러
  const handleDeleteComment = async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.delete("/api/comment/delete", {
        data: {
          roadId: card._id, // Assuming card has _id
          commentId: id,
        },
      });

      const result = response.data;

      if (result.success) {
        fetchComments();
      } else {
        setError(result.message || "댓글을 삭제하는 중 오류가 발생했습니다.");
      }
    } catch (error) {
      setError("댓글을 삭제하는 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };
  const handleCardDelete = async () => {
    try {
      const response = await axios.delete("/api/card/delete", {
        data: {
          roadId: card._id, // Assuming card has _id
        },
      });
      const result = response.data;

      if (result.success) {
        // fetchComments();
      } else {
        console.error("Error adding like:", result.message);
      }
    } catch (error) {
      console.error("Error adding like:", error);
    }
  };

  const handleLike = async () => {
    try {
      const response = await axios.post("/api/likepost", {
        roadId: card._id,
        userId: session?.user.code,
      });
      const result = response.data;

      if (result.success) {
        fetchComments();
      } else {
        console.error("Error adding like:", result.message);
      }
    } catch (error) {
      console.error("Error adding like:", error);
    }
  };
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-2/4 p-3">
        <div className="p-4 border-b">
          <button
            className="text-gray-600 hover:text-gray-900"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        <div key={`card`} className="rounded-lg h-76">
          {card.image ? (
            <div className="relative w-full h-40 overflow-hidden">
              <Image
                src={card.image}
                alt="img"
                width="0"
                height="0"
                sizes="100vw"
                style={{ width: "100%", height: "auto" }}
                priority
              />
            </div>
          ) : (
            <div className="h-40 w-full bg-rose-50" />
          )}
          <div className="p-3 ">
            <div className="flex flex-row items-center justify-between">
              <div className="text-3xl py-2">{card.listName}</div>
              <div className="text-gray-400">
                {state && (
                  <>
                    {/* <span
                      onClick={() => setIsEdit(comment._id)}
                      className="mr-3"
                    >
                      편집
                    </span> */}
                    <span onClick={() => handleCardDelete()}>삭제</span>
                  </>
                )}
              </div>
            </div>
            <div className="flex flex-row items-center ">
              <span>
                <AvataImg name={session?.user?.name?.charAt(0)} />
              </span>
              <span className="ml-2"> {session?.user.name}</span>
            </div>
            <CardContent>
              <div className="text-gray-400">road</div>
              <div className="py-2">
                {card.roads.map((road: any, i: number) => (
                  <span key={`road-card-${i}`} className="my-3">
                    {road.name} -
                  </span>
                ))}
              </div>
              <div className="text-gray-400">review</div>
              <div className="my-2">{card.review}</div>
            </CardContent>
            <div className="flex items-center">
              {card.likesCount ?? 0}
              <div onClick={() => handleLike()}>
                <HiThumbUp />
              </div>
            </div>
          </div>
          <Divider sx={{ my: 1 }} />
          <div className="p-4">
            <Typography variant="h6">댓글</Typography>
            <div className="my-2 max-h-64 overflow-auto">
              {comments.length > 0 ? (
                comments.map((comment, index) => (
                  <div key={index} className="mb-2">
                    <Typography variant="body2" color="textSecondary">
                      <div className="flex justify-between">
                        <div className="flex">
                          <AvataImg img={comment.userImg} />
                          <div className="flex flex-col ml-3">
                            <span className="text-black">
                              {comment.userName}
                            </span>
                            <span>{comment.date}</span>
                          </div>
                        </div>

                        <div>
                          {isEdit === comment._id ? (
                            <>
                              <span
                                onClick={() => handleEditComment(comment._id)}
                                className="mr-3"
                              >
                                수정
                              </span>
                              <span onClick={() => setIsEdit("")}>취소</span>
                            </>
                          ) : (
                            <>
                              <span
                                onClick={() => setIsEdit(comment._id)}
                                className="mr-3"
                              >
                                편집
                              </span>
                              <span
                                onClick={() => handleDeleteComment(comment._id)}
                              >
                                삭제
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                      {isEdit === comment._id ? (
                        <CustomTextField
                          label={"댓글을 입력하세요"}
                          rows={3}
                          value={editComment}
                          onChange={(e) => setEditComment(e.target.value)}
                        />
                      ) : (
                        <div className="text-lg text-black p-2">
                          {comment.text}
                        </div>
                      )}
                    </Typography>
                  </div>
                ))
              ) : (
                <Typography variant="body2" color="textSecondary">
                  댓글이 없습니다.
                </Typography>
              )}
            </div>
            <CustomTextField
              label={"댓글을 입력하세요"}
              rows={3}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmitComment}
              className="mt-2"
              disabled={loading}
            >
              {loading ? "작성 중..." : "댓글 작성"}
            </Button>
            {error && (
              <Typography variant="body2" color="error" className="mt-2">
                {error}
              </Typography>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
