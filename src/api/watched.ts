import { baseUrl, headers } from "../config";

export async function createWatched(id: string) {
  if (!id) return null;
  console.log('createwatched', id)
  try {
    return fetch(`${baseUrl}watched`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        video: id
      })
    })
  } catch (error) {
    console.error(error)
    return error
  }
}

export async function updateWatched(id: string, time: number) {
  console.log("🚀 ~ file: watched.ts ~ line 21 ~ updateWatched ~ time", time)

  try {
    const response = await fetch(`${baseUrl}watched/${id}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({
        timeWatched: time
      })
    })
    const result = await response.json();
    console.log("🚀 ~ file: watched.ts ~ line 32 ~ updateWatched ~ result", result)
    return result
  } catch (error) {
    console.error("in api update watched", error)
    return error;
  }
}