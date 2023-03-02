import { postReq } from "./crudOperations";
import { User } from "./models";
import { CreateUserBody, LoginBody } from "./types";

export function createAccount(body: CreateUserBody): Promise<User> {
  return postReq(body, "user").then((res) => res.user);
}

export function signIn(body: LoginBody): Promise<User> {
  return postReq(body, "user/login").then((res) => res.user);
}
