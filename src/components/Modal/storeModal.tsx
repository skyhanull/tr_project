import { useState, ChangeEvent } from "react";
import axios from "axios";
import Image from "next/image";
import useDebounce from "@/hook/useDebounce";
import SubmitButton from "../button/submitButton";
// import { useImageUpload } from "@/hook/useFile";
import ImgModal from "../Modal/ImgSelectModal";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  directions: any;
  markerList: any;
}

const Modal = ({ isOpen, onClose, directions, markerList }: ModalProps) => {
  const userCode = localStorage.getItem("userCode");
  const [isImg, setIsImg] = useState(false);
  const [uploadUrl, setUploadUrl] = useState<string | null>(null);
  // const { imageFile, imagePreview, handleImageUpload, resetImage } =
  //   useImageUpload();

  const [inputValue, setInputValue] = useState("");
  const debouncedListName = useDebounce(inputValue, 1000);

  const handleSubmits = async () => {
    // e.preventDefault();

    try {
      const res = await axios.post(
        "/api/mypost",
        { markerList, userCode, listName: debouncedListName, image: uploadUrl },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Handle the response as needed
      console.log("Response data:", res.data);
    } catch (error) {
      // Handle any errors here
      console.error("Error submitting data:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    onClose();
  };

  const handleImageSelect = (url: string) => {
    setUploadUrl(url);
  };

  const handleClose = () => {
    onClose();
    // resetImage();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/3">
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
              <div className="py-4 flex flex-row items-center ">
                <span className="w-12">이름</span>
                <input
                  className="border-2 border-gray-300 rounded-md p-1"
                  value={inputValue}
                  onChange={handleInputChange}
                />
              </div>
              <div className="p-4 flex">
                <span className="w-20"></span>
              </div>
            </div>
          </div>
          <div className="flex justify-end my-3">
            <SubmitButton
              clickHandler={handleClose}
              name={"취소"}
              state={false}
            />
            <SubmitButton
              clickHandler={handleSubmits}
              name={"추가"}
              state={true}
            />
          </div>
        </div>
      </div>
      {isImg && (
        <ImgModal
          isOpen={isImg}
          onClose={() => setIsImg(false)}
          onSelectImage={handleImageSelect}
        />
      )}
    </div>
  );
};

export default Modal;
