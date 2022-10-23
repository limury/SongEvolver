import { Grid, Paper } from '@mui/material'
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { selectToken } from '../redux/authSlice';
import SongCard from './SongCard'

function SongGrid({ token }) {
  const [ openSong, setOpenSong ] = useState(-1);

  // TODO ---------------------------------------
  const trackIDs = ['a','b','c','d'];
  // TODO ---------------------------------------

  return (
    <Grid container spacing={2} maxWidth='lg'>
      {
        trackIDs.map(
          (ID, index) => (
            <Grid item xs={6} sx={{height: 100}}>
              <SongCard token={token} ID={ID} index={index} openSong={openSong} selectSongFn={() => {setOpenSong(index)}}/>
            </Grid>
          )
        )
      }
    </Grid>
  )
}

export default SongGrid