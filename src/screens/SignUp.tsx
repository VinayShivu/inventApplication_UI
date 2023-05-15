import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../images/registerBackground.jpg";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SignUpComponent = () => {
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState({
    val: false,
    message: "",
  });
  const [register, setRegister] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    password: "",
    roles: "User",
  });

  const signUpClick = () => {
    const inputJson = {
      firstName: register.firstName,
      lastName: register.lastName,
      userName: register.userName,
      password: register.password,
      roles: register.roles,
    };
    if (
      register.firstName === "" ||
      register.lastName === "" ||
      register.userName === "" ||
      register.password === ""
    ) {
      setShowAlert({ val: true, message: "Please enter valid credentials" });
    } else {
      axios({
        url: "https://localhost:7101/api/register",
        method: "POST",
        data: inputJson,
      })
        .then((res) => {
          if (res.status === 200) {
            alert("Register Successfull");
            navigate("/");
          } else {
            alert("Registration Unsuccessfull");
          }
        })
        .catch((error) => {
          if (error.response.status === 400) {
            alert("User by this username already exists");
          }
        });
    }
  };
  return (
    <>
      <div className="flex flex-col items-center py-24 justify-center bg-slate-500 h-screen w-full">
        <div className="h-auto w-96 p-5 border bg-sky-700">
          <div className="flex items-center justify-center">
            <div>
              <div className="flex items-center justify-center text-3xl font-bold">
                Create Account
              </div>
              <div className="mt-10">
                <div className="mt-5">
                  <input
                    type="firstname"
                    name="firstname"
                    placeholder="FirstName"
                    className="border border-slate-500 rounded-lg w-80 h-10 bg-white p-2"
                    onChange={(e) => {
                      setRegister({ ...register, firstName: e.target.value });
                    }}
                  />
                </div>
                <div className="mt-5">
                  <input
                    type="lastname"
                    name="lastname"
                    placeholder="LastName"
                    className="border border-slate-500 rounded-lg w-80 h-10 bg-white p-2"
                    onChange={(e) => {
                      setRegister({ ...register, lastName: e.target.value });
                    }}
                  />
                </div>
                <div className="mt-5">
                  <input
                    type="username"
                    name="username"
                    placeholder="UserName"
                    className="border border-slate-500 rounded-lg w-80 h-10 bg-white p-2"
                    onChange={(e) => {
                      setRegister({ ...register, userName: e.target.value });
                    }}
                  />
                </div>
                <div className="mt-5">
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="border border-slate-500 rounded-lg w-80 h-10 bg-white p-2"
                    onChange={(e) => {
                      setRegister({ ...register, password: e.target.value });
                    }}
                  />
                </div>
              </div>
              <div
                className="rounded-full border flex items-center justify-center ml-20 w-40 h-10 bg-green-500 text-white cursor-pointer mt-5"
                onClick={() => {
                  signUpClick();
                }}
              >
                Register Now
              </div>
            </div>
          </div>
        </div>
        <div className="mt-3">
          <div
            className="hover:text-black cursor-pointer text-white"
            onClick={() => navigate("/login")}
          >
            Back to Login
          </div>
        </div>
      </div>
      <div>
        <Snackbar
          open={showAlert.val}
          autoHideDuration={6000}
          onClose={() => {
            setShowAlert({ val: false, message: "" });
          }}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={() => {
              setShowAlert({ val: false, message: "" });
            }}
            severity="warning"
            style={{ backgroundColor: "#f4473c", color: "#fff" }}
          >
            {showAlert.message}
          </Alert>
        </Snackbar>
      </div>
    </>
  );
};

export default SignUpComponent;
