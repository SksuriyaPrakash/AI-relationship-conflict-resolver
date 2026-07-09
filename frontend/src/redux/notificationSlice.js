import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  notifications: [],
  toasts: [],
};

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification: (state, action) => {
      const { message, type = 'info', title = 'Notification' } = action.payload;
      const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
      
      const newNotif = {
        id,
        title,
        message,
        type,
        timestamp: new Date().toISOString(),
        isRead: false
      };
      
      state.notifications.unshift(newNotif);
      state.toasts.unshift(newNotif);
    },
    removeToast: (state, action) => {
      state.toasts = state.toasts.filter(t => t.id !== action.payload);
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
    markAllAsRead: (state) => {
      state.notifications = state.notifications.map(n => ({ ...n, isRead: true }));
    }
  }
});

export const { addNotification, removeToast, clearNotifications, markAllAsRead } = notificationSlice.actions;
export default notificationSlice.reducer;
