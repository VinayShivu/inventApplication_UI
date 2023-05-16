import { useEffect } from "react";
import { updateBreadCrumb } from "../redux/Action";
import { useDispatch } from "react-redux";

const AddVendor = () => {
  const dispatch = useDispatch();
  const breadCrumb = [
    { name: "Vendors", path: "/vendor" },
    { name: "AddVendor", path: "/addvendor" },
  ];
  useEffect(() => {
    dispatch(updateBreadCrumb(breadCrumb));
  }, []);
  return (
    <>
      <div>AddVendor</div>
    </>
  );
};

export default AddVendor;
