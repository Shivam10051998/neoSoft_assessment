import React, { useState, useEffect } from "react";
import InputForm from "common/InputForm";
import InputField from "common/InputField";
import { Button } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import InputPassword from "common/InputPassword";
import "./Login.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as LoginAction from "./store/action";
import { useNavigate } from "react-router-dom";

function Login({ getLoginResponse, getLoginRes }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
    showPassword: false,
  });

  const [formError, setFormError] = useState({
    firstNameError: "",
    passwordError: "",
  });

  useEffect(() => {
    if (getLoginRes !== "") {
      navigate("./Dashboard");
    }
  }, [getLoginRes, navigate]);

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
    const { email, password } = form;
    if (email === "") {
      setFormError({ firstNameError: "Please Enter Your Email" });
    } else if (password === "") {
      setFormError({ passwordError: "Please Enter Your Password" });
    } else return true;
  }

  const onSubmit = () => {
    setFormError({ firstNameError: "", passwordError: "" });
    if (onValidation()) {
      const login_Data = {
        email: form.email,
        password: form.password,
      };
      getLoginResponse(login_Data);
    }
  };

  return (
    <div className="login-main-div">
      <InputForm
        btn={
          <Button variant="contained" onClick={onSubmit}>
            Submit
          </Button>
        }
        input={
          <>
            <InputField
              req={"No"}
              label="Email"
              name="email"
              value={form.email}
              onChange={handleFormChange}
            />
            <p className="login-error">{formError.firstNameError}</p>
            <section style={{ height: "10px" }} />
            <InputPassword
              label="Password"
              type={form.showPassword ? "text" : "password"}
              value={form.password}
              onChange={handleFormChange}
              onClick={handleClickShowPassword}
              toggle={form.showPassword ? <VisibilityOff /> : <Visibility />}
            />
            <p className="login-error">{formError.passwordError}</p>
            <a href="Register" className="sign-up">
              Sign Up
            </a>
          </>
        }
      ></InputForm>
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getLoginResponse: LoginAction.getLoginResponse,
    },
    dispatch
  );
}

function mapStateToProps(state) {
  const { loginData } = state;
  return {
    getLoginRes: loginData.getLoginRes,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
