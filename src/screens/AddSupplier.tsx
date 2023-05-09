import { useEffect } from "react";
import { updateBreadCrumb } from "../redux/Action";
import { useDispatch } from "react-redux";

const AddSupplier = () => {
  const dispatch = useDispatch();
  const breadCrumb = [
    { name: "Supplier", path: "/supplier" },
    { name: "AddSubbplier", path: "/addsupplier" },
  ];
  useEffect(() => {
    dispatch(updateBreadCrumb(breadCrumb));
  }, []);
  return (
    <>
      <div>AddSupplier</div>
    </>
  );
};

export default AddSupplier;
