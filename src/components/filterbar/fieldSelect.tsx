"use client";
import Chip from "@mui/material/Chip";

interface HeaderProps {
  setFilterChip: React.Dispatch<React.SetStateAction<string>>;
  Array: object;
}

const FilterChip = ({ setFilterChip, Array }: HeaderProps) => {
  return (
    <div className="w-auto">
      {Array.map((el) => (
        <Chip
          key={el}
          label={el.name}
          className="border-2 rounded-xl m-5 pl-5 pr-5 bg-white"
          variant="outlined"
          onClick={() => setFilterChip(el.code)} // Corrected onClick handler
        />
      ))}
    </div>
  );
};

export default FilterChip;
