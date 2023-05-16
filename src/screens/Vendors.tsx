import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import StickyHeadTable from "../components/Table";
import axios from "axios";
import { updateBreadCrumb } from "../redux/Action";
import SupplierModal from "../modals/createSupplierModal";
import { ReducerInitialState } from "../redux/Reducer";
import { useNavigate } from "react-router-dom";

const VendorComponent = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([{}]);
  const [open, setOpen] = useState(false);
  const token = useSelector((state: ReducerInitialState) => state.getToken);
  const dispatch = useDispatch();
  const breadCrumb = [{ name: "Vendors", path: "/vendor" }];

  useEffect(() => {
    dispatch(updateBreadCrumb(breadCrumb));
  }, []);
  const columnNames = [
    {
      id: "vendorId",
      label: "Vendor Id",
    },
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
      id: "address",
      label: "Address",
    },
  ];
  const buttonLabel = "Add Vendor";
  useEffect(() => {
    axios({
      url: "https://localhost:7101/api/vendor",
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => {
      gotResponse(res.data);
    });
  }, []);

  const gotResponse = (details: Response[]) => {
    setData(details);
  };
  const onButtonClick = () => {
    // setOpen(true);
    navigate("/addvendor");
  };

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="">
        <div className="float-right mb-3">
          <div
            className="flex item-center justify-center h-10 w-auto border-2 p-1 bg-lime-500 cursor-pointer"
            onClick={() => onButtonClick()}
          >
            <div className="">
              <i className="fa-solid fa-plus text-white"></i>
            </div>
            <div className="">
              <span className="ml-2 text-white">{buttonLabel}</span>
            </div>
          </div>
        </div>
        <div className="">
          <StickyHeadTable columnNames={columnNames} rowData={data} />
        </div>
        {open ? <SupplierModal open={open} close={closeModal} /> : null}
      </div>
    </>
  );
};

export default VendorComponent;
