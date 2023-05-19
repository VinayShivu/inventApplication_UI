import axios, { AxiosResponse } from "axios";
import { store } from "../redux/Store";

type loginArgs = {
  username: string;
  password: string;
};
type signUpArgs = {
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
  roles: string;
};

const getToken = () => {
  return store.getState().getToken;
};

const service = axios.create({
  baseURL: "https://localhost:7101/api",
});

export const ApiService = {
  login: (args: loginArgs): Promise<AxiosResponse> => {
    return service.get(
      `/login?username=${args.username}&password=${args.password}`
    );
  },

  vendors: (): Promise<AxiosResponse> => {
    return service.get("/vendor", {
      headers: {
        "Content-Type": "application/json",
        Authorization: ` Bearer ${getToken()}`,
      },
    });
  },

  signUp: (args: signUpArgs): Promise<AxiosResponse> => {
    return service.post("/register", args);
  },

  vendorDetails: (args: string | undefined): Promise<AxiosResponse> => {
    return service.get(`/vendorcompanyname/${args}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: ` Bearer ${getToken()}`,
      },
    });
  },
};
