import React from "react";
import { TextField,} from "@mui/material";
import "./InputField.css";

function InputField(props) {
  const { label, type = "text", name, value, onChange, req } = props;
  return (
    <div className="main-div">
      <label  className="text-label">
        {label}
        {req==='Yes' ? (
          <span
            style={{
              color: "red",
              fontWeight: "800",
              fontSize: "16px",
              marginLeft: "3px",
            }}
          >
            *
          </span>
        ) : (
          ''
        )}
      </label>
      <TextField
        sx={{ backgroundColor: "white",borderRadius:'5px' }}
        size="small"
        type={type}
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
export default InputField;
