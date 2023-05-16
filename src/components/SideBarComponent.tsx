import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateSidebarTab } from "../redux/Action";
import { ReducerInitialState } from "../redux/Reducer";
import InventImage from "../images/invent.png";

const sideBarIcons = [
  {
    id: 1,
    icon: "fa-solid fa-house",
    label: "Dashboard",
    navUrl: "dashboard",
  },
  {
    id: 2,
    icon: "fa-sharp fa-solid fa-chart-column",
    label: "Items",
    navUrl: "items",
  },
  {
    id: 3,
    icon: "fa-solid fa-users",
    label: "Buyers",
    navUrl: "buyer",
  },
  {
    id: 4,
    icon: "fa-solid fa-truck",
    label: "Delivery Challans",
    navUrl: "delivery",
  },
  {
    id: 5,
    icon: "fa-solid fa-receipt",
    label: "Invoices",
    navUrl: "invoices",
  },
  {
    id: 6,
    icon: "fa-solid fa-file-invoice-dollar",
    label: "Payment Received",
    navUrl: "paymentreceived",
  },
  {
    id: 7,
    icon: "fa-solid fa-user",
    label: "Vendors",
    navUrl: "vendor",
  },
  {
    id: 8,
    icon: "fa-solid fa-bag-shopping",
    label: "Purchase Orders",
    navUrl: "purchase",
  },
  {
    id: 9,
    icon: "fa-solid fa-money-bill",
    label: "Bills",
    navUrl: "bills",
  },
  {
    id: 10,
    icon: "fa-solid fa-file-invoice",
    label: "Payments Made",
    navUrl: "paymentmade",
  },
  {
    id: 11,
    icon: "fa-sharp fa-solid fa-chart-column",
    label: "Reports",
    navUrl: "report",
  },
];
type iconInterface = {
  id: number;
  icon: string;
  label: string;
  navUrl: string;
};
const SideBarComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const tabName = useSelector((state: ReducerInitialState) => state.sideBarTab);

  const handleNavItemClick = (icons: iconInterface, index: number) => {
    navigate(`${icons.navUrl}`);
    dispatch(updateSidebarTab(icons.navUrl));
  };
  return (
    <div>
      <div className="">
        <div className="flex items-center justify-center h-20">
          <img src={InventImage} alt="Invent Image" className="h-20 w-60" />
        </div>
        <div>
          <div className=" flex flex-col items-center justify-center">
            {sideBarIcons.map((icons, index: number) => {
              return (
                <>
                  <div
                    className={`flex items-center space-x-3 flex-start py-1 hover:bg-blue-300 w-full px-5 cursor-pointer ${
                      tabName === icons.navUrl ? "bg-blue-300 active" : ""
                    } ${
                      icons.id === 3 || icons.id === 7 || icons.id === 11
                        ? "mt-5"
                        : ""
                    }`}
                    onClick={() => handleNavItemClick(icons, index)}
                  >
                    <div className="w-4">
                      <i
                        className={`${icons.icon} text-sm  ${
                          tabName === icons.navUrl ? "text-black" : "text-white"
                        }`}
                      ></i>
                    </div>
                    <div>
                      <span
                        className={`font-mono text-sm ${
                          tabName === icons.navUrl
                            ? "text-black font-bold"
                            : "text-white"
                        }`}
                      >
                        {icons.label}
                      </span>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBarComponent;
