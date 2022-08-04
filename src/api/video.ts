import path from "path";
import { Video } from "../types";
import BaseFetch from "./BaseFetch";

export default class VideoApi extends BaseFetch {
  private apiUrl: string;
  constructor(name: string) {
    super();
    this.apiUrl = this.url + name + path.sep;
  }

  async updateVideo(
    id: string | undefined,
    data: Record<string, unknown>,
  ): Promise<Response | null> {
    if (!id) return null;
    return fetch(`${this.apiUrl}${id}`, {
      method: this.requestType.PATCH,
      headers: this.headers,
      body: this.stringify(data),
    });
  }

  async getVideoById(id: string): Promise<Video | null> {
    if (!id) return null;

    const response = await fetch(`${this.apiUrl}${id}`, {
      method: this.requestType.GET,
      headers: this.headers,
    });
    const result = await response.json();
    return result as Video;
  }

  async deleteVideoById(id: string): Promise<Video | null | void> {
    if (!id) return;

    const response = await fetch(`${this.apiUrl}${id}`, {
      method: this.requestType.DELETE,
      headers: this.headers,
    });
    const result = await response.json();
    return result;
  }
}
