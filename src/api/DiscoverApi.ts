import { Pagination, Result } from "../types";
import { err, ok, promisifier } from "./apiHelperFunctions";
import BaseFetch from "./BaseFetch";

export default class DiscoverApi extends BaseFetch {
  private static _instance: DiscoverApi;
  public static get Instance() {
    return this._instance || (this._instance = new this("discover"));
  }

  constructor(name: string) {
    super();
    this.apiUrl = this.url + name;
  }

  async checkAccessFolder(): Promise<Result<0 | 1, Error>> {
    const path = import.meta.env.DEV ? "videos" : "Videos";
    const [result, error] = await this.fetch(
      `${this.apiUrl}/drive?folderPath=public/${path}`,
      {
        method: this.requestType.GET,
        headers: this.headers,
      },
    );
    if (error) {
      return err(error);
    }

    return ok(result ? 1 : 0);
  }

  async getDir(): Promise<any> {
    const publicDir = "public";
    const [result, error] = await this.fetch(
      `${this.apiUrl}/dir?folder=${publicDir}`,
      {
        method: this.requestType.GET,
        headers: this.headers,
      },
    );
    if (error) {
      return err(error);
    }
    if (!result.length) {
      return err(new Error("No directory in root"));
    }

    return ok(result);
  }

  async discover(dir: string): Promise<Result<Pagination<string>, Error>> {
    const [result, error] = await this.fetch(`${this.apiUrl}?dir=${dir}`, {
      method: this.requestType.GET,
      headers: this.headers,
    });

    if (error) {
      return err(error);
    }

    return ok(result);
  }
}
