import { baseUrl, headers } from "../config";
import { Video } from "../types";

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

export async function getVideoById(id: string): Promise<Video | null> {
  if (!id) return null;

  try {
    const response = await fetch(`${baseUrl}video/${id}`, {
      method: "GET",
      headers
    })
    const result = await response.json()
    return result as Video
  } catch (error) {
    console.error(error)
    return null
  }
}