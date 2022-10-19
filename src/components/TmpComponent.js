import { Button } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setToken } from '../redux/authSlice'
import { useGetSongReccomendationsQuery } from '../services/spotify'

function TmpComponent() {
  const { data, error, isLoading } = useGetSongReccomendationsQuery({
    'seed_artists': '4NHQUGzhtTLFvgF5SZesLK',
    'seed_genres': 'classical,country',
    'seed_tracks': '0c6xIDDpzE81m2q797ordA',
  })

  return (
    <>
      { error ? (
        <div>Error</div>
      ) : isLoading ? (
        <div>Loading...</div>
      ) : data ? (
        <div>{data.toString()}</div>
      ) : null
      }
    </>
  )
}

export default TmpComponent