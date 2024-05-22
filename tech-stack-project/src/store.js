import { configureStore } from '@reduxjs/toolkit'
import formStateDataReducer from './formStateDataSlice'

export const store = configureStore({
  reducer: {
    formStateData: formStateDataReducer,
  },
})