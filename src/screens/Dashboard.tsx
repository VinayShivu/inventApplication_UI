import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateBreadCrumb } from "../redux/Action";

const DashboardComponent = () => {
  const dispatch = useDispatch();
  const breadCrumb = [{ name: "Dashboard", path: "/dashboard" }];
  useEffect(() => {
    dispatch(updateBreadCrumb(breadCrumb));
  }, []);

  const grids = [
    {
      icon: "fa-solid fa-trash",
      label: "Items",
      bgColor: "bg-red-500",
    },
    {
      icon: "fa-solid fa-users",
      label: "Suppliers",
      bgColor: "bg-orange-500",
    },
    {
      icon: "fa-sharp fa-solid fa-file",
      label: "Total Sales Invoice",
      bgColor: "bg-lime-500",
    },
    {
      icon: "fa-sharp fa-solid fa-file",
      label: "Today Sales Invoice",
      bgColor: "bg-green-500",
    },
    {
      icon: "fa-sharp fa-solid fa-cart-shopping",
      label: "Today Sales Amount",
      bgColor: "bg-cyan-500",
    },
  ];

  return (
    <>
      <div className="sm:flex grid grid-cols-2 gap-4">
        {grids.map((grid) => {
          return (
            <div className="cursor-pointer">
              <div
                className={`h-16 w-40 flex flex-col items-center justify-center ${grid.bgColor}`}
              >
                <div className="flex items-center justify-center">
                  <i className={`${grid.icon} text-2xl text-white`}></i>
                </div>
                <div className="flex items-center justify-center">
                  <span className="text-sm font-mono text-white font-semibold">
                    {grid.label}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default DashboardComponent;
