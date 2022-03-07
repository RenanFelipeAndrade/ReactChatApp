import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";

export default function RequireAuth({ children }) {
  const { userData, loading } = useAuth();
  if (loading) return <div>Carregando...</div>;
  return userData ? children : <Navigate to={"/login"} replace />;
}
