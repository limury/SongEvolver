import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { pokemonApi } from '../services/pokemon'
import { spotifyApi } from '../services/spotify'
import counterReducer from './counter/counterSlice'
import authReducer from './authSlice'
import spotifyReducer from './spotifySlice'

const store = configureStore({
  reducer: {
    counter: counterReducer,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
    [spotifyApi.reducerPath]: spotifyApi.reducer,
    auth: authReducer,
    spotify: spotifyReducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware()
})

setupListeners(store.dispatch)
export default store