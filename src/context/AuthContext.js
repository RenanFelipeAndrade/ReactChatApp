import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/init";

export const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}
export function AuthContextProvider({ children }) {
  const [userData, setUserData] = useState({});
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUserData(user);
    });
    return unsubscribe;
  }, []);
  return (
    <AuthContext.Provider value={{ userData, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
}
