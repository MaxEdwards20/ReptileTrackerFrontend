import { createContext } from "react";
import { User } from "../api/models";

export const UnAuthContext = createContext({
  setUser: (user: User) => {},
});
