import { useReducer } from 'react'
import { Pagination, TvShow } from '../types';
import { initialStateVideo, reducerVideo } from './ReducerVideo';

export default function UseFetchTvShow() {
  const [{ limit, skip, data, total }, dispatch] = useReducer(reducerVideo, initialStateVideo(50))

  const fetchTvShows = async (): Promise<Pagination<TvShow>> => {
    const response = await fetch(`http://${process.env.REACT_BACK_IP}:3050/tv-show?limit=${limit}&skip=${skip}&populate=true`)
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
    tvShows: data, hasMoreTvShow: skip + limit < total,
    fetchMoreTvShows: fetchMore
  }
}