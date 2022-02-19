import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { baseUrl } from '../config';
import { setVideo } from '../features/video/videoSlice';
import { Video } from '../types';


export default function UseFetchMovieInfo(id: string | null) {
  const dispatch = useDispatch()
  const [infoMovie, setInfoMovie] = useState<Video>({} as Video);

  const fetchMovie = async (): Promise<Video> => {
    const response = await fetch(`${baseUrl}video/${id}`);
    const result = await response.json();
    setInfoMovie(result);

    dispatch(setVideo(result))
    return result;
  };

  useEffect(() => {
    if (id && id.length > 0) fetchMovie()
  }, [])


  return {
    name: infoMovie.filename, type: infoMovie.type
  }
}