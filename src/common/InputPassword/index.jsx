import React from "react";
import {
  IconButton,
  OutlinedInput,
  InputAdornment,
  FormControl,
} from "@mui/material";

// import "./InputField.css";
function InputPassword(props) {
  const { label, type, value, onChange, req, onClick, toggle } = props;
  return (
    <div className="main-div">
      <label className="text-label">
        {label}{" "}
        {req ? (
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
          ""
        )}
      </label>
      <FormControl sx={{ width: "100%" }}>
        <OutlinedInput
          // req={true}
          size="small"
          name="password"
          type={type}
          value={value}
          onChange={onChange}
          sx={{
            backgroundColor: "white",
            width: "100%",
            height: "43px",
            marginLeft: "0px",
          }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={onClick}
              >
                {toggle}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
    </div>
  );
}
export default InputPassword;
