import { err, ok, promisifier } from "./apiHelperFunctions";
import BaseFetch from "./BaseFetch";

export default class StreamApi extends BaseFetch {
  private static _instance: StreamApi;
  public static get Instance() {
    return this._instance || (this._instance = new this("stream"));
  }

  constructor(name: string) {
    super();
    this.apiUrl = super.url + name + "/";
  }

  get url() {
    return this.apiUrl;
  }

  async stream(id: string | number) {
    const [result, error] = await this.fetch(this.apiUrl + id, {
      method: this.requestType.GET,
      headers: this.headers,
    });

    if (error) {
      return err(error);
    }

    return ok(result);
  }
}
