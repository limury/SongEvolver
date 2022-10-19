import { Button } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import { setToken } from '../redux/authSlice'

function Login() {
  const CLIENT_ID="8df550fb3cbc4bc3b5c6a18d61b6a3c0"
  const REDIRECT_URI="http://localhost:3000"
  const AUTH_ENDPOINT="https://accounts.spotify.com/authorize"
  const RESPONSE_TYPE="token"
  const dispatch = useDispatch()

  const logout = () => {
    window.localStorage.removeItem("token");
    dispatch(setToken(null));
  };

  return (
    <>
      <Button variant='filled' href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login to Spotify</Button>
      <Button variant="outlined" onClick={logout}>Logout</Button>
    </>
  )
}

export default Login