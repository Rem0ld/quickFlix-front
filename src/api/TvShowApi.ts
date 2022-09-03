import { DeepPartial } from "redux";
import { baseVideoLimit } from "../config";
import { IApiClass, Pagination, Result, TvShow } from "../types";
import { err, ok, promisifier } from "./apiHelperFunctions";
import BaseFetch from "./BaseFetch";

export default class TvShowApi extends BaseFetch implements IApiClass<TvShow> {
  private static _instance: TvShowApi;
  public static get Instance() {
    return this._instance || (this._instance = new this("tv-show"));
  }

  constructor(name: string) {
    super();
    this.apiUrl = this.url + name + "/";
  }

  async find(
    limit: number = baseVideoLimit,
    skip = 0,
  ): Promise<Result<Pagination<TvShow>, Error>> {
    const [result, error] = await this.fetch(
      this.apiUrl + `?limit=${limit}&skip=${skip}`,
      {
        method: this.requestType.GET,
        headers: this.headers,
      },
    );
    if (error) {
      return err(error);
    }

    return ok(result);
  }

  async create(data: DeepPartial<TvShow>): Promise<Result<TvShow, Error>> {
    const [result, error] = await this.fetch(this.apiUrl, {
      method: this.requestType.POST,
      headers: this.headers,
      body: this.stringify(data),
    });
    if (error) {
      return err(error);
    }

    return ok(result);
  }

  async update(
    id: string,
    data: DeepPartial<TvShow>,
  ): Promise<Result<TvShow, Error>> {
    const [result, error] = await this.fetch(`${this.apiUrl}${id}`, {
      method: this.requestType.PATCH,
      headers: this.headers,
      body: this.stringify(data),
    });
    if (error) {
      return err(error);
    }
    return ok(result);
  }

  async get(id: string): Promise<Result<TvShow, Error>> {
    const [result, error] = await this.fetch(`${this.apiUrl}${id}`, {
      method: this.requestType.GET,
      headers: this.headers,
    });
    if (error) {
      return err(error);
    }
    return ok(result);
  }

  async delete(id: string): Promise<Result<boolean, Error>> {
    const [result, error] = await this.fetch(`${this.apiUrl}${id}`, {
      method: this.requestType.DELETE,
      headers: this.headers,
    });
    if (error) {
      return err(error);
    }
    return ok(result);
  }
}
