import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";

export default function RequireAuth({ children }) {
  const { userData } = useAuth();
  return userData?.uid ? children : <Navigate to={"/login"} replace />;
}
