import { useReducer } from 'react'
import { baseUrl } from '../config';
import { Pagination, ReducerVideo, TvShow } from '../types';
import { initialStateVideo, reducerVideo } from './ReducerVideo';

export default function UseFetchTvShow() {
  const [{ limit, skip, data, total }, dispatch] = useReducer<ReducerVideo>(reducerVideo, initialStateVideo(50))

  const fetchTvShows = async (): Promise<Pagination<TvShow>> => {
    console.log("fetching more")
    const response = await fetch(`${baseUrl}tv-show?limit=${limit}&skip=${skip}&populate=true`)
    const result = await response.json();

    return result;
  }

  const fetchMore = async () => {
    const result = await fetchTvShows();
    dispatch({ type: "setData", value: result.data });
    dispatch({ type: "addSkip" });
    dispatch({ type: "setTotal", value: result.total });
  };

  return {
    tvShows: data as TvShow[], hasMoreTvShow: skip + limit < total,
    fetchMoreTvShows: fetchMore
  }
}