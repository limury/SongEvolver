import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getNewSongsFromSeed, selectSongsDetails, setSongToEvolve } from '../redux/spotifySlice';
import { evolveObject } from '../utils';

function SelectedSongArea({name, artist, index, deselectSongFn}) {
  const dispatch = useDispatch();
  const songDetails = useSelector(selectSongsDetails);
  const evolve = () => {
    const features = songDetails[index].features;
    const evolvedFeatures = evolveObject(features, 0.08);
    deselectSongFn();
    dispatch(getNewSongsFromSeed({
      index: index,
      featureSeeds: evolvedFeatures,
    }));
  };

  return (
    <Box sx={{paddingTop: 3}}>
      <Typography variant='h6'>
        Currently selected song:
      </Typography>
      <Typography variant='body1'>
        {name}
      </Typography>
      <Typography variant='body2'>
        By: {artist}
      </Typography>
      <Button sx={{marginTop: 2}} variant='contained'
        onClick={evolve}>
        Evolve!
      </Button>
    </Box>
  )
}

export default SelectedSongArea