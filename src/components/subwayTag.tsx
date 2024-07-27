import React from "react";

const subwayColors = [
  "bg-blue-900", // 1호선
  "bg-green-500", // 2호선
  "bg-orange-500", // 3호선
  "bg-sky-500", // 4호선
  "bg-purple-500", // 5호선
  "bg-rose-800", // 6호선
  "bg-emerald-700", // 7호선
  "bg-pink-500", // 8호선
  "bg-yellow-600", // 9호선
];

interface NumberCircleProps {
  line: number; // 1~9 사이의 숫자
}

const SubwayTag: React.FC<NumberCircleProps> = ({ line }) => {
  const colorClass = subwayColors[line - 1] || "bg-gray-700";

  return (
    <div
      className={`flex justify-center items-center rounded-full text-white ${colorClass} w-5 h-5 p-1 m-1`}
    >
      {line}
    </div>
  );
};

export default SubwayTag;
