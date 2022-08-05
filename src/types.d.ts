export type Pagination<T> = {
  total: number;
  skip: number;
  limit: number;
  data: T[];
};

export type Video = {
  id: number;
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
  type: "movie" | "tv"
  posterPath?: string[]
  resume?: string;
  genres?: string[];
  trailerYtCode?: string[];
  score?: number;
  year?: string;
  length?: number;
  watched?: Watched | Watched[];
};

export type Watched = {
  id: number;
  timeWatched?: number;
  length?: number;
  finished?: boolean;
  video: string;
  user: string;
  createdAt: Date;
  updatedAt: Date;
}

export type TvShow = {
  id: number;
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