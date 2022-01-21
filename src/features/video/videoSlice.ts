import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export const videoSlice = createSlice({
  name: 'video',
  initialState: {
    location: ''
  },
  reducers: {
    set: (state, action: PayloadAction<string>) => {
      state.location = action.payload
    }
  }
})

export const { set } = videoSlice.actions;

export default videoSlice.reducer;