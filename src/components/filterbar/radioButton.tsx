import React, { ChangeEvent } from "react";

interface RadioOption {
  value: string;
  label: string;
}

interface RadioGroupProps {
  options: RadioOption[];
  selectedValue: string;
  onValueChange: (e: ChangeEvent<HTMLInputElement>) => void;
  groupLabel?: string; // Optional label for the group
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  options,
  selectedValue,
  onValueChange,
  groupLabel,
}) => {
  return (
    <div className="py-4 flex flex-row items-center">
      {groupLabel && <span className="w-20">{groupLabel}</span>}
      <div className="flex flex-row ml-4">
        {options.map((option) => (
          <label key={option.value} className="mr-4">
            <input
              type="radio"
              name={groupLabel}
              value={option.value}
              checked={selectedValue === option.value}
              onChange={onValueChange}
            />
            <span className="px-1"> {option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default RadioGroup;
