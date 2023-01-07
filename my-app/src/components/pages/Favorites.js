import { IoHeartOutline, IoHomeOutline } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from '../Modal';

function useFavoritesPokemons(pokemonNames) {
  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    if (pokemonNames.length) {
      Promise.all(
        pokemonNames.map((pokemonName) =>
          fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
            .then((response) => response.json())
            .then(({ name, sprites }) => ({ name, image: sprites.front_shiny }))
        )
      ).then(setPokemonData);
    }
  }, [pokemonNames.length]);

  return {
    pokemonData,
    clearData: () => setPokemonData([]),
  };
}

export default function Favorites() {
  const [modal, setModal] = useState(null);

  const favArr = JSON.parse(window.localStorage.getItem('favorites') || '[]');

  const { pokemonData, clearData } = useFavoritesPokemons(favArr);

  function clearLikes() {
    window.localStorage.removeItem('favorites');
    clearData();
  }

  function onClick(pokemonName) {
    localStorage.setItem('clickedPokemon', pokemonName);
    // console.log(e.target.parentNode.firstChild.innerText);
  }

  return (
    <>
      {favArr.length ? (
        <div className="fav">
          <h1>
            {<IoHeartOutline />} {favArr.length} Favorite pokemon
            {favArr.length === 1 ? '' : 's'} of{' '}
            {window.localStorage.getItem('user') &&
              window.localStorage.getItem('user')}
          </h1>
          <div className="fav-container">
            <div>
              <ul className="home">
                {pokemonData.length
                  ? pokemonData.map(({ name, image }) => {
                      return (
                        <Link
                          to="../pokemon"
                          onClick={() => onClick(name)}
                          key={name}
                        >
                          <li className="card" key={name}>
                            <div className="poke-name">{name}</div>
                            <img src={image} alt="" />
                          </li>
                        </Link>
                      );
                    })
                  : 'Loading'}
              </ul>
            </div>
          </div>
          <button onClick={clearLikes}>DELETE ALL LIKES</button>
        </div>
      ) : (
        <div className="fav">
          <h2>YOUR LIKED POKEMONS WILL BE DISPLAYED HERE</h2>
          <h1>GO LIKE SOME!</h1>
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
