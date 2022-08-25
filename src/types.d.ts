import { DeepPartial } from "redux";

export interface IApiClass<T> {
  get: (id: string) => Promise<T>;
  find: (limit: number, skip: number) => Promise<Result<Pagination<T>, Error>>;
  update: (id: string, data: DeepPartial<T>) => Promise<T>;
  delete: (id: string) => Promise<boolean>;
  create: (data: DeepPartial<T>) => Promise<Result<T, Error>>;
}

// export interface IStreamClass {

// }

export type Pagination<T> = {
  total: number;
  skip: number;
  limit: number;
  data: T[];
};

export type Video = {
  id: number | string;
  uuid: string;
  idMovieDb?: string;
  releaseDate?: string;
  name: string;
  basename: string;
  filename: string;
  location: string;
  episode?: string;
  season?: string;
  ext: string;
  subtitles?: string[];
  type: "movie" | "tv";
  posterPath?: string[];
  resume?: string;
  genres?: string[];
  trailerYtCode?: string[];
  score?: number;
  year?: string;
  length?: number;
  watched?: Watched | Watched[];
};

export type Watched = {
  id: number | string;
  timeWatched?: number;
  length?: number;
  finished?: boolean;
  video: string;
  user: string;
  createdAt: Date;
  updatedAt: Date;
};

export type TVideoSorted = {
  [x: number | string]: {
    [x: number | string]: Video;
  };
};

export type TvShow = {
  id: number | string;
  idMovieDb?: string;
  name: string;
  location: string;
  numberSeason?: number;
  numberEpisode?: number;
  ongoing?: boolean;
  originCountry?: string[];
  posterPath?: string[];
  resume?: string;
  score?: number;
  date?: Date;
  genres?: string[];
  trailerYtCode?: string[];
  firstAirDate?: string;
  averageLength?: number;
  videos?: Video[];
  watched?: Watched[];
};

export type ActionReducer = {
  type: string;
  value?: any;
};

export type ReducerVideo<T> = (
  arg: Pagination<T>,
  arg1: ActionReducer,
) => Pagination<T>;

export type ParsedMovieTime = {
  h: number;
  min: number;
};

export type ParsedWatchedTime = {
  mins: number;
  total: number;
};

export type Result<T, E> = [T?, E?];
export type TResultService<T> = {
  total: number;
  data: T[];
};

// export interface VideoState {
//   id: string;
//   name: string;
//   posterPath: string[];
//   ytKeys: string[];
//   genres: string[];
//   year: string;
//   resume: string;
//   score: number;
//   length: number;
//   watchTime: number;
//   seasons: Season[] | [];
//   subtitles: string[];
//   percentageSeen: number;
// }
