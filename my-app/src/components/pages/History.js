import React, { useState, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';

function History() {
  const viewedPokemones = useContext(UserContext);

  // const navigate = useNavigate();

  // const goHistory = () => navigate('/history', { replace: true });

  return (
    <React.Fragment>
      <NavLink to="/history">
        <button>{'History'}</button>
      </NavLink>
    </React.Fragment>
  );
}

export default History;
