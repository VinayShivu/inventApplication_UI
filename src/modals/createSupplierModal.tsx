import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ReducerInitialState } from "../redux/Reducer";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function SupplierModal(props: any) {
  const navigate = useNavigate();
  const { open, close } = props;
  const token = useSelector((state: ReducerInitialState) => state.getToken);
  const [supplier, addSupplier] = React.useState({
    supplierName: "",
    supplierGst: "",
    email: "",
    phone: "",
    address: "",
  });

  const AddSupplier = () => {
    const inputDetails = {
      supplierName: supplier.supplierName,
      supplierGst: supplier.supplierGst,
      email: supplier.email,
      phone: supplier.phone,
      address: supplier.address,
    };
    axios({
      url: "https://localhost:7101/api/supplier",
      method: "POST",
      data: inputDetails,
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => {
      if (res.status === 200) {
        alert("Added Successfully");
        navigate("supplier");
      } else {
        alert("Failed to Add Supplier");
      }
    });
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <div className="flex items-center space-x-3">
              <div>
                <i className="fa-solid fa-user"></i>
              </div>
              <div className="font-bold text-xl text-slate-700">
                Add Supplier
              </div>
            </div>

            <div className="mt-10">
              <div className="flex items-center justify-between mt-3">
                <div>Supplier Name:</div>
                <div>
                  <input
                    type="text"
                    className="border border-slate-500 w-80 h-8 bg-white p-2"
                    onChange={(e) => {
                      addSupplier({
                        ...supplier,
                        supplierName: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between mt-3">
                <div>Supplier GST:</div>
                <div>
                  <input
                    type="text"
                    className="border border-slate-500 w-80 h-8 bg-white p-2"
                    onChange={(e) => {
                      addSupplier({ ...supplier, supplierGst: e.target.value });
                    }}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between mt-3">
                <div>Email:</div>
                <div>
                  <input
                    type="text"
                    className="border border-slate-500 w-80 h-8 bg-white p-2"
                    onChange={(e) => {
                      addSupplier({ ...supplier, email: e.target.value });
                    }}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between mt-3">
                <div>Contact Number:</div>
                <div>
                  <input
                    type="text"
                    className="border border-slate-500 w-80 h-8 bg-white p-2"
                    onChange={(e) => {
                      addSupplier({
                        ...supplier,
                        phone: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between mt-3">
                <div>Address:</div>
                <div>
                  <input
                    type="text"
                    className="border border-slate-500 w-80 h-8 bg-white p-2"
                    onChange={(e) => {
                      addSupplier({ ...supplier, address: e.target.value });
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center mt-10">
              <div
                className="flex item-center justify-center h-10 w-20 border-2 p-1 bg-green-700 cursor-pointer text-white"
                onClick={() => AddSupplier()}
              >
                Submit
              </div>
              <div
                className="flex item-center justify-center h-10 w-20 border-2 p-1 bg-red-700 cursor-pointer text-white"
                onClick={() => close()}
              >
                Cancel
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
