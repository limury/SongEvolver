import logo from './logo.svg';
import './App.css';
import Counter from './components/counter';
import { useDispatch, useSelector } from 'react-redux';
import Login from './components/Login';
import { useEffect } from 'react';
import { selectToken, setToken } from './redux/authSlice';
import TmpComponent from './components/TmpComponent';
import { Box, CssBaseline } from '@mui/material';
import SongGrid from './components/SongGrid';

function App() {
  const dispatch = useDispatch();
  
  // get spotify login token
  const token = useSelector(selectToken);
  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]
      window.location.hash = ""
      window.localStorage.setItem("token", token)
    }

    dispatch(setToken(token))
  }, [])
  
  return (
      <div className="App">
        <CssBaseline/>
        <Box
          sx={{
            height: '100vh',
            display: 'flex',
            flexGrow: 1,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}>

          { token ? (
            // <TmpComponent />
            <SongGrid token={token}/>
          ) : null}
          <Login token={token}/>

        </Box>
      </div>
  );
}

export default App;
