import { Result } from "../types";
import { err, ok, promisifier } from "./apiHelperFunctions";
import BaseFetch from "./BaseFetch";

export default class DiscoverApi extends BaseFetch {
  private static _instance: DiscoverApi;
  public static get Instance() {
    return this._instance || (this._instance = new this("discover"));
  }

  constructor(name: string) {
    super();
    this.apiUrl = this.url + name + "/";
  }

  async checkAccessFolder(): Promise<Result<0 | 1, Error>> {
    const path = import.meta.env.DEV ? "videos" : "Videos";
    const [result, error] = await promisifier(
      this.fetch(`${this.apiUrl}discover/drive?folderPath=public/${path}`, {
        method: this.requestType.GET,
        headers: this.headers,
      }),
    );
    if (error) {
      return err(new Error(error));
    }
    return ok(result ? 1 : 0);
  }
}
