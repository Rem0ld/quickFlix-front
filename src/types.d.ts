export type Pagination<T> = {
  total: number;
  skip: number;
  limit: number;
  data: T[];
};

export type Video = {
  _id: string;
  name: string;
  location: string;
  ext: string;
  subtitles: string[];
  type: "movie" | "tv"
  posterPath?: string[]
  resume: string;
  genres: string[];
  trailerYtCode: string[];
  score: number;
};

export type Episode = { number: string, ref: Video | string }
export type Season = {
  number: string,
  episodes: Episode[],
}
export type TvShow = {
  _id: string;
  idMovieDb?: string;
  name: string;
  numberSeason?: number;
  numberEpisode?: number;
  seasons: Season[],
  ongoing?: boolean;
  originCountry?: string;
  posterPath?: string[];
  resume?: string;
  score?: number;
  date?: Date;
  genres: string[];
  trailerYtCode?: string;
};

export type ActionReducer = {
  type: string;
  value?: any;
};

export type ReducerVideo = (arg: Pagination<Video | TvShow>, arg1: ActionReducer) => Pagination<Video | TvShow>