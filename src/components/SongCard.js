import { Box } from '@mui/material'
import ButtonBase from '@mui/material/ButtonBase'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import React from 'react'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';

function SongCard({ details, index, isPlaying, selectSongFn }) {
  
  
  return (
    <ButtonBase 
      sx={{width: '100%', height: '100%', display: 'flex', flexGrow: 1}} 
      onClick={selectSongFn}>
    <Paper 
      sx= {{ 
        border: isPlaying? 3:1, // if playing, make thick border
        borderColor: isPlaying? 'secondary.light' : 'primary.main', // if play
        alignItems: 'center', display: 'flex', height: '100%', flexGrow: 1, 
        justifyContent: 'start'}} >
      {/* play / pause icon */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'start', 
        position: 'absolute',
        paddingX: 2,
        }}>
        { isPlaying ? 
          (<PauseIcon sx={{fontSize:40}}/>) : 
          (<PlayArrowIcon sx={{fontSize:40}}/>) }
      </Box>
      {/* artist and song name */}
      <Box sx={{
        flexGrow: 1
      }}>
        <Typography variant='h5'>
          {details.name}
        </Typography>
        <Typography variant='body1'>{details.artists}</Typography>
      </Box>
      {/* album image */}
      <Box sx={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        display: 'flex',
        justifyContent: 'end',
      }}
        >
        <Box sx={{padding: 1, height: '100%', aspectRatio: 1}}
          component='img'
          src={details.albumImage.url}
        ></Box>

      </Box>
    </Paper>
    </ButtonBase>
  )
}

export default SongCard