import logo from './logo.svg';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import Login from './components/Login';
import { useEffect } from 'react';
import { getSpotifyAuthToken, selectToken } from './redux/authSlice';
import { Box, Button, CssBaseline } from '@mui/material';
import SongGrid from './components/SongGrid';
import SpotifyPlayer from 'react-spotify-web-playback'
import { selectDeviceId, setDeviceId, transferPlayback, getNewSongsFromSeed, getSongs } from './redux/spotifySlice';

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
  useEffect(getSpotifyAuthToken(dispatch), [])
  useEffect(() => {dispatch(
    getSongs(['spotify:track:6xGruZOHLs39ZbVccQTuPZ','spotify:track:1Y62KpDaP5MEL43ZcI6IaG','spotify:track:1jDJFeK9x3OZboIAHsY9k2','spotify:track:6UelLqGlWMcVH1E5c4H7lY'])
    )})
  // ---------------------------------------------------------------------------
  
  return (
      <div className="App">
        <CssBaseline/>
        <Login token={token}/>
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
        </Box>

        { /* Spotify player static bar */ }
        { token ? (
          <Box
            sx={{ position: 'fixed', bottom: 0, right: 0, width: '100%', }}>
            <SpotifyPlayer
              token={token}
              uris={[]}
              callback={(state) => {
                dispatch(setDeviceId(state.currentDeviceId))
              }}
            />
          </Box>
        ) : null
        }
        <Button onClick={() => dispatch(getNewSongsFromSeed({index:1,featureSeeds:{}}))}>
          Dispatch
        </Button>
      </div>
  );
}

export default App;
