import { setToken } from "../utils/miscFunctions";
import { getReq, postReq } from "./crudOperations";
import { Reptile, User } from "./models";
import { CreateReptileBody, CreateUserBody, LoginBody } from "./apiTypes";

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

export function getReptiles(): Promise<Reptile[]> {
  return getReq("reptiles").then((res) => res.reptiles);
}

export function createReptile(rep: CreateReptileBody): Promise<Reptile> {
  return postReq(rep, "reptiles").then((res) => res.reptile);
}
