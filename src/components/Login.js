import { Box, Button } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../redux/authSlice'

function Login({ token }) {
  const CLIENT_ID="8df550fb3cbc4bc3b5c6a18d61b6a3c0"
  const REDIRECT_URI="https://spotifysongevolver.web.app"
  const AUTH_ENDPOINT="https://accounts.spotify.com/authorize"
  const RESPONSE_TYPE="token"
  const dispatch = useDispatch()

  if (token) {
    return (
        <Button 
          variant="contained" 
          sx = {{ 
            position: 'absolute',
            top: 0,
            right: 0,
            marginTop: 2,
            marginRight: 2
          }}
          onClick={() => dispatch(logout())}>
            Logout from Spotify
        </Button>
    )
  } else {
    return (
      <Box sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Button 
          variant='contained' 
          style = {{ paddingY: 10 }}
          href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=streaming%20user-read-email%20user-read-private%20user-read-playback-state%20user-modify-playback-state%20user-library-read%20user-library-modify`}>
            Login to Spotify
        </Button>
      </Box>
    )
  }
}

export default Login