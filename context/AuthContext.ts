import React, { useContext } from "react";

//Auth Context
export const AuthContext = React.createContext({
  user: null,
  setUser: (user) => user,
});

//Use Auth Context
export function useAuthContext() {
  return useContext(AuthContext);
}
