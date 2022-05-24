import { baseUrl, headers } from "../config";
import { Video } from "../types";

export async function updateVideo(id: string | undefined, data: any): Promise<Response | null> {
  if (!id) return null;
  return fetch(`${baseUrl}video/${id}`, {
    method: "PATCH",
    headers,
    body: JSON.stringify(data)
  })
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

export async function deleteVideoById(id: string): Promise<Video | null | void> {
  if (!id) return;

  try {
    const response = await fetch(`${baseUrl}video/${id}`, {
      method: "DELETE",
      headers
    })
    const result = await response.json()
    console.log("🚀 ~ file: video.ts ~ line 40 ~ deleteVideoById ~ result", result)
    return result
  } catch (err) {
    console.error(err)
  }
}