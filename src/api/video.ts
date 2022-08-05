import path from "path";
import { DeepPartial } from "redux";
import { Video } from "../types";
import BaseFetch from "./BaseFetch";

interface IApiClass<T> {
  get: (id: string) => Promise<T>;
  find: () => Promise<T[]>;
  update: (id: string, data: DeepPartial<T>) => Promise<T>;
  delete: (id: string) => Promise<boolean>;
  create: (data: DeepPartial<T>) => Promise<T>;
}

export default class VideoApi extends BaseFetch implements IApiClass<Video> {
  private static _instance: VideoApi;
  public static get Instance() {
    return this._instance || (this._instance = new this("video"));
  }
  private apiUrl: string;
  constructor(name: string) {
    super();
    this.apiUrl = this.url + name + path.sep;
  }

  async find() {
    const response = await fetch(this.apiUrl, {
      method: this.requestType.GET,
      headers: this.headers,
    });
    const result = await response.json();
    return result as Video[];
  }

  async create(data: DeepPartial<Video>) {
    const response = await fetch(this.apiUrl, {
      method: this.requestType.POST,
      headers: this.headers,
      body: this.stringify(data),
    });
    const result = await response.json();

    return result;
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
