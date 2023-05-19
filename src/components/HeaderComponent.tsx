import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateToken } from "../redux/Action";
import profileImage from "../images/profile.jpg";
import { ReducerInitialState } from "../redux/Reducer";
import ClickAwayListener from "@mui/material/ClickAwayListener";

const HeaderComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userName = useSelector((state: ReducerInitialState) => state.username);
  const [displayDropdown, setDisplayDropdown] = useState(false);
  const handleLogOut = () => {
    navigate("login");
    dispatch(updateToken(""));
  };
  const handleClickAway = () => {
    setDisplayDropdown(false);
  };
  return (
    <>
      <div className="bg-white h-20 w-full">
        <div className="flex items-center justify-between px-5 py-3">
          <div className="text-2xl font-bold">Inventory Management</div>
          <div className="flex items-center space-x-1">
            <div className="font-bold">{userName}</div>
            <div
              className="h-14 w-14 rounded-full cursor-pointer"
              onClick={() => setDisplayDropdown(!displayDropdown)}
            >
              <img
                src={profileImage}
                alt="Profile Image"
                className=" rounded-full"
              />
            </div>
          </div>
          <div className="absolute right-5 top-20 float-right z-10">
            {displayDropdown ? (
              <ClickAwayListener onClickAway={handleClickAway}>
                <div className="h-32 w-40 bg-white border">
                  <div className="flex items-center justify-center space-x-4 cursor-pointer mt-4 h-10 hover:bg-slate-500">
                    <div>
                      <i className="fa-solid fa-power-off"></i>
                    </div>
                    <div onClick={() => handleLogOut()}>Logout</div>
                  </div>
                  <div className="flex items-center justify-center space-x-4 mt-2 h-10 hover:bg-slate-500 cursor-pointer">
                    <div>
                      <i className="fa-solid fa-user"></i>
                    </div>
                    <div
                      onClick={() => {
                        navigate("profile");
                        handleClickAway();
                      }}
                    >
                      Profile
                    </div>
                  </div>
                </div>
              </ClickAwayListener>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderComponent;
