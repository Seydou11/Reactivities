import { Navigate, Outlet, useLocation } from "react-router";
import { useAccount } from "../../lib/hooks/useAccount";
import Typography from "@mui/material/Typography";

export default function RequireAuth() {
    const { currentUser, loadingUserInfos } = useAccount();
    const location = useLocation();

    if (loadingUserInfos) return <Typography>Loading...</Typography>;

    if (!currentUser) return <Navigate to={'/login'} state={{form: location}} />

  return (
    <Outlet />
  )
}