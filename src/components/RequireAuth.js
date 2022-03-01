import { useContext } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "../context/AuthContext";

export default function RequireAuth({ children }) {
  const { auth } = useContext(AuthContext);
  return auth?.uid ? children : <Navigate to={"/login"} replace />;
}
