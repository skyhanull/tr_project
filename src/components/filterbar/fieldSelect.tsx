"use client";
import Chip from "@mui/material/Chip";

interface HeaderProps {
  setFilterChip: React.Dispatch<React.SetStateAction<string>>;
}

const FilterChip = ({ setFilterChip }: HeaderProps) => {
  const filterArray = [
    { name: "추천루트", code: "loc" },
    { name: "맛집", code: "FD6" },
    { name: "관광지", code: "AT4" },
    { name: "카페", code: "CE7" },
    { name: "축제", code: "fes" },
  ];

  return (
    <div className="w-auto">
      {filterArray.map((el) => (
        <Chip
          key={el}
          label={el.name}
          className="border-2 rounded-xl m-5 pl-5 pr-5"
          variant="outlined"
          onClick={() => setFilterChip(el.code)} // Corrected onClick handler
        />
      ))}
    </div>
  );
};

export default FilterChip;
