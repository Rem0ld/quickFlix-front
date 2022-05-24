import { useEffect, useReducer, useState } from "react";
import { baseUrl, baseVideoLimit } from "../config";
import { Pagination, Video } from "../types";
import { initialStateVideo, reducerVideo } from "./ReducerVideo";

/**
 * Call fetchMore to get the request to work
 * @returns
 */
export default function UseFetchMovies({ onlyMovie }: { onlyMovie: boolean }) {
  const [filter, setFilter] = useState<boolean>();
  const [{ limit, skip, data, total }, dispatch] = useReducer(
    reducerVideo,
    initialStateVideo(baseVideoLimit),
  );

  const fetchMovies = async (): Promise<Pagination<Video>> => {
    const response = await fetch(
      `${baseUrl}video?limit=${limit}&skip=${skip}&movie=${filter}`,
    );
    const result = await response.json();

    return result;
  };

  const fetchMore = async () => {
    const result = await fetchMovies();
    dispatch({ type: "setData", value: result.data });
    dispatch({ type: "addSkip" });
    dispatch({ type: "setTotal", value: result.total });
  };

  const refetch = async () => {
    const result = await fetchMovies();
    dispatch({ type: "setData", value: result.data });
    dispatch({ type: "setTotal", value: result.total });
  };

  useEffect(() => {
    fetchMore();
  }, []);

  useEffect(() => {
    if (filter === undefined) {
      setFilter(onlyMovie);
      return;
    }

    if (onlyMovie !== filter) {
      setFilter(onlyMovie);
      dispatch({ type: "reset" });
    }
  }, [onlyMovie]);

  useEffect(() => {
    fetchMore();
  }, [filter])

  return {
    movies: data,
    hasMoreMovie: skip + limit < total,
    fetchMoreMovies: fetchMore,
    refetch,
  };
}
