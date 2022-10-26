import { Box, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectSongsDetails } from '../redux/spotifySlice';

function SongFeaturesCard({selectedSongIndex}) {
  const songDetails = useSelector(selectSongsDetails);

  const [ features, setFeatures ] = useState(null)
  useEffect(() => {
    if (selectedSongIndex === -1) {
      setFeatures(null);
    } else {
      setFeatures(songDetails[selectedSongIndex].features);
    }
  }, [selectedSongIndex, songDetails])

  if (features) {
    return (
        <Box sx={{ position: 'absolute', right: 0 }}>
          <Paper elevation={2} sx={{ padding: 2 }}>
            <Box>
              <Typography variant='h5'>
                Song Features:
              </Typography>
              <Box sx={{ display: 'flex', flexDirection:'row' }}>
                <Box sx={{
                  flexDirection:'column', 
                  display:'flex', 
                  alignItems: 'start',
                  marginRight: 2, }}>
                  {Object.keys(features).map(k => {
                    if (k?.length > 0) { k = k.charAt(0).toUpperCase() + k.slice(1) }
                    return (
                      <Typography>{k}:</Typography>
                    )
                  })}
                </Box>
                <Box sx={{
                  flexDirection:'column', 
                  display:'flex', 
                  alignItems: 'start', }}>
                  {Object.values(features).map(v => (
                    <Typography>{Math.round(v*100)/100}</Typography>
                  ))}
                </Box>
              </Box>
            </Box>
          </Paper>
        </Box>
    )
  } else {
    return null
  }
}

export default SongFeaturesCard