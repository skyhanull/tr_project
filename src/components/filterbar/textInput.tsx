// components/CustomTextField.tsx

import React from "react";
import TextField from "@mui/material/TextField";

interface CustomTextFieldProps {
  label: string;
  variant?: "outlined" | "filled" | "standard";
  fullWidth?: boolean;
  multiline?: boolean;
  rows?: number;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomTextField: React.FC<CustomTextFieldProps> = ({
  label,
  variant = "outlined",
  fullWidth = true,
  multiline = true,
  rows,
  value,
  onChange,
}) => {
  return (
    <TextField
      label={label}
      variant={variant}
      fullWidth={fullWidth}
      multiline={multiline}
      rows={multiline ? rows : undefined}
      value={value}
      onChange={onChange}
      // {...props} // Spread the rest of the props
    />
  );
};

export default CustomTextField;
