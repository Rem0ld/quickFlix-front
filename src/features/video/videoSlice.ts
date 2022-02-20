import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Season } from "../../types";

export interface VideoState {
  id: string;
  name: string;
  posterPath: string[];
  ytKeys: string[];
  genres: string[];
  year: string;
  resume: string;
  score: number;
  length: number;
  watchTime: number;
  seasons: Season[] | [];
  subtitles: string[];
  percentageSeen: number;
}

export const initialStateDetailsVideo: VideoState = {
  id: '',
  name: '',
  posterPath: [],
  ytKeys: [],
  genres: [],
  year: '',
  resume: '',
  score: 0,
  length: 0,
  watchTime: 0,
  seasons: [],
  subtitles: [],
  percentageSeen: 0
}


export const videoSlice = createSlice({
  name: 'details',
  initialState: initialStateDetailsVideo,
  reducers: {
    setVideo: (state, action: PayloadAction<VideoState>) => {
      return action.payload
    }
  }
})

export const { setVideo } = videoSlice.actions;

export default videoSlice.reducer;