import React from "react";

const SpecialBusColors: { [key: string]: string } = {
  순환: "bg-amber-600",
  지선: "bg-green-400",
  간선: "bg-indigo-400",
  공항: "bg-yellow-700",
  좌석: "bg-sky-400",
  광역: "bg-orange-600",
  직행: "bg-orange-600",
};

interface NumberCircleProps {
  line: string; // "순환", "지선", "간선"
}

const BusTag: React.FC<NumberCircleProps> = ({ line }) => {
  const colorClass = SpecialBusColors[line] || "bg-gray-700"; // Default to bg-gray-700 if not found

  return (
    <span className={`flex text-white ${colorClass} p-1 m-1`}>{line}</span>
  );
};

export default BusTag;
