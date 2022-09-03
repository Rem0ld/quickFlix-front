import { Result, TUser } from "../types";
import { err, ok } from "./apiHelperFunctions";
import BaseFetch from "./BaseFetch";

export default class AuthenticateApi extends BaseFetch {
  private static _instance: AuthenticateApi;
  public static get Instance() {
    return this._instance || (this._instance = new this("authentication"));
  }
  private storageKey = "user";

  constructor(name: string) {
    super();
    this.apiUrl = this.url + name + "/";
  }

  async authenticate(data: {
    pseudo: string;
    password: string;
  }): Promise<Result<TUser, Error>> {
    return this.fetch(this.apiUrl, {
      method: this.requestType.POST,
      headers: this.headers,
      body: this.stringify(data),
    });
  }

  logout() {
    localStorage.removeItem(this.storageKey);
  }

  setUser(user: TUser) {
    localStorage.setItem(this.storageKey, this.stringify(user));
  }

  getUser() {
    return localStorage.getItem(this.storageKey);
  }
}
