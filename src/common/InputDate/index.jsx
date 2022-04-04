import React from "react";
import TextField from '@mui/material/TextField';

function InputDate(props) {
  const { value, onChange, defaultValue, name} = props;
  return (
    <TextField
        id="date"
        name={name}
        value={value}
        type="date"
        onChange={onChange}
        defaultValue={defaultValue}
        sx={{ width: '100%',backgroundColor:'white',borderRadius:'5px' }}
        InputLabelProps={{
          shrink: true,
        }}
        size="small"
      />
  );
}
export default InputDate;
