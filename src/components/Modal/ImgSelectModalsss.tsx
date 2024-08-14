// ImgSelectModal.tsx

import Image from "next/image";
import React, { useState, useEffect, useMemo } from "react";
interface ImgModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectImage: (url: string) => void;
}

const imgSelectModal = ({ isOpen, onClose, onSelectImage }: ImgModalProps) => {
  const imageList = useMemo(
    () => [
      "/img/select/red.png",
      "/img/select/orange.png",
      "/img/select/yellow.png",
      "/img/select/green.png",
      "/img/select/sky.png",
      "/img/select/blue.png",
      "/img/select/purple.png",
      "/img/select/white.png",
      "/img/select/black.png",
    ],
    []
  );

  const handleClose = () => {
    onClose();
    // resetImage();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-4 h-1/4">
        <div className="p-4 border-b">
          <button
            className="text-gray-600 hover:text-gray-900"
            onClick={handleClose}
          >
            &times;
          </button>
        </div>
        <div className="text-bold text-2xl m-5">색상 선택</div>
        <div className="flex flex-wrap mt-6">
          {imageList.map((url) => (
            <div
              key={url}
              className="w-24 h-24 m-2 cursor-pointer"
              onClick={() => {
                onSelectImage(url);
                onClose();
              }}
            >
              <Image
                src={url}
                alt="img"
                className="h-32 w-32 rounded-lg object-cover"
                width={128}
                height={128}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default imgSelectModal;
