import { Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import SongCard from './SongCard'
import { fetchPlaySong, getSongs, selectSongsDetails } from '../redux/spotifySlice';
import SelectedSongArea from './SelectedSongArea';
import SongFeaturesCard from './SongFeaturesCard';

function SongGrid({ token }) {
  const dispatch = useDispatch();
  const tracks = useSelector(selectSongsDetails);

  // Index of what song from the grid is currently selected --------------------
  const [ openSong, setOpenSong ] = useState(-1);
  useEffect( () => {
    console.log(openSong)
    if (openSong !== -1) { // if there is no selected song, don't play one
      dispatch(fetchPlaySong(tracks[openSong].uri));
    }
    // console.log(dispatch(getSongs(['spotify:track:18asYwWugKjjsihZ0YvRxO','spotify:track:18asYwWugKjjsihZ0YvRxO','spotify:track:18asYwWugKjjsihZ0YvRxO','spotify:track:18asYwWugKjjsihZ0YvRxO'])))
  }, [openSong])
  // ---------------------------------------------------------------------------


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
          artist={tracks[openSong].artists}
          index={openSong}
          deselectSongFn={()=>setOpenSong(-1)}
        />
      ) : null }
      <SongFeaturesCard selectedSongIndex={openSong}/>
    </>
  )
}

export default SongGrid