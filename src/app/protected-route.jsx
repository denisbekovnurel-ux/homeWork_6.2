import { Navigate, Outlet } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "../modules/Auth";

export function ProtectedRoute() {
  const isAuth = useAuth((state) => state.isAuth);

  if (!isAuth) {
    toast.info("Сперва войдите");
    return <Navigate to="/auth" replace />;
  }

  return <Outlet />;
}
