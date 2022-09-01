import { Result, Watched } from "../types";
import { ok, err, promisifier } from "./apiHelperFunctions";
import BaseFetch from "./BaseFetch";

export default class WatchedApi extends BaseFetch {
  private static _instance: WatchedApi;
  public static get Instance() {
    return this._instance || (this._instance = new this("watched"));
  }

  constructor(name: string) {
    super();
    this.apiUrl = this.url + name + "/";
  }

  async create(
    videoId: string | number,
    userId: string | number,
  ): Promise<Result<Watched, Error>> {
    if (!videoId) return null;

    const [result, error] = await promisifier(
      this.fetch(this.apiUrl, {
        method: this.requestType.POST,
        headers: this.headers,
        body: this.stringify({
          video: videoId,
          user: userId,
        }),
      }),
    );

    if (error) {
      return err(new Error(error));
    }

    return ok(result);
  }

  async update(id: string | number, timeWatched: number, finished: boolean) {
    if (!id) return null;

    const [result, error] = await promisifier(
      this.fetch(this.apiUrl + `?id=${id}`, {
        method: this.requestType.PATCH,
        headers: this.headers,
        body: this.stringify({ timeWatched, finished }),
      }),
    );
    if (error) {
      return err(new Error(error));
    }

    return ok(result);
  }
}
// export async function createWatched(id: string) {
//   if (!id) return null;
//   try {
//     return fetch(`${baseUrl}watched`, {
//       method: "POST",
//       headers,
//       body: JSON.stringify({
//         video: id
//       })
//     })
//   } catch (error) {
//     console.error(error)
//     return error
//   }
// }

// export async function updateWatched(id: string, time: number, tvShow: string | null) {
//   try {
//     const response = await fetch(`${baseUrl}watched/${id}`, {
//       method: "PATCH",
//       headers,
//       body: JSON.stringify({
//         timeWatched: time,
//         tvShow
//       })
//     })
//     const result = await response.json();
//     return result
//   } catch (error) {
//     console.error("in api update watched", error)
//     return error;
//   }
// }
