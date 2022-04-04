import React from "react";
import "./InputForm.css";

function InputForm(props) {
  return (
    <div className="container">
      <div  className="form-box">
        <section style={{display:'flex',alignSelf:'center',color:'white'}}>{props.tittle}</section>
        <section>{props.input}</section>
        <div style={{ marginTop: "20px" }} />
        <section className="form-button-section">{props.btn}</section>
      </div>
    </div>
  );
}

export default InputForm;
