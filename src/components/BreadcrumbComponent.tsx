import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateBreadCrumb, updateSidebarTab } from "../redux/Action";
import QuickCreateModal from "../modals/quickCreateModal";
import { ReducerInitialState } from "../redux/Reducer";

const BreadcrumbComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [clicked, setClicked] = useState(false);
  const breadCrumb = useSelector(
    (state: ReducerInitialState) => state.getBreadCrumb
  );
  const tabName = useSelector((state: ReducerInitialState) => state.sideBarTab);
  const homeCrumb = [{ name: "", path: "/" }];
  const handleBreadCrumbClick = () => {
    dispatch(updateSidebarTab("dashboard"));
    dispatch(updateBreadCrumb(homeCrumb));
    navigate("dashboard");
  };

  const onClose = () => {
    setClicked(false);
  };
  return (
    <div>
      <div className="h-14 w-full bg-slate-200 flex justify-between">
        <div className="p-3">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <div
                  className="inline-flex items-center cursor-pointer text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
                  onClick={() => handleBreadCrumbClick()}
                >
                  <svg
                    aria-hidden="true"
                    className="w-4 h-4 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                  </svg>
                  Dashboard
                </div>
              </li>
              <li className="flex">
                {breadCrumb.map((crumb) => {
                  return (
                    <>
                      {tabName !== "dashboard" ? (
                        <div className="flex items-center">
                          <svg
                            aria-hidden="true"
                            className="w-6 h-6 text-gray-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                              clip-rule="evenodd"
                            ></path>
                          </svg>
                          <div
                            className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white cursor-pointer"
                            onClick={() => navigate(crumb.path)}
                          >
                            {crumb.name}
                          </div>
                        </div>
                      ) : null}
                    </>
                  );
                })}
              </li>
            </ol>
          </nav>
        </div>
        <div className="flex items-center justify-center mr-10 cursor-pointer">
          <div
            className="rounded-full h-8 w-8 bg-black"
            onClick={() => setClicked(!clicked)}
          >
            <i
              className={`fa-solid fa-plus text-white flex items-center justify-center py-2 ${
                clicked ? "rotate-45" : null
              }`}
            ></i>
          </div>
        </div>
        {clicked ? <QuickCreateModal close={onClose} /> : null}
      </div>
    </div>
  );
};

export default BreadcrumbComponent;
