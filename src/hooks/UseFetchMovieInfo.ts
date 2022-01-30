import { useEffect, useState } from 'react'
import { baseUrl } from '../config';
import { Video } from '../types';


export default function UseFetchMovieInfo(id: string) {
  const [infoMovie, setInfoMovie] = useState<Video>({} as Video);

  const fetchMovie = async (): Promise<Video> => {
    const response = await fetch(`${baseUrl}video/${id}`);
    const result = await response.json();
    setInfoMovie(result);

    return result;
  };

  useEffect(() => {
    if (id.length > 0) fetchMovie()
  }, [])


  return {
    name: infoMovie.name, type: infoMovie.type
  }
}