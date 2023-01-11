import { useState } from 'react';

export default function useAuth(initialValue) {
  const [isAuth, setAuth] = useState(initialValue);

  function login() {
    setAuth(true);
    window.localStorage.setItem('loggedIn', true);
  }

  function logout() {
    setAuth(false);
    window.localStorage.setItem('loggedIn', false);
  }

  return [isAuth, login, logout];
}
