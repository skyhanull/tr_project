// components/Modal.tsx
import { useState } from "react";
import Image from "next/image";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import { red } from "@mui/material/colors";
import { useSession } from "next-auth/react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  directions: any;
  markerList: any;
  card: any;
}

const Modal = ({ isOpen, onClose, card }: ModalProps) => {
  const { data: session } = useSession(); // To get user info

  const [comments, setComments] = useState<any[]>(card.comments || []); // Assuming card has comments
  const [newComment, setNewComment] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  console.log(session?.user.image);
  console.log(card);
  const handleSubmitComment = async () => {
    if (newComment.trim() === "") {
      setError("댓글을 입력해 주세요.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          roadId: card._id, // Assuming card has _id
          userName: session?.user.name,
          userImg: session?.user.image,
          commentText: newComment,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setComments([
          ...comments,
          {
            userName: session?.user.name,
            userImg: session?.user.image,
            text: newComment,
          },
        ]);
        setNewComment("");
      } else {
        setError(result.message || "댓글을 추가하는 중 오류가 발생했습니다.");
      }
    } catch (error) {
      setError("댓글을 추가하는 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
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
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {session?.user?.name?.charAt(0)}
          </Avatar>
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

          <CardContent>
            {card.roads.map((road: any, i: number) => (
              <span key={`road-card-${i}`}>
                <span className="">{road.name} -</span>
              </span>
            ))}
          </CardContent>
          <Divider sx={{ my: 2 }} />
          <div className="p-4">
            <Typography variant="h6">댓글</Typography>
            <div className="my-2">
              {comments.length > 0 ? (
                comments.map((comment, index) => (
                  <div key={index} className="mb-2">
                    <Typography variant="body2" color="textSecondary">
                      <div className="flex">
                        <Image
                          src={comment.userImg}
                          alt=""
                          width={30}
                          height={30}
                          className="flex"
                        />
                        <div className="flex flex-col">
                          <span className="text-black">{comment.userName}</span>
                          <span>{comment.date}</span>
                        </div>
                      </div>
                      <div className="text-lg text-black"> {comment.text}</div>
                    </Typography>
                  </div>
                ))
              ) : (
                <Typography variant="body2" color="textSecondary">
                  댓글이 없습니다.
                </Typography>
              )}
            </div>
            <TextField
              label="댓글을 입력하세요"
              variant="outlined"
              fullWidth
              multiline
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
