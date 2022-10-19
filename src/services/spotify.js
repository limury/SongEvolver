import { createApi, fetchBaseQuery } from  '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const spotifyApi = createApi({
  reducerPath: 'spotifyApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'https://api.spotify.com/v1/',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token
      console.log(token)
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    }
  }),
  endpoints: (builder) => ({
    getSongReccomendations: builder.query({
      query: (params) => {
        const queryParams = new URLSearchParams(params)
        return `recommendations?${queryParams.toString()}`
      },
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetSongReccomendationsQuery } = spotifyApi