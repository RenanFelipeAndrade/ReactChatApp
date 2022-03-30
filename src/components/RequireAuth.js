import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { LoadingScreen } from "./LoadingScreen";

export default function RequireAuth({ children }) {
  const { userData, loading } = useAuth();
  if (loading) return <LoadingScreen />;
  return userData ? children : <Navigate to={"/signin"} replace />;
}
