import { MutableRefObject } from "react";

export type Pagination<T> = {
  total: number;
  skip: number;
  limit: number;
  data: T[];
};

export type Video = {
  _id: string;
  idMovieDb: string;
  releaseDate: string;
  name: string;
  basename: string;
  filename: string;
  location: string;
  episode?: string;
  season?: string;
  ext: string;
  subtitles: string[];
  type: "movie" | "tv"
  posterPath?: string[]
  resume: string;
  genres: string[];
  trailerYtCode: string[];
  score: number;
  year: string;
  length: number;
};

export type Episode = { _id: string; number: string, ref: Partial<Video> }
export type Season = {
  _id: string;
  number: string,
  episodes: Episode[],
}
export type TvShow = {
  _id: string;
  idMovieDb?: string;
  name: string;
  location: string;
  numberSeason?: number;
  numberEpisode?: number;
  seasons: Season[],
  ongoing?: boolean;
  originCountry?: string[];
  posterPath?: string[];
  resume?: string;
  score?: number;
  date?: Date;
  genres: string[];
  trailerYtCode?: string[];
  firstAirDate: string;
};

export type ActionReducer = {
  type: string;
  value?: any;
};

export type ReducerVideo = (arg: Pagination<Video | TvShow>, arg1: ActionReducer) => Pagination<Video | TvShow>

export type ParsedMovieTime = {
  h: number;
  min: number;
}

export type ParsedWatchedTime = {
  mins: number;
  total: number;
}