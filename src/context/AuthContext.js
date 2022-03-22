import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/init";

export const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}
export function AuthContextProvider({ children }) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUserData(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);
  return (
    <AuthContext.Provider
      value={{ userData, setUserData, loading, setLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}
