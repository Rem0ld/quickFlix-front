import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Season, Video } from "../../types";

export type VideoState = Partial<Video> & { percentageSeen?: number }

export const initialStateDetailsVideo: VideoState = {
  _id: '',
  name: '',
  posterPath: [],
  trailerYtCode: [],
  genres: [],
  year: '',
  resume: '',
  score: 0,
  length: 0,
  watched: {
    _id: '',
    timeWatched: 0,
    length: 0,
    finished: false,
    video: '',
    user: ''
  },
  season: '',
  subtitles: [],
  percentageSeen: 0
}


export const videoSlice = createSlice({
  name: 'details',
  initialState: initialStateDetailsVideo,
  reducers: {
    setVideo: (state, action: PayloadAction<VideoState>) => {
      return action.payload
    },
    setLength: (state, action: PayloadAction<number>) => {
      state.length = action.payload
    },
    setPercentage: (state, action: PayloadAction<number>) => {
      state.percentageSeen = action.payload
    },
    setUpdateTimeWatched: (state, action: PayloadAction<number>) => {
      // TODO: find a way to avoid doing this
      if (!state.watched) {
        state.watched = {
          _id: '',
          timeWatched: 0,
          length: 0,
          finished: false,
          video: '',
          user: ''
        }
      }
      state.watched.timeWatched = action.payload
    }
  }
})

export const { setVideo, setLength, setPercentage, setUpdateTimeWatched } = videoSlice.actions;

export default videoSlice.reducer;