import { baseUrl, headers } from "../config";

export async function updateTvShow(id: string | undefined, data: any) {
  if (!id) return null;
  try {
    return fetch(`${baseUrl}tv-show/${id}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify(data)
    })
  } catch (error) {
    console.error(error)
    return error
  }
}