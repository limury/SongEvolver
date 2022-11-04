import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import authReducer from './authSlice'
import spotifyReducer from './spotifySlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    spotify: spotifyReducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware()
})

setupListeners(store.dispatch)
export default store