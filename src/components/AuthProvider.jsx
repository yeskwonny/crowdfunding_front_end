import { createContext, useState } from "react";

export const AuthContext = createContext();
export const AuthProvider = function ({ children }) {
  const [auth, setAuth] = useState({
    totke: window.localStorage.getItem("token"),
  });
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
