import { baseVideoLimit } from "../config";
import { Pagination, ReducerVideo, TvShow, Video } from "../types";

export const initialStateVideo = (limit: number): Pagination<Video | TvShow> => {
  console.log("in the initial state")
  return ({
    limit: limit,
    skip: 0,
    total: 0,
    data: [],
  })
}

export const reducerVideo: ReducerVideo<Video | TvShow> = (state, action) => {
  switch (action.type) {
    case "addSkip":
      console.log("addskip")
      return { ...state, skip: state.skip + state.limit };
    case "setTotal":
      console.log("settotal")
      return { ...state, total: action.value };
    case "setData":
      console.log("setdata")
      return { ...state, data: [...state.data, ...action.value] };
    case "reset":
      console.log("initialstate")
      return initialStateVideo(baseVideoLimit)
    case "initialFetch":
      console.log("initialfetch")
      return { ...state, skip: state.skip + state.limit, total: action.value.total, data: action.value.data }
    default:
      return state;
  }
};