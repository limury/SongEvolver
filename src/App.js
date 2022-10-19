import logo from './logo.svg';
import './App.css';
import Counter from './components/counter';
import { useDispatch, useSelector } from 'react-redux';
import Login from './components/Login';
import { useEffect } from 'react';
import { selectToken, setToken } from './redux/authSlice';
import TmpComponent from './components/TmpComponent';

function App() {
  const dispatch = useDispatch();
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
        <header className="App-header">
          <Login/>
          { token ? (
            <TmpComponent/>
          ) : null}
          <p>{token}</p>
          <img src={logo} className="App-logo" alt="logo" />
          {/* <p>
            Edit <code>src/App.js</code> and save to reload.
          </p> */}
          <Counter/>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
          </a>
        </header>
      </div>
  );
}

export default App;
