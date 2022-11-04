import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@mui/material';
import store from './redux/store';
import { Provider } from 'react-redux';
import createPalette from '@mui/material/styles/createPalette';

export const theme = createTheme({
  palette: createPalette({
    type: 'dark',
    mode: 'dark',
    // background: {
    //   default: '#222222',
    // },
    primary: {
      main: '#0c8c03',
    },
    secondary: {
      main: '#031373',
    },
  },)
});

const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <React.StrictMode>
    <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
