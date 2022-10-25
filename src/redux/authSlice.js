import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

// slice for authentication
export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    logout: (state, action) => {
      window.localStorage.removeItem("token");
      state.token = null;
    },
  }
})

export const { setToken, logout } = authSlice.actions

// all processing required to extract the auth token from url hash
export const getSpotifyAuthToken = (dispatch) => 
  () => {
  const hash = window.location.hash;
  let token = null;
  try {
    token = JSON.parse(window.localStorage.getItem("token"));
  } catch (err) {
    token = null;
    window.localStorage.removeItem("token");
  }
  // check if expired and if so logout
  if (token && token.expiry && token.expiry <= new Date().getTime()){
    dispatch(logout());
    token = null;
    window.localStorage.removeItem("token");
  }

  // if token doesn't exist yet but the hash in url has been created
  // extract the token and expiry date
  if (!token && hash) {
    token = {value: null, expiry: null};
    token.value = hash.substring(1).split("&").find(elem => 
      elem.startsWith("access_token")
    ).split("=")[1];
    token.expiry = Number(hash.substring(1).split("&").find(elem => 
      elem.startsWith("expires_in")
    ).split("=")[1])*1000 + new Date().getTime();
    window.location.hash = ""
    window.localStorage.setItem("token", JSON.stringify(token))
    console.log('here')
  }

  if (token && token.value) { 
    dispatch(setToken(token.value));
    axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`;
  }
}


export const selectToken = state => state.auth.token

export default authSlice.reducer