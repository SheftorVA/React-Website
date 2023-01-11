import { useState } from 'react';

export default function AddToSearchHistory({ currentUser }) {
  const [searchedPokemons, setSearchedPokemons] = useState({
    user: currentUser,
    searched: [],
  });
  const searched = localStorage.getItem('searchedPokemons');
  const searchedArr = JSON.parse(searched);

  let currentPokemonName = document.querySelector('h1').innerText.toLowerCase();

  if (!!searchedArr) {
    const result = [currentPokemonName, ...searchedArr];
    setSearchedPokemons(searchedPokemons.searched.push(result));
    window.localStorage.setItem('searchedPokemons', JSON.stringify(result));
  } else {
    setSearchedPokemons(searchedPokemons.searched.push(currentPokemonName));
    window.localStorage.setItem(
      'searchedPokemons',
      JSON.stringify([currentPokemonName])
    );
  }
}
