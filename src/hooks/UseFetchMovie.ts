import React, { useReducer } from 'react'
import { Pagination, Video, ActionReducer } from '../types';

const reducer = (state: Pagination<Video>, action: ActionReducer): Pagination<Video> => {
  switch (action.type) {
    case "addSkip":
      return { ...state, skip: state.skip + state.limit };
    case "setTotal":
      return { ...state, total: action.value };
    case "setVideos":
      return { ...state, data: [...state.data, ...action.value] };
    default:
      return state;
  }
};

const initialState: Pagination<Video> = {
  limit: 50,
  skip: 0,
  total: 0,
  data: [],
};


export default function UseFetchMovie() {
  const [{ limit, skip, data, total }, dispatch] = useReducer(reducer, initialState);

  const fetchMovies = async (): Promise<Pagination<Video>> => {
    const response = await fetch(`http://localhost:3050/video?limit=${limit}&skip=${skip}&movie=true`);
    const result = await response.json();

    return result;
  };

  const fetchMore = async () => {
    const result = await fetchMovies();
    dispatch({ type: "setVideos", value: result.data });
    dispatch({ type: "addSkip" });
    dispatch({ type: "setTotal", value: result.total });
  };

  return {
    movies: data, hasMoreMovie: skip + limit < total,
    fetchMoreMovies: fetchMore
  }
}