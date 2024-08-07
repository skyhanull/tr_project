import { useState, useEffect } from "react";
import axios from "axios";
import useDebounce from "@/hook/useDebounce";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  directions: any;
  markerList: any;
}

const Modal = ({ isOpen, onClose, directions, markerList }: ModalProps) => {
  const userCode = localStorage.getItem("userCode");
  const [inputValue, setInputValue] = useState("");
  const debouncedListName = useDebounce(inputValue, 1000);

  const handleSubmits = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "/api/mypost",
        { markerList, userCode, listName: debouncedListName },
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/3">
        <div className="p-4 border-b">
          <button
            className="text-gray-600 hover:text-gray-900"
            onClick={handleSubmit}
          >
            &times;
          </button>
        </div>
        <div className="p-4">
          <div className="flex flex-row">
            <div className="">
              <div className="bg-slate-500 h-32 w-32 my-2 mx-5 rounded-lg" />
            </div>
            <div className="p-3">
              <div className="flex flex-row items-center">
                <span className="w-20 font-bold">북마크 추가</span>
              </div>
              <div className="py-3 flex flex-row items-center">
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
          <div className="flex justify-end">
            <button className="bg-red-300 p-3 rounded-lg" onClick={onClose}>
              취소
            </button>
            <button
              className="bg-red-300 p-3 rounded-lg"
              onClick={handleSubmits}
            >
              추가
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
