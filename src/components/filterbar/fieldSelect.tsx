"use client";
import Chip from "@mui/material/Chip";

interface arrayType {
  name: string;
  code: string;
}
interface ChipProps {
  setFilterChip: React.Dispatch<React.SetStateAction<string>>;
  Array: arrayType[];
}

const FilterChip = ({ setFilterChip, Array }: ChipProps) => {
  return (
    <div className="w-auto mx-2">
      {Array?.map((el: any) => (
        <Chip
          key={el}
          label={el.name}
          className="border-2 rounded-xl m-2 px-3 bg-white"
          variant="outlined"
          onClick={() => setFilterChip(el.code)}
        />
      ))}
    </div>
  );
};

export default FilterChip;
