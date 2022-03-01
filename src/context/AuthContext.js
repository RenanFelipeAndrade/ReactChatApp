import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

export function AuthContextProvider({ children }) {
  const [auth, setAuth] = useState({ uid: "some uid" });
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}
