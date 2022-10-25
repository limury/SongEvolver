import { Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import SongCard from './SongCard'
import { fetchPlaySong, getSongs, selectSongsDetails } from '../redux/spotifySlice';
import { Box } from '@mui/system';
import SelectedSongArea from './SelectedSongArea';

function SongGrid({ token }) {
  const dispatch = useDispatch();

  // Index of what song from the grid is currently selected --------------------
  const [ openSong, setOpenSong ] = useState(-1);
  useEffect( () => {
    console.log(openSong)
    if (openSong !== -1) { // if there is no selected song, don't play one
      dispatch(fetchPlaySong('spotify:track:18asYwWugKjjsihZ0YvRxO'));
    }
    console.log(dispatch(getSongs(['spotify:track:18asYwWugKjjsihZ0YvRxO','spotify:track:18asYwWugKjjsihZ0YvRxO','spotify:track:18asYwWugKjjsihZ0YvRxO','spotify:track:18asYwWugKjjsihZ0YvRxO'])))
  }, [openSong])
  // ---------------------------------------------------------------------------

  const tracks = useSelector(selectSongsDetails);

  return (
    <>
      {/* Grid with songs to pick from */}
      <Grid container spacing={2} maxWidth='lg'>
        { tracks ? (
          tracks.map(
            (details, index) => (
              <Grid item xs={6} sx={{height: 100}} key={index}>
                <SongCard 
                  details={details}
                  index={index}
                  isPlaying={index===openSong}
                  selectSongFn={() => {setOpenSong(index)}}
                />
              </Grid>
            )
          )
        ) : null
        }
      </Grid>
      {/* Box with currently selected song */}
      { (openSong !== -1 ) ? (
        <SelectedSongArea 
          name={tracks[openSong].name} 
          artist={tracks[openSong].artists}/>
      ) : null }
    </>
  )
}

export default SongGrid