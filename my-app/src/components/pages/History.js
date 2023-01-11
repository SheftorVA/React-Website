import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IoHomeOutline } from 'react-icons/io5';

function useHistoryPokemons(pokemonNames) {
  const [searchedPokemon, setSearchedPokemon] = useState([]);

  useEffect(() => {
    if (pokemonNames.length) {
      Promise.all(
        pokemonNames.map((pokemonName) =>
          fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
            .then((response) => response.json())
            .then(({ name, sprites }) => ({ name, image: sprites.front_shiny }))
        )
      ).then(setSearchedPokemon);
    }
  }, [pokemonNames.length]);

  return {
    searchedPokemon,
    clearHistory: () => setSearchedPokemon([]),
  };
}

function History() {
  const viewedPokemonesArr = JSON.parse(
    localStorage.getItem('searchedPokemons' || '[]')
  );

  const { searchedPokemon, clearHistory } =
    useHistoryPokemons(viewedPokemonesArr);

  function deleteHistory() {
    localStorage.removeItem('searchedPokemons');
    clearHistory();
  }

  function searched(pokemonName) {
    localStorage.setItem('searchedPokemons', pokemonName);
  }

  return (
    <>
      {!!viewedPokemonesArr.length ? (
        <div className="fav">
          <h1> {localStorage.getItem('user')} Search History </h1>
          <div className="fav-container">
            <div>
              <ul className="home">
                {searchedPokemon.length
                  ? searchedPokemon.map(({ name, image }) => (
                      <Link
                        to="../pokemon"
                        onClick={() => searched()}
                        key={name}
                      >
                        <li className="card" key={name}>
                          <div className="poke-name">{name}</div>
                          <img src={image} alt=""></img>
                        </li>
                      </Link>
                    ))
                  : 'Loading'}
              </ul>
            </div>
          </div>
          <button onClick={deleteHistory}>Clear History</button>
        </div>
      ) : (
        <div className="fav">
          <h2>Search history is empty</h2>
          <Link to="/">
            <h1 className="active">
              <IoHomeOutline /> HOME
            </h1>
          </Link>
        </div>
      )}
    </>
  );
}

export default History;
