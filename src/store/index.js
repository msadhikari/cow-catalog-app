import { configureStore } from '@reduxjs/toolkit';
import cowReducer from './cowSlice';

export const store = configureStore({
  reducer: {
    cow: cowReducer
  }
});
