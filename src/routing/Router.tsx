import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginComponent from "../screens/Login";
import DashboardComponent from "../screens/Dashboard";
import SignUpComponent from "../screens/SignUp";
import ItemComponent from "../screens/Items";
import VendorComponent from "../screens/Vendors";
import BuyerComponent from "../screens/Buyer";
import InvoiceComponent from "../screens/Invoice";
import ReportComponent from "../screens/Report";
import PurchaseComponent from "../screens/Purchase";
import LayoutComponent from "./Layout";
import AddVendor from "../screens/AddVendor";
import ForgotPassword from "../screens/ForgotPassword";
import Profile from "../screens/Profile";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayoutComponent />}>
          <Route path="dashboard" element={<DashboardComponent />} />
          <Route path="vendor" element={<VendorComponent />} />
          <Route path="items" element={<ItemComponent />} />
          <Route path="buyer" element={<BuyerComponent />} />
          <Route path="purchase" element={<PurchaseComponent />} />
          <Route path="invoice" element={<InvoiceComponent />} />
          <Route path="report" element={<ReportComponent />} />
          <Route path="addvendor" element={<AddVendor />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="login" index element={<LoginComponent />} />
        <Route path="register" element={<SignUpComponent />} />
        <Route path="forgotpassword" element={<ForgotPassword />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
