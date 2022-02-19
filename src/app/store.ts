import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import videoReducer from '../features/video/videoSlice'

export const store = configureStore({
  reducer: {
    details: videoReducer
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
