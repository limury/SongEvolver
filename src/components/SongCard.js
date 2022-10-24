import { Box } from '@mui/material'
import Button from '@mui/material/Button/Button'
import ButtonBase from '@mui/material/ButtonBase'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import React from 'react'

function SongCard({ index, openSong, selectSongFn }) {
  if (index == openSong) {
    return (
      <Paper 
        sx= {{ padding: 1, border: 1, display: 'flex', height: '100%', flexGrow: 1, borderColor: 'primary.main', justifyContent: 'center'}}
        >
        {/* <Box maxWidth='sm' sx={{display: 'flex',alignItems: 'center'}}> */}
          {/* {mediaPlayer} */}
        {/* </Box> */}
      </Paper>
    )

  }
  return (
    <ButtonBase sx={{width: '100%', height: '100%', display: 'flex', flexGrow: 1}} onClick={selectSongFn}>
    <Paper 
      sx= {{ border: 1, display: 'flex', height: '100%', flexGrow: 1, borderColor: 'primary.main', alignItems: 'center', justifyContent: 'center'}}
      >
      <Typography>
        Play Song
      </Typography>
    </Paper>
    </ButtonBase>
  )
}

export default SongCard