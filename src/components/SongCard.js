import { Box } from '@mui/material'
import Button from '@mui/material/Button/Button'
import ButtonBase from '@mui/material/ButtonBase'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import React from 'react'
import SpotifyPlayer from 'react-spotify-web-playback'

function SongCard({ token, ID, index, openSong, selectSongFn }) {
  if (index == openSong) {
    return (
      <Paper 
        sx= {{ border: 1, display: 'flex', height: '100%', flexGrow: 1, borderColor: 'primary.main', justifyContent: 'center'}}
        >
            <Box maxWidth='sm'>
              <SpotifyPlayer
                token={token}
                uris={['spotify:artist:6HQYnRM4OzToCYPpVBInuU']}
                styles={{
                  maxWidth: 3
                }}
              />
            </Box>
        <Button onClick={() => {console.log(token)}}/>
      </Paper>
    )

  }
  return (
    <ButtonBase sx={{width: '100%', height: '100%', display: 'flex', flexGrow: 1}} onClick={selectSongFn}>
    <Paper 
      sx= {{ border: 1, display: 'flex', height: '100%', flexGrow: 1, borderColor: 'primary.main', justifyContent: 'center'}}
      >
      
      { index == openSong ?
        (
          <Box maxWidth='sm'>
            <SpotifyPlayer
              token={token}
              uris={['spotify:artist:6HQYnRM4OzToCYPpVBInuU']}
              styles={{
                maxWidth: 3
              }}
            />
          </Box>
        ) : (
          <Typography>
            Play Song
          </Typography>
        )
      }
      <Button onClick={() => {console.log(token)}}/>
    </Paper>
    </ButtonBase>
  )
}

export default SongCard