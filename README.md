# Song Evolver

This project uses evolutionary algorithms to find songs you might enjoy.
We begin with 4 sample songs you can pick from, then when you choose one of them, the app gets its features from the Spotify API (danceability, energy, ...) and creates 4 new song seeds by applying a small mutation the original features using Gaussian Mutation. After this, a request is sent to the spotify api to find songs with such features and they are displayed for you to choose again. You can also play the song you have selected to see if you like it by using the play-bar on the bottom of the screen.

A live demo of the website can be found here: https://spotifysongevolver.web.app/
Note that you will need a spotify premium account to use it.

## Project Structure
The main tools used to create this website are React, Redux, Material UI and Firebase

### React
All react components used in this project can be found in the `src/components` folder, where each component is put into a file. Not many components were used so I did not create a nested folder structure.

### Redux
Redux files can be found in `src/redux`, here we handle authentication and various api calls to the Spotify API.

### MUI
Material UI was used to create the various components in `src/components`. The theme used can be found in `src/index.js`.

### Firebase
Firebase was used for deploying the website publicly.