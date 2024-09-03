import { configureStore } from '@reduxjs/toolkit';
import characterReducer from '../features/characters/characterSlice';

export const store = configureStore({
  reducer: {
    characters: characterReducer,
  },
});
