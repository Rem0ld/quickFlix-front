import { DeepPartial } from "redux";
import { IApiClass, Pagination, Result, Video } from "../types";
import BaseFetch from "./BaseFetch";
import { baseVideoLimit } from "../config";

export default class VideoApi extends BaseFetch implements IApiClass<Video> {
  private static _instance: VideoApi;
  public static get Instance() {
    return this._instance || (this._instance = new this("video"));
  }

  constructor(name: string) {
    super();
    this.apiUrl = this.url + name + "/";
  }

  async find(
    limit = baseVideoLimit,
    skip = 0,
    rest,
  ): Promise<Result<Pagination<Video>, Error>> {
    const params = new URLSearchParams(rest);
    return this.fetch(this.apiUrl + `?limit=${limit}&skip=${skip}&${params}`, {
      method: this.requestType.GET,
      headers: this.headers,
    });
  }

  async findByFields(
    limit: number,
    skip: number,
    params: any,
  ): Promise<Result<Pagination<Video>, Error>> {
    const route = "by-fields";
    return this.fetch(this.apiUrl + route + `?limit=${limit}&skip=${skip}`, {
      method: this.requestType.POST,
      headers: this.headers,
      body: this.stringify(params),
    });
  }

  async create(data: DeepPartial<Video>): Promise<Result<Video, Error>> {
    return this.fetch(this.apiUrl, {
      method: this.requestType.POST,
      headers: this.headers,
      body: this.stringify(data),
    });
  }

  async update(
    id: string,
    data: DeepPartial<Video>,
  ): Promise<Result<Video, Error>> {
    return this.fetch(`${this.apiUrl}${id}`, {
      method: this.requestType.PATCH,
      headers: this.headers,
      body: this.stringify(data),
    });
  }

  async get(id: string): Promise<Result<Video, Error>> {
    return this.fetch(`${this.apiUrl}${id}`, {
      method: this.requestType.GET,
      headers: this.headers,
    });
  }

  async delete(id: string): Promise<Result<boolean, Error>> {
    return this.fetch(`${this.apiUrl}${id}`, {
      method: this.requestType.DELETE,
      headers: this.headers,
    });
  }
}
