import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import useAuth from './hooks/UseAuth';
import Navbar from './components/Navbar';
import Favorites from './components/pages/Favorites';
import Home from './components/pages/Home';
import Profile from './components/pages/Profile';
import SignUp from './components/pages/SignUp';
import LogIn from './components/pages/LogIn';
import { UserContext } from './components/UserContext';
import { IoHeartOutline, IoPersonOutline } from 'react-icons/io5';
import Pokemon from './components/pages/Pokemon';
import { useState } from 'react';
import Blue from './components/themes/Blue';
import Orange from './components/themes/Orange';
import Maroon from './components/themes/Maroon';
import Pink from './components/themes/Pink';
import History from './components/pages/History';

function App() {
  if (window.localStorage.getItem('loggedIn') === 'true') {
    if (window.localStorage.getItem('theme') === 'orange') {
      Orange();
    } else if (window.localStorage.getItem('theme') === 'maroon') {
      Maroon();
    } else if (window.localStorage.getItem('theme') === 'blue') {
      Blue();
    } else if (window.localStorage.getItem('theme') === 'pink') {
      Pink();
    }
  }

  const [isAuth, login, logout] = useAuth(false);
  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(0);
  // const [likes, setLikes] = useState(0);

  if (window.localStorage.getItem('loggedIn') === 'true' && count === 0) {
    setCount(count + 1);
    login();
  }

  if (window.localStorage.getItem('theme') && count2 === 0) {
    setCount2(count2 + 1);
  }

  const heartIcon = (
    <div>
      <IoHeartOutline /> <span className="text">FAVORITES</span>
    </div>
  );

  const personIcon = (
    <div>
      <IoPersonOutline />{' '}
      <span className="text">
        {localStorage.getItem('user')?.toUpperCase()}
      </span>
    </div>
  );

  return (
    <>
      <Navbar
        main={isAuth ? heartIcon : 'SIGN UP'}
        secondary={
          isAuth && localStorage.getItem('user') ? personIcon : 'LOG IN'
        }
        pathMain={isAuth ? '/favorites' : '/signup'}
        pathSecondary={isAuth ? '/profile' : '/login'}
        searchHistory={isAuth ? '/history' : '/signup'}
      />
      <UserContext.Provider value={[isAuth, login, logout, count, setCount]}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/profile"
            element={isAuth ? <Profile /> : <Navigate to="/login" replace />}
          />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/pokemon" element={<Pokemon />} />
          <Route
            path="/favorites"
            element={isAuth ? <Favorites /> : <Navigate to="/signup" replace />}
          />
          <Route
            path="/history"
            element={isAuth ? <History /> : <Navigate to="/login" replace />}
          />
        </Routes>
      </UserContext.Provider>
    </>
  );
}

export default App;
