import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const getSongs = createAsyncThunk(
  'spotify/fetchSongs',
  async (uris, thunkApi) => {
    try {
      const out = await axios.all( // for each uro perform get request
        uris.map((uri) => 
          axios.get(`https://api.spotify.com/v1/tracks/${uri.split(':')[2]}`)
        )
      )
      .then(axios.spread((...responses) => { // extract useful data
        console.log(responses)
        return responses.map((val) => ({
          albumName: val.data.album?.name,
          albumImage: val.data.album?.images[0],
          artists: val.data.artists?.map((v) => v.name).join(', '),
          name: val.data.name,
        }))
      }))
      .catch(errors => {
        console.error(errors);
      });
      thunkApi.dispatch(setSongDetails(out));
      thunkApi.fulfillWithValue(out);
    } catch (err) {
      console.error(err)
      thunkApi.rejectWithValue(err)
    }
  } 
)

// stop current song
const stopPlayback = createAsyncThunk(
    'spotify/stopPlayback',
    async (thunkApi) => {
        try {
            const response = await axios.put('https://api.spotify.com/v1/me/player/pause');
            return response.status;
        } catch (err) {
            return thunkApi.rejectWithValue(err.status);
        }
    }
);

// play other song
const fetchPlaySong = createAsyncThunk(
    'spotify/fetchPlaySong',
    async (uri, thunkApi) => {
        try {
            const response = await axios.put(
                'https://api.spotify.com/v1/me/player/play',
                { 'uris': [uri] }
                );
            return response.status;
        } catch (err) {
            return thunkApi.rejectWithValue(err.status);
        }
    }
);

// transfer playback to device
const transferPlayback = createAsyncThunk(
    'spotify/transferPlayback',
    async (deviceId, thunkApi) => {
        console.log('changing adevice id')
        try {
            const response = await axios.put(
                'https://api.spotify.com/v1/me/player',
                { 'device_ids': [deviceId] }
                );
            return response.status;
        } catch (err) {
            return thunkApi.rejectWithValue(err.status);
        }
    }
);

export const spotifySlice = createSlice({
  name: 'spotify',
  initialState: {
    deviceId: null,
    currentSongsDetails: null,
  },
  reducers: {
    setDeviceId: (state, action) => {
      state.deviceId = action.payload;
    },
    setSongDetails: (state, action) => {
      state.currentSongsDetails = action.payload;
    }
  },
});

const selectDeviceId = state => state.spotify.deviceId
const selectSongsDetails = state => state.spotify.currentSongsDetails

export { 
  stopPlayback, 
  fetchPlaySong, 
  transferPlayback, 
  selectDeviceId, 
  selectSongsDetails,
  getSongs 
}
export const { setDeviceId, setSongDetails } = spotifySlice.actions

export default spotifySlice.reducer