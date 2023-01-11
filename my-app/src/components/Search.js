import { useContext, useEffect, useRef, useState } from 'react';
import { IoCloseOutline, IoSearchOutline } from 'react-icons/io5';
import { Link, Navigate, NavLink, Route, useLocation } from 'react-router-dom';
import { UserContext } from './UserContext';
import AddToSearchHistory from './SearchedPokemons';

function Search({ placeholder }) {
  const [filteredData, setFilteredData] = useState([]);
  const [input, setInput] = useState('');
  const inputRef = useRef();
  const [data, setData] = useState();
  let location = useLocation();
  const currentUser = useContext(UserContext);
  const [searchedPokemons, setSearchedPokemons] = useState({
    user: currentUser,
    pokemonsFound: [],
  });

  useEffect(
    () =>
      void fetch(`https://pokeapi.co/api/v2/pokemon?limit=1000&offset=0`)
        .then((response) => response.json())
        .then((json) => setData(json.results)),
    []
  );

  const handleFilter = (e) => {
    const searchWord = e.target.value.toLowerCase();
    const searchWordStrict = searchWord.replace(/[^A-Za-z]/gi, '');

    setInput(searchWordStrict.toUpperCase());
    const newFilter = data.filter((value) => {
      return (
        value.name[0] === searchWordStrict[0] &&
        value.name.includes(searchWordStrict)
      );
    });

    if (searchWordStrict === '') {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setInput('');
    inputRef.current.focus();
  };

  function pokemonSearchClick(e) {
    AddToSearchHistory(currentUser);
    if (location.pathname === '/pokemon') {
      document.location.reload();
    }
    localStorage.setItem('clickedPokemon', e.target.childNodes[0].wholeText);

    setSearchedPokemons(localStorage.getItem('searchedPokemons'));
    setInput('');
    setFilteredData([]);
  }

  return (
    <div className="search">
      <div className="search--input">
        <input
          type="text"
          placeholder={placeholder}
          onChange={handleFilter}
          value={input}
          ref={inputRef}
        />
        <div className="search--icon">
          {Boolean(input.length) ? (
            <IoCloseOutline onClick={clearInput} />
          ) : (
            <IoSearchOutline onClick={clearInput} />
          )}
        </div>
      </div>
      {Boolean(filteredData.length) && (
        <div className="data-result">
          {filteredData.map((pokemon, key) => {
            return (
              <Link className="data-item" to="/pokemon" key={key}>
                <p onClick={pokemonSearchClick}>{pokemon.name}</p>
              </Link>
            );
          })}
          {console.log('Searched pokemons:', searchedPokemons)}
        </div>
      )}
    </div>
  );
}

export default Search;
