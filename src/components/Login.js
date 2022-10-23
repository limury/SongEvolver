import { Button } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import { setToken } from '../redux/authSlice'

function Login({ token }) {
  const CLIENT_ID=process.env.REACT_APP_CLIENT_ID
  const REDIRECT_URI=process.env.REACT_APP_REDIRECT_URI
  const AUTH_ENDPOINT=process.env.REACT_APP_AUTH_ENDPOINT
  const RESPONSE_TYPE=process.env.REACT_APP_RESPONSE_TYPE
  const dispatch = useDispatch()

  const logout = () => {
    window.localStorage.removeItem("token");
    dispatch(setToken(null));
  };

  if (token) {
    return (
        <Button 
          variant="contained" 
          sx = {{ 
            marginY: 3,
            justifySelf: 'start',
          }}
          onClick={logout}>
            Logout from Spotify
        </Button>
    )
  } else {
    return (
        <Button 
          variant='contained' 
          style = {{ paddingY: 10 }}
          href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=streaming%20user-read-email%20user-read-private%20user-read-playback-state%20user-modify-playback-state%20user-library-read%20user-library-modify`}>
            Login to Spotify
        </Button>
    )
  }
}

export default Login