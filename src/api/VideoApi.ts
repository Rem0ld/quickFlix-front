import { DeepPartial } from "redux";
import { IApiClass, Pagination, Result, Video } from "../types";
import BaseFetch from "./BaseFetch";
import { err, ok, promisifier } from "./apiHelperFunctions";
import { baseVideoLimit } from "../config";

export default class VideoApi extends BaseFetch implements IApiClass<Video> {
  private static _instance: VideoApi;
  public static get Instance() {
    return this._instance || (this._instance = new this("video"));
  }
  private apiUrl: string;

  constructor(name: string) {
    super();
    this.apiUrl = this.url + name + "/";
  }

  async find(
    limit: number = baseVideoLimit,
    skip = 0,
  ): Promise<Result<Pagination<Video>, Error>> {
    const [result, error] = await promisifier(
      this.fetch(this.apiUrl + `?limit=${limit}&skip=${skip}`, {
        method: this.requestType.GET,
        headers: this.headers,
      }),
    );
    if (error) {
      return err(new Error(error));
    }

    return ok(result);
  }

  async findByFields(
    limit: number,
    skip: number,
    params: any,
  ): Promise<Result<Pagination<Video>, Error>> {
    console.log("🚀 ~ file: VideoApi.ts ~ line 41 ~ VideoApi ~ skip", skip);
    const route = "by-fields";
    const [result, error] = await promisifier(
      this.fetch(this.apiUrl + route + `?limit=${limit}&skip=${skip}`, {
        method: this.requestType.POST,
        headers: this.headers,
        body: this.stringify(params),
      }),
    );
    if (error) {
      return err(new Error(error));
    }

    return ok(result);
  }

  async create(data: DeepPartial<Video>): Promise<Result<Video, Error>> {
    const [result, error] = await promisifier(
      this.fetch(this.apiUrl, {
        method: this.requestType.POST,
        headers: this.headers,
        body: this.stringify(data),
      }),
    );
    if (error) {
      return err(new Error(error));
    }

    return ok(result);
  }

  async update(id: string, data: DeepPartial<Video>): Promise<Video> {
    const response = await fetch(`${this.apiUrl}${id}`, {
      method: this.requestType.PATCH,
      headers: this.headers,
      body: this.stringify(data),
    });

    const result = await response.json();
    return result as Video;
  }

  async get(id: string): Promise<Video> {
    const response = await fetch(`${this.apiUrl}${id}`, {
      method: this.requestType.GET,
      headers: this.headers,
    });
    const result = await response.json();
    return result as Video;
  }

  async delete(id: string): Promise<boolean> {
    const response = await fetch(`${this.apiUrl}${id}`, {
      method: this.requestType.DELETE,
      headers: this.headers,
    });
    const result = await response.json();
    return result;
  }
}
