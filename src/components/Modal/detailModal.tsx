// components/Modal.tsx
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import DatePicker from "react-datepicker";
import { useState } from "react";
import Image from "next/image";
import "react-datepicker/dist/react-datepicker.css";
import { convertDuration } from "@/utility/time";
import DistanceM from "@/utility/distance";
import ShareKakao from "@/components/kakao/shareKakao";
import { format, parseISO } from "date-fns";
import { ko } from "date-fns/locale";
import Card from "@mui/material/Card";
import Pagination from "@mui/material/Pagination";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import { useSession } from "next-auth/react";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import { red } from "@mui/material/colors";
import DetailModal from "../../components/Modal/detailModal";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  directions: any;
  markerList: any;
  card: any;
}

const Modal = ({
  isOpen,
  onClose,
  directions,
  markerList,
  card,
}: ModalProps) => {
  const pathName = usePathname() as string;
  const router = useRouter();
  const searchparams = useSearchParams();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  console.log(card);
  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };
  const formattedDate = selectedDate
    ? format(selectedDate, "yyyy.MM.dd (EEE)", { locale: ko })
    : "날짜를 선택해 주세요"; // null일 때의 기본 값

  const handleSubmit = () => {
    // console.log("Selected Date:", selectedDate);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ">
      <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-2/4 p-3">
        <div className="p-4 border-b">
          <button
            className="text-gray-600 hover:text-gray-900"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        <div key={`card`} className="rounded-lg  h-76">
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {/* {session?.user?.name?.split("")[0]} */}
          </Avatar>
          {card.image ? (
            <div className="relative w-full h-40 overflow-hidden ">
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

          {/* <CardContent className="h-20"> */}
          {card.roads.map((road: any, i: number) => (
            <span key={`road-card-${i}`}>
              <span className="">{road.name} -</span>
            </span>
          ))}
        </div>
        <div>댓글창</div>
      </div>
    </div>
  );
};

export default Modal;
