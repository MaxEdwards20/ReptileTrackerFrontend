import { setToken } from "../utils/miscFunctions";
import { getReq, postReq } from "./crudOperations";
import { User } from "./models";
import { CreateUserBody, LoginBody } from "./types";

export function createAccount(body: CreateUserBody): Promise<User> {
  return postReq(body, "user").then((res) => {
    setToken(res.token);
    return res.user;
  });
}

export function signIn(body: LoginBody): Promise<User> {
  return postReq(body, "user/login").then((res) => {
    setToken(res.token);
    return res.user;
  });
}

export function getUser(): Promise<User | null> {
  return getReq("user").then((res) => {
    if (!res?.user) return null;
    return res.user;
  });
}
