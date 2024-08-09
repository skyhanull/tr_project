// components/Modal.tsx
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import DatePicker from "react-datepicker";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { convertDuration } from "@/utility/time";
import DistanceM from "@/utility/distance";
import ShareKakao from "@/components/kakao/shareKakao";
import { format, parseISO } from "date-fns";
import { ko } from "date-fns/locale";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  directions: any;
  markerList: any;
}

const Modal = ({ isOpen, onClose, directions, markerList }: ModalProps) => {
  const pathName = usePathname() as string;
  const router = useRouter();
  const searchparams = useSearchParams();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/3">
        <div className="p-4 border-b">
          <button
            className="text-gray-600 hover:text-gray-900"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        <div className="p-4 flex flex-row items-center">
          <span className="w-20">날짜 선택</span>
          <DatePicker
            dateFormat="yyyy.MM.dd" // 날짜 형태
            shouldCloseOnSelect // 날짜를 선택하면 datepicker가 자동으로 닫힘
            // minDate={new Date()} // minDate 이전 날짜 선택 불가
            // maxDate={new Date()} // maxDate 이후 날짜 선택 불가
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            className="border-2 border-gray-200"
          />
        </div>
        <div className="p-4 flex flex-row items-center">
          <span className="w-20">일정</span>
          <span className="w-96">
            {markerList.map((el: any, i: number) => (
              <span key={`markerList-share-${i}`}>{el.name}-</span>
            ))}
          </span>
        </div>
        <div className="p-4 flex">
          <span className="w-20 ">총 시간</span>
          <span>
            {" "}
            {directions?.routes[0]?.duration
              ? convertDuration(directions?.routes[0]?.duration)
              : "0초"}
          </span>
        </div>
        <div className="p-4 flex">
          <span className="w-20 ">총 거리</span>
          <span>
            {" "}
            {directions?.routes[0]?.distance
              ? DistanceM(directions?.routes[0]?.distance)
              : "0km"}
          </span>
        </div>
        <div className="flex justify-center my-3 ">
          <ShareKakao
            title="제목 예시"
            description={markerList.map((el: any) => el.name).join("-")}
            imageUrl="https://pide-p.vercel.app/img/shareImg.png"
            // linkUrl="https://example.com"
            linkUrl={`https://pide-p.vercel.app/${decodeURIComponent(
              pathName
            )}?lat=${searchparams?.get("lat")}&lon=${searchparams?.get(
              "lon"
            )} `}
            startDate={formattedDate} // "YYYYMMDD" 형식
            // endDate={selectedDate} // "YYYYMMDD" 형식
          />
        </div>
      </div>
    </div>
  );
};

export default Modal;
