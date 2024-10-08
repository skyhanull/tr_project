"use client";
import Chip from "@mui/material/Chip";

interface SubmitButtonProps {
  clickHandler: () => void;
  name: string;
  state: boolean;
}
//nterface ChipProps {
//   setFilterChip: React.Dispatch<React.SetStateAction<string>>;
//   Array: arrayType[];
// }

const SubmitButton = ({ clickHandler, name, state }: SubmitButtonProps) => {
  return (
    <button
      onClick={clickHandler}
      className={`  ${
        state ? "bg-rose-400" : "bg-red-100"
      }   px-6 py-3 mr-4 rounded-xl  ${
        state ? "text-white" : "text-black"
      } text-sm`}
    >
      {name}
    </button>
  );
};

export default SubmitButton;
