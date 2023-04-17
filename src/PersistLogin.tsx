import { Outlet } from "react-router";
import { useState, useEffect } from "react";
import useRefreshToken from "./hooks/useRefreshToken";
import useAuth from "./hooks/useAuth";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth, persist } = useAuth();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.log(new Error("Cannot verify refresh token"));
      } finally {
        setIsLoading(false);
      }
    };

    !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);
  }, []);

  //for testing purposes
  useEffect(() => {
    console.log(`isLoading: ${isLoading}`);
    console.log(`aT: ${JSON.stringify(auth?.accessToken)}`);
    console.log("persist", persist);
  }, [isLoading]);

  return !persist ? <Outlet /> : isLoading ? <p>Loading...</p> : <Outlet />;
};

export default PersistLogin;
