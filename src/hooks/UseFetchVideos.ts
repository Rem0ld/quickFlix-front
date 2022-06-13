import { useEffect, useReducer, useState } from "react";
import { baseUrl, baseVideoLimit } from "../config";
import { Pagination, Video } from "../types";
import { initialStateVideo, reducerVideo } from "./ReducerVideo";

/**
 * Call fetchMore to get the request to work
 * @returns
 */
export default function UseFetchVideos({ onlyMovie }: { onlyMovie: boolean }) {
  const [filter, setFilter] = useState<boolean>(onlyMovie);
  const [limit, setLimit] = useState(baseVideoLimit)
  const [skip, setSkip] = useState(0)
  const [total, setTotal] = useState(0)
  const [data, setData] = useState<Video[]>([])
  // const [{ limit, skip, data, total }, dispatch] = useReducer(
  //   reducerVideo,
  //   initialStateVideo(baseVideoLimit),
  // );
  const [hasMore, setHasMore] = useState<boolean>()

  const fetchVideos = async (): Promise<Pagination<Video>> => {
    const response = await fetch(
      `${baseUrl}video?limit=${limit}&skip=${skip}&movie=${filter}`,
    );
    const result = await response.json();

    return result;
  };

  const initialFetch = async () => {
    const result = await fetchVideos();

    setData([...data, ...result.data].sort((a: Video, b: Video) => {
      return a.name.localeCompare(b.name)
    }))
    if (total !== result.total) {
      setTotal(result.total)
    }
    setSkip(skip + limit)
    // dispatch({
    //   type: "initialFetch",
    //   value: { ...result }
    // })
  }

  const fetchMore = async () => {
    console.log("fetchMore")
    const result = await fetchVideos();
    setData([...data, ...result.data].sort((a: Video, b: Video) => {
      return a.name.localeCompare(b.name)
    }))
    if (total !== result.total) {
      setTotal(result.total)
    }
    setSkip(skip + limit)
    // dispatch({
    //   type: "setData", value: result.data.sort((a: Video, b: Video) => {
    //     return a.name.localeCompare(b.name)
    //   })
    // });
    // dispatch({ type: "addSkip" });
    // dispatch({
    //   type: "setTotal", value: result.total
    // });
  };

  const refetch = async () => {
    const result = await fetchVideos();
    setData(result.data)
    setTotal(result.total)
    // dispatch({ type: "setData", value: result.data });
    // dispatch({ type: "setTotal", value: result.total });
  };

  useEffect(() => {
    console.log("initialfetch")
    initialFetch()
  }, [])

  useEffect(() => {
    if (onlyMovie !== filter) {
      console.log("onlymovie !== filter")
      setFilter(onlyMovie);
      // dispatch({ type: "reset" });
      fetchMore()
    }
  }, [onlyMovie]);

  // useEffect(() => {
  //   fetchMore()
  // }, [filter])

  useEffect(() => {
    console.log("data has changed")
    console.log('skip + limit', skip + limit, 'total', total)
    setHasMore(skip + limit < total)
  }, [data])

  return {
    videos: data as Video[],
    skip,
    limit,
    total,
    fetchMore: fetchMore,
    refetch,
  };
}
