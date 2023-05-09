import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../images/registerBackground.jpg";

const SignUpComponent = () => {
  const navigate = useNavigate();
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
      alert("Please enter valid credentials");
    } else {
      axios({
        url: "https://localhost:7101/api/registerr",
        method: "POST",
        data: inputJson,
      }).then((res) => {
        if (res.status === 200) {
          alert("Register Successfull");
          navigate("/");
        } else {
          alert("Registration Unsuccessfull");
        }
      });
    }
  };
  return (
    <>
      <div className="flex flex-col items-center py-24 justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-screen w-full">
        <div className="h-auto w-96 p-5 border bg-white">
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
        <div className="mt-5">
          <div
            className="hover:text-green-500 cursor-pointer text-white"
            onClick={() => navigate("/login")}
          >
            Back to Login
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpComponent;
