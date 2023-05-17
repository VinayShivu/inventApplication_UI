import SideBarComponent from "../components/SideBarComponent";
import HeaderComponent from "../components/HeaderComponent";
import BreadcrumbComponent from "../components/BreadcrumbComponent";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { ReducerInitialState } from "../redux/Reducer";
import { updateBreadCrumb, updateSidebarTab } from "../redux/Action";
import ActivityModal from "../modals/acticityModal";

const LayoutComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [seconds, setSeconds] = useState(0);
  const [isStay, setIsStay] = useState(false);
  const [timeOut, setTimeOut] = useState(false);

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

  useEffect(() => {
    const interval = setInterval(() => {
      checkForActivity(seconds);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds, timeOut]);

  const token = useSelector((state: ReducerInitialState) => state.getToken);
  const breadCrumb = [{ name: "dashboard", path: "/" }];
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
