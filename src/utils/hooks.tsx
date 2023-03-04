import { useEffect, useState } from "react";
import { getUser } from "../api/apiFunctions";
import { User } from "../api/models";
import { getToken, removeToken } from "./miscFunctions";

type UserInfo = () => {
  user: User | undefined;
  setUser: (user: User | undefined) => void;
  logout: () => void;
};

export const useUserInfo: UserInfo = () => {
  const [user, setUser] = useState<User>();
  const logout = () => {
    removeToken();
    setUser(undefined);
  };

  useEffect(() => {
    if (user) return;
    if (!getToken()) return;
    getUser().then((user) => {
      if (!user) return;
      setUser(user);
    });
  }, []);

  return { user, setUser, logout };
};
