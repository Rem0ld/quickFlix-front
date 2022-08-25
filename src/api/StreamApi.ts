import { err, ok, promisifier } from "./apiHelperFunctions";
import BaseFetch from "./BaseFetch";

export default class StreamApi extends BaseFetch {
  private static _instance: StreamApi;
  public static get Instance() {
    return this._instance || (this._instance = new this("stream"));
  }
  public apiUrl: string;

  constructor(name: string) {
    super();
    this.apiUrl = this.url + name + "/";
  }

  async stream(id: string | number) {
    const [result, error] = await promisifier(
      this.fetch(this.apiUrl + id, {
        method: this.requestType.GET,
        headers: this.headers,
      }),
    );

    if (error) {
      return err(new Error(error));
    }

    return ok(result);
  }
}
