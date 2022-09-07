import { baseVideoLimit } from "../config";
import { Pagination, ReducerVideo, TvShow, Video } from "../types";

export const initialStateVideo = (limit: number): Pagination<any> => {
  return {
    limit: limit,
    skip: 0,
    total: 0,
    data: [],
  };
};

export const reducerVideo: ReducerVideo<any> = (state, action) => {
  switch (action.type) {
    case "addSkip":
      return { ...state, skip: state.skip + state.limit };
    case "setTotal":
      return { ...state, total: action.value };
    case "setData":
      return { ...state, data: action.value };
    case "appendData":
      return { ...state, data: [...state.data, ...action.value] };
    case "reset":
      return initialStateVideo(baseVideoLimit);
    case "initialFetch":
      return {
        ...state,
        skip: state.skip + state.limit,
        total: action.value.total,
        data: action.value.data,
      };
    default:
      return state;
  }
};
