import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateBreadCrumb, updateSidebarTab } from "../redux/Action";

const ItemComponent = () => {
  const dispatch = useDispatch();
  const breadCrumb = [{ name: "Items", path: "/" }];
  useEffect(() => {
    dispatch(updateBreadCrumb(breadCrumb));
  }, []);

  return (
    <div>
      <div>Home Page</div>
    </div>
  );
};

export default ItemComponent;
