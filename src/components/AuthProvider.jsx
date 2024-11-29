import { createContext, useState } from "react";

// what does this do?
export const AuthContext = createContext();

export const AuthProvider = function ({ children }) {
  const [auth, setAuth] = useState({
    totke: window.localStorage.getItem("token"),
  });
  // what does this do? make chilren can access to the value?
  // and get value data using useContext?
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
