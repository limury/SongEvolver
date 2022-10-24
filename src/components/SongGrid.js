import { Button, Grid, Paper } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectToken } from '../redux/authSlice';
import SongCard from './SongCard'
import SpotifyPlayer from 'react-spotify-web-playback'
import { usePutCloseSessionQuery } from '../services/spotify';
import axios from 'axios';
import { stopPlayback, fetchPlaySong } from '../redux/spotifySlice';

function SongGrid({ token }) {
  const dispatch = useDispatch();

  // Index of what song from the grid is currently selected --------------------
  const [ openSong, setOpenSong ] = useState(-1);
  useEffect( () => {
    console.log(openSong)
    if (openSong != -1) { // if there is no selected song, don't play one
      dispatch(fetchPlaySong());
    }
  }, [openSong])
  // ---------------------------------------------------------------------------

  const trackIDs = ['a','b','c','d']

  return (
    <Grid container spacing={2} maxWidth='lg'>
      {
        trackIDs.map(
          (ID, index) => (
            <Grid item xs={6} sx={{height: 100}} key={index}>
              <SongCard 
                index={index} 
                openSong={openSong} 
                selectSongFn={() => {setOpenSong(index)}}
              />
            </Grid>
          )
        )
      }
    </Grid>
  )
}

export default SongGrid