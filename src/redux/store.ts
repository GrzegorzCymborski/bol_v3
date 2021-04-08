import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user';
import sidebarReducer from './sidebar';
import trackedReducer from './trackedSeller';
import { getDefaultMiddleware } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    user: userReducer,
    sidebar: sidebarReducer,
    trackedSeller: trackedReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
