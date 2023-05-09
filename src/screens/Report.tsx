import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import StickyHeadTable from "../components/Table";
import axios from "axios";
import { updateBreadCrumb } from "../redux/Action";

const ReportComponent = () => {
  const [data, setData] = useState([{}]);
  const token = useSelector((state: any) => state.getToken);
  const dispatch = useDispatch();
  const breadCrumb = [{ name: "Report", path: "/report" }];
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
  useEffect(() => {
    axios({
      url: "https://localhost:7101/api/supplier",
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => {
      gotResponse(res.data);
    });
  }, []);

  const gotResponse = (details: any) => {
    setData(details);
  };

  return (
    <>
      <div className="">
        <StickyHeadTable columnNames={columnNames} rowData={data} />
      </div>
    </>
  );
};

export default ReportComponent;
