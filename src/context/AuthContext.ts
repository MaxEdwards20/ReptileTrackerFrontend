import { createContext } from "react";
import { User } from "../api/models";

export const AuthContext = createContext({
  user: {} as User,
  setUser: (user: User) => {},
  logout: () => {},
});
