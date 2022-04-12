import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import videoReducer from "../features/video/videoSlice";
import tvShowReducer from "../features/tvShow/tvShowSlice";

export const store = configureStore({
  reducer: {
    details: videoReducer,
    detailsTvShow: tvShowReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
