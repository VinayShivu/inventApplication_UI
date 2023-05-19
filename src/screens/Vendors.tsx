import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import StickyHeadTable from "../components/Table";
import axios, { AxiosResponse } from "axios";
import { updateBreadCrumb } from "../redux/Action";
import SupplierModal from "../modals/createSupplierModal";
import { ReducerInitialState } from "../redux/Reducer";
import { useNavigate } from "react-router-dom";
import { ApiService } from "../services/api.service";

const VendorComponent = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([{}]);
  const token = useSelector((state: ReducerInitialState) => state.getToken);
  const dispatch = useDispatch();
  const breadCrumb = [{ name: "Vendors", path: "/vendor" }];

  useEffect(() => {
    dispatch(updateBreadCrumb(breadCrumb));
  }, []);
  const columnNames = [
    {
      id: "companyName",
      label: "Comapny Name",
    },
    {
      id: "vendorGST",
      label: "Vendor GST",
    },
    {
      id: "email",
      label: "Email",
    },
    {
      id: "phone",
      label: "Contact Number",
    },
    {
      id: "payables",
      label: "Payables",
    },
  ];
  const buttonLabel = "Add Vendor";
  useEffect(() => {
    ApiService.vendors()
      .then((response) => {
        gotResponse(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const gotResponse = (details: any) => {
    const responseData = details;
    setData(responseData);
  };
  const onButtonClick = () => {
    navigate("/addvendor");
  };

  return (
    <>
      <div
        className="float-right mb-3 h-auto w-auto border-2 p-2 bg-slate-500 cursor-pointer"
        onClick={() => onButtonClick()}
      >
        <div className="flex item-center justify-between">
          <div className="">
            <i className="fa-solid fa-plus text-white"></i>
          </div>
          <div className="text-white ml-2">{buttonLabel}</div>
        </div>
      </div>
      <div className="">
        <StickyHeadTable columnNames={columnNames} rowData={data} />
      </div>
    </>
  );
};

export default VendorComponent;
