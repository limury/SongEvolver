import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import genres from '../available_genres.json';

// get song audio features from spotify api
// TODO ADD THE AUDIO FEATURES AS SEED AND SEND REQUEST
const getNewSongsFromSeed = createAsyncThunk(
  'spotify/getNewSongsFromSeed',
  async ({index, featureSeeds}, thunkApi) => {
    var reccomendationSeed = {
    };
    const seedGenres = ['','','','',''];
    for (let i = 0; i < 5; i++){
      seedGenres[i] = genres.genres[ Math.floor(Math.random() * genres.genres.length) ];
    }
    var reccomendationSeed = {
      ...thunkApi.getState().spotify.currentSongsDetails[index].seedValues,
      seed_genres: seedGenres.join(','),
    }
    console.log(reccomendationSeed)
  }
);

// get song details from spotify api
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
        console.log(JSON.stringify(responses))
        return responses.map((val) => ({
          albumName:  val.data.album?.name,
          albumImage: val.data.album?.images[0],
          artists:    val.data.artists?.map((v) => v.name).join(', '),
          name:       val.data.name,
          seedValues: {
            seed_artists: val.data.artists?.map((v)=>v.id).join(','),
            seed_tracks: val.data.id,
          },
        }))
      }));
      thunkApi.dispatch(setSongDetails(out));
      // now get audio features
      const audioFeatures = await axios.all(
        uris.map((uri) => 
          axios.get(`https://api.spotify.com/v1/audio-features/${uri.split(':')[2]}`)
        )
      ).then(axios.spread((...responses) => {
        console.log(responses);
        return responses.map((val) => ({
          danceability:     val.data.danceability,
          acousticness:     val.data.acousticness,
          energy:           val.data.energy,
          valence:          val.data.valence,
          instrumentalness: val.data.instrumentalness,
        }))
      }))
      thunkApi.dispatch(setSongFeatures(audioFeatures));
      thunkApi.fulfillWithValue(out);
      thunkApi.dispatch(getNewSongsFromSeed({index: 1, featureSeeds: {}}))
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
    },
    setSongFeatures: (state, action) => {
      if (state.currentSongsDetails.length === action.payload.length){
        for (let i = 0; i < action.payload.length; i++){
          state.currentSongsDetails[i].features = action.payload[i];
        }
      }
    }
  },
});

const selectDeviceId = state => state.spotify.deviceId;
const selectSongsDetails = state => state.spotify.currentSongsDetails;
const selectSongSeeds = index => state => state.spotify.currentSongsDetails[index].seedValues;

export { 
  stopPlayback, 
  fetchPlaySong, 
  transferPlayback, 
  selectDeviceId, 
  selectSongsDetails,
  selectSongSeeds,
  getSongs 
}
export const { setDeviceId, setSongDetails, setSongFeatures } = spotifySlice.actions

export default spotifySlice.reducer