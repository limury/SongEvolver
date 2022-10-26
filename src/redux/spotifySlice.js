import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import genres from '../available_genres.json';

// get spotify analysis of the song. These are the features we will be evolving.
const getSongFeatures = createAsyncThunk(
  'spotify/getSongFeatures',
  async (_, thunkApi) => {
    // get song uris
    try {
      const uris = thunkApi.getState().spotify.currentSongsDetails.map(v=>v.uri);
      const audioFeatures = await axios.all(
        uris.map((uri) => 
          axios.get(`https://api.spotify.com/v1/audio-features/${uri.split(':')[2]}`)
        )
      ).then(axios.spread((...responses) => {
        return responses.map((val) => ({
          danceability:     val.data.danceability,
          acousticness:     val.data.acousticness,
          energy:           val.data.energy,
          valence:          val.data.valence,
          instrumentalness: val.data.instrumentalness,
        }))
      }));
      thunkApi.dispatch(setSongFeatures(audioFeatures));
      thunkApi.fulfillWithValue(audioFeatures);
    } catch (err) {
      console.error(err);
      thunkApi.rejectWithValue(err)
    }
  }
)
// get song audio features from spotify api
// TODO ADD THE AUDIO FEATURES AS SEED AND SEND REQUEST
const getNewSongsFromSeed = createAsyncThunk(
  'spotify/getNewSongsFromSeed',
  async ({index, featureSeeds}, thunkApi) => {
    // get 5 random genres
    try {
      var reccomendationSeed = {
        limit: 4,
        // unpack the seed song and artist
        ...thunkApi.getState().spotify.currentSongsDetails[index].seedValues,
        // unpack the features we are targeting
        ...featureSeeds,
        // seed_genres: seedGenres.join(','),
      }
      const usedArtists = reccomendationSeed.seed_artists.split(',').length;
      var seedGenres = [];
      for (let i = 0; i < (4-usedArtists); i++){
        seedGenres.push( genres.genres[ Math.floor(Math.random() * genres.genres.length) ] );
      }
      reccomendationSeed.seed_genres = seedGenres.join(',')
      const searchParams = new URLSearchParams(reccomendationSeed);
      const reccomendations = await axios.get(`https://api.spotify.com/v1/recommendations?${searchParams.toString()}`)
      const newSongGrid = reccomendations.data.tracks.map((val) => ({
        uri:        val.uri,
        albumName:  val.album?.name,
        albumImage: val.album?.images[0],
        artists:    val.artists?.map((v) => v.name).join(', '),
        name:       val.name,
        seedValues: {
          seed_artists: val.artists?.map((v)=>v.id).slice(0,2).join(','),
          seed_tracks: val.id,
        },
      }));
      thunkApi.dispatch(setSongDetails(newSongGrid));
      const res = await thunkApi.dispatch(getSongFeatures());
      thunkApi.fulfillWithValue(newSongGrid);
    } catch (err) {
      console.error(err);
      thunkApi.rejectWithValue(err);
    }
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
        return responses.map((val) => ({
          uri:        val.data.uri,
          albumName:  val.data.album?.name,
          albumImage: val.data.album?.images[0],
          artists:    val.data.artists?.map((v) => v.name).join(', '),
          name:       val.data.name,
          seedValues: {
            seed_artists: val.data.artists?.map((v)=>v.id).slice(0,2).join(','),
            seed_tracks: val.data.id,
          },
        }))
      }));
      thunkApi.dispatch(setSongDetails(out));
      // now get audio features
      const res = await thunkApi.dispatch(getSongFeatures());
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
    songToEvolve: null,
  },
  reducers: {
    setDeviceId: (state, action) => { state.deviceId = action.payload; },
    setSongDetails: (state, action) => { state.currentSongsDetails = action.payload; },
    setSongFeatures: (state, action) => {
      if (state.currentSongsDetails.length === action.payload.length){
        for (let i = 0; i < action.payload.length; i++){
          state.currentSongsDetails[i].features = action.payload[i];
        }
      }
    },
    setSongToEvolve: (state, action) => { 
      state.songToEvolve = state.currentSongsDetails[ action.payload ]; 
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
  getSongs,
  getNewSongsFromSeed,
}
export const { setDeviceId, setSongDetails, setSongFeatures, setSongToEvolve } = spotifySlice.actions

export default spotifySlice.reducer