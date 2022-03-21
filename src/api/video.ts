import { baseUrl, headers } from "../config";

export async function updateVideo(id: string | undefined, data: any) {
  if (!id) return null;
  try {
    return fetch(`${baseUrl}video/${id}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify(data)
    })
  } catch (error) {
    console.error(error)
    return error
  }
}