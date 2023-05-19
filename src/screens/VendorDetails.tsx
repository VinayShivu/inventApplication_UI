import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateBreadCrumb } from "../redux/Action";
import { useParams } from "react-router-dom";
import { ReducerInitialState } from "../redux/Reducer";
import { ApiService } from "../services/api.service";
import { AxiosResponse } from "axios";

type vendorDetail = {
  vendorId: number;
  companyName: string;
  vendorGST: string;
  email: string;
  phone: string;
  address: string;
  primaryContactName: string;
  contactPersons: string;
  payables: number;
};

const VendorDetailsComponent = () => {
  const { companyName } = useParams();
  const [vendorDetailData, setVendorDetailData] = useState<vendorDetail>();
  const token = useSelector((state: ReducerInitialState) => state.getToken);
  const dispatch = useDispatch();
  const breadCrumb = [
    { name: "Vendors", path: "/vendor" },
    { name: "VendorDetails", path: "/vendordetails" },
  ];

  useEffect(() => {
    dispatch(updateBreadCrumb(breadCrumb));
    ApiService.vendorDetails(companyName)
      .then((response) => {
        gotResponse(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const gotResponse = (details: any) => {
    const vendorDetail = details.data;
    setVendorDetailData(vendorDetail);
  };

  return (
    <>
      <div>Vendor Details</div>
    </>
  );
};
export default VendorDetailsComponent;
