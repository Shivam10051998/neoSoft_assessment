import React, { useState,useEffect } from "react";
import InputForm from "common/InputForm";
import InputField from "common/InputField";
import { Button } from "@mui/material";
import {Visibility,VisibilityOff} from "@mui/icons-material";
import InputPassword from "common/InputPassword";
import "./Registeration.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as RegAction from "./store/action";
import { useNavigate } from "react-router-dom";

function Registration({postRegistration,getRegRes}) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    userName: "",
    email: "",
    number: "",
    password: "",
    profileImage:null,
    showPassword: false,
  });

  const [error, setError] = useState({
    nameError: "",
    userNameError: "",
    emailError: "",
    passwordError: "",
  });

  useEffect(()=>{
   if(getRegRes !== ''){
    navigate('/')   }
  },[getRegRes, navigate])

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    const updatedForm = {
      ...form,
      [name]: value,
    };
    setForm(updatedForm);
  };

  const handleClickShowPassword = () => {
    setForm({
      ...form,
      showPassword: !form.showPassword,
    });
  };

  function onValidation() {
    const { name, userName, email, password } = form;
    setError({
      nameError: "",
      userNameError: "",
      emailError: "",
      passwordError: "",
    });
    if (name === "") {
      setError({
        nameError: "Please Enter Your Name",
      });
    } else if (userName === "") {
      setError({
        userNameError: "Please Enter Your Username",
      });
    } else if (!email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      setError({
        emailError: "Not Valid Email Id",
      });
    } else if (password === "") {
      setError({
        passwordError: "Please Enter Your Password",
      });
    } else return true;
  }
  const onSubmit = () => {
    if (onValidation()) {
      postRegistration(form)
    }
  };
  return (
    <div className="Reg-main-div">
    <InputForm
      tittle={"USER SIGN UP FORM"}
      btn={
        <Button variant="contained" onClick={onSubmit}>
          Submit
        </Button>
      }
      input={
        <>
          <InputField
            req={'Yes'}
            label="Name"
            name="name"
            value={form.name}
            onChange={handleFormChange}
          />
          <p className="error">{error.nameError}</p>
          <InputField
            req={'Yes'}
            label="User Name"
            name="userName"
            value={form.userName}
            onChange={handleFormChange}
          />
          <p className="error">{error.userNameError}</p>
          <InputField
            req={'Yes'}
            label="Email"
            name="email"
            value={form.email}
            onChange={handleFormChange}
          />
          <p className="error">{error.emailError}</p>
          <InputField
            req={'No'}
            label="Contact Number"
            name="number"
            value={form.number}
            onChange={handleFormChange}
          />
          <section style={{height:'10px'}}/>
          <InputPassword
            label="Password"
            req={true}
            type={form.showPassword ? "text" : "password"}
            value={form.password}
            onChange={handleFormChange}
            onClick={handleClickShowPassword}
            toggle={form.showPassword ? <VisibilityOff /> : <Visibility />}
          />
          <p className="error">{error.passwordError}</p>
          <div>
            <label
              value={form.profileImage}
              onChange={handleFormChange}
              className="profile-pic"
            >
              Profile Image
            </label>
            <input className="profile-pic" type="file" />
          </div>
        </>
      }
    ></InputForm>
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      postRegistration: RegAction.postRegistration,
    },
    dispatch
  );
}

function mapStateToProps(state) {
  const { regData } = state;
  return {
    getRegRes: regData.getRegRes,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Registration);
