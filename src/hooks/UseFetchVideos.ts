import { useEffect, useReducer, useState } from "react";
import { err, ok } from "../api/apiHelperFunctions";
import VideoApi from "../api/VideoApi";
import { baseVideoLimit } from "../config";
import { Pagination, ReducerVideo, Result, Video } from "../types";
import { reducerVideo, initialStateVideo } from "./ReducerVideo";

/**
 * Call fetchMore to get the request to work
 * @returns
 */
export default function UseFetchVideos(params = {}) {
  const [{ limit, skip, data, total }, dispatch] = useReducer(
    reducerVideo,
    initialStateVideo(baseVideoLimit),
  );
  const [errors, setErrors] = useState("");

  const fetchVideos = async (): Promise<Result<Pagination<Video>, Error>> => {
    const [result, error] = await VideoApi.Instance.findByFields(limit, skip, params);
    if (error) {
      console.error(error);
      return err(error);
    }

    setErrors("");
    return ok(result);
  };

  const fetchMore = async () => {
    const [result, error] = await fetchVideos();
    if (error) {
      setErrors(error.message);
      return;
    }
    dispatch({ type: "setData", value: result.data });
    dispatch({ type: "addSkip" });
    dispatch({ type: "setTotal", value: result.total });
  };

  const refetch = async () => {
    const [result, error] = await fetchVideos();
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
    videos: data,
    hasMore: skip + limit < total,
    fetchMore,
    refetch,
    errors,
  };
}
