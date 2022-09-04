import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { err } from "../api/apiHelperFunctions";
import VideoApi from "../api/VideoApi";
import { setVideo } from "../features/video/videoSlice";
import { Result, Video } from "../types";

export default function UseFetchMovieInfo(id: string) {
  const dispatch = useDispatch();
  const [infoMovie, setInfoMovie] = useState<Video>({} as Video);

  const fetchMovie = async (): Promise<Result<Video, Error>> => {
    const [result, error] = await VideoApi.Instance.get(id);
    if (error) {
      console.log(error);
      return err(error);
    }
    setInfoMovie(result);

    dispatch(setVideo(result));
  };

  useEffect(() => {
    if (id && id.length > 0) fetchMovie();
  }, []);

  return {
    name: infoMovie.filename,
    type: infoMovie.type,
  };
}
