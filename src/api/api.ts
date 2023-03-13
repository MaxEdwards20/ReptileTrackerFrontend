import { getToken, setTokenToLocalStorage } from "../utils/miscFunctions";
import {
  CreateReptileBody,
  CreateScheduleBody,
  CreateUserBody,
  LoginBody,
} from "./apiTypes";
import { Reptile, User, Schedule } from "./models";

type Method = "get" | "post" | "put" | "del";

export class Api {
  private token = "";
  private baseUrl = "http://localhost:3000";

  constructor() {
    const token = getToken();
    if (token) {
      this.token = token;
    }
  }
  private async makeRequest(
    path: string,
    method: Method,
    body: Record<string, any> = {}
  ) {
    const options: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      },
    };

    if (method === "post" || method === "put") {
      options.body = JSON.stringify(body);
    }

    const result = await fetch(`${this.baseUrl}/${path}`, options);
    return result.json();
  }

  get(path: string) {
    return this.makeRequest(path, "get");
  }

  post(path: string, body: Record<string, any>) {
    return this.makeRequest(path, "post", body);
  }

  put(path: string, body: Record<string, any>) {
    return this.makeRequest(path, "put", body);
  }

  del(path: string) {
    return this.makeRequest(path, "del");
  }

  setToken(token: string) {
    if (!token) return;
    this.token = token;
    setTokenToLocalStorage(token);
  }

  createAccount(body: CreateUserBody): Promise<User> {
    return this.post("user", body).then((res) => {
      this.setToken(res.token);
      return res.user;
    });
  }

  signIn(body: LoginBody): Promise<User> {
    return this.post("user/login", body).then((res) => {
      this.setToken(res.token);
      return res.user;
    });
  }
  getUser(): Promise<User | null> {
    return this.get("user").then((res) => {
      if (!res?.user) return null;
      this.setToken(res.token);
      return res.user;
    });
  }
  getReptiles(): Promise<Reptile[]> {
    return this.get("reptiles").then((res) => res.reptiles);
  }

  createReptile(rep: CreateReptileBody): Promise<Reptile> {
    return this.post("reptiles", rep).then((res) => res.reptile);
  }
  getReptile(reptileId: number): Promise<Reptile> {
    return this.get(`reptiles/${reptileId}`).then((res) => res.reptile);
  }
  createSchedule(
    rep: CreateScheduleBody,
    reptileId: number
  ): Promise<Schedule> {
    return this.post(`schedules/${reptileId}`, rep).then((res) => res.schedule);
  }

  getSchedulesByReptile(reptileId: number): Promise<Schedule[]> {
    return this.get(`schedules/${reptileId}`).then((res) => res.schedules);
  }

  getSchedulesByUser(userID: number): Promise<Schedule[]> {
    return this.get(`schedules/user/${userID}`).then((res) => res.schedules);
  }
}
