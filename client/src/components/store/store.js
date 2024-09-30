import { configureStore } from '@reduxjs/toolkit'
import userSlice from "./userSlice"

export const stores = configureStore({
  reducer: {
    user:userSlice,
  },
})