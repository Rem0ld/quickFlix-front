import { Result } from "../types";
import { err, ok } from "./apiHelperFunctions";

type THeader = {
  [key: string]: string;
};

enum ERequestType {
  PATCH = "PATCH",
  POST = "POST",
  GET = "GET",
  PUT = "PUT",
  DELETE = "DELETE",
}

export default class BaseFetch {
  private baseUrl = `http://${
    import.meta.env.DEV ? "localhost" : "192.168.0.11"
  }:3050/`;
  private headersObj: THeader = {
    "Content-Type": "application/json",
  };
  protected apiUrl: string;
  requestType = ERequestType;

  set url(url: string) {
    this.baseUrl = url;
  }

  get url() {
    return this.baseUrl;
  }

  get headers() {
    return this.headersObj;
  }

  stringify(data: Record<string, unknown>) {
    return JSON.stringify(data);
  }

  parse(data: string) {
    return JSON.parse(data);
  }

  async fetch(
    url: string,
    options: Record<string, any>,
  ): Promise<Result<any, Error>> {
    const response = await fetch(url, {
      ...options,
      credentials: "include",
      mode: "cors",
    });
    if (response.status >= 400 && response.status <= 500) {
      return err(new Error(await response.json()));
    }
    const result = await response.json();
    return ok(result);
  }
}
