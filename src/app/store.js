import { configureStore } from '@reduxjs/toolkit';
import notificationsReducer from '../features/notifications/notificationsSlice';
import statsReducer from '../features/dashboard/statsSlice';

export const store = configureStore({
  reducer: {
    notifications: notificationsReducer,
    stats: statsReducer,
  },
});
