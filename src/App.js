import logo from './logo.svg';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import Login from './components/Login';
import { useEffect } from 'react';
import { selectToken, setToken } from './redux/authSlice';
import { Box, CssBaseline } from '@mui/material';
import SongGrid from './components/SongGrid';
import SpotifyPlayer from 'react-spotify-web-playback'
import { selectDeviceId, setDeviceId, transferPlayback } from './redux/spotifySlice';
import axios from 'axios';

function App() {
  const dispatch = useDispatch();

  // select the device ID, and transfer the playback session to the new device--
  const deviceId = useSelector(selectDeviceId);
  useEffect(() => {
    if (deviceId){
      dispatch(transferPlayback(deviceId))
    }
  }, [deviceId])
  // ---------------------------------------------------------------------------

  // get spotify login token ---------------------------------------------------
  const token = useSelector(selectToken);
  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      token = hash.substring(1).split("&").find(elem => 
        elem.startsWith("access_token")
      ).split("=")[1]
      window.location.hash = ""
      window.localStorage.setItem("token", token)
    }

    dispatch(setToken(token))
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }, [])
  // ---------------------------------------------------------------------------
  
  return (
      <div className="App">
        <CssBaseline/>
        <Box
          sx={{
            height: '100vh',
            display: 'flex',
            flexGrow: 1,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}>

          { token ? (
            <SongGrid token={token}/>
          ) : null}
          <Login token={token}/>
        </Box>

        { /* Spotify player static bar */ }
        ( token ? (
          <Box
            sx={{
              position: 'fixed',
              bottom: 0,
              right: 0,
              width: '100%',
            }}>
            <SpotifyPlayer
              token={token}
              uris={['spotify:track:1Y62KpDaP5MEL43ZcI6IaG']}
              callback={(state) => {
                dispatch(setDeviceId(state.currentDeviceId))
              }}
            />
          </Box>
        ) : null
        )
      </div>
  );
}

export default App;
