import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import StickyHeadTable from "../components/Table";
import axios from "axios";
import { updateBreadCrumb } from "../redux/Action";
import SupplierModal from "../modals/createSupplierModal";
import { ReducerInitialState } from "../redux/Reducer";
import { useNavigate } from "react-router-dom";

const SupplierComponent = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([{}]);
  const [open, setOpen] = useState(false);
  const token = useSelector((state: ReducerInitialState) => state.getToken);
  const dispatch = useDispatch();
  const breadCrumb = [{ name: "Supplier", path: "/supplier" }];

  useEffect(() => {
    dispatch(updateBreadCrumb(breadCrumb));
  }, []);
  const columnNames = [
    {
      id: "supplierId",
      label: "Supplier Id",
    },
    {
      id: "supplierName",
      label: "Supplier Name",
    },
    {
      id: "supplierGST",
      label: "Supplier GST",
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
  const buttonLabel = "Add Supplier";
  useEffect(() => {
    axios({
      url: "https://localhost:7101/api/supplier",
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
    navigate("/addsupplier");
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

export default SupplierComponent;
