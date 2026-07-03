import { createSlice } from '@reduxjs/toolkit';

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: {
    items: [],           // list of { type, message, data, timestamp }
    unreadCount: 0,
    isConnected: false,  // socket connection status
  },
  reducers: {
    notificationReceived: (state, action) => {
      state.items.unshift(action.payload);   // newest first
      state.unreadCount += 1;
      if (state.items.length > 50) state.items.pop(); // cap memory use
    },
    markAllRead: (state) => {
      state.unreadCount = 0;
    },
    setConnectionStatus: (state, action) => {
      state.isConnected = action.payload;
    },
  },
});

export const { notificationReceived, markAllRead, setConnectionStatus } = notificationsSlice.actions;
export default notificationsSlice.reducer;
