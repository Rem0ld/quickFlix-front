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
  // const [{ limit, skip, data, total }, dispatch] = useReducer(
  //   reducerVideo,
  //   initialStateVideo(baseVideoLimit),
  // );
  const [limit, setLimit] = useState(baseVideoLimit);
  const [skip, setSkip] = useState(0);
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [errors, setErrors] = useState("");
  const [isFetching, setIsFetching] = useState(false);

  const fetchVideos = async (): Promise<Result<Pagination<Video>, Error>> => {
    setIsFetching(true);
    console.log(
      "🚀 ~ file: UseFetchVideos.ts ~ line 14 ~ UseFetchVideos ~ skip",
      skip,
    );
    const [result, error] = await VideoApi.Instance.findByFields(
      limit,
      skip,
      params,
    );
    if (error) {
      setIsFetching(false);
      console.error(error);
      return err(error);
    }

    setIsFetching(false);
    setErrors("");
    return ok(result);
  };

  const fetchMore = async () => {
    const [result, error] = await fetchVideos();
    console.log(
      "🚀 ~ file: UseFetchVideos.ts ~ line 48 ~ fetchMore ~ result",
      result,
    );
    if (error) {
      setErrors(error.message);
      return;
    }
    setData((data) => [...data, ...result.data]);
    setTotal(result.total);
    setSkip((skip) => skip + limit);
    // dispatch({ type: "setData", value: result.data });
    // dispatch({ type: "addSkip" });
    // dispatch({ type: "setTotal", value: result.total });
  };

  const refetch = async () => {
    const [result, error] = await fetchVideos();
    if (error) {
      setErrors(error.message);
      return;
    }

    setData((data) => [...data, result.data]);
    // dispatch({ type: "setData", value: result.data });
    // dispatch({ type: "setTotal", value: result.total });
  };

  useEffect(() => {
    console.log("should not pass here more than once");
    fetchMore();
  }, []);

  return {
    videos: data,
    hasMore: skip + limit < total,
    fetchMore,
    refetch,
    errors,
    skip,
    isFetching,
  };
}
