import { configureStore } from '@reduxjs/toolkit';
import { USER_SLICE_NAME, userReducer } from './slices';
import { gistsApi } from '@/core';

export const store = configureStore({
  reducer: {
    [USER_SLICE_NAME]: userReducer,
    [gistsApi.reducerPath]: gistsApi.reducer,
  },

  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().concat(gistsApi.middleware);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
