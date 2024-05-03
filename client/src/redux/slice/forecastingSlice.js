import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
};

export const forecastingSlice = createSlice({
  name: 'forecasting',
  initialState,
  reducers: {
    setForecastingData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setForecastingData } = forecastingSlice.actions;

export const selectForecastingData = (state) => state.forecasting.data;

export default forecastingSlice.reducer;
