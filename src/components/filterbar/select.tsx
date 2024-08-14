import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface SelectSmallProps {
  filterList: { name: string; code: string }[];
  setSort: (value: string) => void;
  sort: string;
}

export default function SelectSmall({
  filterList,
  setSort,
  sort,
}: SelectSmallProps) {
  const handleChange = (event: SelectChangeEvent) => {
    setSort(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small-label">sort</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={sort}
        label="Sort"
        onChange={handleChange}
      >
        {filterList.map((el) => (
          <MenuItem key={el.code} value={el.code}>
            {el.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
