import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Video } from "../../types";

export type VideoState = Partial<Video> & { percentageSeen?: number };

export const initialStateDetailsVideo: VideoState = {
  id: "",
  uuid: "",
  name: "",
  posterPath: [],
  trailerYtCode: [],
  genres: [],
  year: "",
  resume: "",
  score: 0,
  length: 0,
  userWatchedVideo: [],
  watched: {
    id: "",
    timeWatched: 0,
    length: 0,
    finished: false,
    createdAt: null,
    updatedAt: null,
  },
  season: "",
  subtitles: [],
  percentageSeen: 0,
};

export const videoSlice = createSlice({
  name: "details",
  initialState: initialStateDetailsVideo,
  reducers: {
    setVideo: (state, action: PayloadAction<VideoState>) => {
      return action.payload;
    },
    setLength: (state, action: PayloadAction<number>) => {
      state.length = action.payload;
    },
    setPercentage: (state, action: PayloadAction<number>) => {
      state.percentageSeen = action.payload;
    },
    setWatched: (state, action) => {
      state.watched = action.payload;
    },
    setUpdateTimeWatched: (state, action: PayloadAction<number>) => {
      // TODO: find a way to avoid doing this
      // if (!state.watched) {
      //   const date = new Date();
      //   state.watched = {
      //     id: "",
      //     timeWatched: 0,
      //     length: 0,
      //     finished: false,
      //     createdAt: date,
      //     updatedAt: date,
      //   };
      // }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      state.userWatchedVideo[0].timeWatched = action.payload;
    },
  },
});

export const {
  setVideo,
  setLength,
  setPercentage,
  setUpdateTimeWatched,
  setWatched,
} = videoSlice.actions;

export default videoSlice.reducer;
