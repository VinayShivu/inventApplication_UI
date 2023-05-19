import SideBarComponent from "../components/SideBarComponent";
import HeaderComponent from "../components/HeaderComponent";
import BreadcrumbComponent from "../components/BreadcrumbComponent";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { ReducerInitialState } from "../redux/Reducer";
import {
  updateBreadCrumb,
  updateRefreshToken,
  updateSidebarTab,
  updateToken,
  updateTokenExpiryTime,
} from "../redux/Action";
import ActivityModal from "../modals/acticityModal";
import axios from "axios";
import jwt from "jwt-decode";

const LayoutComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [seconds, setSeconds] = useState(0);
  const [isStay, setIsStay] = useState(false);
  const [timeOut, setTimeOut] = useState(false);
  const token = useSelector((state: ReducerInitialState) => state.getToken);
  const breadCrumb = [{ name: "dashboard", path: "/" }];
  const refreshToken = useSelector(
    (state: ReducerInitialState) => state.getRefreshToken
  );
  const tokenExpiryTime = useSelector(
    (state: ReducerInitialState) => state.tokenExpiryTime
  );
  const refreshTokenData = {
    accessToken: token,
    refreshToken: refreshToken,
  };

  const checkForActivity = (sec: any) => {
    const expireTime: string | null = localStorage.getItem("expireTime");
    if (timeOut) {
      setSeconds(sec - 1);
      if (seconds === 0) {
        navigate("/login");
      }
    } else if (parseInt(expireTime ?? "") < Date.now()) {
      setIsStay(true);
      setSeconds(120);
      setTimeOut(true);
    }
  };

  const updateExpireTime = () => {
    const expireTime = (Date.now() + 1000 * 60 * 10).toString(); //1000 * 60 * 3
    localStorage.setItem("expireTime", expireTime);
  };

  function callRefreshToken() {
    if (tokenExpiryTime * 1000 < Date.now()) {
      axios({
        url: "https://localhost:7101/api/refreshtoken",
        method: "POST",
        data: refreshTokenData,
        headers: { Authorization: `Bearer ${token}` },
      }).then((res) => {
        if (res.status === 200) {
          const details = res.data;
          const user: any = jwt(details.accessToken);
          dispatch(updateToken(details.accessToken));
          dispatch(updateTokenExpiryTime(user.exp));
          dispatch(updateRefreshToken(details.refreshToken.token));
        } else {
          alert("Failure");
        }
      });
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      checkForActivity(seconds);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds, timeOut]);

  useEffect(() => {
    if (token === "") {
      navigate("/login");
    } else {
      navigate("/dashboard");
    }
    if (window.performance) {
      if (performance.navigation.type == 1) {
        dispatch(updateBreadCrumb(breadCrumb));
        dispatch(updateSidebarTab("dashboard"));
      }
    }
    updateExpireTime();
    window.addEventListener("click", updateExpireTime);
    window.addEventListener("keypress", updateExpireTime);
    window.addEventListener("scroll", updateExpireTime);
    window.addEventListener("mousemove", updateExpireTime);

    return () => {
      window.removeEventListener("click", updateExpireTime);
      window.removeEventListener("keypress", updateExpireTime);
      window.removeEventListener("scroll", updateExpireTime);
      window.removeEventListener("mousemove", updateExpireTime);
    };
  }, []);

  return (
    <>
      <div className="flex h-screen">
        <div className="w-60 bg-slate-800 h-screen sm: hidden md:block">
          <SideBarComponent />
        </div>
        <div className="w-full">
          <div>
            <HeaderComponent />
          </div>
          <div>
            <BreadcrumbComponent />
          </div>
          <div className="p-5">
            <Outlet />
          </div>
        </div>
        {isStay && (
          <ActivityModal
            seconds={seconds}
            setIsStay={setIsStay}
            setSeconds={setSeconds}
            setTimeOut={setTimeOut}
          />
        )}
      </div>
    </>
  );
};

export default LayoutComponent;
