import axios from "axios";
import { useSelector } from "react-redux";
import { ReducerInitialState } from "../redux/Reducer";

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

export const ApiService = {
  login: (args: loginArgs) =>
    axios
      .get(
        `https://localhost:7101/api/login?username=${args.username}&password=${args.password}`
      )
      .then((response) => response)
      .then((response) => {
        return { status: response.status, data: response };
      })
      .catch((error) => {
        return { status: error.status, data: error };
      }),

  signUp: (args: signUpArgs) =>
    axios({
      url: "https://localhost:7101/api/register",
      method: "POST",
      data: args,
    })
      .then((response) => response)
      .then((response) => {
        return { status: response.status, data: response };
      })
      .catch((error) => {
        return { status: error.status, data: error };
      }),
};
