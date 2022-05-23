import { useEffect, useReducer } from 'react'
import { baseUrl } from '../config';
import { Pagination, Video } from '../types';
import { initialStateVideo, reducerVideo } from './ReducerVideo';

/**
 * Call fetchMore to get the request to work
 * @returns 
 */
export default function UseFetchMovies() {
  const [{ limit, skip, data, total }, dispatch] = useReducer(reducerVideo, initialStateVideo(50));

  const fetchMovies = async (): Promise<Pagination<Video>> => {
    const response = await fetch(`${baseUrl}video?limit=${limit}&skip=${skip}&movie=true`);
    const result = await response.json();

    return result;
  };

  const fetchMore = async () => {
    const result = await fetchMovies();
    dispatch({ type: "setData", value: result.data });
    dispatch({ type: "addSkip" });
    dispatch({ type: "setTotal", value: result.total });
  };

  useEffect(() => {
    fetchMore()
  }, [])

  return {
    movies: data, hasMoreMovie: skip + limit < total,
    fetchMoreMovies: fetchMore
  }
}