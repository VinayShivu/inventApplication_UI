import axios from "axios";
import { useSelector } from "react-redux";
import { ReducerInitialState } from "../redux/Reducer";

const refreshToken = () => {
  const token = useSelector((state: ReducerInitialState) => state.getToken);
  const refreshToken = useSelector(
    (state: ReducerInitialState) => state.getRefreshToken
  );
  const tokenExpiryTime = useSelector(
    (state: ReducerInitialState) => state.tokenExpiryTime
  );
  const refreshTokenData = {
    accessToken: token,
    refreshToken: refreshToken,
  };
  function callRefreshToken() {
    if (tokenExpiryTime * 1000 < Date.now()) {
      axios({
        url: "https://localhost:7101/api/refreshtoken",
        method: "POST",
        data: refreshTokenData,
      }).then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          alert("Success");
        } else {
          alert("Failure");
        }
      });
    }
  }
  window.setInterval(callRefreshToken, 1000);
};

export default refreshToken;
