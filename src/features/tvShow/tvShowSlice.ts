import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Season, TvShow, Video } from "../../types";

export const initialStateDetailsTvShow: TvShow = {
  _id: "",
  idMovieDb: "",
  name: "",
  location: "",
  firstAirDate: "",
  posterPath: [],
  originCountry: [],
  ongoing: false,
  date: new Date(),
  trailerYtCode: [],
  genres: [],
  resume: "",
  score: 0,
  seasons: [],
};

export const tvShowSlice = createSlice({
  name: "detailsTvShow",
  initialState: initialStateDetailsTvShow,
  reducers: {
    setTvShow: (state, action: PayloadAction<TvShow>) => {
      return action.payload;
    },
  },
});

export const { setTvShow } = tvShowSlice.actions;

export default tvShowSlice.reducer;
