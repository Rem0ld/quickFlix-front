import { baseVideoLimit } from "../config";
import { Pagination, ReducerVideo, TvShow, Video } from "../types";

export const initialStateVideo = (limit: number): Pagination<Video | TvShow> => ({
  limit: limit,
  skip: 0,
  total: 0,
  data: [],
})

export const reducerVideo: ReducerVideo = (state, action) => {
  switch (action.type) {
    case "addSkip":
      return { ...state, skip: state.skip + state.limit };
    case "setTotal":
      return { ...state, total: action.value };
    case "setData":
      return { ...state, data: [...state.data, ...action.value] };
    case "reset":
      return initialStateVideo(baseVideoLimit)
    default:
      return state;
  }
};