import ClickAwayListener from "@mui/material/ClickAwayListener";
import "./quickCreateModal.css";
import {
  BsBagFill,
  BsFillCartDashFill,
  BsFillGridFill,
  BsPlus,
} from "react-icons/bs";

const generalItems = [
  {
    itemId: 1,
    itemName: "Add Users",
    itemIcon: <BsPlus />,
  },
  {
    itemId: 2,
    itemName: "Item",
    itemIcon: <BsPlus />,
  },
  {
    itemId: 2,
    itemName: "Inventory Adjustments",
    itemIcon: <BsPlus />,
  },
];

const salesItems = [
  {
    itemId: 1,
    itemName: "Add Users",
    itemIcon: <BsPlus />,
  },
  {
    itemId: 2,
    itemName: "Item",
    itemIcon: <BsPlus />,
  },
  {
    itemId: 2,
    itemName: "Inventory Adjustments",
    itemIcon: <BsPlus />,
  },
];

const purchaseItems = [
  {
    itemId: 1,
    itemName: "Add Users",
    itemIcon: <BsPlus />,
  },
  {
    itemId: 2,
    itemName: "Item",
    itemIcon: <BsPlus />,
  },
  {
    itemId: 2,
    itemName: "Inventory Adjustments",
    itemIcon: <BsPlus />,
  },
];
const QuickCreateModal = (props: any) => {
  const { close } = props;

  return (
    <>
      <ClickAwayListener onClickAway={close}>
        <div className="modal" onClick={close}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={close}>
              &times;
            </span>
            <div className="p-10">
              <div className="sm:flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <BsFillGridFill />
                    <span>GENERAL</span>
                  </div>
                  <div className="mt-5">
                    {generalItems.map((item) => {
                      return (
                        <div className="flex items-center space-x-2 cursor-pointer">
                          {item.itemIcon}
                          <span className="text-sm">{item.itemName}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="mt-10 sm:mt-0">
                  <div className="flex items-center space-x-2">
                    <BsFillCartDashFill />
                    <span>SALES</span>
                  </div>
                  <div className="mt-5">
                    {salesItems.map((item) => {
                      return (
                        <div className="flex items-center space-x-2 cursor-pointer">
                          {item.itemIcon}
                          <span className="text-sm">{item.itemName}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="mt-10 sm:mt-0">
                  <div className="flex items-center space-x-2">
                    <BsBagFill />
                    <span>PURCHASES</span>
                  </div>
                  <div className="mt-5">
                    {purchaseItems.map((item) => {
                      return (
                        <div className="flex items-center space-x-2 cursor-pointer">
                          {item.itemIcon}
                          <span className="text-sm">{item.itemName}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ClickAwayListener>
    </>
  );
};

export default QuickCreateModal;
