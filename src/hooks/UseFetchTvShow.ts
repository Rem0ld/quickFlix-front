import { useEffect, useReducer, useState } from "react";
import { err, ok } from "../api/apiHelperFunctions";
import TvShowApi from "../api/TvShowApi";
import VideoApi from "../api/VideoApi";
import { baseVideoLimit } from "../config";
import { Pagination, ReducerVideo, Result, TvShow, Video } from "../types";
import { initialStateVideo, reducerVideo } from "./ReducerVideo";

export default function UseFetchTvShow(params = {}) {
  const [{ limit, skip, data, total }, dispatch] = useReducer(
    reducerVideo,
    initialStateVideo(baseVideoLimit),
  );

  const [errors, setErrors] = useState("");

  const fetch = async (): Promise<Result<Pagination<TvShow>, Error>> => {
    const [result, error] = await TvShowApi.Instance.find(limit, skip);
    if (error) {
      console.error(error);
      return err(error);
    }

    setErrors("");
    return ok(result);
  };

  const fetchMore = async () => {
    const [result, error] = await fetch();
    if (error) {
      setErrors(error.message);
      return;
    }
    dispatch({ type: "setData", value: result.data });
    dispatch({ type: "addSkip" });
    dispatch({ type: "setTotal", value: result.total });
  };

  const refetch = async () => {
    const [result, error] = await fetch();
    if (error) {
      setErrors(error.message);
      return;
    }

    dispatch({ type: "setData", value: result.data });
    dispatch({ type: "setTotal", value: result.total });
  };

  useEffect(() => {
    fetchMore();
  }, []);

  return {
    tvShows: data,
    hasMoreTvShows: skip + limit < total,
    fetchMoreTvShows: fetchMore,
    refetchTvShows: refetch,
    errorsTvShows: errors,
  };


  // // const fetchTvShows = async (): Promise<Pagination<TvShow>> => {
  // //   const response = await fetch(`${baseUrl}tv-show?limit=${limit}&skip=${skip}&populate=true`)
  // //   const result = await response.json();

  // //   return result;
  // // }

  // const fetchMore = async () => {
  //   // const result = await fetchTvShows();
  //   dispatch({ type: "setData", value: result.data });
  //   dispatch({ type: "addSkip" });
  //   dispatch({ type: "setTotal", value: result.total });
  // };

  // return {
  //   tvShows: data as TvShow[], hasMoreTvShow: skip + limit < total,
  //   fetchMoreTvShows: fetchMore
  // }
}
