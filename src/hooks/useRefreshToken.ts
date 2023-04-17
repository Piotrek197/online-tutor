import axios from "../axios";
import useAuth from "./useAuth";
import { StateType } from "../context/AuthProvider";

const useRefreshToken = () => {
  const { auth, setAuth } = useAuth();
  const refresh = async () => {
    const response = await axios.get<StateType>("/refresh", {
      withCredentials: true
    });

    console.log("accessToken", response.data.accessToken);
    setAuth({ ...auth, roles: [100, 300], accessToken: response.data.accessToken });
    return response.data.accessToken;
  };

  return refresh;
};

export default useRefreshToken;
