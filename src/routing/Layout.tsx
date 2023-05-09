import SideBarComponent from "../components/SideBarComponent";
import HeaderComponent from "../components/HeaderComponent";
import BreadcrumbComponent from "../components/BreadcrumbComponent";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { ReducerInitialState } from "../redux/Reducer";
import { updateBreadCrumb, updateSidebarTab } from "../redux/Action";

const LayoutComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
      </div>
    </>
  );
};

export default LayoutComponent;
