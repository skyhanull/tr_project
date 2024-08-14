import { useState, ChangeEvent } from "react";
import axios from "axios";
import Image from "next/image";
import useDebounce from "@/hook/useDebounce";
import SubmitButton from "../button/submitButton";
import ImgSelectModal from "./ImgSelectModal";
import RadioGroup from "../filterbar/radioButton";
import CustomTextField from "../filterbar/textInput";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  directions: any;
  markerList: any;
}

const visibilityOptions = [
  { value: "public", label: "공개" },
  { value: "private", label: "비공개" },
];

const Modal = ({ isOpen, onClose, directions, markerList }: ModalProps) => {
  const userCode = localStorage.getItem("userCode");
  const [isImg, setIsImg] = useState(false);
  const [review, setReview] = useState<string>("");
  const [uploadUrl, setUploadUrl] = useState<string | null>(null);
  const [visibility, setVisibility] = useState<string>("public"); // State for radio button
  const [inputValue, setInputValue] = useState("");
  const debouncedListName = useDebounce(inputValue, 1000);

  const handleSubmits = async () => {
    // e.preventDefault();

    if (debouncedListName === "") {
      alert("이름을 입력해주세요");
      return;
    }
    try {
      const res = await axios.post(
        "/api/mypost",
        {
          markerList,
          userCode,
          listName: debouncedListName,
          image: uploadUrl,
          visibility,
          review,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Handle the response as needed
      console.log("Response data:", res.data);
      onClose();
    } catch (error) {
      // Handle any errors here
      console.error("Error submitting data:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleImageSelect = (url: string) => {
    setUploadUrl(url);
  };
  const handleVisibilityChange = (e: ChangeEvent<HTMLInputElement>) => {
    setVisibility(e.target.value);
  };
  const handleClose = () => {
    onClose();
    // resetImage();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-2/6">
        <div className="p-4 border-b">
          <button
            className="text-gray-600 hover:text-gray-900"
            onClick={handleClose}
          >
            &times;
          </button>
        </div>
        <div className="p-4">
          <div className="flex flex-row justify-center items-center">
            <div className="relative p-3" onClick={() => setIsImg(true)}>
              {uploadUrl ? (
                <Image
                  src={uploadUrl}
                  alt="Preview"
                  className="h-32 w-32 rounded-lg object-cover"
                  width={128}
                  height={128}
                />
              ) : (
                <div className="bg-slate-500 h-32 w-32 rounded-lg flex items-center justify-center cursor-pointer">
                  <span className="text-white">이미지 선택</span>
                </div>
              )}
            </div>
            <div className="p-3 ml-3">
              <div className="flex flex-row items-center">
                <span className="w-20 font-bold">북마크 추가</span>
              </div>
              <div className="pt-3  flex flex-row items-center ">
                <span className="w-12">이름</span>
                <input
                  className="border-2 border-gray-300 rounded-md p-1"
                  value={inputValue}
                  onChange={handleInputChange}
                />
              </div>
              <RadioGroup
                options={visibilityOptions}
                selectedValue={visibility}
                onValueChange={handleVisibilityChange}
                groupLabel="공개 설정"
              />
            </div>
          </div>
          <span className="m-4 font-bold">리뷰</span>
          <CustomTextField
            label={"리뷰를 입력하세요"}
            rows={3}
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
          <div className="flex justify-end my-3">
            <SubmitButton
              clickHandler={handleSubmits}
              name={"추가"}
              state={true}
            />
          </div>
        </div>
      </div>
      {isImg && (
        <ImgSelectModal
          isOpen={isImg}
          onClose={() => setIsImg(false)}
          onSelectImage={handleImageSelect}
        />
      )}
    </div>
  );
};

export default Modal;
