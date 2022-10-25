import { Box, Button, Typography } from '@mui/material'
import React from 'react'

function SelectedSongArea({name, artist}) {
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
      <Button sx={{marginTop: 2}} variant='contained'>
        Evolve!
      </Button>
    </Box>
  )
}

export default SelectedSongArea