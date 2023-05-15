import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginComponent from "../screens/Login";
import DashboardComponent from "../screens/Dashboard";
import SignUpComponent from "../screens/SignUp";
import ItemComponent from "../screens/Items";
import SupplierComponent from "../screens/Supplier";
import BuyerComponent from "../screens/Buyer";
import InvoiceComponent from "../screens/Invoice";
import ReportComponent from "../screens/Report";
import PurchaseComponent from "../screens/Purchase";
import LayoutComponent from "./Layout";
import AddSupplier from "../screens/AddSupplier";
import ForgotPassword from "../screens/ForgotPassword";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayoutComponent />}>
          <Route path="dashboard" element={<DashboardComponent />} />
          <Route path="supplier" element={<SupplierComponent />} />
          <Route path="items" element={<ItemComponent />} />
          <Route path="buyer" element={<BuyerComponent />} />
          <Route path="purchase" element={<PurchaseComponent />} />
          <Route path="invoice" element={<InvoiceComponent />} />
          <Route path="report" element={<ReportComponent />} />
          <Route path="addsupplier" element={<AddSupplier />} />
        </Route>
        <Route path="login" index element={<LoginComponent />} />
        <Route path="register" element={<SignUpComponent />} />
        <Route path="forgotpassword" element={<ForgotPassword />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
