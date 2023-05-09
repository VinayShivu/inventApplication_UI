import { AnyAction } from "redux";
import {
  TOKENDATA,
  SIDEBARTAB,
  BREADCRUMB,
  USERNAME,
  EXPIRYTIME,
  REFRESHTOKEN,
} from "../Action";

export interface ReducerInitialState {
  getToken: string;
  sideBarTab: string;
  username: string;
  tokenExpiryTime: number;
  getRefreshToken: string;
  getBreadCrumb: [
    {
      name: string;
      path: string;
    }
  ];
}

const initialState: ReducerInitialState = {
  getToken: "",
  sideBarTab: "items",
  getBreadCrumb: [{ name: "", path: "/" }],
  username: "",
  tokenExpiryTime: 0,
  getRefreshToken: "",
};

export default function GlobalReducer(state = initialState, action: AnyAction) {
  switch (action.type) {
    case TOKENDATA:
      return { ...state, getToken: action.payload };
    case SIDEBARTAB:
      return { ...state, sideBarTab: action.payload };
    case BREADCRUMB:
      return { ...state, getBreadCrumb: action.payload };
    case USERNAME:
      return { ...state, username: action.payload };
    case EXPIRYTIME:
      return { ...state, tokenExpiryTime: action.payload };
    case REFRESHTOKEN:
      return { ...state, getRefreshToken: action.payload };
    default:
      return state;
  }
}
