import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateBreadCrumb } from "../redux/Action";
import profileImage from "../images/profile.jpg";
import { useNavigate } from "react-router-dom";
import { updateToken } from "../redux/Action";

const person = {
  userName: "User Name",
  profileImg: profileImage,
  emailId: "preethamcgowdaa@gmail.com",
  phoneNo: "8888888888",
  userId: 2,
  userRole: "User Role",
  city: "City",
  age: 25,
};
const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const breadCrumb = [{ name: "Profile", path: "/profile" }];
  useEffect(() => {
    dispatch(updateBreadCrumb(breadCrumb));
  }, []);
  const handleLogOut = () => {
    navigate("/login");
    dispatch(updateToken(""));
  };
  return (
    <>
      <div className="flex flex-col  mt-10">
        <div className="flex justify-center">
          <div className="w-44 h-44 mt-3 mb-1">
            <img
              src={person.profileImg}
              alt="Profile Image"
              className="rounded-full"
            />
          </div>
        </div>
        <div className="flex justify-center">
          <div className="w-full lg:w-6/12 mt-2 p-3">
            <div className="flex py-2 border-b-2 border-dotted">
              <div className="w-5/12 font-semibold">User Name</div>
              <div>{person.userName}</div>
            </div>
            <div className="flex py-2 border-b-2 border-dotted">
              <div className="w-5/12 font-semibold">Email</div>
              <div>{person.emailId}</div>
            </div>
            <div className="flex py-2 border-b-2 border-dotted">
              <div className="w-5/12 font-semibold">Role</div>
              <div>{person.userRole}</div>
            </div>
          </div>
        </div>
        <div className="flex justify-center text-center mt-10">
          <div
            className="p-2 w-36 text-xl font-semibold text-red-700 bg-blue-300 rounded-xl"
            onClick={() => handleLogOut()}
          >
            Log Out
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
