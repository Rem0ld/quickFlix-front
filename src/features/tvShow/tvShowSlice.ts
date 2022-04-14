import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Season, TvShow, Video, Watched } from "../../types";

export const initialStateDetailsTvShow: TvShow = {
  _id: "",
  idMovieDb: "",
  name: "",
  location: "",
  firstAirDate: "",
  posterPath: [],
  originCountry: [],
  ongoing: false,
  date: undefined,
  trailerYtCode: [],
  genres: [],
  resume: "",
  score: 0,
  seasons: [],
  watched: []
};

export const tvShowSlice = createSlice({
  name: "detailsTvShow",
  initialState: initialStateDetailsTvShow,
  reducers: {
    setTvShow: (state, action: PayloadAction<TvShow>) => {
      return action.payload;
    },
    setWatched: (state, action: PayloadAction<Watched[]>) => {
      state.watched = action.payload;
    }
  },
});

export const { setTvShow, setWatched } = tvShowSlice.actions;

export default tvShowSlice.reducer;
