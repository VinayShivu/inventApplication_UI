import { AxiosResponse } from "axios";
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
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { ApiService } from "../services/api.service";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export interface loginResponse {
  accessToken: string;
  refreshToken: RefreshToken;
  created: Date;
  expires: Date;
}

export interface RefreshToken {
  token: string;
  created: Date;
  expires: Date;
}

const LoginComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showAlert, setShowAlert] = useState({
    val: false,
    message: "",
  });
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });

  const onSignInClick = () => {
    const apiObj = {
      username: login.username,
      password: login.password,
    };
    if (login.username === "" || login.password === "") {
      setShowAlert({
        val: true,
        message: "Please enter valid credentials",
      });
    } else {
      ApiService.login(apiObj)
        .then((response) => {
          // Handle the response data
          gotResponse(response.data);
        })
        .catch((error) => {
          // Handle the error
          console.error(error);
        });
    }
  };
  const gotResponse = (details: any) => {
    const responseData = details;
    const user: any = jwt(responseData.accessToken);
    dispatch(updateUserName(user.unique_name));
    dispatch(updateSidebarTab("dashboard"));
    dispatch(updateToken(responseData.accessToken));
    dispatch(updateTokenExpiryTime(user.exp));
    dispatch(updateRefreshToken(responseData.refreshToken.token));
    navigate("/dashboard");
  };
  return (
    <>
      <div className="flex items-center justify-center absolute top-0 left-0 right-0 bottom-0 bg-slate-500">
        <div className="border h-80 w-96 bg-sky-700">
          <div className="flex items-center justify-center text-green-500 text-2xl font-bold p-4">
            Invent Management
          </div>
          <div className="flex items-center justify-center text-white text-lg font-semibold">
            Log into your account
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-center">
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="border border-slate-500 rounded-md w-80 h-10 bg-white p-2"
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
                className="border border-slate-500 rounded-md w-80 h-10 mt-5 bg-white p-2"
                onChange={(e) => {
                  setLogin({ ...login, password: e.target.value });
                }}
              />
            </div>
            <div
              className="flex items-center float-right mr-10 cursor-pointer"
              onClick={() => navigate("/forgotpassword")}
            >
              <span className="text-sm text-white italic">Forgot password</span>
            </div>
          </div>
          <div className="flex items-center justify-center mt-8">
            <div
              className="rounded-md border flex items-center justify-center w-40 h-10 bg-green-500 text-white cursor-pointer"
              onClick={() => {
                onSignInClick();
              }}
            >
              Login Now
            </div>
          </div>
          <div className="flex ml-2 mt-2 space-x-1 text-sm">
            <div className="text-slate-400">Not Registered yet?</div>
            <div
              className="hover:text-black cursor-pointer text-white"
              onClick={() => navigate("/register")}
            >
              Register Here
            </div>
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

export default LoginComponent;
