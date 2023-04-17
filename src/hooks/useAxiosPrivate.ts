import { useEffect, useState } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";
import axiosPrivate from "../axios";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { auth } = useAuth();
  const [sent, setSent] = useState(false);

  useEffect(() => {
    // console.log("sent", sent);
    const requestIntercept = axiosPrivate.interceptors.request.use(
      config => {
        console.log("config", config);
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth?.accessToken}`;
        }
        return config;
      },
      error => {
        Promise.reject(error);
      }
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(undefined, async err => {
      console.log("error from fetch api", err);
      const prevRequest = err?.config;
      console.info(`[prevRequest] [${JSON.stringify(prevRequest)}]`);
      // return;

      console.log("prevRequest", prevRequest);
      if (!prevRequest) return Promise.reject(err);

      // console.log("error response status", err?.response?.status, sent);
      // if (!requestSent) {
      if (!sent && err?.response?.status === 403) {
        // console.log("change accessToken");
        // console.log("prevRequest", prevRequest);
        // requestSent = true;
        setSent(true);
        const newAccessToken = await refresh();
        // console.log("new access token", newAccessToken);
        prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return await axiosPrivate(prevRequest);
      }
      // requestSent = true;
      return Promise.reject(err);
    });

    //cleanup function
    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
      setSent(false);
    };
  }, [auth, refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;
