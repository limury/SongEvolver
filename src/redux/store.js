import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { pokemonApi } from '../services/pokemon'
import { spotifyApi } from '../services/spotify'
import counterReducer from './counter/counterSlice'
import authReducer from './authSlice'

const store = configureStore({
  reducer: {
    counter: counterReducer,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
    [spotifyApi.reducerPath]: spotifyApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware()
      .concat(pokemonApi.middleware)
      .concat(spotifyApi.middleware)
})

setupListeners(store.dispatch)
export default store