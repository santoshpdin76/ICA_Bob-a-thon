import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  notifications: [],
}

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification: (state, action) => {
      const notification = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        ...action.payload,
      }
      state.notifications.unshift(notification)
      
      // Keep only last 50 notifications
      if (state.notifications.length > 50) {
        state.notifications = state.notifications.slice(0, 50)
      }
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter((n) => n.id !== action.payload)
    },
    clearNotifications: (state) => {
      state.notifications = []
    },
    markAsRead: (state, action) => {
      const notification = state.notifications.find((n) => n.id === action.payload)
      if (notification) {
        notification.read = true
      }
    },
    markAllAsRead: (state) => {
      state.notifications.forEach((n) => {
        n.read = true
      })
    },
  },
})

export const {
  addNotification,
  removeNotification,
  clearNotifications,
  markAsRead,
  markAllAsRead,
} = notificationSlice.actions

export default notificationSlice.reducer

// Helper function to create notifications
export const createNotification = (type, title, message) => {
  return addNotification({
    type, // 'success', 'error', 'warning', 'info'
    title,
    message,
    read: false,
  })
}

// Made with Bob
