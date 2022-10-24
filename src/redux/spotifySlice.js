import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

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
    async (thunkApi) => {
        try {
            const response = await axios.put(
                'https://api.spotify.com/v1/me/player/play',
                { 'uris': ['spotify:track:18asYwWugKjjsihZ0YvRxO'] }
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
  },
  reducers: {
    setDeviceId: (state, action) => {
        console.log('changing device id')
        state.deviceId = action.payload
    }
  },
});

const selectDeviceId = state => state.spotify.deviceId

export { stopPlayback, fetchPlaySong, transferPlayback, selectDeviceId }
export const { setDeviceId } = spotifySlice.actions

export default spotifySlice.reducer