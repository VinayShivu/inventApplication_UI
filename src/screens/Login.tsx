import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  updateRefreshToken,
  updateSidebarTab,
  updateToken,
  updateTokenExpiryTime,
  updateUserName,
} from "../redux/Action";
import jwt from "jwt-decode";

const LoginComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });

  const onSignInClick = () => {
    if (login.username === "" || login.password === "") {
      alert("Please enter valid credentials");
    } else {
      axios
        .get(
          `https://localhost:7101/api/login?username=${login.username}&password=${login.password}`
        )
        .then((res) => {
          if (res.status === 200) {
            let details = res.data;
            gotResponse(details);
          }
        });
    }
  };
  const gotResponse = (details: any) => {
    const user: any = jwt(details.accessToken);
    dispatch(updateUserName(user.unique_name));
    dispatch(updateSidebarTab("dashboard"));
    dispatch(updateToken(details.accessToken));
    dispatch(updateTokenExpiryTime(user.exp));
    dispatch(updateRefreshToken(details.refreshToken.token));
    navigate("/dashboard");
  };
  return (
    <div className="flex items-center justify-center absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="border h-96 w-96 bg-slate-700">
        <div className="flex items-center justify-center text-green-500 text-2xl font-bold p-4">
          Invent Management
        </div>
        <div className="flex items-center justify-center text-white text-lg font-semibold">
          Log into your account
        </div>
        <div className="mt-5">
          <div className="flex items-center justify-center">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="border border-slate-500 rounded-2xl w-80 h-10 bg-white p-2"
              onChange={(e) => {
                setLogin({ ...login, username: e.target.value });
              }}
            />
          </div>
          <div className="flex items-center justify-center">
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="border border-slate-500 rounded-2xl w-80 h-10 mt-5 bg-white p-2"
              onChange={(e) => {
                setLogin({ ...login, password: e.target.value });
              }}
            />
          </div>
        </div>
        <div className="flex items-center justify-center mt-5">
          <div
            className="rounded-full border flex items-center justify-center w-40 h-10 bg-green-500 text-white cursor-pointer"
            onClick={() => {
              onSignInClick();
            }}
          >
            Login Now
          </div>
        </div>
        <div className="flex ml-2 mt-2 space-x-1">
          <div className="text-slate-400">Not Registered yet?</div>
          <div
            className="hover:text-violet-600 cursor-pointer text-white"
            onClick={() => navigate("register")}
          >
            Register Here
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
