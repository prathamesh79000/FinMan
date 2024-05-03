// store.js
import { configureStore } from '@reduxjs/toolkit';
import forecastingReducer from '../slice/forecastingSlice';
import userReducer from '../slice/userSlice'; 


export default configureStore({
  reducer: {
    forecasting: forecastingReducer,
    user: userReducer,
  },
});
