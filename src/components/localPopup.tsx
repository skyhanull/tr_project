import React, { useEffect } from "react";

interface PopupProps {
  url: string;
  onClose: () => void;
}

const Popup = ({ url, onClose }: PopupProps) => {
  useEffect(() => {
    // Close the popup when the user clicks outside of it
    const handleClickOutside = (event: MouseEvent) => {
      if ((event.target as HTMLElement).id === "popup-overlay") {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div
      id="popup-overlay"
      className="fixed inset-0 bg-gray-900 bg-opacity-70 flex items-center justify-center z-50"
    >
      <div className="relative bg-white w-3/5 h-4/5 border border-gray-300 rounded-lg">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600"
        >
          X
        </button>
        {url && (
          <iframe src={url} className="w-full h-full border-none rounded-lg" />
        )}
      </div>
    </div>
  );
};

export default Popup;
