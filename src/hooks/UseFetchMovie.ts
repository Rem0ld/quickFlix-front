import { useReducer } from 'react'
import { Pagination, Video } from '../types';
import { initialStateVideo, reducerVideo } from './ReducerVideo';

export default function UseFetchMovie() {
  const [{ limit, skip, data, total }, dispatch] = useReducer(reducerVideo, initialStateVideo(50));

  const fetchMovies = async (): Promise<Pagination<Video>> => {
    const response = await fetch(`http://${import.meta.env.DEV ? 'localhost' : '192.168.0.11'}:3050/video?limit=${limit}&skip=${skip}&movie=true`);
    const result = await response.json();

    return result;
  };

  const fetchMore = async () => {
    const result = await fetchMovies();
    dispatch({ type: "setData", value: result.data });
    dispatch({ type: "addSkip" });
    dispatch({ type: "setTotal", value: result.total });
  };

  return {
    movies: data, hasMoreMovie: skip + limit < total,
    fetchMoreMovies: fetchMore
  }
}