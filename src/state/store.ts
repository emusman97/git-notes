import { configureStore } from '@reduxjs/toolkit';
import { USER_SLICE_NAME, userReducer } from './slices';

export const store = configureStore({
  reducer: {
    [USER_SLICE_NAME]: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
