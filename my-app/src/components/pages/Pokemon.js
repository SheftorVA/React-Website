import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../UserContext';
import {
  IoShieldOutline,
  IoStarOutline,
  IoAdd,
  IoFlashOutline,
} from 'react-icons/io5';

function Pokemon({ id }) {
  const [pokemon, setPokemon] = useContext(UserContext);
  const clickedPokemon = localStorage.getItem('clickedPokemon');

  const [data, setData] = useState({
    name: '',
  });
  const [stat, setStat] = useState(null);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${clickedPokemon}`)
      .then((response) => response.json())
      .then((json) => setData(json));
  }, []);

  useEffect(() => {
    fetch(`data.stats[0].stat.url`).then((json) => setStat(json));
  }, []);

  console.log(data, 'from Pokemon');

  if (data.name !== '') {
    const pokemonList = data.stats.map((pokemon, i) => {
      return (
        <li>
          {pokemon.stat.name.toUpperCase()}: {data.stats[i].base_stat}
        </li>
      );
    });
    return (
      <div className="pokemon__container">
        <img
          src={data.sprites.other['official-artwork'].front_default}
          className="pokemon-image"
          alt="img"
        />
        <h1>{data.name.toUpperCase()}</h1>
        <div className="stat">
          <ul>{pokemonList}</ul>
          {/* <p>
            <IoAdd /> {data.stats[0].stat.name.toUpperCase()}:{' '}
            {data.stats[0].base_stat}
          </p>
          <p>
            <IoFlashOutline /> {data.stats[1].stat.name.toUpperCase()}:{' '}
            {data.stats[1].base_stat}
          </p>
          <p>
            <IoShieldOutline /> {data.stats[2].stat.name.toUpperCase()}:{' '}
            {data.stats[2].base_stat}
          </p>
          <p>
            <IoStarOutline /> {data.stats[3].stat.name.toUpperCase()}:{' '}
            {data.stats[3].base_stat}
          </p> */}
        </div>
        <div className="types">
          <p>#{[data.types[0]?.type.name]}</p>
          {data.types[1]?.type.name && <p>#{[data.types[1]?.type.name]}</p>}
        </div>
      </div>
    );
  } else {
    return <h1 className="loading">Loading...</h1>;
  }
}

export default Pokemon;
