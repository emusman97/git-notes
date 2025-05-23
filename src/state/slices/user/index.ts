import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { UserState } from './types';
import type { User } from '@/models';

export const USER_SLICE_NAME = 'user';

const initialState: UserState = {
  isAuthenticated: false,
  loading: false,
};

const userSlice = createSlice({
  initialState,
  name: USER_SLICE_NAME,
  reducers: {
    setIsAuthenticated(state, action: PayloadAction<boolean>) {
      state.isAuthenticated = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },

    login(state, action: PayloadAction<User>) {
      state.isAuthenticated = true;
      state.details = action.payload;
    },
  },
});

export const userReducer = userSlice.reducer;
export const userActions = userSlice.actions;
