import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../UserContext';
import { IoPersonOutline } from 'react-icons/io5';
import { TbPokeball } from 'react-icons/tb';
import { ImBin } from 'react-icons/im';
import Theme from '../themes/Theme';
import Blue from '../themes/Blue';

export default function Profile(props) {
  const [isAuth, login, logout] = useContext(UserContext);
  const [modal, setModal] = useState(null);

  function show() {
    setModal(true);
  }

  function hide() {
    setModal(false);
  }

  function deleteAccount() {
    Blue();
    setModal(false);
    logout();
    localStorage.clear();
  }

  return (
    <>
      <div className="profile">
        {modal && (
          <div className="modal">
            <div className="modal--container">
              <h3>ARE YOU SURE YOU WANT TO PERMANENTLY DELETE YOUR ACCOUNT?</h3>
              <div className="yesno">
                <button className="yes" onClick={deleteAccount}>
                  YES
                </button>
                <button onClick={hide}>CANCEL</button>
              </div>
            </div>
          </div>
        )}
        <h1>
          <TbPokeball /> Welcome, {localStorage.getItem('user')}!
        </h1>
        <Theme />
        <button
          onClick={() => {
            logout();
            document.location.reload();
          }}
        >
          LOG OUT
        </button>
        <div className="delete--container">
          <h3>
            <ImBin /> PERMANENTLY DELETE ACCOUNT
          </h3>
          <button className="delete--btn" onClick={show}>
            DELETE ACCOUNT
          </button>
        </div>
      </div>
    </>
  );
}
