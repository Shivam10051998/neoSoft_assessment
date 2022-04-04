import React from "react";
import { InputLabel, MenuItem, FormControl, Select } from "@mui/material";

function SelectBox(props) {
  const { value, onChange, items, defaultValue, name } = props;
  return (
    <FormControl fullWidth>
      <InputLabel sx={{ backgroundColor: "white" }}></InputLabel>
      <Select
        name={name}
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
        sx={{ backgroundColor: "white", borderRadius: "5px" }}
        size="small"
      >
        {items.map((item, index) => (
          <MenuItem key={index} value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
export default SelectBox;
