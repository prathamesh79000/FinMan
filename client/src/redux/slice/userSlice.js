// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
    },
    setError(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    clearUser(state) {
      state.user = null;
      state.error = null;
    },
  },
});

export const { setUser, setError, clearUser } = userSlice.actions;

export default userSlice.reducer;
