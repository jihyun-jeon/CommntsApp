import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import commentsReducer from './commentsSlice';

export const store = configureStore({
  reducer: {
    comments: commentsReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
