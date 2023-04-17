import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "./hooks/useAuth";

type PropsType = {
  allowedRoles?: number[];
};

const RequireAuth = ({ allowedRoles }: PropsType) => {
  const { auth } = useAuth();
  const location = useLocation();

  return auth?.roles?.find(role => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : auth?.username ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
