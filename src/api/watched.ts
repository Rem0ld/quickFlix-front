// import { baseUrl, headers } from "../config";

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